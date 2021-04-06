from flask import Blueprint, current_app
# from flask_cors import CORS


def create_users():
    # print('users.__init__.create_users')
    users_bp = Blueprint(
        'users_bp', __name__,
        static_folder='static',
        # static_url_path='/users',
        template_folder='templates')

    # CORS(users_bp)

    with current_app.app_context():

        # Custom error handler
        from ..errors.register import register_error_handler
        register_error_handler(users_bp)

        # flask_restful and routining
        from .modules.api_users import api_users
        api_users.init_app(users_bp)

        # flask_cors
        from .modules.crs_users import crs_users
        crs_users.init_app(users_bp)

        # flask_sqlalchemy
        from application.modules.dbs_global import dbs_global
        # from .modules.dbs_users import dbs_users
        dbs_global.init_app(current_app)

        @current_app.before_first_request
        def init_dbs():
            pass
        #     from .modules.dbs_init_users import dbs_init_users
        #     dbs_init_users()

        # flask_marshmallow
        from .modules.fma_users import fma_users
        fma_users.init_app(current_app)

        # flask_bcrypt
        from .modules.fbc_users import fbc_users
        fbc_users.init_app(current_app)

        # Flask-JWT-Extended
        from .modules.jwt_users import jwt_users
        jwt_users.init_app(current_app)

        # Data bases initiation (creation reference table values and
        # admin user if not created).
        # dbs_init()
        # @current_app.before_first_request
        # def init_dbs():
        #     dbs_init_users()

    return users_bp
