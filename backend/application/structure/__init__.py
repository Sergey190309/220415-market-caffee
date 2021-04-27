from flask import Blueprint, current_app


def create_structure():
    structure_bp = Blueprint(
        'structure_bp', __name__)

    with current_app.app_context():
        # Custom error handler Custom error handler for whole application
        from ..errors.register import register_error_handler
        register_error_handler(structure_bp)

        # flask_restful and routining
        from .modules.api_structure import api_structure
        api_structure.init_app(structure_bp)

        # flask_cors
        from .modules.crs_structure import crs_structure
        crs_structure.init_app(structure_bp)

        # flask_sqlalchemy
        # not sure it's necessary cource it's global module
        from application.modules.dbs_global import dbs_global
        dbs_global.init_app(current_app)
