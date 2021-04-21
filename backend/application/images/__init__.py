from flask import Blueprint, current_app
from flask_uploads import configure_uploads
from .utils.image_helper import IMAGE_SET


def create_images():
    images_bp = Blueprint(
        'images_bp', __name__)

    with current_app.app_context():
        # Custom error handler for application
        from ..errors.register import register_error_handler
        register_error_handler(images_bp)

        # flask_restful and routining
        from .modules.api_images import api_images
        configure_uploads(current_app, IMAGE_SET)
        api_images.init_app(images_bp)

        # flask_cors
        from .modules.crs_images import crs_images
        crs_images.init_app(images_bp)

    return images_bp
