import pytest
import random
from typing import Dict, List
# from typing import Dict, NoneType

from application.modules.dbs_global import dbs_global

# from application.contents.schemas.contents import content_get_schema
# from application.contents
from application.contents.models import ContentModel
from application.structure.models import StructureModel
from application.models.views_global import ViewGlobalModel
from application.contents.schemas.contents import content_schema
# from application.contents.local_init_data_contents import contents_constants
from application.global_init_data import global_constants
from application.modules.dbs_init_global import fill_views


@pytest.fixture
def saved_content_instance(client, content_instance) -> ContentModel:
    def _method(values: Dict = {}) -> ContentModel:
        # print('\nsaved_content_instance, values ->', values)
        _saved_content = content_instance(values)
        _saved_content.save_to_db()
        # print('\nsaved_content_instance, _saved_content ->', _saved_content)
        yield _saved_content
        if _saved_content.is_exist():
            _saved_content.delete_fm_db()
        yield
    return _method


# @pytest.mark.active
def test_elem_ids():
    _content = ContentModel()
    _record_id_body = '01_vblock_txt'
    _qnt = 3
    _record_ids = _content.elem_ids('inc', '_'.join([_record_id_body, str(_qnt)]))
    assert len(_record_ids) == _qnt + 1
    _record_ids = _content.elem_ids('dec', '01_vblock_txt_3')
    assert len(_record_ids) == _qnt - 1
    # print('\ntest_model_contents, _record_ids ->', _record_ids)


# @pytest.mark.active
@pytest.mark.parametrize(
    'lng, test_word, test_word_01, test_word_02, test_word_03',
    [
        ('en',
            'Request does not contain', 'Sorry, access',
            'Something wrong', 'structure'),
        ('ru',
            'Запрос не содержит', 'Извиняйте, доступ',
            'Что-то не так', 'структура'),
    ]
)
def test_remove_element_fm_block(
    client,
    lng, test_word, test_word_01, test_word_02, test_word_03
):
    '''clean up contents table'''
    [_content.delete_fm_db() for _content in ContentModel.find()]
    '''Create test constants'''
    _content = ContentModel()
    _locale_id = lng
    # _locale_id = random.choice(global_constants.get_PKS)
    _view_id = random.choice(global_constants.get_VIEWS_PKS)
    _record_id_body = '01_vblock_txt'
    _qnt = 4
    _block_id = '_'.join([_record_id_body, str(_qnt)])
    _item_index = 2
    _record_ids = _content.elem_ids('', _block_id)
    _user_id = random.randrange(128)
    '''Fill contents table'''
    def create_save(record_id: str = ''):
        record = content_schema.load({
            'identity': record_id, 'view_id': _view_id,
            'locale_id': _locale_id, 'title': f'Title {record_id}',
            'content': f'Content {record_id}'
        }, session=dbs_global.session)
        record.save_to_db()
        return record
    [create_save(_record_id) for _record_id in _record_ids]
    '''Testing remove element'''
    '''Success insertion'''
    result = ContentModel.remove_element_fm_block(
        _block_id, _item_index, _view_id, _locale_id, _user_id)

    '''Check what's happened'''
    assert result is None
    _records_from_db = ContentModel.find({'view_id': _view_id, 'locale_id': _locale_id})
    assert len(_records_from_db) == _qnt - 1
    for (index, _record_from_db) in enumerate(_records_from_db):
        _json_from_db = content_schema.dump(_record_from_db)
        if index < _item_index:
            # print(
            #     'test_model_contents, _record_from_db ->',
            #     _json_from_db.get('identity'), '\t',
            #     _json_from_db.get('title')
            # )
            assert _json_from_db.get('identity').split(
                '_')[-1] == _json_from_db.get('title').split('_')[-1]
            assert _json_from_db.get('identity').split(
                '_')[-1] == _json_from_db.get('content').split('_')[-1]
        else:
            assert _json_from_db.get('identity').split(
                '_')[-1] == str(int(
                    _json_from_db.get('title').split('_')[-1]) - 1).zfill(3)
            assert _json_from_db.get('identity').split(
                '_')[-1] == str(int(
                    _json_from_db.get('content').split('_')[-1]) - 1).zfill(3)


# @pytest.mark.active
@pytest.mark.parametrize(
    'remove_record_index',
    [
        (1),
        (2),
        (3)
    ]
)
def test_remove_element_fm_block_DB_mistake(
    client,
    remove_record_index
):
    '''clean up contents table'''
    [_content.delete_fm_db() for _content in ContentModel.find()]
    '''Create test constants'''
    _content = ContentModel()
    _locale_id = random.choice(global_constants.get_PKS)
    _view_id = random.choice(global_constants.get_VIEWS_PKS)
    _record_id_body = '01_vblock_txt'
    _qnt = 4
    _block_id = '_'.join([_record_id_body, str(_qnt)])
    _item_index = 2
    _record_ids = _content.elem_ids('', _block_id)
    _user_id = random.randrange(128)
    '''Fill contents table'''
    def create_save(record_id: str = ''):
        record = content_schema.load({
            'identity': record_id, 'view_id': _view_id,
            'locale_id': _locale_id, 'title': f'Title {record_id}',
            'content': f'Content {record_id}'
        }, session=dbs_global.session)
        record.save_to_db()
        return record
    [create_save(_record_id) for _record_id in _record_ids]
    '''remove one of the record'''
    # _remove_record_index = 2
    # _remove_record_index = random.randrange(_qnt)
    _criterian = {
        'identity': '_'.join([_record_id_body, str(remove_record_index).zfill(3)]),
        'view_id': _view_id,
        'locale_id': _locale_id
    }
    # print('\ntest_model_contents, '
    #       '\n_remove_record_index ->', _remove_record_index)
    _record_to_remove = ContentModel.find_by_identity_view_locale(**_criterian)
    _record_to_remove.delete_fm_db()

    '''Testing remove element'''
    '''Success removal'''
    result = ContentModel.remove_element_fm_block(
        _block_id, _item_index, _view_id, _locale_id, _user_id)

    '''Check what's happened'''
    assert result is None
    _records_from_db = ContentModel.find({'view_id': _view_id, 'locale_id': _locale_id})
    assert len(_records_from_db) == _qnt - 1
    for (index, _record_from_db) in enumerate(_records_from_db):
        _json_from_db = content_schema.dump(_record_from_db)
        if index < _item_index:
            if index == remove_record_index:
                assert _json_from_db.get('title') == 'dummy'
                assert _json_from_db.get('content') == 'dummy'
            else:
                assert _json_from_db.get('identity').split(
                    '_')[-1] == _json_from_db.get('title').split('_')[-1]
                assert _json_from_db.get('identity').split(
                    '_')[-1] == _json_from_db.get('content').split('_')[-1]
        else:
            if index == remove_record_index - 1:
                assert _json_from_db.get('title') == 'dummy'
                assert _json_from_db.get('content') == 'dummy'
            else:
                assert _json_from_db.get('identity').split(
                    '_')[-1] == str(int(
                        _json_from_db.get('title').split(
                            '_')[-1]) - 1).zfill(3)
                assert _json_from_db.get('identity').split(
                    '_')[-1] == str(int(
                        _json_from_db.get('content').split(
                            '_')[-1]) - 1).zfill(3)


# @pytest.mark.active
def test_add_element_to_block(client):
    '''
    The following tests here:
    Update db intact - successfull update.
    Deleting redundant record.
    '''
    '''clean up contents table'''
    [_content.delete_fm_db() for _content in ContentModel.find()]
    '''Create test constants'''
    _content = ContentModel()
    _locale_id = random.choice(global_constants.get_PKS)
    _view_id = random.choice(global_constants.get_VIEWS_PKS)
    _record_id_body = '01_vblock_txt'
    _qnt = 4
    _block_id = '_'.join([_record_id_body, str(_qnt)])
    _item_index = 1
    _record_ids = _content.elem_ids('', _block_id)
    _user_id = random.randrange(128)
    '''Fill contents table'''
    def create_save(record_id: str = ''):
        record = content_schema.load({
            'identity': record_id, 'view_id': _view_id,
            'locale_id': _locale_id, 'title': f'Title {record_id}',
            'content': f'Content {record_id}'
        }, session=dbs_global.session)
        record.save_to_db()
        return record
    [create_save(_record_id) for _record_id in _record_ids]
    '''Testing add element'''
    '''Delete redundant record'''
    _redundant_record_index = int(_record_ids[-1].split('_')[-1]) + 1
    _redundant_record_base = '_'.join(_record_ids[-1].split('_')[0: -1])
    _redundant_record_id = '_'.join(
        [_redundant_record_base, str(_redundant_record_index).zfill(3)])
    _redundant_record = content_schema.load({
        'identity': _redundant_record_id, 'view_id': _view_id,
        'locale_id': _locale_id, 'title': f'Title {_redundant_record_id}',
        'content': f'Content {_redundant_record_id}'
    }, session=dbs_global.session)
    _redundant_record.save_to_db()
    assert len(ContentModel.find(
        {'view_id': _view_id, 'locale_id': _locale_id})) == _qnt + 1

    result = ContentModel.add_element_to_block(
        _block_id, _item_index, _view_id, _locale_id, _user_id)
    '''Check what's happened'''
    _records_from_db = ContentModel.find({'view_id': _view_id, 'locale_id': _locale_id})
    assert len(_records_from_db) == _qnt
    assert isinstance(result, dict)

    '''Success insertion'''
    result = ContentModel.add_element_to_block(
        _block_id, _item_index, _view_id, _locale_id, _user_id)

    '''Check what's happened'''
    _records_from_db = ContentModel.find({'view_id': _view_id, 'locale_id': _locale_id})
    assert len(_records_from_db) == _qnt + 1
    for (index, _record_from_db) in enumerate(_records_from_db):
        _json_from_db = content_schema.dump(_record_from_db)
        if index < _item_index:
            assert _json_from_db.get('identity').split(
                '_')[-1] == _json_from_db.get('title').split('_')[-1]
            assert _json_from_db.get('identity').split(
                '_')[-1] == _json_from_db.get('content').split('_')[-1]
        if index == _item_index:
            assert _json_from_db.get('title') == 'dummy'
            assert _json_from_db.get('content') == 'dummy'
        if index > _item_index:
            assert _json_from_db.get('identity').split(
                '_')[-1] == str(int(
                    _json_from_db.get('title').split('_')[-1]) + 1).zfill(3)
            assert _json_from_db.get('identity').split(
                '_')[-1] == str(int(
                    _json_from_db.get('content').split('_')[-1]) + 1).zfill(3)
    # print('\ntest_model_contents, result ->', result)


# @pytest.mark.active
def test_add_element_to_block_DB_mistakes(client):
    '''clean up contents table'''
    [_content.delete_fm_db() for _content in ContentModel.find()]
    '''Create test constants'''
    _content = ContentModel()
    _locale_id = random.choice(global_constants.get_PKS)
    _view_id = random.choice(global_constants.get_VIEWS_PKS)
    _record_id_body = '01_vblock_txt'
    _qnt = 6
    _block_id = '_'.join([_record_id_body, str(_qnt)])
    _item_index = 3
    _record_ids = _content.elem_ids('', _block_id)
    _user_id = random.randrange(128)
    '''Fill contents table'''
    def create_save(record_id: str = ''):
        record = content_schema.load({
            'identity': record_id, 'view_id': _view_id,
            'locale_id': _locale_id, 'title': f'Title {record_id}',
            'content': f'Content {record_id}'
        }, session=dbs_global.session)
        record.save_to_db()
        return record
    [create_save(_record_id) for _record_id in _record_ids]
    '''Testing add element'''
    '''remove one of the record'''
    # _remove_record_index = 4
    _remove_record_index = random.randrange(_qnt)
    _criterian = {
        'identity': '_'.join([_record_id_body, str(_remove_record_index).zfill(3)]),
        'view_id': _view_id,
        'locale_id': _locale_id
    }
    # print('\ntest_model_contents, '
    #       '\n_remove_record_index ->', _remove_record_index)
    _record_to_remove = ContentModel.find_by_identity_view_locale(**_criterian)
    _record_to_remove.delete_fm_db()

    '''Update'''
    result = ContentModel.add_element_to_block(
        _block_id, _item_index, _view_id, _locale_id, _user_id)

    '''Check what's happened'''
    assert result is None
    _records_from_db = ContentModel.find({
        'view_id': _view_id, 'locale_id': _locale_id})
    assert len(_records_from_db) == _qnt + 1
    for (index, _record_from_db) in enumerate(_records_from_db):
        _json_from_db = content_schema.dump(_record_from_db)
        if index < _item_index:
            if index == _remove_record_index:
                assert _json_from_db.get('title') == 'dummy'
                assert _json_from_db.get('content') == 'dummy'
            else:
                assert _json_from_db.get('identity').split(
                    '_')[-1] == _json_from_db.get('title').split('_')[-1]
                assert _json_from_db.get('identity').split(
                    '_')[-1] == _json_from_db.get('content').split('_')[-1]
        if index == _item_index:
            assert _json_from_db.get('title') == 'dummy'
            assert _json_from_db.get('content') == 'dummy'
        if index > _item_index:
            if index == _remove_record_index + 1:
                assert _json_from_db.get('title') == 'dummy'
                assert _json_from_db.get('content') == 'dummy'
            else:
                assert _json_from_db.get('identity').split(
                    '_')[-1] == str(int(
                        _json_from_db.get('title').split('_')[-1]) + 1).zfill(3)
                assert _json_from_db.get('identity').split(
                    '_')[-1] == str(int(
                        _json_from_db.get('content').split('_')[-1]) + 1).zfill(3)


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
    StructureModel.query.delete()
    ContentModel.query.delete()
    ViewGlobalModel.query.delete()
    fill_views()

    _content_ids = []
    _content_gens = []
    _contents = []
    _content_ids.append(
        {'identity': 'identity00', 'view_id': 'landing', 'locale_id': 'en'})
    _content_ids.append(
        {'identity': 'identity00', 'view_id': 'landing', 'locale_id': 'ru'})
    _content_ids.append(
        {'identity': 'identity00', 'view_id': 'price_list', 'locale_id': 'en'})
    _content_ids.append(
        {'identity': 'identity00', 'view_id': 'price_list', 'locale_id': 'ru'})
    _content_ids.append(
        {'identity': 'identity01', 'view_id': 'landing', 'locale_id': 'en'})
    _content_ids.append(
        {'identity': 'identity01', 'view_id': 'landing', 'locale_id': 'ru'})
    _content_ids.append(
        {'identity': 'identity01', 'view_id': 'price_list', 'locale_id': 'en'})
    _content_ids.append(
        {'identity': 'identity01', 'view_id': 'price_list', 'locale_id': 'ru'})
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
    _result = ContentModel.find({'identity': 'identity00', 'view_id': 'price_list'})
    assert len(_result) == 2
    _result = ContentModel.find(
        {'identity': 'identity00', 'view_id': 'price_list', 'locale_id': 'ru'})
    assert len(_result) == 1

    # testing find_by_identity_view_locale it should retun model
    _result = ContentModel.find_by_identity_view_locale(
        identity='identity00',
        view_id='price_list',
        locale_id='ru'
    )
    assert isinstance(_result, ContentModel)

    _result = ContentModel.find_by_identity_view_locale(
        identity='identity00',
        view_id='price_list',
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
        (global_constants.get_VIEWS[0]['view_id'], 'None'),
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
