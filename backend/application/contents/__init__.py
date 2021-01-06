from flask import Blueprint, current_app


def create_contents():
    contents_bp = Blueprint(
        'contents_bp', __name__)
    with current_app.app_context():
        # Custom error handler
        from ..errors.register import register_error_handler
        register_error_handler(contents_bp)
        # flask_restful and routining
        from .modules.api_contents import api_contents
        api_contents.init_app(contents_bp)
        # flask_sqlalchemy
        from application.modules.dbs_global import dbs_global
        dbs_global.init_app(current_app)

    return contents_bp
