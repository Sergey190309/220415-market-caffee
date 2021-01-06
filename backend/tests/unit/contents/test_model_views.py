import pytest

from application.modules.dbs_global import dbs_global

from application.contents.models import ViewModel
from application.contents.schemas.views import view_get_schema, view_schema


@pytest.fixture
def view_json(view_instance, random_words):
    return view_get_schema.dump(view_instance(random_words() + random_words()))


@pytest.fixture
def saved_view_instance(view_json):
    '''
    This fixture test save action.
    '''
    _view_instance = view_schema.load(view_json, session=dbs_global.session)
    _view_instance.save_to_db()
    return _view_instance


# @pytest.mark.active
def test_view_find(test_client, saved_view_instance):
    '''
    Find successfull.
    '''
    # Spare id and old description:
    _original_data = view_get_schema.dump(saved_view_instance)

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
def test_view_update(test_client, saved_view_instance):
    pass
    # Spare id and old description:
    _original_data = view_get_schema.dump(saved_view_instance)

    # Change description and update instance:
    _changed_data = _original_data.copy()
    _changed_data['description'] += ' !corrected!'
    saved_view_instance.update(_changed_data)

    # Get instance by id from db:
    _found_view_instance = ViewModel.find_by_id(_original_data['id_view'])
    _found_data = view_get_schema.dump(_found_view_instance)

    # Insure instance has been updated:
    assert _original_data['description'] != _found_data['description']
    for key in _found_data.keys():
        assert _changed_data[key] == _found_data[key]


# @pytest.mark.active
def test_view_delete(test_client, saved_view_instance):
    pass
    # Spare id and old description:
    _original_data = view_get_schema.dump(saved_view_instance)

    # Find by id and insure is exists:
    _found_view_instance = ViewModel.find_by_id(_original_data['id_view'])
    assert _found_view_instance is not None

    # Delete instance:
    saved_view_instance.delete_fm_db()

    # Try to find by id and get None as a result:
    _found_view_instance = ViewModel.find_by_id(_original_data['id_view'])
    assert _found_view_instance is None
