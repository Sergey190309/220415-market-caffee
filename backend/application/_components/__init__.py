from flask import Blueprint, current_app


def create_components():
    components_bp = Blueprint(
        'components_bp', __name__)
    with current_app.app_context():
        # Custom error handler
        from ..errors.register import register_error_handler
        register_error_handler(components_bp)
        # flask_restful and routining
        from .modules.api_components import api_components
        api_components.init_app(components_bp)
        # flask_sqlalchemy
        from application.modules.dbs_global import dbs_global
        dbs_global.init_app(current_app)

    return components_bp
