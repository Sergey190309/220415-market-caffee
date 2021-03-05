from typing import Dict
# from typing import Dict, NoneType
import pytest

from application.modules.dbs_global import dbs_global

# from application.contents.schemas.contents import content_get_schema
from application.contents.models import ContentModel
from application.contents.local_init_data_contents import contents_constants
from application.global_init_data import global_constants


@pytest.fixture
def saved_content(content_instance):
    def _method(values: Dict = {}) -> ContentModel:
        _saved_content = content_instance(values)
        # print(_saved_content.save_to_db())
        _saved_content.save_to_db()
        return _saved_content
    return _method


@pytest.fixture
def searching_json():
    def _method(_json: Dict = {}):
        return {
            key: value for (key, value) in _json.items()
            if key in ['identity', 'view_id', 'locale_id']}
    return _method


# @pytest.mark.active
def test_content_find(
        saved_content, random_text_underscore,
        other_valid_item, searching_json,
        content_get_schema):
    '''
    Testing find.
    Fields for searching:
    identity
    view_id
    locale_id
    user_ids
    '''
    _values = []
    _searches = []
    _saved_contents = []

    _values.append({
        'identity': 'identity01', 'view_id': 'main', 'locale_id': 'ru',
        'user_id': 2, 'title': 'title_', 'content': 'content03'})
    _values.append({
        'identity': 'identity02', 'view_id': 'main', 'locale_id': 'ru',
        'user_id': 2, 'title': 'title_', 'content': 'content03'})
    _values.append({
        'identity': 'identity03', 'view_id': 'hello', 'locale_id': 'en',
        'user_id': 5, 'title': 'title_', 'content': 'content03'})
    _values.append({
        'identity': 'identity04', 'view_id': 'hello', 'locale_id': 'en',
        'user_id': 5, 'title': 'title_', 'content': 'content04'})
    _values.append({
        'identity': 'identity05', 'view_id': 'goodbay', 'locale_id': 'en',
        'user_id': 5, 'title': 'title_', 'content': 'content04'})
    _values.append({
        'identity': 'identity06', 'view_id': 'goodbay', 'locale_id': 'en',
        'user_id': 5, 'title': 'title_', 'content': 'content04'})

    _searches.append({'title': 'title_', 'qnt': 6})
    _searches.append({'content': 'content03', 'locale_id': 'ru', 'qnt': 2})
    _searches.append({'content': 'content03', 'locale_id': 'en', 'qnt': 1})
    _searches.append({
        'user_id': 5, 'title': 'title_', 'content': 'content04', 'qnt': 3})

    for _value in _values:
        _found = ContentModel.find_by_identity_view_locale(**searching_json(_value))
        if _found is not None:
            _found.delete_fm_db()
        _saved_contents.append(saved_content(_value))
        # _saved_contents.append(saved_content(_value))

    # for _saved_content in _saved_contents:
    #     print(_saved_content)

    for _search in _searches:
        qnt = _search.pop('qnt')
        _result = ContentModel.find(_search)
        assert len(_result) == qnt

    for _saved_content in _saved_contents:
        _saved_content.delete_fm_db()


# @pytest.mark.active
def test_content_find_by_identity_view_locale_delete_good(
        content_get_schema,
        saved_content):
    '''
    Find and delete successfull.
    '''

    # Save instance and get values and primary keys for further reference:
    _saved_content_json = content_get_schema.dump(saved_content())
    _saved_content_pks = {
        key: value for (key, value) in _saved_content_json.items()
        if key in ['identity', 'view_id', 'locale_id']}

    # Find instance with stored primany keys:
    _found_content = ContentModel.find_by_identity_view_locale(**_saved_content_pks)
    _found_content_json = content_get_schema.dump(_found_content)

    # Insure found instance and saved one are identical:
    for key in _found_content_json.keys():
        assert _found_content_json[key] == _saved_content_json[key]
        # print(_found_content_json[key])

    # Delete instance from db:
    _found_content.delete_fm_db()

    # Try to find it by id:
    _found_content = ContentModel.find_by_identity_view_locale(**_saved_content_pks)

    # Insure you've found nothing:
    assert _found_content is None


# @pytest.mark.active
def test_content_typing(content_schema, saved_content):
    _instance_json = content_schema.dump(saved_content())
    # print(_instance_json)
    for key in _instance_json.keys():
        if key in ['user_id']:
            assert isinstance(_instance_json[key], int)
        if key in ['updated']:
            assert _instance_json[key] is None
        if key in [
                'identity', 'created', 'content', 'view_id', 'locale_id', 'title']:
            # print(_instance_json[key], '\t', type(_instance_json[key]))
            assert isinstance(_instance_json[key], str)
        if key in ['locale', 'view']:
            assert isinstance(_instance_json[key], Dict)


# @pytest.mark.active
def test_content_finds_wrong_values(
        saved_content,
        content_get_schema):
    '''
    That's impossible for find model with at wrong primary key values (error 404)
    '''
    # Get saved in
    _saved_content_pks = {
        key: value for (key, value)
        in content_get_schema.dump(saved_content()).items()
        if key in ['identity', 'view_id', 'locale_id']}

    # Find saved instance with pks user find and find_by_identity_view_locale:
    _found_content_by_pks = ContentModel.find_by_identity_view_locale(
        **_saved_content_pks)
    _found_content_general = ContentModel.find(_saved_content_pks)

    # Insure both finds have given results and they point to same object:
    assert _found_content_by_pks is not None
    assert _found_content_by_pks == _found_content_general[0]

    # Try to find content with wrong keys, insure it's nothing found:
    for key in _saved_content_pks.keys():
        _pks_wrong = _saved_content_pks.copy()
        _pks_wrong[key] += '_wrong'
        _found_instance_by_pks = ContentModel.find_by_identity_view_locale(
            **_pks_wrong)
        assert _found_instance_by_pks is None

    # Delete test instance from db to keep it creaner:
    _found_content_general[0].delete_fm_db()


# @pytest.mark.active
def test_content_update(
        saved_content,
        content_get_schema):
    '''
    Update.
    '''
    # Get pks and values for saved content instance, keep instance to clean up db:
    _saved_content = saved_content()
    _saved_content_json = content_get_schema.dump(_saved_content)
    _saved_values_json = {
        key: value for (key, value) in _saved_content_json.items()
        if key not in ['identity', 'view_id', 'locale_id']}

    # Correct values and check they are identical:
    for key in _saved_values_json.keys():
        _update_values_json = _saved_values_json.copy()
        if isinstance(_update_values_json[key], int):
            _update_values_json[key] = 0
        else:
            _update_values_json[key] += ' corrected'
        _saved_content.update(_update_values_json)
        assert content_get_schema.dump(_saved_content)[key] ==\
            _update_values_json[key]

    # Clean up db:
    _saved_content.delete_fm_db()


@pytest.mark.parametrize(
    'language, lang_testing_result', [
        (global_constants.get_LOCALES[0]['id'], 'None'),
        ('not', 'message'),
        ('', 'message')
    ])
@pytest.mark.parametrize(
    'views, view_testing_result', [
        (contents_constants.get_VIEWS[0]['id_view'], 'None'),
        ('not', 'message'),
        ('', 'message')
    ])
def test_content_save_wrong_fk(
        language, lang_testing_result,
        views, view_testing_result,
        content_schema, content_get_schema,
        saved_content):
    '''
    Saving instance with foreign keys not in respective tables or without foreign key.
    '''
    # Get content instance for cleaning up and pks:
    _saved_content = saved_content()
    _saved_content_json = content_get_schema.dump(_saved_content)
    _content_json = {'view_id': views, 'locale_id': language}
    _new_content_json = _saved_content_json.copy()
    for key in _content_json.keys():
        _new_content_json[key] = _content_json[key]
    _new_content = content_schema.load(_new_content_json, session=dbs_global.session)
    result = _new_content.save_to_db()
    # print(result)
    if (lang_testing_result == 'None') and (view_testing_result == 'None'):
        assert result is None
        _new_content.delete_fm_db()
    else:
        result.find('foreign key constraint fails') != -1

    # _saved_content.delete_fm_db()


@pytest.mark.parametrize(
    'language, lang_testing_result', [
        (global_constants.get_LOCALES[0]['id'], 'None'),
        ('not', 'message'),
        ('', 'message')
    ])
@pytest.mark.parametrize(
    'views, view_testing_result', [
        (contents_constants.get_VIEWS[0]['id_view'], 'None'),
        ('not', 'message'),
        ('', 'message')
    ])
def test_content_update_wrong_fk(
        language, lang_testing_result,
        views, view_testing_result,
        content_schema, content_get_schema,
        saved_content):
    '''
    Updating instance with foreign keys not in respective tables or
    without foreign key.
    '''
    _saved_content = saved_content()
    _saved_content_json = content_get_schema.dump(_saved_content)
    _update_content_json = {'view_id': views, 'locale_id': language}
    _new_content_json = _saved_content_json.copy()
    for key in _update_content_json.keys():
        _new_content_json[key] = _update_content_json[key]
    _new_content = content_schema.load(_new_content_json, session=dbs_global.session)
    result = _new_content.update(_update_content_json)
    # print(result)
    if (lang_testing_result == 'None') and (view_testing_result == 'None'):
        assert result is None
        _new_content.delete_fm_db()
    else:
        result.find('foreign key constraint fails') != -1

    # _saved_content.delete_fm_db()
