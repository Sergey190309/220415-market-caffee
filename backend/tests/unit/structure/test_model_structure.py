import pytest
from typing import Dict  # , List

from application.structure.models.structure import StructureModel
from application.global_init_data import global_constants


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
def test_find(saved_structure_instance, structure_get_schema):
    # Clean up the structure table
    StructureModel.query.delete()

    # Create structures
    _global_keys = global_constants.get_VIEWS_PKS
    _structure_gens = [saved_structure_instance({'view_id': key})
                       for key in _global_keys]
    [next(_structure_gen) for _structure_gen in _structure_gens]

    # Find all available structures
    _result = StructureModel.find()
    _json_result = [structure_get_schema.dump(structure) for structure in _result]
    # [print(item) for item in _json_result]
    assert len(_result) == 5
    _keys = [item.get('view_id') for item in _json_result]
    _keys.sort()
    _global_keys.sort()
    assert _keys == _global_keys

    # Find specific user_id and view_id
    qnt = 3  # elements for update and further search
    _user_id = 10  # user_id for update
    _searching_keys = _global_keys[0: qnt]
    _structures = [StructureModel.find_by_id(key) for key in _searching_keys]
    [structure.update({'user_id': _user_id}) for structure in _structures]
    _list_by_user_id = StructureModel.find({'user_id': _user_id})
    assert len(_list_by_user_id) == qnt

    # Find nothing, using woring keys
    _list_by_user_id = StructureModel.find({'user_id': 256})
    # print('\n', _list_by_user_id)
    assert len(_list_by_user_id) == 0

    # clean up the table
    [next(_structure_gen) for _structure_gen in _structure_gens]


# @pytest.mark.active
def test_find_by_id(saved_structure_instance, structure_get_schema, attributes):
    # found
    _view_id = global_constants.get_VIEWS_PKS[0]
    # clean up
    _structure_fm_db = StructureModel.find_by_id(_view_id)
    if _structure_fm_db is not None:
        _structure_fm_db.delete_fm_db()
    # print('\ntest model structure, test_find_by_id, _view_id ->', _view_id)
    # print('test model structure, test_find_by_id, attributes ->', attributes)
    _values = {
        'view_id': _view_id,
        'attributes': attributes}
    _structure_gen = saved_structure_instance(_values)
    next(_structure_gen)
    _structure_fm_db = StructureModel.find_by_id(_view_id)
    # print('test model structure, test_find_by_id, _structure_fm_db ->',
    #       structure_get_schema.dump(_structure_fm_db))
    assert structure_get_schema.dump(_structure_fm_db).get('attributes') == attributes

    # not found, wrong key
    _structure_fm_db = StructureModel.find_by_id('wrong_key')
    assert _structure_fm_db is None

    # Clean up omitted due to nessicity to have full set structures.
    # next(_structure_gen)


# @pytest.mark.active
def test_update(saved_structure_instance, structure_get_schema,
                attributes):
    _view_id = global_constants.get_VIEWS_PKS[0]
    structure_fm_db = StructureModel.find_by_id(_view_id)

    # Clean up the table
    if structure_fm_db is not None:
        structure_fm_db.delete_fm_db()

    _values = {
        'view_id': _view_id,
        'attributes': attributes}
    _structure_gen = saved_structure_instance(_values)
    next(_structure_gen)
    _structure_fm_db = StructureModel.find_by_id(_view_id)

    _attributes = {**attributes, **{'05': {'test_key': 'test_value'}}}
    _structure_fm_db.update({'attributes': _attributes})

    _corrected_fm_db = StructureModel.find_by_id(_view_id)

    assert structure_get_schema.dump(_corrected_fm_db).get('attributes') == _attributes
    assert isinstance(structure_get_schema.dump(_corrected_fm_db).get('updated'), str)
    # assert structure_get_schema.dump(_corrected_fm_db).get('attributes') == attributes
    next(_structure_gen)


# @pytest.mark.active
def test_delete(saved_structure_instance, structure_get_schema,
                view_id, attributes):
    structure_fm_db = StructureModel.find_by_id(view_id)

    # Clean up the table
    if structure_fm_db is not None:
        structure_fm_db.delete_fm_db()

    _values = {
        'view_id': view_id,
        'attributes': attributes}

    _structure_gen = saved_structure_instance(_values)
    next(_structure_gen)
    # check instance exists
    _structure_fm_db = StructureModel.find_by_id(view_id)
    assert structure_get_schema.dump(_structure_fm_db).get('attributes') == attributes

    # delete instace and insure it has desappeared
    _structure_fm_db.delete_fm_db()
    _structure_fm_db = StructureModel.find_by_id(view_id)
    assert structure_get_schema.dump(_structure_fm_db) == {}
    # print('\nunit, test, structure _corrected_fm_db ->',
    #       structure_get_schema.dump(_structure_fm_db))
    next(_structure_gen)
