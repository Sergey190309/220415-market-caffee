# from auxiliary.init_procedures.api_init import api_init
# from auxiliary.init_procedures.jwt_init import jwt_init
# from auxiliary.init_procedures.admin_init import admin_init
# from auxiliary.init_procedures.db_init import db_init
# from auxiliary.init_procedures.bb_init import bb_init

from flask_extentions.api import api
from flask_extentions.fbp import fbp


def connect_modules(app):
    '''
    Here all modules is going to connect to Flask application.
    '''
    api.init_app(app)  # RESTful
    fbp.init_app(app)  # Flask-BabelPlus
    # with app.app_context():
    # initialization()


def initialization():
    '''
    The procedure run all initialization ones.
    It started after all modules connection to flask application.
    '''

    # Create table if they do not exixt
    # db_init()

    # print("It's init")
    # admin user creation
    # admin_init()
