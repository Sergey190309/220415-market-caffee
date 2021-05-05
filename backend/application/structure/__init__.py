from flask import Blueprint, current_app


def create_structure():
    structure_bp = Blueprint(
        'structure_bp', __name__
    )

    with current_app.app_context():
        from .modules.api_structure import api_structure
        api_structure.init_app(structure_bp)

    return structure_bp
