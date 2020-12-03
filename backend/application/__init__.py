# Flask extentions
from dotenv import load_dotenv
from flask import Flask
# from flask.cli import load_dotenv

from application.modules.fbp import fbp


from application import home

from application.default_config import LOCALE


def create_app(config='default_config.py'):

    app = Flask(__name__)

    load_dotenv('.env')
    app.config.from_pyfile(config)
    # .from_object(default_config)
    # app.config.from_envvar('APPLICATION_SETTINGS')

    # api.create_app(app)
    fbp.init_app(app, LOCALE)

    with app.app_context():
        # from . import home

        app.register_blueprint(home.create_home(), url_prefix='/home')

        return app
