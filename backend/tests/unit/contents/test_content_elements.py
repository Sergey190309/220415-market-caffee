import pytest
from typing import List
from random import randrange


from application.contents.errors.custom_exceptions import (
    WrongIndexError, WrongTypeError, WrongDirection)
from application.contents.models.content_elements import ContentElements


@pytest.fixture
def values():
    def _method(
            index: int = 5, type: str = 'type01',
            types: List = ['type00', 'type01', 'type02'],
            name: str = 'name'):
        return {
            'index': index,
            'type': type,
            'types': types,
            'name': name,
        }
    return _method


# @pytest.mark.active
def test_ContentElements_init_success(values):
    '''init, success'''
    _index, _type, _types, _name = values().values()
    content_elements = ContentElements(
        upper_index=_index, type=_type,
        types=_types, name=_name)
    assert content_elements.upper_index == _index
    assert content_elements.type == _type
    assert content_elements.name == _name


# @pytest.mark.active
def test_ContentElements_init_fail(values):
    _index, _type, _types, _name = values().values()
    '''wrongindex'''
    '''negative index'''
    _wrong_index = -1
    with pytest.raises(WrongIndexError) as e_info:
        ContentElements(upper_index=_wrong_index, type=_type,
                        types=_types, name=_name)
    assert str(e_info.value)\
        == f"Index has been '{_wrong_index}', it's wrong."
    '''very big index'''
    _wrong_index = 100
    with pytest.raises(WrongIndexError) as e_info:
        ContentElements(upper_index=_wrong_index, type=_type,
                        types=_types, name=_name)
    assert str(e_info.value)\
        == f"Index has been '{_wrong_index}', it's wrong."
    '''wrong type'''
    _wrong_type = 'wrong_type'
    with pytest.raises(WrongTypeError) as e_info:
        ContentElements(upper_index=_index, type=_wrong_type,
                        types=_types, name=_name)
    assert str(e_info.value)\
        == (f"Upper level element could be '{_types}', but provided type "
            f"is '{_wrong_type}'.")

    '''wrong name type'''
    _wrong_name = 5
    content_elements = ContentElements(upper_index=_index, type=_type,
                                       types=_types, name=_wrong_name)
    assert content_elements.name == ''


# @pytest.mark.active
def test_ContentElements_set_get_success(values):
    '''init, success'''
    _index, _type, _types, _name = values().values()
    content_elements = ContentElements(
        upper_index=_index, type=_type,
        types=_types, name=_name)
    '''set / get, success'''
    _new_index = 10
    _new_type = 'type02'
    _new_name = 'new name'
    content_elements.upper_index = _new_index
    assert content_elements.upper_index == _new_index
    content_elements.type = _new_type
    assert content_elements.type == _new_type
    content_elements.name = _new_name
    assert content_elements.name == _new_name
    # print('\ntest_content_elements:',
    #       '\n test_ContentElements_init_success',
    #   '\n  values ->', _values,
    #   )


# @pytest.mark.active
def test_ContentElements_ul_index(values):
    _index, _type, _types, _name = values(
        index=randrange(1, 99)).values()
    content_elements = ContentElements(
        upper_index=_index, type=_type,
        types=_types, name=_name)

    '''success'''
    result = content_elements.ul_index(direction='inc')
    assert content_elements.upper_index == _index + 1 == result
    result = content_elements.ul_index(direction='dec')
    assert content_elements.upper_index == _index == result

    _old_index = randrange(1, 99)
    result = content_elements.ul_index(
        direction='inc', index=_old_index)
    assert content_elements.upper_index == _old_index + 1 == result
    _old_index = randrange(1, 99)
    result = content_elements.ul_index(
        direction='dec', index=_old_index)
    assert content_elements.upper_index == _old_index - 1 == result

    '''wrong direction'''
    _wrong = 'fuck'
    with pytest.raises(WrongDirection) as e_info:
        content_elements.ul_index(direction=_wrong)
    assert str(e_info.value)\
        == ("Index change direction may be either 'inc' as increase or "
            f"'dec' as decrease, but '{_wrong}' has been provided.")

    _old_index = 99
    with pytest.raises(WrongIndexError) as e_info:
        content_elements.ul_index(direction='inc', index=_old_index)
    assert str(e_info.value)\
        == f"Index has been '{_old_index + 1}', it's wrong."
    _old_index = 0
    with pytest.raises(WrongIndexError) as e_info:
        content_elements.ul_index(direction='dec', index=_old_index)
    assert str(e_info.value)\
        == f"Index has been '{_old_index - 1}', it's wrong."

    # print('\ntest_content_elements:',
    #       '\n test_ContentElements_ul_index',
    #       '\n  content_elements.upper_index ->',
    #       content_elements.upper_index,
    #       )
