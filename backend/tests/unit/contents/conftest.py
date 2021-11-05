from typing import Dict
import pytest

from application.contents.models.content_element import ContentElement
from application.contents.models.contents import ContentModel


@pytest.fixture
def value():
    def _method(marker: str = 0):
        return {
            'title': f'Mock title! {marker}',
            'content': f'Mock content. {marker}'
        }
    return _method


@pytest.fixture
def content_element():
    def _method(value):
        return ContentElement(value)
    return _method


@pytest.fixture
def element():
    def _method(id: int = 0):
        return{
            'title': f'Title value No {str(id).zfill(3)}',
            'content': f'Content value No {str(id).zfill(3)}'
        }
    return _method


@pytest.fixture
def element_dict():
    def _method(marker: str = ''):
        return {
            'title': f"Title value. Marker - '{marker}'",
            'content': f"Content value. Marker - '{marker}'"
        }
    return _method


@pytest.fixture
def elements_dict(element):
    def _method(size: int = 0):
        _elements = []
        [_elements.append(element(i)) for i in range(size)]
        return _elements
    return _method


@pytest.fixture
def elements_inst(element):
    def _method(size: int = 0):
        _elements = []
        [_elements.append(ContentElement(element(i)))
         for i in range(size)]
        return _elements
    return _method


@pytest.fixture
def saved_content_instance(client, content_instance) -> ContentModel:
    def _method(values: Dict = {}) -> ContentModel:
        # print('\nsaved_content_instance, values ->', values)
        _saved_content = content_instance(values)
        _saved_content.save_to_db()
        # print('\nsaved_content_instance, _saved_content ->', _saved_content)
        yield _saved_content
        if _saved_content.is_exist():
            _saved_content.delete_fm_db()
        yield
    return _method
