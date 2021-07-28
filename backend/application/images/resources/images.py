# import traceback
import os

from typing import Dict
from flask_restful import Resource
from flask_uploads import UploadNotAllowed
from flask import request, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_babelplus import lazy_gettext as _

from application.modules.fbp import fbp
from application.home.local_init_data_home import sessions
from application.users.models import UserModel
from ..utils.image_helper import (
    get_extention,
    # get_basename,
    # save_image,
    find_image_any_format, is_filename_safe_no_ext)
from ..schemas.image import ImageSchema

image_schema = ImageSchema()


class ImagesHandling(Resource):
    """
    Class for image handling
    Logic:
    upload - to folder
        static/image/for_<view_id>/<structure_key>.<allowed_extention>
        If file exists already reject uploading, ask user to delete
            it first, then upload again.
    """
    @classmethod
    def not_found(cls, picture_id: str = '') -> Dict:
        """
        The method inform user requred image does not
        exist.
        """
        return {
            'message': str(_(
                "A picture with identity '%(picture_id)s' have not been found.",
                picture_id=picture_id)),
        }, 404

    @classmethod
    def already_exists(cls, picture_id: str = '') -> Dict:
        """
        The method inform user requred image does not
        exist.
        """
        # print('already_exists, picture_id ->', picture_id)
        return {
            'message': str(_(
                "A picture with identity '%(picture_id)s' already exist, "
                "you should either kill it if uploading or download one.",
                picture_id=picture_id)),
        }, 400

    @classmethod
    def no_access(cls, user_id: int = 0) -> Dict:
        """
        The method inform user on lack of previlages.
        """
        return {
            'message': str(_(
                "Sorry, images uploading is allowed to admin only."
            ))
        }, 401

    @classmethod
    @jwt_required()
    def post(cls) -> Dict:
        """
        Used to upload an image file.
        I use params to select folder and filename to store pictures.
        File name should represent structure table identity.
        If same name used, old picture would be over written after
        notice to user.
        Admins are allowed to upload files only.
        """
        # it became by wergzeug {'image': FileStorage}, where 'image'
        # is field in our ImageSchema.
        # If everythin ok we will have data['image'] that is FileStorage
        # object

        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return cls.no_access()  # reject not admin to upload images
        fbp.set_lng(request.headers.get('Accept-Language'))
        print('image, resource, lng ->', request.headers.get('Accept-Language'))
        _requested_dict = {
            'view_id': request.args.get('view_id'),
            'image_id': request.args.get('image_id')
        }
        # Testing whether file has been exists
        _basic_file_name = _requested_dict.get('image_id')
        _folder = f'for_{_requested_dict.get("view_id")}'
        if find_image_any_format(_basic_file_name, _folder):
            return cls.already_exists(_basic_file_name)

        data = image_schema.load(request.files)
        _file_storage = data.get('image')
        _file_name = (f"{_basic_file_name}{get_extention(_file_storage)}")
        _file_storage.filename = _file_name
        try:
            # image_path = save_image(data.get('image'), folder=_folder)
            # image_path = image_helper.save_image(_file_name, folder=folder)
            # basename = get_basename(image_path)
            return {
                'message': str(_("Image for view '%(view_id)s' with identity "
                                 "'%(image_id)s' uploaded.",
                                 view_id=_requested_dict.get("view_id"),
                                 image_id=_basic_file_name
                                 ))}, 201
        except UploadNotAllowed:
            extention = get_extention(data.get('image'))
            return {
                'message': str(_("Extentions '%(extention)s' are not allowed",
                                 extention=extention))}, 400

    @classmethod
    @jwt_required()
    def get(cls) -> Dict:
        """
        Recieve file name (structure table identity) and view_idself.
        Look respective and return it if exists.
        """
        fbp.set_lng(request.headers.get('Accept-Language'))
        if not sessions.is_valid(get_jwt_identity()):
            return {
                'message': str(_(
                    "Something went wrong. Sorry we'll reverting."))
            }, 500
        _requested_dict = {
            'view_id': request.args.get('view_id'),
            'file_name': request.args.get('file_name')
        }
        # Testing whether file has been exists
        _basic_file_name = _requested_dict.get("file_name")
        _folder = f'for_{_requested_dict.get("view_id")}'
        if not is_filename_safe_no_ext(_basic_file_name):
            return {
                'message': str(_(
                    "File name '%(file_name)s' contains illigal simbols",
                    file_name=_basic_file_name)),
            }, 400
        try:
            _found_image = find_image_any_format(_basic_file_name, _folder)
            if not _found_image:
                return cls.not_found(_basic_file_name)
            return send_file(_found_image)
        except FileNotFoundError:
            return cls.not_found(_basic_file_name)

        # print('images, resource, _found_image ->', _found_image)

    @classmethod
    @jwt_required()
    def put(cls) -> Dict:
        """
        The method used for checking whether picure for specific view element is
        available. The method should be called before POST.
        """
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return cls.no_access()  # reject not admin to upload images
        fbp.set_lng(request.headers.get('Accept-Language'))
        _basic_file_name = request.get_json().get("file_name")
        _folder = f'for_{request.get_json().get("view_id")}'
        if find_image_any_format(_basic_file_name, _folder):
            return cls.already_exists(_basic_file_name)
        return {
            'message': str(_(
                "A picture with identity '%(picture_id)s' have not been found, "
                "your are welcome to upload one.",
                picture_id=_basic_file_name)),
        }, 200

    @classmethod
    @jwt_required()
    def delete(cls) -> Dict:
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return cls.no_access()  # reject not admin to upload images
        fbp.set_lng(request.headers.get('Accept-Language'))
        _requested_dict = {
            'view_id': request.args.get('view_id'),
            'file_name': request.args.get('file_name')
        }
        _basic_file_name = _requested_dict.get("file_name")
        _folder = f'for_{_requested_dict.get("view_id")}'
        if not is_filename_safe_no_ext(_basic_file_name):
            return {
                'message': str(_(
                    "Picture identity '%(file_name)s' contains illigal simbols",
                    file_name=_basic_file_name)),
            }, 400
        try:
            _found_image = find_image_any_format(_basic_file_name, _folder)
            # print('_found_image ->', _found_image)
            if not _found_image:
                return cls.not_found(_basic_file_name)
            os.remove(_found_image)
            return {
                'message': str(_(
                    "Image with identity '%(file_name)s' successfully deleted.",
                    file_name=_basic_file_name)),
            }, 200

        except FileNotFoundError:
            return cls.not_found(_basic_file_name)
