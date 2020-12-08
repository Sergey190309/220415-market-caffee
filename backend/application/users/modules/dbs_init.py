# from flask import current_app
# from sqlalchemy import create_engine, select

from .dbs import dbs
# from ..models.roles import RoleModel
# from ..schemas.roles import RoleSchema
'''
User to allow create_all create those tables.
Error is normal.
'''
#   from ..models.confirmations import ConfirmationModel
# from ..models.users import UserModel
from ..models.roles import RoleModel
# from ..models.locales import LocaleModel

from ..schemas.roles import RoleSchema
# print('users.modules')


def dbs_init():
    print('users.modules.dbs_init')

    create_dbs()  # Create tables and other stuff
    # fill_roles()  # Fill table roles with default stuff
    # fill_locales()   # Fill table locales with default stuff


def fill_roles():
    print('users.modules.fill_reles')
    # _engine = create_engine(current_app.config['SQLALCHEMY_DATABASE_URI'])
    # # with _engine.connect() as conn:
    # RoleModel


def fill_locales():
    pass


def create_dbs():
    try:
        dbs.create_all()
    except Exception as err:
        print(
            'modules.dbs.SQLAlchemyBackend.init_app on '
            'self.create all.\nSome error:\n', err)
