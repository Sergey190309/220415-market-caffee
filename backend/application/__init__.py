# Flask extentions
from dotenv import load_dotenv
from flask import Flask, current_app

from application.modules.dbs_global import dbs_global
# Below models exported for flask app initialisation to get all tables in
# place on that time.
import application.models  # Don't remove untill you know what are you doing.
import application.users.models  # Don't remove untill you know what are you doing.
import application.components.models  # Don't remove untill.

from application.modules.fbp import fbp

# from application.default_config import LOCALE


def create_app(config='default_config.py'):
    # print('\napplication.__init__.py config\n', config)

    app = Flask(__name__)
    load_dotenv('.env')
    app.config.from_pyfile(config)
    # app.config.from_envvar('APPLICATION_SETTINGS')

    dbs_global.init_app(app)  # Flask_SQLAlchemy init.
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

        # Module with back-end part for front-end reusable components.
        # Navigation bars, buttons, etc.
        from .components import create_components
        app.register_blueprint(create_components(), url_prefix='/components')

        # Mailing
        from .mailing import create_mailing
        app.register_blueprint(create_mailing())

        @current_app.before_first_request
        def init_dbs():
            from .modules.dbs_init_global import dbs_init_global
            dbs_init_global()

    return app
