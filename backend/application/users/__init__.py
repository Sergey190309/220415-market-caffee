from flask import Blueprint, current_app

from .modules.dbs_init import dbs_init


def cleate_users():
    # print('users.__init__.create_users')
    users_bp = Blueprint(
        'users_bp', __name__,
        static_folder='static',
        # static_url_path='/users',
        template_folder='templates'
    )

    with current_app.app_context():

        # Custom error handler
        from ..errors.register import register_error_handler
        register_error_handler(users_bp)

        # flask_restful and routining
        from .modules.api import api
        api.init_app(users_bp)

        # flask_sqlalchemy
        from .modules.dbs import dbs
        dbs.init_app(current_app)

        # flask_marshmallow
        from .modules.fma import fma
        fma.init_app(current_app)

        # flask_bcrypt
        from .modules.fbc import fbc
        fbc.init_app(current_app)

        # Flask-JWT-Extended
        from .modules.jwt import jwt
        jwt.init_app(current_app)

        # Data bases initiation (creation reference table values and
        # admin user if not created).
        # dbs_init()
        @current_app.before_first_request
        def init_dbs():
            dbs_init()

    return users_bp
