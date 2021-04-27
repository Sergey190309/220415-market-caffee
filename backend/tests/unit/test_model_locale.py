import pytest
from typing import Dict
from string import ascii_lowercase
from random import choice

from application.modules.dbs_global import dbs_global

from application.models.locales_global import LocaleGlobalModel
from application.schemas.locales_global import LocaleGlobalSchema


@pytest.fixture()
def locale_schema():
    return LocaleGlobalSchema()


@pytest.fixture()
def locale_instance(random_text, locale_schema):
    def _method(values: Dict = {}) -> LocaleGlobalModel:
        _values = {
            'id': values.get('id', ''.join(choice(ascii_lowercase) for x in range(2))),
            'remarks': values.get('remarks', random_text(qnt=5))
        }
        _locale = locale_schema.load(_values, session=dbs_global.session)
        return _locale
    return _method


@pytest.fixture()
def saved_locale_instance(client, locale_instance):
    def _method(values: Dict = {}):
        _locale_instance = locale_instance(values=values)
        # print('\nsaved_locale_instance, _locale_instance ->', _locale_instance)
        _locale_instance.save_to_db()
        yield _locale_instance
        # print('second')
        if _locale_instance.is_exist:
            _locale_instance.delete_fm_db()
        yield
    return _method


# @pytest.mark.active
def test_locale_find_by_id(saved_locale_instance, locale_schema):
    _locale_gen = saved_locale_instance()
    _locale = next(_locale_gen)
    _id = _locale.id
    # _locale = next(_locale_gen)
    # print('\nunit, model locale ->', _locale)
    _found_json = locale_schema.dump(LocaleGlobalModel.find_by_id(_id))
    for key in _found_json.keys():
        assert _found_json.get(key) == getattr(_locale, key)

    assert LocaleGlobalModel.find_by_id('LL') is None

    next(_locale_gen)


# @pytest.mark.active
def test_locale_delete(saved_locale_instance, locale_schema):
    _locale_gen = saved_locale_instance()
    _locale = next(_locale_gen)
    _id = _locale.id
    # _locale = next(_locale_gen)
    # print('\nunit, model locale ->', _locale)
    _found_json = locale_schema.dump(LocaleGlobalModel.find_by_id(_id))
    for key in _found_json.keys():
        assert _found_json.get(key) == getattr(_locale, key)
    _locale.delete_fm_db()
    # _after_delete = LocaleGlobalModel.find_by_id(_id)
    assert LocaleGlobalModel.find_by_id(_id) is None

    next(_locale_gen)
