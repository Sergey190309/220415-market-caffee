from flask import Blueprint, current_app


def create_errors():

    errors_bp = Blueprint('errors', __name__)
    with current_app.app_context():
        from ..errors.register import register_error_handler
        register_error_handler(errors_bp)
        # from app.errors import handlers

    return errors_bp
