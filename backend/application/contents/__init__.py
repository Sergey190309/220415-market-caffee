from flask import Blueprint, current_app
# from flask_cors import CORS


def create_contents():
    contents_bp = Blueprint(
        'contents_bp', __name__)

    # CORS(contents_bp)

    with current_app.app_context():

        # Custom error handler Custom error handler for application
        from ..errors.register import register_error_handler
        register_error_handler(contents_bp)

        # flask_restful and routining
        from .modules.api_contents import api_contents
        api_contents.init_app(contents_bp)

        # flask_cors
        from .modules.crs_contents import crs_contents
        crs_contents.init_app(contents_bp)

        # flask_sqlalchemy
        from application.modules.dbs_global import dbs_global
        dbs_global.init_app(current_app)

    return contents_bp
