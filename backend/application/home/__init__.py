from flask import Blueprint, current_app
# from flask_cors import CORS


def create_home():

    home_bp = Blueprint(
        'home_bp', __name__,
        template_folder='templates')
    # CORS(home_bp)

    with current_app.app_context():

        # from ..errors.register import register_error_handler
        # register_error_handler(home_bp)

        from .modules.api_home import api_home
        # from .modules.api_home import api_home
        api_home.init_app(home_bp)

        # flask_cors. Keep it in modules to have independed
        # Cross Origin Resource Sharing (CORS) handling
        from .modules.crs_home import crs_home
        crs_home.init_app(home_bp)

    return home_bp
