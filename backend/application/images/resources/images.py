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
    save_image,
    find_image_any_format, is_value_safe)
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
    def not_found(cls, view_id: str = '', image_id: str = '') -> Dict:
        """
        The method inform user requred image does not
        exist.
        """
        return {
            'message': str(_(
                "A picture for page '%(view_id)s' with identity '%(image_id)s' "
                "have not been found.",
                view_id=view_id,
                image_id=image_id)),
        }, 404

    @classmethod
    def already_exists(cls, _view_id: str = '', _image_id: str = '') -> Dict:
        """
        The method inform user requred image does not
        exist.
        """
        # print('already_exists, picture_id ->', picture_id)
        return {
            'message': str(_(
                "A picture for view '%(view_id)s' with identity '%(image_id)s' already "
                "exist, you should either kill it if uploading or download one.",
                view_id=_view_id,
                image_id=_image_id)),
        }, 400

    @classmethod
    def no_access(cls) -> Dict:
        """
        The method inform user on lack of previlages.
        """
        return {
            'message': str(_(
                "Sorry, images uploading is allowed to admin only."
            ))
        }, 401

    @classmethod
    def illigal_simbols(cls, value: str = '') -> Dict:
        """
        The method inform user on illigal values.
        """
        return {
            'message': str(_(
                "Sorry but '%(value)s' contains illigal simbols.",
                value=value)),
        }, 400

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

        fbp.set_lng(request.headers.get('Accept-Language'))
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return cls.no_access()  # reject not admin to upload images
        # print('image, resource, lng ->', request.headers.get('Accept-Language'))
        _requested_dict = {
            'view_id': request.args.get('view_id'),
            'image_id': request.args.get('identity')
        }
        for key in _requested_dict.keys():
            if not is_value_safe(_requested_dict.get(key)):
                # print('\nimage resource, params ->', _requested_dict.get(key))
                return cls.illigal_simbols(_requested_dict.get(key))
        # Testing whether file has been exists
        _image_id = _requested_dict.get('image_id')
        _view_id = _requested_dict.get('view_id')
        if find_image_any_format(_image_id, f'for_{_requested_dict.get("view_id")}'):
            return cls.already_exists(_image_id, _view_id)
        data = image_schema.load(request.files)
        _file_storage = data.get('image')
        _file_name = (f"{_image_id}{get_extention(_file_storage)}")
        _file_storage.filename = _file_name
        try:
            save_image(_file_storage, folder=f'for_{_requested_dict.get("view_id")}')
            # image_path = save_image(data.get('image'), folder=_folder)
            # basename = get_basename(image_path)
            return {
                'message': str(_("Image for view '%(view_id)s' with identity "
                                 "'%(image_id)s' uploaded.",
                                 view_id=_view_id,
                                 image_id=_image_id
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
        Recieve file name (structure table identity) and view_id.
        Look respective and return it if exists.
        """
        fbp.set_lng(request.headers.get('Accept-Language'))
        '''check tech_token'''
        if not sessions.is_valid(get_jwt_identity()):
            return {
                'message': str(_(
                    "Something went wrong. Sorry we'll reverting."))
            }, 500
        _requested_dict = {
            'view_id': request.args.get('view_id'),
            'image_id': request.args.get('identity')
        }
        for key in _requested_dict.keys():
            if not is_value_safe(_requested_dict.get(key)):
                # print('\nimage resource, params ->', _requested_dict.get(key))
                return cls.illigal_simbols(_requested_dict.get(key))

        _image_id = _requested_dict.get('image_id')
        _view_id = _requested_dict.get('view_id')
        '''Testing whether file has been exists'''
        try:
            _found_image = find_image_any_format(
                _image_id, f'for_{_requested_dict.get("view_id")}')
            if not _found_image:
                return cls.not_found(_view_id, _image_id)
            # print('images, resource, _found_image ->', _found_image)
            return send_file(_found_image)
        except FileNotFoundError:
            return cls.not_found(_image_id)

    @classmethod
    @jwt_required()
    def put(cls) -> Dict:
        """
        The method used for checking whether picure for specific view element is
        available. The method should be called before POST in order to get confirmation
        to replace image.
        """
        fbp.set_lng(request.headers.get('Accept-Language'))
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return cls.no_access()  # reject not admin to upload images
        _view_id = request.get_json().get('view_id')
        _image_id = request.get_json().get('identity')
        # print('images resources, _image_id ->', _view_id)
        # print('images resources, _image_id ->', _image_id)
        if find_image_any_format(_image_id, f'for_{request.get_json().get("view_id")}'):
            return cls.already_exists(_view_id, _image_id)
        return cls.not_found(_view_id, _image_id)

    @classmethod
    @jwt_required()
    def delete(cls) -> Dict:
        fbp.set_lng(request.headers.get('Accept-Language'))
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return cls.no_access()  # reject not admin to upload images
        _requested_dict = {
            'view_id': request.args.get('view_id'),
            'image_id': request.args.get('identity')
        }
        # print('\n_requested_dict ->', _requested_dict)
        for key in _requested_dict.keys():
            if not is_value_safe(_requested_dict.get(key)):
                return cls.illigal_simbols(_requested_dict.get(key))
        _view_id = _requested_dict.get('view_id')
        _image_id = _requested_dict.get('image_id')
        try:
            _found_image = find_image_any_format(
                _image_id, f'for_{_requested_dict.get("view_id")}')
            if not _found_image:
                return cls.not_found(view_id=_view_id, image_id=_image_id)
            os.remove(_found_image)
            return {
                'message': str(_(
                    "An image for view '%(view_id)s' with identity "
                    "'%(image_id)s' successfully deleted.",
                    view_id=_view_id,
                    image_id=_image_id)),
            }, 200

        except FileNotFoundError:
            return cls.not_found(view_id=_view_id, image_id=_image_id)
