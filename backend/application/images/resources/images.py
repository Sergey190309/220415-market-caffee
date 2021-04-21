from flask_restful import Resource
from flask_uploads import UploadNotAllowed
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..utils import image_helper
from flask_babelplus import lazy_gettext as _
from ..schemas.image import ImageSchema

image_schema = ImageSchema()


class ImageUpload(Resource):
    @jwt_required
    def post(self):
        """
        Used to upload an image file.
        It's use JWT to retrieve user information then saves the files to appropriate
        folder.
        Only admins are allowed to upload files.
        If there is a filename conflict, it appends number at the end.
        """
        data = image_schema.load(request.files)
        # it became by wergzeug {'image': FileStorage}, where 'image' is field in our
        # ImageSchema. If everythin ok we will have data['image'] that is FileStorage object
        user_id = get_jwt_identity()
        folder = f'user_{user_id}'  # it's gonna to be static/images/user_###
        try:
            image_path = image_helper.save_image(data['image'], folder=folder)
            basename = image_helper.get_basename(image_path)
            return {
                'message': str(_("Image '%(basename)s' uploaded", basename=basename))}, 201
        except UploadNotAllowed:
            extention = image_helper.get_extention(data['image'])
            return {
                'message': str(_("Extentions '%(extention)s' are not allowed",
                                 extention=extention))}, 400
