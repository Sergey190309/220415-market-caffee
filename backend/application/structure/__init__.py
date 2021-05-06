from flask import Blueprint, current_app


def create_structure():
    structure_bp = Blueprint(
        'structure_bp', __name__
    )

    with current_app.app_context():

        # flask_restful and routining
        from .modules.api_structure import api_structure
        api_structure.init_app(structure_bp)

        # flask_cors. Keep it in modules to have independed
        # Cross Origin Resource Sharing (CORS) handling
        from .modules.crs_structure import crs_structure
        crs_structure.init_app(structure_bp)

    return structure_bp
