from flask import Blueprint, current_app, url_for
from flask_uploads import configure_uploads
# from flask_uploads import configure_uploads
from .utils.image_helper import IMAGE_SET


def create_images():
    images_bp = Blueprint(
        'images_bp', __name__,
        static_folder='static')

    with current_app.app_context():
        # Custom error handler for application
        # from ..errors.register import register_error_handler
        # register_error_handler(images_bp)

        # flask_restful and routining
        from .modules.api_images import api_images
        # print('images, __init__.py url ->', images_bp.static_folder)
        # current_app.config['UPLOADED_IMAGES_DEST'] =
        # 'application/images/static/images'
        current_app.config['UPLOADED_IMAGES_DEST'] = images_bp.static_folder
        configure_uploads(current_app, IMAGE_SET)
        api_images.init_app(images_bp)

        # flask_cors. Keep it in modules to have independed
        # Cross Origin Resource Sharing (CORS) handling
        from .modules.crs_images import crs_images
        crs_images.init_app(images_bp)

    return images_bp
