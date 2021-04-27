# import pytest
from typing import List
from uuid import uuid4

# from application.modules.dbs_global import dbs_global

from application.contents.models import ViewModel
from application.contents.schemas.views import (
    view_get_schema,
    # view_schema
)


# @pytest.mark.active
def test_view_instance(saved_view_instance):
    """
    GIVEN - view model
    WHEN - new view created
    THEN - check fields
    """
    _view_generator = saved_view_instance()
    _saved_view = next(_view_generator)
    # _view = view_instance()
    assert isinstance(_saved_view, ViewModel)
    assert getattr(_saved_view, 'id_view', None) is not None
    assert getattr(_saved_view, 'description', None) is not None
    # print('\ntest_view_instance, _saved_view ->', getattr(_saved_view, 'id_view'))
    # print('\ntest_view_instance, _view ->', getattr(_view, 'id_view'))

    next(_view_generator)  # to delete test instance


# @pytest.mark.active
def test_view_find(saved_view_instance, random_text, view_get_schema):

    _values = {'description': random_text(qnt=12)}
    _models = ViewModel.find(_values)
    assert len(_models) == 0
    _view_gen = saved_view_instance(_values)
    next(_view_gen)
    # print('\nunit, contents, test_view_find, _view ->', _view)
    _models = ViewModel.find(_values)
    assert len(_models) == 1
    assert view_get_schema.dump(_models[0]).get('description') == _values.get('description')
    next(_view_gen)
    _models = ViewModel.find(_values)
    assert len(_models) == 0


# @pytest.mark.active
def test_view_find_all(saved_view_instance):
    '''
    No searching criterion.
    '''
    # Create couple of saved models
    _ids = []
    _view_gens = []
    _views = []
    # create 5 sets of ids, view dederators and saved views
    for index in range(5):
        _ids.append(str(uuid4()))
        _view_gens.append(saved_view_instance({'id_view': _ids[index]}))
        _views.append(next(_view_gens[index]))

    # find all views in view
    _views_fm_db = ViewModel.find()
    assert isinstance(_views_fm_db, List)
    assert len(_views_fm_db) >= 5
    for _view_fm_db in _views_fm_db:
        assert isinstance(_view_fm_db, ViewModel)

    # destroy created views
    for _view_gen in _view_gens:
        next(_view_gen)


# @pytest.mark.active
def test_view_find_by_id(saved_view_instance):
    '''
    Find by id successfull.
    '''
    # spare id and description of saved view:
    _view_gen = saved_view_instance()
    _original_data = view_get_schema.dump(next(_view_gen))

    # Try to find instance with wrong_view_id:
    _found_view_instance = ViewModel.find_by_id('wrong_view_id')
    assert _found_view_instance is None

    # Find instance by id:
    _found_view_instance = ViewModel.find_by_id(_original_data.get('id_view'))
    _found_data = view_get_schema.dump(_found_view_instance)

    # Insure found instance is same as saved one:
    for key in _found_data.keys():
        assert _found_data[key] == _original_data[key]

    # Destroy saved view
    next(_view_gen)


# @pytest.mark.active
def test_view_update(saved_view_instance):
    # spare id and description of saved view:
    _view_gen = saved_view_instance()
    _view = next(_view_gen)
    _original_data = view_get_schema.dump(_view)

    # Change description and update instance:
    _changed_data = _original_data.copy()
    _changed_data['description'] += ' !corrected!'
    _view.update(_changed_data)

    # Get instance by id from db:
    _found_view = ViewModel.find_by_id(_original_data.get('id_view'))
    _found_data = view_get_schema.dump(_found_view)
    # print(_found_data)

    # Insure instance has been updated:
    assert _original_data.get('description') != _found_data.get('description')
    for key in _found_data.keys():
        assert _changed_data[key] == _found_data[key]

    # Destroy saved view
    next(_view_gen)


# @pytest.mark.active
def test_view_is_exist(saved_view_instance):
    # create saved view:
    _view_gen = saved_view_instance()
    _view = next(_view_gen)
    # print('\nunit, views, is exists testing, _view ->', _view)
    assert _view.is_exist()
    # Destroy saved view
    next(_view_gen)
    assert not _view.is_exist()


# @pytest.mark.active
def test_view_delete(saved_view_instance):
    # spare id and description of saved view:
    _view_gen = saved_view_instance()
    _view = next(_view_gen)
    _original_data = view_get_schema.dump(_view)

    # Find by id and insure is exists:
    _found_view = ViewModel.find_by_id(_original_data.get('id_view'))
    assert _found_view is not None

    # Delete instance:
    _view.delete_fm_db()

    # Try to find by id and get None as a result:
    _found_view = ViewModel.find_by_id(_original_data.get('id_view'))
    assert _found_view is None

    # Destroy saved view it's not nesessary here couse the instance already deleted
    next(_view_gen)
