from flask import current_app

from ..global_init_data import global_constants
# from ..globals import global_constants
from .dbs_global import dbs_global

'''
User to allow create_all create those tables.
Error is normal if module is not user explicitly in this file.
'''

from ..models.locales_global import LocaleGlobalModel


def dbs_init_global():
    # print('\ndbs_init_global, SQLALCHEMY_DATABASE_URI ->', current_app.config['SQLALCHEMY_DATABASE_URI'])
    create_dbs()  # Create tables
    fill_locales()   # Fill table locales with default stuff
    # Blueprint tables' initiation:
    from ..users.modules.dbs_init_users import dbs_init_users
    dbs_init_users()
    from ..components.modules.dbs_init_component import dbs_init_component
    dbs_init_component()
    from ..contents.modules.dbs_init_contents import dbs_init_contents
    dbs_init_contents()


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
        # print('\ncreate_dbs, SQLALCHEMY_DATABASE_URI ->', current_app.config['SQLALCHEMY_DATABASE_URI'])
    except Exception as err:
        print(
            'modules.dbs.SQLAlchemyBackend.init_app on '
            'self.create all.\nSome error:\n', err)
