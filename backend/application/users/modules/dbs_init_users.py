from ..local_init_data_users import users_constants, default_admin
# from application.globals import global_constants, default_admin

from application.modules.dbs_global import dbs_global
'''
Error is normal if module is not user explicitly in this file.
'''
from ..models.users import UserModel
from ..models.roles import RoleModel

from ..schemas.users import AdminCreateSchema


user_create_schema = AdminCreateSchema()


def dbs_init_users():
    fill_roles()  # Fill table roles with default stuff
    create_default_admin()  # Hope it's selfexplain.


def fill_roles():
    # some = users_constants
    for _role in users_constants.get_ROLES:
        # print('users.modules.fill_reles role -', _role['id'])
        _existing_role = RoleModel.find_by_id(_role['id'])
        if not _existing_role:
            # print('does not exit')
            try:
                _role = RoleModel(id=_role['id'], remarks=_role['remarks'])
                _role.save_to_db()
            except Exception as err:
                print(
                    'application.users.modules.dbs_init_users on '
                    'fill_roles.\nSome error:\n', err)
    # print('dbs_init_users, some -', some)


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
