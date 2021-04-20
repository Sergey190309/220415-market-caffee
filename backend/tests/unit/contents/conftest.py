from typing import Dict

import pytest
from application.contents.models import ViewModel


@pytest.fixture
def view_instance(random_text_underscore, random_text):
    def _method(values: Dict = {}):
        # print('\nunit, contents. view_instance, values ->', values)
        if values.get('id_view', ) is None:
            values['id_view'] = random_text_underscore(qnt=3)
        if values.get('description', ) is None:
            values['description'] = random_text(qnt=10)
        # print('unit, contents. view_instance, values ->', values)
        _view_instance = ViewModel(**values)
        return _view_instance
    return _method


@pytest.fixture
def saved_view_instance(client, view_instance,
                        random_text_underscore,
                        random_text) -> ViewModel:
    '''
    This fixture test save action.
    '''
    def _method(values: Dict = {}):
        _view_instance = view_instance(values=values)
        _view_instance.save_to_db()
        # print('\nbefore yield')
        yield _view_instance
        # print('after yield')
        if _view_instance.is_exist():
            _view_instance.delete_fm_db()
        yield
        # yield 'Success'
    return _method
