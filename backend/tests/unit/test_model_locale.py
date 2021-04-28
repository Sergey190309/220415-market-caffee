# import pytest
# from typing import Dict
# from string import ascii_lowercase
# from random import choice

# from application.modules.dbs_global import dbs_global

from application.models.locales_global import LocaleGlobalModel


# @pytest.mark.active
def test_locale_find_by_id(saved_locale_instance, locale_global_get_schema):
    _locale_gen = saved_locale_instance()
    _locale = next(_locale_gen)
    _id = _locale.id
    # _locale = next(_locale_gen)
    # print('\nunit, model locale ->', _locale)
    _found_json = locale_global_get_schema.dump(LocaleGlobalModel.find_by_id(_id))
    for key in _found_json.keys():
        assert _found_json.get(key) == getattr(_locale, key)

    assert LocaleGlobalModel.find_by_id('LL') is None

    next(_locale_gen)


# @pytest.mark.active
def test_locale_delete(saved_locale_instance, locale_global_get_schema):
    _locale_gen = saved_locale_instance()
    _locale = next(_locale_gen)
    _id = _locale.id
    # _locale = next(_locale_gen)
    # print('\nunit, model locale ->', _locale)
    _found_json = locale_global_get_schema.dump(LocaleGlobalModel.find_by_id(_id))
    for key in _found_json.keys():
        assert _found_json.get(key) == getattr(_locale, key)
    _locale.delete_fm_db()
    # _after_delete = LocaleGlobalModel.find_by_id(_id)
    assert LocaleGlobalModel.find_by_id(_id) is None

    next(_locale_gen)
