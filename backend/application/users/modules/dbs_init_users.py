# from flask import current_app
# from sqlalchemy import create_engine, select

from application.globals import global_constants, default_admin

from application.modules.dbs_global import dbs_global
# from .dbs_users import dbs_users
# from ..models.roles import RoleModel
# from ..schemas.roles import RoleSchema
'''
User to allow create_all create those tables.
Error is normal if module is not user explicitly in this file.
'''
# from ..models.confirmations import ConfirmationModel
from ..models.users import UserModel
from ..models.roles import RoleModel
# from application.models.locales_global import LocaleGlobalModel
# from ..models.locales import LocaleModel

from ..schemas.users import AdminCreateSchema


# global_constants = GlobalConstants()
# default_admin = DefaultAdmin()

user_create_schema = AdminCreateSchema()


def dbs_init_users():
    fill_roles()  # Fill table roles with default stuff
    create_default_admin()  # Hope it's selfexplain.


def fill_roles():
    for _role in global_constants.get_ROLES:
        # print('users.modules.fill_reles role -', _role['id'])
        _existing_role = RoleModel.find_by_id(_role['id'])
        if not _existing_role:
            # print('does not exit')
            try:
                _role = RoleModel(id=_role['id'], remarks=_role['remarks'])
                _role.save_to_db()
            except Exception as err:
                print(
                    'modules.dbs.SQLAlchemyBackend.init_app on '
                    'fill_roles.\nSome error:\n', err)


def create_dbs():
    try:
        dbs_global.create_all()
    except Exception as err:
        print(
            'modules.dbs.SQLAlchemyBackend.init_app on '
            'self.create all.\nSome error:\n', err)


def create_default_admin():
    # print('dbs_init.create_default_admin admin', default_admin.get_default_admin)
    _user = UserModel.find_by_id(1)
    if _user:  # check whether user with id == 1 exists
        if _user.is_admin:
            # If he's admin it's nothing to do!
            # print('He is an admin')
            return
        else:
            # if he is not an admin shoot him and create new admin one.
            print(
                'dbs_init.create_default_admin _user with id - 1\n',
                _user.is_admin, '\n',
                user_create_schema.dump(_user))
            _user.delete_fm_db(kill_first=True)
    # else:
    # User No 1 does not exists, so create him
    _admin = user_create_schema.load(
        default_admin.get_default_admin, session=dbs_global.session)
    _admin.save_to_db()
