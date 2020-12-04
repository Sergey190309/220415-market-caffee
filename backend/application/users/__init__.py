from flask import Blueprint
# from flask_restful import Api
from .modules.api import api


def cleate_users():
    users_bp = Blueprint(
        'users_bp', __name__
    )
    api.init_app(users_bp)

    return users_bp
