# Flask extentions
from dotenv import load_dotenv
from flask import Flask

from application.modules.fbp import fbp

# from application.default_config import LOCALE


def create_app(config='default_config.py'):

    app = Flask(__name__)

    load_dotenv('.env')
    app.config.from_pyfile(config)
    # .from_object(default_config)
    # app.config.from_envvar('APPLICATION_SETTINGS')

    fbp.init_app(app)  # Flask_BabelPlus

    with app.app_context():
        from .home import create_home
        from .users import cleate_users
        app.register_blueprint(create_home(), url_prefix='/home')
        app.register_blueprint(cleate_users(), url_prefix='/users')
    return app
