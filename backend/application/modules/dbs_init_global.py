from ..globals import global_constants
from ..users.modules.dbs_init_users import dbs_init_users

from .dbs_global import dbs_global
# from .dbs_users import dbs_users
'''
User to allow create_all create those tables.
Error is normal if module is not user explicitly in this file.
'''

from ..models.locales_global import LocaleGlobalModel
# from ..models.locales import LocaleModel


# user_create_schema = AdminCreateSchema()


def dbs_init_global():
    create_dbs()  # Create tables
    fill_locales()   # Fill table locales with default stuff
    dbs_init_users()  # Fill tables in users with default stuff


def fill_locales():
    for _locale in global_constants.get_LOCALES:
        # print('users.modules.fill_reles role -', _locale['id'])
        _existing_locale = LocaleGlobalModel.find_by_id(_locale['id'])
        if not _existing_locale:
            # print('does not exit')
            try:
                _locale = LocaleGlobalModel(
                    id=_locale['id'], remarks=_locale['remarks'])
                _locale.save_to_db()
            except Exception as err:
                print(
                    'modules.dbs.SQLAlchemyBackend.init_app on '
                    'fill_locale.\nSome error:\n', err)


def create_dbs():
    try:
        dbs_global.create_all()
    except Exception as err:
        print(
            'modules.dbs.SQLAlchemyBackend.init_app on '
            'self.create all.\nSome error:\n', err)
