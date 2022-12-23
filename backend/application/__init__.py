# Flask extentions
from dotenv import load_dotenv
from flask import Flask, current_app, url_for

from application.modules.dbs_global import dbs_global
from application.modules.flm_global import flm_global
from application.modules.fbp import fbp
# print('\napplication __init__\n')
from application.modules.api_global import api_global
from application.modules.crs_global import crs_global
from application.errors.register import register_error_handler
# Below models exported for flask app initialisation to get all tables in
# place on that time.
import application.models  # Don't remove untill you sure.
import application.users.models  # Don't remove see above.
import application.contents.models  # Don't remove see above.
import application.structure.models  # Don't remove see above.


# from application.default_config import LOCALE


def create_app(config='default_config.py'):

    app = Flask(__name__)
    load_dotenv('.env.dev', verbose=True)
    # load_dotenv('.env', verbose=True)
    app.config.from_pyfile(config)
    # app.config.from_envvar('APPLICATION_SETTINGS')

    # Flask_SQLAlchemy init
    dbs_global.init_app(app)
    # Flask_migrate init
    flm_global.init_app(app, dbs_global)
    # Global api endpoint
    api_global.init_app(app)
    # flask_cors
    crs_global.init_app(app)
    # Flask_BabelPlus
    fbp.init_app(app)
    # Global error handling
    register_error_handler(app)

    with app.app_context(), app.test_request_context():
        # print('\napplication.__init__.py within with config -', config)

        # Auxiliary module for training and testing.
        from .home import create_home
        app.register_blueprint(create_home(), url_prefix='/home')

        # Users' handling.
        from .users import create_users
        app.register_blueprint(create_users(), url_prefix='/users')

        # Module for site contents that can be used by front end with
        # possibility to correct it from site.
        from .contents import create_contents
        app.register_blueprint(create_contents(), url_prefix='/content')

        # Module for image handling
        # print('\napplication, init\n')
        from .images import create_images
        app.register_blueprint(create_images(), url_prefix='/images')

        # Application structure - element used to store views's contents,
        # pictures, etc
        from .structure import create_structure
        app.register_blueprint(
            create_structure(), url_prefix='/structure')

        # Mailing
        from .mailing import create_mailing
        app.register_blueprint(create_mailing())

        @current_app.before_first_request
        def init_dbs():
            # print('\napplication, __init__.py, before first request')
            from .modules.dbs_init_global import dbs_init_global
            dbs_init_global()

    return app
