import pytest
from typing import Dict  # , List

from application.structure.models.structure import StructureModel


@pytest.fixture()
def saved_structure_instance(client, structure_instance):
    def _method(values: Dict = {}):
        _saved_structure = structure_instance(values)
        _saved_structure.save_to_db()
        yield _saved_structure
        if _saved_structure.is_exist:
            _saved_structure.delete_fm_db()
        yield
    return _method


# @pytest.mark.active
def test_find_by_id(saved_structure_instance, structure_get_schema,
                    view_id, attributes):
    # found
    _values = {
        'view_id': view_id,
        'attributes': attributes}
    _structure_gen = saved_structure_instance(_values)
    next(_structure_gen)
    _structure_fm_db = StructureModel.find_by_id(view_id)
    assert structure_get_schema.dump(_structure_fm_db).get('attributes') == attributes

    # not found, wrong key
    _structure_fm_db = StructureModel.find_by_id('wrong_key')
    assert _structure_fm_db is None
    next(_structure_gen)


# @pytest.mark.active
def test_update(saved_structure_instance, structure_get_schema,
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
    _structure_fm_db = StructureModel.find_by_id(view_id)

    _attributes = {**attributes, **{'05': {'test_key': 'test_value'}}}
    _structure_fm_db.update({'attributes': _attributes})

    _corrected_fm_db = StructureModel.find_by_id(view_id)

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
