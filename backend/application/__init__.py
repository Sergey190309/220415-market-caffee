from flask import Flask
from flask.cli import load_dotenv

from application import home

from application import default_config


def create_app():
    app = Flask(__name__)

    load_dotenv('.env')
    app.config.from_object(default_config)
    app.config.from_envvar('APPLICATION_SETTINGS')

    # api.create_app(app)

    with app.app_context():
        # from . import home

        app.register_blueprint(home.create_home(), url_prefix='/home')

        return app
