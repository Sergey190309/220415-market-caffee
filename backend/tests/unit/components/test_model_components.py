from typing import Dict

import pytest

# from application.modules.dbs_global import dbs_global

from application.components.models import ComponentModel

# from application.global_init_data import global_constants
# from application.components.local_init_data_components import components_constants


@pytest.fixture(scope='module')
def saved_component(component_instance):
    # _values = {}
    def _method(values: Dict = {}):

        _component = component_instance(values)
        # print(_component)
        result = _component.save_to_db()
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
        # print(_found_component)

    # Create wrong searching patterns values and
    # try to find components (marshmallow error):
    # for key in _searching_criterions.keys():
    #     _wrong_searching_criterions = _searching_criterions.copy()
    #     _bad_key = key + '_bad'
    #     _wrong_searching_criterions[_bad_key] = _wrong_searching_criterions.pop(key)
    #     _found_component = ComponentModel.find_by_identity_kind_locale(
    #         _wrong_searching_criterions)


# @pytest.mark.active
def test_component_save_same_pks():
    '''
    Save with same primary keys.
    Wrong.
    '''
    pass


# @pytest.mark.active
def test_component_save_different_pks():
    '''
    Save with primary keys where one of them is different only.
    Right.
    '''
    pass


# @pytest.mark.active
def test_component_save_wrong_fks():
    '''
    Save fks that are not in approprite tables.
    Wrong.
    '''
    pass


# @pytest.mark.active
def test_component_update():
    '''
    Update object with correct and wrong values.
    Right.
    Wrong.
    '''
    pass
