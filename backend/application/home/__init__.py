from flask import Blueprint
from flask_restful import Api

from application.home.resources.index import Index


def create_home():

    home_bp = Blueprint(
        'home_bp', __name__,
        template_folder='templates')

    api_home_bp = Api(home_bp)

    api_home_bp.add_resource(Index, '')

    return home_bp
