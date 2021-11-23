import pytest
from typing import List, Dict
from random import randrange, choice
# from json import dumps

from sqlalchemy.exc import InvalidRequestError

from application.structure.models.structure import StructureModel
from application.global_init_data import global_constants
from application.structure.modules.dbs_init_structure import (
    fill_structure)


@pytest.fixture()
def saved_structure_instance(client, structure_instance):
    def _method(values: Dict = {}):
        # print(('\ntest model structure, saved_structure_instance, '
        #        'values ->'), values)
        _saved_structure = structure_instance(values)
        _saved_structure.save_to_db()
        yield _saved_structure
        if _saved_structure.is_exist:
            _saved_structure.delete_fm_db()
        yield
    return _method


# @pytest.mark.active
def test_StructureModel_find_by_ids(client, create_test_content):
    lng = 'en'
    _content_details = create_test_content(locale=lng)
    _ids = {
        'view_id': _content_details.get('view_id'),
        'locale_id': _content_details.get('locale_id')
    }
    '''success'''
    _attributes = StructureModel.find_by_ids(ids=_ids).attributes
    for key in [item for item in _content_details.keys()
                if item not in ['view_id', 'locale_id']]:
        _index = _content_details.get(key).get('upper_index')
        _contant_extract = {
            k: v for (k, v) in _content_details.get(key).items()
            if k not in ['upper_index', 'structure']}
        assert _attributes.get(str(_index).zfill(2)) == _contant_extract
    # print('\ntest_model_structure:\n test_StructureModel_find_by_ids',)
    # print('  _contant_extract ->', _contant_extract)

    '''fails'''
    '''wrong keys'''
    _wrong = '_wrong_key'
    _wrong_ids = {**_ids, _wrong: _content_details.get('view_id')}
    _wrong_ids.pop('view_id')
    with pytest.raises(InvalidRequestError) as e_info:
        StructureModel.find_by_ids(ids=_wrong_ids)
    assert str(e_info.value) ==\
        (f'Entity namespace for "structure" has no property "{_wrong}"')
    '''not found'''
    _wrong_ids = {**_ids, 'view_id': 'wrong'}
    assert StructureModel.find_by_ids(ids=_wrong_ids) is None


# @pytest.mark.active
def test_StructureModel_find(client, create_test_content):
    lng_00 = 'en'
    lng_01 = 'ru'
    create_test_content(locale=lng_00)
    create_test_content(locale=lng_01, clean=False)
    _found = StructureModel.find()
    assert isinstance(_found, List)
    assert len(_found) == 2
    _found = StructureModel.find(searching_criterions={'user_id': 0})
    assert len(_found) == 2
    _found = StructureModel.find(searching_criterions={'user_id': 1})
    assert len(_found) == 0
    _found = StructureModel.find(
        searching_criterions={'user_id': 0, 'locale_id': 'en'})
    assert len(_found) == 1


# @pytest.mark.active
def test_StructureModel_get_element_both(client, create_test_content):
    lng_00 = 'en'
    lng_01 = 'ru'
    _content_details_00 = create_test_content(locale=lng_00, user_id=1)
    create_test_content(locale=lng_01, clean=False)
    _block_01 = _content_details_00.get('block_00')
    _simple_00 = _content_details_00.get('simple_00')
    _ids = {
        'view_id': _content_details_00.get('view_id'),
        'locale_id': _content_details_00.get('locale_id'),
    }
    _found = StructureModel.find_by_ids(ids=_ids)
    _upper_index = _block_01.get('upper_index')
    _element = _found.get_element(upper_index=_upper_index)
    assert _element ==\
        _block_01.get('structure').get(str(_upper_index).zfill(2))
    _upper_index = _simple_00.get('upper_index')
    _element = StructureModel.get_element_cls(
        ids=_ids, upper_index=_upper_index)
    assert _element ==\
        _simple_00.get('structure').get(str(_upper_index).zfill(2))
    # print('\ntest_model_structure:\n test_StructureModel_get_element',
    #       '\n  _simple_00 ->',
    #       _simple_00.get('structure').get(str(_upper_index).zfill(2)),
    #       '\n  _element ->', _element,
    #       )


# @pytest.mark.active
def test_insert_upper_level_element(
    saved_structure_instance, structure_get_schema,
    attributes
):
    '''clean up structure tables'''
    [_structure.delete_fm_db() for _structure in StructureModel.find()]
    '''fill structure table'''
    fill_structure()
    '''choose constants to work with structure'''
    _criterions = {
        'view_id': choice(global_constants.get_VIEWS_PKS),
        'locale_id': choice(global_constants.get_PKS)
    }
    _uplev_elem_index = 1
    _uplev_elem_items = {
        'type': 'hblock',
        'subtype': 'pix',
        'qnt': '3',
        'name': 'fancy name'
    }
    _first_user_id = randrange(128)
    '''update original structure to work with'''
    _updating_structure = StructureModel.find_by_ids(_criterions)
    _updating_structure.update({'attributes': attributes})
    '''insert upper level element'''
    _updating_structure.insert_element(
        _uplev_elem_index,
        _uplev_elem_items,
        _first_user_id
    )

    # print('\ntest_model_structure',
    #       '\n test_insert_upper_level_element',
    #       '\n  view_id ->', _criterions.get('view_id'),
    #       '\n  locale_id ->', _criterions.get('locale_id')
    #       )


# @pytest.mark.active
def test_change_element_qnt(
    saved_structure_instance, structure_get_schema,
    attributes
):
    '''clean up structure tables'''
    [_structure.delete_fm_db() for _structure in StructureModel.find()]
    '''Fill structure table'''
    fill_structure()
    '''Choose constants to work with structure'''
    _criterions = {
        'view_id': choice(global_constants.get_VIEWS_PKS),
        'locale_id': choice(global_constants.get_PKS)
    }
    _block_index = 1
    _qnt = attributes.get(str(_block_index).zfill(2)).get('qnt')
    _first_user_id = randrange(128)
    '''Update structure'''
    _updating_structure = StructureModel.find_by_ids(_criterions)
    _updating_structure.update({'attributes': attributes})
    _us_dumped = structure_get_schema.dump(_updating_structure)
    _element_qnt = _us_dumped.get(
        'attributes').get(str(_block_index).zfill(2)).get('qnt')
    _user_id = _us_dumped.get('user_id')
    '''Expect it's updated as per available constants'''
    assert _element_qnt == _qnt
    assert _user_id == 0

    '''add element'''
    _updating_structure.change_element_qnt(
        'inc', _block_index, _first_user_id)

    '''Get elements and check expectations'''
    _updated_structure = StructureModel.find_by_ids(_criterions)

    _us_dumped = structure_get_schema.dump(_updated_structure)
    _element_qnt = _us_dumped.get(
        'attributes').get(str(_block_index).zfill(2)).get('qnt')
    _user_id = _us_dumped.get('user_id')
    '''Expect it's updated as per available constants'''
    assert _element_qnt == _qnt + 1
    assert _first_user_id == _user_id

    # print('\ntest_model_structure:\n test_add_element',
    #       '\n  _updated_structure ->',
    #       structure_get_schema.dump(_updated_structure),
    #       '\n  _element_qnt ->', _element_qnt)

    '''remove element'''
    _second_user_id = randrange(128)
    _updating_structure.change_element_qnt(
        'dec', _block_index, _second_user_id)

    '''Get elements and check expectations'''
    _updated_structure = StructureModel.find_by_ids(_criterions)

    _us_dumped = structure_get_schema.dump(_updated_structure)
    _element_qnt = _us_dumped.get(
        'attributes').get(str(_block_index).zfill(2)).get('qnt')
    _user_id = _us_dumped.get('user_id')
    '''Expect it's updated as per available constants'''
    assert _element_qnt == _qnt
    assert _second_user_id == _user_id


# @pytest.mark.active
def test_StructureModel_remove_element_cls(
        saved_structure_instance, structure_get_schema, attributes):
    '''Clean up'''
    StructureModel.query.delete()
    '''Create structures with empty attribure, it should be 10 of them.'''
    _global_view_keys = global_constants.get_VIEWS_PKS
    _global_locales_keys = global_constants.get_PKS
    _structure_gens = [saved_structure_instance(
        {
            'view_id': _view_key, 'locale_id': _locale_key,
            # 'attributes': attributes
        })
        for _view_key in _global_view_keys
        for _locale_key in _global_locales_keys]
    [next(_structure_gen) for _structure_gen in _structure_gens]
    '''choose one of the structure'''
    _criterions = {
        'view_id': choice(_global_view_keys),
        'locale_id': choice(_global_locales_keys)
    }

    _instance = StructureModel.find_by_ids(_criterions)
    _instance.update({'attributes': attributes})
    # _index = randrange(len(attributes))
    # _element_structure = StructureModel.get_element_cls(
    #     _criterions, _index)

    '''Clean up'''
    [next(_structure_gen) for _structure_gen in _structure_gens]


# @pytest.mark.active
def test_update(saved_structure_instance, structure_get_schema,
                attributes):
    '''Clean up the structure table'''
    StructureModel.query.delete()

    '''Create structures, it should be 10 of them.'''
    _global_view_keys = global_constants.get_VIEWS_PKS
    _global_locales_keys = global_constants.get_PKS
    [
        {'view_id': _view_key, 'locale_id': _locale_key}
        for _view_key in _global_view_keys
        for _locale_key in _global_locales_keys
    ]
    _structure_gens = [saved_structure_instance(
        {'view_id': _view_key, 'locale_id': _locale_key})
        for _view_key in _global_view_keys
        for _locale_key in _global_locales_keys]
    [next(_structure_gen) for _structure_gen in _structure_gens]

    '''Choose random keys to update structure'''
    _criterions = {
        'view_id': choice(_global_view_keys),
        'locale_id': choice(_global_locales_keys)
    }
    _structure_for_update = StructureModel.find_by_ids(_criterions)
    assert structure_get_schema.dump(
        _structure_for_update).get('updated') is None
    _attributes = {
        'key1': 'test_key1',
        'key2': 'test_key2',
        'key3': 'test_key3',
    }
    _structure_for_update.update({'attributes': _attributes})
    _updated_schema = StructureModel.find_by_ids(_criterions)
    assert structure_get_schema.dump(
        _structure_for_update).get('updated') is not None
    assert structure_get_schema.dump(
        _updated_schema).get('attributes') == _attributes
    '''Clean up'''
    [next(_structure_gen) for _structure_gen in _structure_gens]


# @pytest.mark.active
def test_delete(saved_structure_instance, structure_get_schema,
                view_id, attributes):
    '''Clean up'''
    StructureModel.query.delete()
    '''Create structures, it should be 10 of them.'''
    _global_view_keys = global_constants.get_VIEWS_PKS
    _global_locales_keys = global_constants.get_PKS
    [
        {'view_id': _view_key, 'locale_id': _locale_key}
        for _view_key in _global_view_keys
        for _locale_key in _global_locales_keys
    ]
    _structure_gens = [saved_structure_instance(
        {
            'view_id': _view_key, 'locale_id': _locale_key,
            'attributes':
            {
                'view_id': _view_key, 'locale_id': _locale_key
            }
        })
        for _view_key in _global_view_keys
        for _locale_key in _global_locales_keys]
    [next(_structure_gen) for _structure_gen in _structure_gens]

    '''Choose random keys to update structure'''
    _criterions = {
        'view_id': choice(_global_view_keys),
        'locale_id': choice(_global_locales_keys)
    }
    _structure_to_delete = StructureModel.find_by_ids(_criterions)

    _structure_to_delete.delete_fm_db()

    _deleted_structure = StructureModel.find_by_ids(_criterions)
    _left_stractures = StructureModel.find()
    assert _deleted_structure is None
    assert len(_left_stractures) == 9

    '''Clean up'''
    [next(_structure_gen) for _structure_gen in _structure_gens]
