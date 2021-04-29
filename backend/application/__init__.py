# Flask extentions
from dotenv import load_dotenv
from flask import Flask, current_app, url_for

from application.modules.dbs_global import dbs_global
from application.modules.flm_global import flm_global
from application.modules.fbp import fbp
from application.modules.api_global import api_global
# Below models exported for flask app initialisation to get all tables in
# place on that time.
import application.models  # Don't remove untill you know what are you doing.
import application.users.models  # Don't remove see above.
import application.contents.models  # Don't remove see above.
# import application.components.models  # Don't remove see above.
# import application.structure.models  # Don't remove see above.


# from application.default_config import LOCALE


def create_app(config='default_config.py'):

    app = Flask(__name__)
    load_dotenv('.env', verbose=True)
    app.config.from_pyfile(config)
    # app.config.from_envvar('APPLICATION_SETTINGS')

    dbs_global.init_app(app)  # Flask_SQLAlchemy init.
    flm_global.init_app(app, dbs_global)  # Flask_migrate init.
    api_global.init_app(app)
    fbp.init_app(app)  # Flask_BabelPlus

    with app.app_context(), app.test_request_context():
        # print('\napplication.__init__.py within with config -', config)
        # Error handler.
        from .errors import create_errors
        app.register_blueprint(create_errors())

        # Auxiliary module for training and testing.
        from .home import create_home
        app.register_blueprint(create_home(), url_prefix='/home')

        # Users' handling.
        from .users import create_users
        app.register_blueprint(create_users(), url_prefix='/users')

        # Module for site contents that can be used by front end with possibility to
        # correct it from site.
        from .contents import create_contents
        app.register_blueprint(create_contents(), url_prefix='/content')

        # Module for image handling
        from .images import create_images
        app.register_blueprint(create_images(), url_prefix='/images')
        # I've translated those comonents on front end
        # Module with back-end part for front-end reusable components.
        # Navigation bars, buttons, etc.
        # from .components import create_components
        # app.register_blueprint(create_components(), url_prefix='/components')

        # Mailing
        from .mailing import create_mailing
        app.register_blueprint(create_mailing())

        # DB inisiation
        # print('\napplication.__init__.py url\n', url_for('images_bp.imageupload'))

        @current_app.before_first_request
        def init_dbs():
            # print('\nbefore first request')
            from .modules.dbs_init_global import dbs_init_global
            dbs_init_global()

    return app
