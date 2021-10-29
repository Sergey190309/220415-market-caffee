import pytest

from application.contents.errors.custom_exceptions import (
    WrongIndexError, WrongTypeError)
from application.contents.models.content_elements import ContentElements


@pytest.fixture
def values():
    return {
        'index': 5,
        'type': 'type01',
        'types': ['type00', 'type01', 'type02'],
        'name': 'name',
    }


# @pytest.mark.active
def test_ContentElements_init_success(values):
    '''init, success'''
    _index, _type, _types, _name = values.values()
    content_elements = ContentElements(
        upper_index=_index, type=_type,
        types=_types, name=_name)
    assert content_elements.upper_index == _index
    assert content_elements.type == _type
    assert content_elements.name == _name


# @pytest.mark.active
def test_ContentElements_init_fail(values):
    _index, _type, _types, _name = values.values()
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
    _index, _type, _types, _name = values.values()
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
