from flask import Blueprint, current_app


def cleate_users():
    users_bp = Blueprint(
        'users_bp', __name__
    )

    # print(
    #     'users.create_user current_app.config -',
    #     current_app.config['SQLALCHEMY_DATABASE_URI']
    # )
    # print('\nusers.create_users\n')

    with current_app.app_context():
        # print(
        #     'users.create_user current_app.config within app_context'
        # )

        from .modules.api import api
        from .modules.dbs import dbs

        api.init_app(users_bp)

        dbs.init_app(current_app)
        dbs.init_dbs()  # initialsation
    # dbs = SQLAlchemyBackend(users_bp)
    # dbs.init_dbs()

    return users_bp
