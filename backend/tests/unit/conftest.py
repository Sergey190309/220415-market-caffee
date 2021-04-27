import pytest

from typing import Dict
from application.models.locales_global import LocaleGlobalModel


@pytest.fixture
def locale_instance(random_) -> LocaleGlobalModel:
    '''
    locale model instance without saving.
    id - 2 char random string
    description - random set of 5 words.
    '''
    def _method(values: Dict = {}) -> LocaleGlobalModel:
        return
    return _method
