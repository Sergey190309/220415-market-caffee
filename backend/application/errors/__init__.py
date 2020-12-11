from flask import Blueprint, current_app


def create_errors():

    errors_pb = Blueprint('errors', __name__)
    with current_app.app_context():
        pass
        # from app.errors import handlers

    return errors_pb
