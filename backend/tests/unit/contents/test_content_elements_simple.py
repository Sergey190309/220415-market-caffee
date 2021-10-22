import pytest

from application.contents.errors.custom_exceptions import (
    WrongTypeError, WrongElementKeyError, WrongElementTypeError)
from application.contents.models.content_elements_simple import (
    ContentElementsSimple)
from application.contents.models.content_element import ContentElement


@pytest.fixture
def value():
    return {
        'title': 'Mock title!',
        'content': 'Mock content.'
    }


@pytest.fixture
def content_element():
    def _method(value):
        return ContentElement(value)
    return _method


# @pytest.mark.active
def test_ContentElementsSimple_init_success(value, content_element):
    '''using value'''
    _type = 'header'
    _name = 'name'
    content_elements_simple_value = ContentElementsSimple(_type, _name, value)
    assert content_elements_simple_value.upper_index == 0
    assert content_elements_simple_value.type == _type
    assert content_elements_simple_value.name == _name
    assert isinstance(content_elements_simple_value.element, ContentElement)
    _common_items = content_elements_simple_value.serialize.items()\
        & value.items()
    assert len(_common_items) == len(content_elements_simple_value.serialize)\
        == len(value)

    '''using instance'''
    content_elements_simple_instance = ContentElementsSimple(
        _type, _name, content_element(value))
    assert content_elements_simple_instance.upper_index == 0
    assert content_elements_simple_instance.type == _type
    assert content_elements_simple_instance.name == _name
    assert isinstance(content_elements_simple_instance.element, ContentElement)
    _common_items = content_elements_simple_instance.serialize.items()\
        & value.items()
    assert len(_common_items) == len(content_elements_simple_instance.serialize)\
        == len(value)


# @pytest.mark.active
def test_ContentElementsSimple_init_fail(value):
    '''fails'''
    '''wrong_type'''
    _type = 'header'
    _name = 'name'
    _wrong_type = 'wrong_type'
    with pytest.raises(WrongTypeError) as e_info:
        ContentElementsSimple(_wrong_type, _name, value)
    assert str(e_info.value)\
        == ("Upper level element could be "
            f"'{ContentElementsSimple._type_values}', but "
            f"provided type is '{_wrong_type}'.")

    '''wrong value key'''
    _wrong_key = 'wrong'
    _wrong_value = {**value, _wrong_key: 'new value for wrong key'}
    _wrong_value.pop('title')
    with pytest.raises(WrongElementKeyError) as e_info:
        ContentElementsSimple(_type, _name, _wrong_value)
    assert str(e_info.value)\
        == ("Content element value key should be either 'title' or "
            f"'content', but one of them is '{_wrong_key}'.")

    '''wrong value type'''
    _wrong_value = 0
    with pytest.raises(WrongElementTypeError) as e_info:
        ContentElementsSimple(_type, _name, _wrong_value)
    assert str(e_info.value)\
        == ("Element type should be either 'Dict' or 'ContentElement', "
            f"but it's '{type(_wrong_value)}'.")

    '''wrong name type'''
    _wrong_name = 456
    content_elements_simple = ContentElementsSimple(
        _type, _wrong_name, value)
    assert content_elements_simple.name == ''


# @pytest.mark.active
def test_ContentElementsSimple_set_get(value):
    '''init'''
    _type = 'header'
    _name = 'name'
    content_elements_simple = ContentElementsSimple(_type, _name, value)
    assert content_elements_simple.upper_index == 0
    assert content_elements_simple.type == _type
    assert content_elements_simple.name == _name
    _common_items = content_elements_simple.serialize.items()\
        & value.items()
    assert len(_common_items) == len(content_elements_simple.serialize)\
        == len(value)
    '''success'''
    _new_type = 'footer'
    _new_name = 'new name'
    _new_content = 'new content!'
    _new_value = {'content': _new_content}
    content_elements_simple.type = _new_type
    assert content_elements_simple.type == _new_type
    content_elements_simple.name = _new_name
    assert content_elements_simple.name == _new_name
    content_elements_simple.element = _new_value
    assert content_elements_simple.serialize.get('content')\
        == _new_content
    assert content_elements_simple.serialize.get('title')\
        == value.get('title')

    '''fails'''
    '''wrong_type'''
    _wrong_type = 'wrong_type'
    with pytest.raises(WrongTypeError) as e_info:
        content_elements_simple.type = _wrong_type
    assert str(e_info.value)\
        == ("Upper level element could be '['header', 'footer']', but "
            f"provided type is '{_wrong_type}'.")
    '''wrong value key'''
    _wrong_key = 'wrong'
    _wrong_value = {**value, _wrong_key: 'new value for wrong key'}
    _wrong_value.pop('title')
    with pytest.raises(WrongElementKeyError) as e_info:
        content_elements_simple.element = _wrong_value
    assert str(e_info.value)\
        == ("Content element value key should be either 'title' or "
            f"'content', but one of them is '{_wrong_key}'.")
    # print('\ntest_content_elements_simple:',
    #       '\n test_ContentElementsSimple_set_get',
    #       '\n  _new_value ->', _new_value
    #       )
