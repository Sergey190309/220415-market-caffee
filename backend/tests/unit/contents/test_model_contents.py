import pytest
from typing import Dict, List
# from typing import Dict, NoneType

from application.modules.dbs_global import dbs_global

# from application.contents.schemas.contents import content_get_schema
# from application.contents
from application.contents.models import ContentModel
from application.models.views_global import ViewGlobalModel
from application.contents.local_init_data_contents import contents_constants
from application.global_init_data import global_constants
from application.contents.modules.dbs_init_contents import fill_views


@pytest.fixture
def saved_content_instance(client, content_instance) -> ContentModel:
    def _method(values: Dict = {}) -> ContentModel:
        # print('\nsaved_content_instance, values ->', values)
        _saved_content = content_instance(values)
        _saved_content.save_to_db()
        yield _saved_content
        if _saved_content.is_exist():
            _saved_content.delete_fm_db()
        yield
    return _method


# @pytest.mark.active
def test_content_find_all(
        saved_content_instance,
        # random_text_underscore,
        # other_valid_item,
        # searching_json,
        # content_get_schema
):
    '''
    Testing find.
    Fields for searching:
    identity
    view_id
    locale_id
    '''
    # Clean up approapriate tables
    ContentModel.query.delete()
    ViewGlobalModel.query.delete()
    fill_views()

    _content_ids = []
    _content_gens = []
    _contents = []
    _content_ids.append(
        {'identity': 'identity00', 'view_id': 'test_one', 'locale_id': 'en'})
    _content_ids.append(
        {'identity': 'identity00', 'view_id': 'test_one', 'locale_id': 'ru'})
    _content_ids.append(
        {'identity': 'identity00', 'view_id': 'test_two', 'locale_id': 'en'})
    _content_ids.append(
        {'identity': 'identity00', 'view_id': 'test_two', 'locale_id': 'ru'})
    _content_ids.append(
        {'identity': 'identity01', 'view_id': 'test_one', 'locale_id': 'en'})
    _content_ids.append(
        {'identity': 'identity01', 'view_id': 'test_one', 'locale_id': 'ru'})
    _content_ids.append(
        {'identity': 'identity01', 'view_id': 'test_two', 'locale_id': 'en'})
    _content_ids.append(
        {'identity': 'identity01', 'view_id': 'test_two', 'locale_id': 'ru'})
    for index, _content_id in enumerate(_content_ids):
        _content_gens.append(saved_content_instance(_content_id))
        _contents.append(next(_content_gens[index]))

    # print('\nunit, contents, test_content_find, _content ->', _contents)

    # testing find method it should return list
    _result = ContentModel.find()
    assert isinstance(_result, List)
    assert len(_result) == 8
    _result = ContentModel.find({'identity': 'identity00'})
    assert len(_result) == 4
    _result = ContentModel.find({'identity': 'identity00', 'view_id': 'test_two'})
    assert len(_result) == 2
    _result = ContentModel.find(
        {'identity': 'identity00', 'view_id': 'test_two', 'locale_id': 'ru'})
    assert len(_result) == 1

    # testing find_by_identity_view_locale it should retun model
    _result = ContentModel.find_by_identity_view_locale(
        identity='identity00',
        view_id='test_two',
        locale_id='ru'
    )

    assert isinstance(_result, ContentModel)
    _result = ContentModel.find_by_identity_view_locale(
        identity='identity00',
        view_id='test_two',
        locale_id='xu'
    )
    assert _result is None
    # print('\ntest_content_find_all, _result ->', _result)

    for _content_gen in _content_gens:
        next(_content_gen)


# @pytest.mark.active
def test_is_exist(saved_content_instance):
    _content_gen = saved_content_instance()
    _content = next(_content_gen)
    assert _content.is_exist()
    _content.delete_fm_db()
    assert not _content.is_exist()

    next(_content_gen)


# @pytest.mark.active
def test_content_update(
        saved_content_instance,
        content_get_schema):
    '''
    Update.
    '''
    # Get pks and values for saved content instance, keep instance to clean up db:
    _content_gen = saved_content_instance()
    _content = next(_content_gen)
    _content_json = content_get_schema.dump(_content)
    _content_values_json = {
        key: value for (key, value) in _content_json.items()
        if key not in ['identity', 'view_id', 'locale_id']}

    # Correct values and check they are identical:
    for key in _content_values_json.keys():
        _update_values_json = _content_values_json.copy()
        if isinstance(_update_values_json[key], int):
            _update_values_json[key] = 0
        else:
            _update_values_json[key] += ' corrected'
        _content.update(_update_values_json)
        assert content_get_schema.dump(_content)[key] == _update_values_json[key]

    # Clean up db:
    next(_content_gen)


# @pytest.mark.active
def test_content_typing(content_schema, saved_content_instance):
    _content_gen = saved_content_instance()
    _instance_json = content_schema.dump(next(_content_gen))
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

    # Clean up db:
    next(_content_gen)


# @pytest.mark.active
def test_content_finds_wrong_values(
        saved_content_instance,
        content_get_schema):
    '''
    That's impossible for find model with at wrong primary key values (error 404)
    '''
    _content_gen = saved_content_instance()
    # Get saved keys
    _saved_content_pks = {
        key: value for (key, value)
        in content_get_schema.dump(next(_content_gen)).items()
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

    # Clean up db:
    next(_content_gen)


# @pytest.mark.active
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
        saved_content_instance):
    '''
    Saving instance with foreign keys not in respective tables or without foreign key.
    '''
    _content_gen = saved_content_instance()
    # Get content instance for cleaning up and pks:
    _content = next(_content_gen)
    _content_json = content_get_schema.dump(_content)
    _allowed_json = {'view_id': views, 'locale_id': language}
    _new_content_json = _content_json.copy()
    for key in _allowed_json.keys():
        _new_content_json[key] = _allowed_json[key]
    _new_content = content_schema.load(_new_content_json, session=dbs_global.session)
    result = _new_content.save_to_db()
    # print(result)
    if (lang_testing_result == 'None') and (view_testing_result == 'None'):
        assert result is None
        _new_content.delete_fm_db()
    else:
        result.find('foreign key constraint fails') != -1

    # Clean up db:
    next(_content_gen)
