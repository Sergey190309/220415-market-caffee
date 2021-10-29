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
    '''initializing using values'''
    _upper_index = 6
    _type = 'header'
    _name = 'name'
    content_elements_simple_value = ContentElementsSimple(
        upper_index=_upper_index, type=_type, name=_name, element=value)
    assert content_elements_simple_value.upper_index == _upper_index
    assert content_elements_simple_value.type == _type
    assert content_elements_simple_value.name == _name
    assert isinstance(content_elements_simple_value.element,
                      ContentElement)
    assert content_elements_simple_value.element.value == value

    '''initializing using instance'''
    content_elements_simple_instance = ContentElementsSimple(
        upper_index=_upper_index, type=_type, name=_name, element=value)
    assert content_elements_simple_instance.upper_index == _upper_index
    assert content_elements_simple_instance.type == _type
    assert content_elements_simple_instance.name == _name
    assert isinstance(content_elements_simple_instance.element,
                      ContentElement)
    assert content_elements_simple_instance.element.value == value


# @pytest.mark.active
def test_ContentElementsSimple_init_fail(value):
    '''fails'''
    '''wrong_type'''
    _upper_index = 6
    _type = 'header'
    _name = 'name'
    _wrong_type = 'wrong_type'
    with pytest.raises(WrongTypeError) as e_info:
        ContentElementsSimple(
            upper_index=_upper_index, type=_wrong_type,
            name=_name, element=value)
    assert str(e_info.value)\
        == ("Upper level element could be "
            f"'{ContentElementsSimple._type_values}', but "
            f"provided type is '{_wrong_type}'.")

    '''wrong value key'''
    _wrong_key = 'wrong'
    _wrong_value = {**value, _wrong_key: 'new value for wrong key'}
    _wrong_value.pop('title')
    with pytest.raises(WrongElementKeyError) as e_info:
        ContentElementsSimple(
            upper_index=_upper_index, type=_type,
            name=_name, element=_wrong_value)
    assert str(e_info.value)\
        == ("Content element value key should be either 'title' or "
            f"'content', but one of them is '{_wrong_key}'.")

    '''wrong value type'''
    _wrong_value = 0
    with pytest.raises(WrongElementTypeError) as e_info:
        ContentElementsSimple(
            upper_index=_upper_index, type=_type,
            name=_name, element=_wrong_value)
    assert str(e_info.value)\
        == ("Element type should be either 'Dict' or 'ContentElement', "
            f"but it's '{type(_wrong_value)}'.")

    '''wrong name type'''
    _wrong_name = 456
    content_elements_simple = ContentElementsSimple(
        upper_index=_upper_index, type=_type,
        name=_wrong_name, element=value)
    assert content_elements_simple.name == ''


# @pytest.mark.active
def test_ContentElementsSimple_set_get(value):
    '''init'''
    _upper_index = 6
    _type = 'header'
    _name = 'name'
    content_elements_simple = ContentElementsSimple(
        upper_index=_upper_index, type=_type,
        name=_name, element=value)
    # _type, _name, value)
    assert content_elements_simple.upper_index == _upper_index
    assert content_elements_simple.type == _type
    assert content_elements_simple.name == _name
    assert content_elements_simple.element.value == value

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
    assert content_elements_simple.element.value == {
        'title': value.get('title'),
        'content': _new_content
    }

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


# @pytest.mark.active
def test_ContentElementsSimple_serialize_to_content(value):
    '''init'''
    _upper_index = 6
    _type = 'header'
    _name = 'name'
    content_element = ContentElementsSimple(
        upper_index=_upper_index, type=_type,
        name=_name, element=value)
    assert content_element.upper_index == _upper_index
    assert content_element.type == _type
    assert content_element.name == _name
    assert content_element.element.value == value
    assert content_element.serialize_to_content.get('identity')\
        == '_'.join([str(_upper_index).zfill(2), _type])
    assert content_element.serialize_to_content.get('element')\
        == value
    result = content_element.serialize_to_content
    print('\ntest_content_element:',
          '\n test_ContentElementsSimple_serialize_to_content',
          '\n  result ->', result
          )


# @pytest.mark.active
def test_ContentElementsSimple_serialize_to_structure(value):
    '''init'''
    _upper_index = 6
    _type = 'header'
    _name = 'name'
    content_element = ContentElementsSimple(
        upper_index=_upper_index, type=_type,
        name=_name, element=value)
    assert content_element.upper_index == _upper_index
    assert content_element.type == _type
    assert content_element.name == _name
    assert content_element.element.value == value
    assert content_element.serialize_to_structure\
        == {
            str(_upper_index).zfill(2): {
                'name': _name,
                'type': _type
            }
        }
    # result = content_element.serialize_to_structure
    # print('\ntest_content_element:',
    #       '\n test_ContentElementsSimple_serialize_to_content',
    #       '\n  result ->', result
    #       )
