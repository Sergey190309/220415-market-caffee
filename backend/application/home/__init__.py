from flask import Blueprint, current_app


def create_home():

    home_bp = Blueprint(
        'home_bp', __name__,
        template_folder='templates')

    with current_app.app_context():

        from ..errors.register import register_error_handler
        register_error_handler(home_bp)

        from .modules.api import api
        api.init_app(home_bp)

    return home_bp
