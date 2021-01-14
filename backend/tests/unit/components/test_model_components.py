from typing import Dict

import pytest

from sqlalchemy.exc import IntegrityError, DataError

# from application.modules.dbs_global import dbs_global

from application.components.models import ComponentModel

# from application.global_init_data import global_constants
# from application.components.local_init_data_components import components_constants


@pytest.fixture(scope='module')
def saved_component(component_instance, component_get_schema):
    # _values = {}
    def _method(values: Dict = {}):
        _component = component_instance(values)
        # print(component_get_schema.dump(_component))
        result = _component.save_to_db()
        # print(result)
        if result is not None:
            return result
        return _component
    return _method


@pytest.fixture()
def valid_values(allowed_component_kind, allowed_language):
    return {
        'kind_id': allowed_component_kind,
        'locale_id': allowed_language}


# @pytest.mark.active
def test_component_save(
        saved_component,
        valid_values):
    '''
    Save.
    Right.
    '''
    # print(_value)
    _component = saved_component(valid_values)
    assert isinstance(_component, ComponentModel)
    # print(_component)


# @pytest.mark.active
def test_component_find(
        saved_component,
        valid_values,
        component_get_schema):
    '''
    Find object with correct and incorrect keys.
    Right.
    Wrong.
    '''
    # Create searching pattern and find appropriate object:
    _saved_component_json = component_get_schema.dump(saved_component(valid_values))
    _searching_criterions = {
        key: value for (key, value) in _saved_component_json.items()
        if key in ['identity', 'kind_id', 'locale_id']}
    _found_component_json = component_get_schema.dump(
        ComponentModel.find_by_identity_kind_locale(_searching_criterions))

    # Insure found object identical to found one:
    for key in _saved_component_json.keys():
        assert _saved_component_json[key] == _found_component_json[key]

    # Create wrong searching patterns values and try to find components (error 404):
    for key in _searching_criterions.keys():
        _wrong_searching_criterions = _searching_criterions.copy()
        _wrong_searching_criterions[key] += '_wrong'
        _found_component = ComponentModel.find_by_identity_kind_locale(
            _wrong_searching_criterions)
        assert _found_component is None

    # Create wrong searching patterns values and
    # try to find components:
    for key in _searching_criterions.keys():
        _wrong_searching_criterions = _searching_criterions.copy()
        _bad_key = key + '_bad'
        _wrong_searching_criterions[_bad_key] = _wrong_searching_criterions.pop(key)
        _found_component = ComponentModel.find_by_identity_kind_locale(
            _wrong_searching_criterions)
        assert isinstance(_found_component, Dict)
        assert 'message' in _found_component.keys()
        assert _found_component['message'] == 'Something wrong happened:\n'


# @pytest.mark.active
def test_component_save_same_pks(
        component_get_schema, saved_component, valid_values):
    '''
    Save with same primary keys.
    Wrong.
    '''
    _saved_component_json = component_get_schema.dump(saved_component(valid_values))
    _other_component_json = _saved_component_json.copy()
    _other_component = ComponentModel(**_other_component_json)
    result = _other_component.save_to_db()
    assert result is not None
    assert result['message'].find('IntegrityError') != -1


# @pytest.mark.active
def test_component_save_different_pks(
        component_get_schema, saved_component, valid_values,
        component_schema,
        other_valid_item, random_text_underscore):
    '''
    Save with primary keys where one of them is different only.
    Right.
    '''
    _saved_component_json = component_get_schema.dump(saved_component(valid_values))
    _component_pks_json = {
        key: value for (key, value) in _saved_component_json.items()
        if key in ['identity', 'kind_id', 'locale_id']}
    # print(_component_pks_json)
    for key in _component_pks_json.keys():
        _changed_component_json = _saved_component_json.copy()
        if key == 'identity':
            _new_value = random_text_underscore(qnt=2)
        else:
            _new_value = other_valid_item(
                item_kind=key, prev_item=_component_pks_json[key])
        _changed_component_json[key] = _new_value
        _changed_component = component_schema.load(_changed_component_json)
        _changed_component.save_to_db()
        # print(_saved_component_json)
        _saved_changed_component_json = component_get_schema.dump(_changed_component)
        # print(_saved_changed_component_json)
        _unchanged_values_json = {
            _key: value for (_key, value) in _saved_changed_component_json.items()
            if _key != key}
        for _key in _unchanged_values_json.keys():
            assert _unchanged_values_json[_key] == _saved_component_json[_key]
        # print(key)
        # print(_new_key)


# @pytest.mark.active
def test_component_save_wrong_fks(
        component_get_schema, saved_component, valid_values,):
    '''
    Save fks that are not in approprite tables.
    Wrong.
    '''
    for key in valid_values.keys():
        _wrong_values = valid_values.copy()
        _wrong_values[key] = valid_values[key] + '_wrong'
        # print(_wrong_values)
        _saved_component = saved_component(
            _wrong_values)
        assert isinstance(_saved_component, Dict)
        assert isinstance(_saved_component['error'], IntegrityError)


# @pytest.mark.active
def test_component_update(
        component_get_schema, saved_component, valid_values):
    '''
    Update object with correct values.
    Right.
    '''
    _saved_component = saved_component(valid_values)
    _saved_component_json = component_get_schema.dump(_saved_component)
    # _pks_component_json = {
    #     key: value for (key, value) in _saved_component_json.items()
    #     if key in ['identity', 'kind_id', 'locale_id']}
    _values_component_json = {
        key: value for (key, value) in _saved_component_json.items()
        if key not in ['identity', 'kind_id', 'locale_id']}
    for key in _values_component_json.keys():
        _corrected_values_component_json = _values_component_json.copy()
        if key == 'details':
            _corrected_values_component_json[key] = 0
        else:
            _corrected_values_component_json[key] += ' - corrected!'
        _saved_component.update(_corrected_values_component_json)
        assert component_get_schema.dump(_saved_component)[key] ==\
            _corrected_values_component_json[key]


def test_component_wrong_update(
        component_get_schema, saved_component, valid_values):
    '''
    Update object with correct and wrong values.
    Wrong.
    '''
    _saved_component = saved_component(valid_values)
    _saved_component_json = component_get_schema.dump(_saved_component)
    _values_component_json = {
        key: value for (key, value) in _saved_component_json.items()
        if key not in ['identity', 'kind_id', 'locale_id']}

    # Update details with non digit:
    _updating_values_component_json = {
        key: 'z' for (key, value) in _values_component_json.items()
        if key == 'details'}
    result = _saved_component.update(_updating_values_component_json)
    assert result is not None
    assert isinstance(result, Dict)
    assert isinstance(result['error'], DataError)

    # Update fks with values out of range:
    _fks_component_json = {
        key: value for (key, value) in _saved_component_json.items()
        if key in ['kind_id', 'locale_id']}
    for key in _fks_component_json.keys():
        _wrong_fks_component_json = _fks_component_json.copy()
        _wrong_fks_component_json[key] += '_wrong'
        result = _saved_component.update(_wrong_fks_component_json)
        assert result is not None
        assert isinstance(result, Dict)
        assert isinstance(result['error'], IntegrityError)
