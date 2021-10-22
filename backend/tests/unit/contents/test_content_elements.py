import pytest

from application.contents.errors.custom_exceptions import WrongIndexError
from application.contents.models.content_elements import ContentElements


# @pytest.fixture
# def

# @pytest.mark.active
def test_ContentElements_success():
    '''init, success'''
    _index = 5
    content_elements = ContentElements(_index)
    assert content_elements.upper_index == _index
    '''set / get, success'''
    _new_index = 10
    content_elements.index = _new_index
    assert content_elements.index == _new_index


# @pytest.mark.active
def test_ContentElements_fail():
    '''init, success'''
    _index = 5
    content_elements = ContentElements(_index)
    assert content_elements.upper_index == _index
    '''set / get, fail'''
    _new_index = -1
    with pytest.raises(WrongIndexError) as e_info:
        content_elements.upper_index = _new_index
    assert str(e_info.value)\
        == f"Index has been '{_new_index}', it's wrong."
    _new_index = 100
    with pytest.raises(WrongIndexError) as e_info:
        content_elements.upper_index = _new_index
    assert str(e_info.value)\
        == f"Index has been '{_new_index}', it's wrong."
    '''init, wrong'''
    _wrong_index = -1
    with pytest.raises(WrongIndexError) as e_info:
        content_elements = ContentElements(_wrong_index)
    assert str(e_info.value)\
        == f"Index has been '{_wrong_index}', it's wrong."
    _wrong_index = 100
    with pytest.raises(WrongIndexError) as e_info:
        content_elements = ContentElements(_wrong_index)
    assert str(e_info.value)\
        == f"Index has been '{_new_index}', it's wrong."
