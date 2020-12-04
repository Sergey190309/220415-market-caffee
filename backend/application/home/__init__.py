from flask import Blueprint
# from flask_restful import Api
# from .modules.api import api
# from application.modules.api import api
from .modules.api import api
from .errors.register import register_error_handler

# from application.home.resources.index import Index, Localization


def create_home():

    home_bp = Blueprint(
        'home_bp', __name__,
        template_folder='templates')

    register_error_handler(home_bp)
    api.init_app(home_bp)

    return home_bp
