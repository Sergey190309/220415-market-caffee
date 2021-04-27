from typing import Dict

import pytest
from application.contents.models import ViewModel


@pytest.fixture
def saved_view_instance(client, view_instance) -> ViewModel:
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
