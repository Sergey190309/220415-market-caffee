from flask import Blueprint, current_app
from .modules.dbs_init import dbs_init


def cleate_users():
    # print('users.__init__.create_users')
    users_bp = Blueprint(
        'users_bp', __name__
    )

    with current_app.app_context():

        from .modules.api import api
        api.init_app(users_bp)
        from .modules.dbs import dbs
        dbs.init_app(current_app)
        from .modules.fma import fma
        fma.init_app(current_app)

        # dbs_init()

        @current_app.before_first_request
        def init_dbs():
            dbs_init()

        # dbs.init_dbs()  # initialsation
    # dbs = SQLAlchemyBackend(users_bp)
    # dbs.init_dbs()

    return users_bp
