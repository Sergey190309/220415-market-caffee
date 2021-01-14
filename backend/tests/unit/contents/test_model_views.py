from typing import Dict
import pytest

# from application.modules.dbs_global import dbs_global

from application.contents.models import ViewModel
from application.contents.schemas.views import (
    view_get_schema,
    # view_schema
)


@pytest.fixture
def saved_view_instance(view_instance):
    '''
    This fixture test save action.
    '''
    def _method(values: Dict = {}):
        _view_instance = view_instance(values=values)
        _view_instance.save_to_db()
        return _view_instance
    return _method


# @pytest.mark.active
def test_view_find(saved_view_instance):
    _values = {
        'description': 'test'
    }
    _view01 = saved_view_instance(_values)
    _view02 = saved_view_instance(_values)
    _view03 = saved_view_instance(_values)
    _view_jsons = []
    _view_jsons.append(view_get_schema.dump(_view01))
    _view_jsons.append(view_get_schema.dump(_view02))
    _view_jsons.append(view_get_schema.dump(_view03))
    _models = ViewModel.find(_values)
    # print(len(_view_jsons))
    # print(len(_models))
    for i, item in enumerate(_view_jsons):
        assert view_get_schema.dump(
            item)['description'] == _view_jsons[i]['description']
        print(i, '\t', view_get_schema.dump(item), '\t', _view_jsons[i])
    _values['id_view'] = _view_jsons[0]['id_view']
    _models = ViewModel.find(_values)
    _model_json = view_get_schema.dump(_models)
    for key in _model_json.keys():
        assert _view_jsons[0][key] == _model_json[key]
    # print(_models)
    _view01.delete_fm_db()
    _view02.delete_fm_db()
    _view03.delete_fm_db()


# @pytest.mark.active
def test_view_find_by_id(saved_view_instance):
    '''
    Find by id successfull.
    '''
    # Spare id and old description:
    _original_data = view_get_schema.dump(saved_view_instance())

    # Try to find instance with wrong_view_id:
    _found_view_instance = ViewModel.find_by_id('wrong_view_id')
    assert _found_view_instance is None

    # Find instance by id:
    _found_view_instance = ViewModel.find_by_id(_original_data['id_view'])
    _found_data = view_get_schema.dump(_found_view_instance)

    # Insure found instance is same as saved one:
    for key in _found_data.keys():
        assert _found_data[key] == _original_data[key]


# @pytest.mark.active
def test_view_update(saved_view_instance):
    # Spare id and old description:
    _saved_view_instance = saved_view_instance()
    _original_data = view_get_schema.dump(_saved_view_instance)

    # Change description and update instance:
    _changed_data = _original_data.copy()
    _changed_data['description'] += ' !corrected!'
    _saved_view_instance.update(_changed_data)

    # Get instance by id from db:
    _found_view_instance = ViewModel.find_by_id(_original_data['id_view'])
    _found_data = view_get_schema.dump(_found_view_instance)

    # Insure instance has been updated:
    assert _original_data['description'] != _found_data['description']
    for key in _found_data.keys():
        assert _changed_data[key] == _found_data[key]


# @pytest.mark.active
def test_view_delete(saved_view_instance):
    # Spare id and old description:
    _saved_view_instance = saved_view_instance()
    _original_data = view_get_schema.dump(_saved_view_instance)

    # Find by id and insure is exists:
    _found_view_instance = ViewModel.find_by_id(_original_data['id_view'])
    assert _found_view_instance is not None

    # Delete instance:
    _saved_view_instance.delete_fm_db()

    # Try to find by id and get None as a result:
    _found_view_instance = ViewModel.find_by_id(_original_data['id_view'])
    assert _found_view_instance is None
