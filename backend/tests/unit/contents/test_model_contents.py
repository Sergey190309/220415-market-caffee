from typing import Dict
import pytest

from application.modules.dbs_global import dbs_global

# from application.contents.schemas.contents import content_get_schema
from application.contents.models import ContentModel
from application.contents.local_init_data_contents import contents_constants
from application.global_init_data import global_constants


@pytest.fixture(scope='module', autouse=True)
def content_json(content_instance, content_get_schema):
    '''
    Just json to create instance without nested elements.
    '''
    def _method(**content_ids):
        return content_get_schema.dump(content_instance(**content_ids))
    return _method


def pytest_generate_tests(metafunc):
    '''
    Paramentrization.
    '''
    if 'lang' in metafunc.fixturenames:
        metafunc.parametrize(
            'lang', [item['id'] for item in global_constants.get_LOCALES])
        # metafunc.parametrize('lang', ['en'])
    if 'view' in metafunc.fixturenames:
        metafunc.parametrize(
            'view', [item['id_view'] for item in contents_constants.get_VIEWS])
        # metafunc.parametrize('view', ['main'])


@pytest.fixture
def content_ids_json(
        lang, view,
        random_words):
    '''
    Identities - primary keys.
    '''
    _content_ids = {}
    _content_ids['identity'] = random_words(lang) + '_' + random_words(lang)
    _content_ids['view_id'] = view
    _content_ids['locale_id'] = lang
    # print(_content_ids)
    return _content_ids


@pytest.fixture
def saved_instance(content_schema, content_ids_json, content_json):
    '''
    Creation and saving instance.
    '''
    # Create class instance:
    _content_instance = content_schema.load(
        content_json(**content_ids_json), session=dbs_global.session)
    # Save instance to db:
    _content_instance.save_to_db()
    return _content_instance


@pytest.fixture
def testing_instance_json(saved_instance, content_get_schema):
    '''
    Getting saved instance json for testing persoses.
    '''
    return content_get_schema.dump(saved_instance)


# @pytest.mark.active
def test_content_find_delete_good(
        test_client, content_schema, content_json,
        content_ids_json, testing_instance_json):
    '''
    Find and delete successfull.
    '''

    # Find appropriate instance from db and insure they are identical:
    _content_instance_fm_db = ContentModel.find_by_identity_view_locale(
        **content_ids_json)

    for key in testing_instance_json.keys():
        assert testing_instance_json[key] == getattr(_content_instance_fm_db, key)

    # Delete instance from db:
    _content_instance_fm_db.delete_fm_db()
    # Try to find it by id:
    _content_instance_fm_db = ContentModel.find_by_identity_view_locale(
        **content_ids_json)
    assert _content_instance_fm_db is None


# @pytest.mark.active
def test_content_typing(content_schema, saved_instance):
    _full_instance_json = content_schema.dump(saved_instance)
    assert isinstance(_full_instance_json['user_id'], int)
    assert isinstance(_full_instance_json['identity'], str)
    assert isinstance(_full_instance_json['updated'], str)
    assert isinstance(_full_instance_json['created'], str)
    assert isinstance(_full_instance_json['content'], str)
    assert isinstance(_full_instance_json['view_id'], str)
    assert isinstance(_full_instance_json['locale_id'], str)
    assert isinstance(_full_instance_json['title'], str)
    assert isinstance(_full_instance_json['locale'], Dict)
    assert isinstance(_full_instance_json['view'], Dict)


# @pytest.mark.active
def test_content_finds_wrong_values(
        saved_instance, content_ids_json, content_get_schema):
    '''
    That's impossible for find model with at wrong primary key values (error 404)
    '''
    _found_instance = ContentModel.find_by_identity_view_locale(**content_ids_json)
    assert _found_instance is not None
    # print(content_get_schema.dump(_found_instance))
    for key in content_ids_json.keys():
        _searching_key_wrong = content_ids_json.copy()
        _searching_key_wrong[key] += '_wrong'
        _found_instance = ContentModel.find_by_identity_view_locale(
            **_searching_key_wrong)
        assert _found_instance is None
        # print(_found_instance)


# @pytest.mark.active
def test_content_update(
        saved_instance, content_ids_json, content_get_schema, testing_instance_json):
    '''
    Update.
    '''
    # print(content_get_schema.dump(saved_instance))
    # print(testing_instance_json)
    content_values_json = {
        key: value for key,
        value in testing_instance_json.items() if key not in content_ids_json.keys()}
    # print(content_values_json)
    content_values_json['user_id'] = 5
    saved_instance.update(content_values_json)
    _found_instance = ContentModel.find_by_identity_view_locale(**content_ids_json)
    assert _found_instance.user_id == 5
    content_values_json.pop('user_id')
    for key in content_values_json.keys():
        _update_values_json = content_values_json.copy()
        _update_values_json[key] += ' !corrected!'
        saved_instance.update(_update_values_json)
        _found_instance = ContentModel.find_by_identity_view_locale(
            **content_ids_json)
        assert getattr(_found_instance, key) == _update_values_json[key]
        # print(getattr(_found_instance, key))
