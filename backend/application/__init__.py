# Flask extentions
from dotenv import load_dotenv
from flask import Flask

from application.modules.fbp import fbp

# from application.default_config import LOCALE


def create_app(config='default_config.py'):
    # print('\napplication.__init__.py config\n', config)

    app = Flask(__name__)
    load_dotenv('.env')
    app.config.from_pyfile(config)
    # .from_object(default_config)
    # app.config.from_envvar('APPLICATION_SETTINGS')

    # print('application app.config[] -', app.config['SQLALCHEMY_DATABASE_URI'])

    fbp.init_app(app)  # Flask_BabelPlus
    with app.app_context():
        # print('\napplication.__init__.py within with config -', config)
        # Error handler.
        from .errors import create_errors
        app.register_blueprint(create_errors())
        # Auxiliary module for training and testing.
        from .home import create_home
        app.register_blueprint(create_home(), url_prefix='/home')
        # Users' handling.
        from .users import cleate_users
        app.register_blueprint(cleate_users(), url_prefix='/users')
    return app
