import pytest

from application.modules.dbs_global import dbs_global

# from application.components.schemas.component_kinds import component_kind_get_schema
from application.components.models.component_kinds import ComponentKindsModel
# from application


@pytest.fixture(scope='module')
def compnent_kind_json(component_kind_instance, component_kinds_get_schema):
    return component_kinds_get_schema.dump(component_kind_instance())


@pytest.fixture(scope='module')
def saved_component_kind(component_kind_instance):
    _saved_component_kind = component_kind_instance()
    error_message = _saved_component_kind.save_to_db()
    if error_message is not None:
        return error_message
    return _saved_component_kind


# @pytest.mark.active
def test_component_kind_save(
        component_kinds_get_schema, component_kinds_schema,
        compnent_kind_json):
    '''
    Testing save with same private key.
    '''
    _first_compnent_kind = component_kinds_schema.load(
        compnent_kind_json, session=dbs_global.session)
    error_message01 = _first_compnent_kind.save_to_db()
    assert error_message01 is None
    _json = compnent_kind_json.copy()
    _second_compnent_kind = ComponentKindsModel(**_json)
    error_message02 = _second_compnent_kind.save_to_db()
    if error_message02 is not None:
        assert error_message02.find('conflicts with persistent instance') != -1


# @pytest.mark.active
def test_component_kind_find(saved_component_kind):
    '''
    Testing find_by_id.
    '''
    _component_kind_id = saved_component_kind.id_kind
    _found = ComponentKindsModel.find_by_id(_component_kind_id)
    assert saved_component_kind.description == _found.description


# @pytest.mark.active
def test_component_kind_update(saved_component_kind, component_kinds_get_schema):
    '''
    Testing update.
    '''
    _ck_json = component_kinds_get_schema.dump(saved_component_kind)
    _update_json = {
        key: (value + ' !corrected!') for (key, value) in _ck_json.items()
        if key == 'description'}
    _id_kind = _ck_json['id_kind']
    saved_component_kind.update(_update_json)
    _found = ComponentKindsModel.find_by_id(_id_kind)
    assert _update_json['description'] == _found.description


# @pytest.mark.active
def test_component_kind_delete(saved_component_kind, component_kinds_get_schema):
    '''
    Testing delete.
    '''
    _id_kind = component_kinds_get_schema.dump(saved_component_kind)['id_kind']
    print(_id_kind)
    _found = ComponentKindsModel.find_by_id(_id_kind)
    assert _found is not None
    saved_component_kind.delete_fm_db()
    _found = ComponentKindsModel.find_by_id(_id_kind)
    assert _found is None
