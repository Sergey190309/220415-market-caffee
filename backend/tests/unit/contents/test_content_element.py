import pytest

from application.contents.errors.custom_exceptions import (
    WrongElementKeyError)

from application.contents.models.content_element import ContentElement


@pytest.fixture
def value():
    return {
        'title': 'Mock title!',
        'content': 'Mock content.'
    }


# @pytest.mark.active
def test_ContentElement_check_keys(value):
    '''success'''
    assert ContentElement.check_keys(value)
    '''wrong key'''
    _wrong_title_key = 'wrong_title'
    _wrong_key_value = {**value, _wrong_title_key: 'Mock title!'}
    _wrong_key_value.pop('title')
    with pytest.raises(WrongElementKeyError) as e_info:
        ContentElement.check_keys(_wrong_key_value)
    assert str(e_info.value)\
        == ("Content element value key should be either 'title' "
            f"or 'content', but one of them is '{_wrong_title_key}'.")
    _wrong_content_key = 'wrong_content'
    _wrong_key_value = {**value, _wrong_content_key: 'Mock content.'}
    _wrong_key_value.pop('content')
    with pytest.raises(WrongElementKeyError) as e_info:
        ContentElement.check_keys(_wrong_key_value)
    assert str(e_info.value)\
        == ("Content element value key should be either 'title' "
            f"or 'content', but one of them is '{_wrong_content_key}'.")


# @pytest.mark.active
def test_ContentElement_init(value):
    '''Checking initiation and setter / getter'''
    '''success'''
    content_element = ContentElement(value)
    common_items = content_element.value.items()\
        & value.items()
    assert len(content_element.value) == len(value) == len(common_items)
    _changed_title = 'Changed title'
    content_element.value = {'title': _changed_title}
    assert content_element.value.get('title') == _changed_title
    assert content_element.value.get('content') == value.get('content')
    '''wrong key'''
    '''setter'''
    _changed_content = 'Changed content'
    _wrong_content_key = 'wrong_content'
    with pytest.raises(WrongElementKeyError) as e_info:
        content_element.value = {_wrong_content_key: _changed_content}
    assert str(e_info.value)\
        == ("Content element value key should be either 'title' "
            f"or 'content', but one of them is '{_wrong_content_key}'.")
    '''init'''
    _wrong_title_key = 'wrong_title'
    _wrong_key_value = {**value, _wrong_title_key: 'Mock title!'}
    _wrong_key_value.pop('title')
    with pytest.raises(WrongElementKeyError) as e_info:
        content_element = ContentElement(_wrong_key_value)
    assert str(e_info.value)\
        == ("Content element value key should be either 'title' "
            f"or 'content', but one of them is '{_wrong_title_key}'.")
    _wrong_content_key = 'wrong_content'
    _wrong_key_value = {**value, _wrong_content_key: 'Mock content.'}
    _wrong_key_value.pop('content')
    with pytest.raises(WrongElementKeyError) as e_info:
        content_element = ContentElement(_wrong_key_value)
    assert str(e_info.value)\
        == ("Content element value key should be either 'title' "
            f"or 'content', but one of them is '{_wrong_content_key}'.")
    # print('\ntest_content_element:\n test_ContentElement_init',
    #       '\n  content_element.value ->', content_element.value,
    #       '\n  value ->', value,
    #       '\n  common_items ->', common_items,
    #       )
