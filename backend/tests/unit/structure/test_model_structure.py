import pytest
from typing import Dict  # , List
import random

from application.structure.models.structure import StructureModel
from application.global_init_data import global_constants
from application.structure.modules.dbs_init_structure import fill_structure


@pytest.fixture()
def saved_structure_instance(client, structure_instance):
    def _method(values: Dict = {}):
        # print('\ntest model structure, saved_structure_instance, values ->', values)
        _saved_structure = structure_instance(values)
        _saved_structure.save_to_db()
        yield _saved_structure
        if _saved_structure.is_exist:
            _saved_structure.delete_fm_db()
        yield
    return _method


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
        'view_id': random.choice(global_constants.get_VIEWS_PKS),
        'locale_id': random.choice(global_constants.get_PKS)
    }
    _uplev_elem_index = 1
    _uplev_elem_items = {
        'type': 'hblock',
        'subtype': 'pix',
        'qnt': '3',
        'name': 'fancy name'
    }
    _first_user_id = random.randrange(128)
    '''update original structure to work with'''
    _updating_structure = StructureModel.find_by_ids(_criterions)
    _updating_structure.update({'attributes': attributes})
    '''insert upper level element'''
    _updating_structure.insert_upper_level_element(
        _uplev_elem_index,
        _uplev_elem_items,
        _first_user_id
    )

    print('\ntest_model_structure',
          '\n test_insert_upper_level_element',
          '\n  view_id ->', _criterions.get('view_id'),
          '\n  locale_id ->', _criterions.get('locale_id')
          )


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
        'view_id': random.choice(global_constants.get_VIEWS_PKS),
        'locale_id': random.choice(global_constants.get_PKS)
    }
    _block_index = 1
    _qnt = attributes.get(str(_block_index).zfill(2)).get('qnt')
    _first_user_id = random.randrange(128)
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
    _updating_structure.change_element_qnt('inc', _block_index, _first_user_id)

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
    #   '\n  _updated_structure ->', structure_get_schema.dump(_updated_structure),
    #   '\n  _element_qnt ->', _element_qnt)

    '''remove element'''
    _second_user_id = random.randrange(128)
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
def test_find(saved_structure_instance, structure_get_schema):
    '''Clean up the structure table'''
    StructureModel.query.delete()

    '''Create structures, it should be 10 of them.'''
    _global_view_keys = global_constants.get_VIEWS_PKS
    _global_locales_keys = global_constants.get_PKS
    _origin_keys = [
        {'view_id': _view_key, 'locale_id': _locale_key}
        for _view_key in _global_view_keys
        for _locale_key in _global_locales_keys
    ]
    _structure_gens = [saved_structure_instance(
        {'view_id': _view_key, 'locale_id': _locale_key})
        for _view_key in _global_view_keys
        for _locale_key in _global_locales_keys]
    [next(_structure_gen) for _structure_gen in _structure_gens]
    # [print(gen) for gen in _structure_gens]

    '''Find all available structures'''
    _result = StructureModel.find()
    _json_result = [structure_get_schema.dump(structure) for structure in _result]
    _found_keys = [{
        'view_id': item.get('view_id'),
        'locale_id': item.get('locale_id'),
    } for item in _json_result]
    # print()
    # [print(key) for key in _origin_keys]
    # print()
    # [print(key) for key in _found_keys]
    assert len(_result) == 10
    # print()
    [_found_keys.pop(_found_keys.index(item)) for item in _origin_keys]
    assert len(_found_keys) == 0

    '''Find specific user_id and view_id'''
    '''Get 5 random from all structures available.'''
    qnt = 5  # elements for update and further search
    _changed_user_list = []
    for index in range(0, qnt):
        _random_structure = random.choice(_result)
        _random_structure.update({'user_id': 0})
        _changed_user_list.append(_random_structure)
        _result.remove(_random_structure)
    _updated_structures = StructureModel.find({'user_id': 0})
    assert len(_updated_structures) == qnt

    '''Find nothing, using wrong keys'''
    _list_by_user_id = StructureModel.find({'user_id': 256})
    # print('\n', _list_by_user_id)
    assert len(_list_by_user_id) == 0
    # [print(structure_get_schema.dump(_updated_structure))
    #  for _updated_structure in _updated_structures]

    '''clean up the table'''
    [next(_structure_gen) for _structure_gen in _structure_gens]


# @pytest.mark.active
def test_find_by_ids(saved_structure_instance, structure_get_schema, attributes):
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

    '''Get criterion and find appropriate instance'''
    _criterions = {
        'view_id': random.choice(_global_view_keys),
        'locale_id': random.choice(_global_locales_keys)
    }
    _found_structure = StructureModel.find_by_ids(_criterions)
    _found_attributes = structure_get_schema.dump(_found_structure).get('attributes')

    '''Asset I've found approapriate instance'''
    assert _found_attributes.get('view_id') == _criterions.get('view_id')
    assert _found_attributes.get('locale_id') == _criterions.get('locale_id')

    '''Try to find something with wrong criterions'''
    _wrong_criterions = _criterions.copy()
    _wrong_criterions['view_id'] = '_wrong_view_id'
    _found_structure = StructureModel.find_by_ids(_wrong_criterions)
    assert _found_structure is None
    _wrong_criterions = _criterions.copy()
    _wrong_criterions['locale_id'] = '_wrong_locale_id'
    _found_structure = StructureModel.find_by_ids(_wrong_criterions)
    assert _found_structure is None

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
        'view_id': random.choice(_global_view_keys),
        'locale_id': random.choice(_global_locales_keys)
    }
    _structure_for_update = StructureModel.find_by_ids(_criterions)
    assert structure_get_schema.dump(_structure_for_update).get('updated') is None
    _attributes = {
        'key1': 'test_key1',
        'key2': 'test_key2',
        'key3': 'test_key3',
    }
    _structure_for_update.update({'attributes': _attributes})
    _updated_schema = StructureModel.find_by_ids(_criterions)
    assert structure_get_schema.dump(_structure_for_update).get('updated') is not None
    assert structure_get_schema.dump(_updated_schema).get('attributes') == _attributes
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
        'view_id': random.choice(_global_view_keys),
        'locale_id': random.choice(_global_locales_keys)
    }
    _structure_to_delete = StructureModel.find_by_ids(_criterions)

    _structure_to_delete.delete_fm_db()

    _deleted_structure = StructureModel.find_by_ids(_criterions)
    _left_stractures = StructureModel.find()
    assert _deleted_structure is None
    assert len(_left_stractures) == 9

    '''Clean up'''
    [next(_structure_gen) for _structure_gen in _structure_gens]
