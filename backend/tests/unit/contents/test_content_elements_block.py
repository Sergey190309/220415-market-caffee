import pytest

from application.contents.errors.custom_exceptions import (
    WrongElementKeyError, WrongElementTypeError, WrongTypeError,
    WrongIndexError)
from application.contents.models.content_elements_block import (
    ContentElementBlock)
from application.contents.models.content_element import ContentElement


@pytest.fixture
def element():
    def _method(id: int = 0):
        return{
            'title': f'Title value No {str(id).zfill(3)}',
            'content': f'Content value No {str(id).zfill(3)}'
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


# @pytest.mark.active
def test_check_index(elements_dict):
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'
    _elements_dict = elements_dict(_size)
    block_instance_dict = ContentElementBlock(
        _type, _subtype, _name, _elements_dict)

    '''success'''
    for index in range(_size):
        assert block_instance_dict.check_index(index)
    assert block_instance_dict.check_index(_size, ext=True)

    '''fails'''
    '''below'''
    _negative_index = -1
    with pytest.raises(WrongIndexError) as e_info:
        block_instance_dict.check_index(_negative_index)
    assert str(e_info.value)\
        == (f"Length of element array is {_size} but you try to operate "
            f"with index '{_negative_index}'.")

    '''above without ext'''
    _wrong_index = _size
    with pytest.raises(WrongIndexError) as e_info:
        block_instance_dict.check_index(_wrong_index)
    assert str(e_info.value)\
        == (f"Length of element array is {_size} but you try to operate "
            f"with index '{_wrong_index}'.")

    '''above with ext'''
    '''above without ext'''
    _wrong_index = _size + 1
    with pytest.raises(WrongIndexError) as e_info:
        block_instance_dict.check_index(_wrong_index, ext=True)
    assert str(e_info.value)\
        == (f"Length of element array is {_size} but you try to operate "
            f"with index '{_wrong_index}'.")

    # print('\ntest_content_elements_block:\ntest_check_index',
    #       '\n  result ->', result)


# @pytest.mark.active
def test_ContentElementBlock_init_success(
        element, elements_dict, elements_inst):
    _size = 5
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    '''list of dictionary elements'''
    _elements_dict = elements_dict(_size)
    block_instance_dict = ContentElementBlock(
        _type, _subtype, _name, _elements_dict)
    assert block_instance_dict.type == _type
    assert block_instance_dict.subtype == _subtype
    assert block_instance_dict.name == _name
    assert isinstance(block_instance_dict.elements, list)
    _sourse_elements = elements_dict(_size)
    for i, element in enumerate(block_instance_dict.elements):
        assert element.value.get('title')\
            == _sourse_elements[i].get('title')
        assert element.value.get('content')\
            == _sourse_elements[i].get('content')

    '''list of instances elements'''
    _elements_inst = elements_inst(_size)
    block_instance_inst = ContentElementBlock(
        _type, _subtype, _name, _elements_inst)
    assert block_instance_inst.type == _type
    assert block_instance_inst.subtype == _subtype
    assert block_instance_inst.name == _name
    assert isinstance(block_instance_inst.elements, list)
    _sourse_elements = elements_dict(_size)
    for i, element in enumerate(block_instance_inst.elements):
        assert element.value.get('title')\
            == _sourse_elements[i].get('title')
        assert element.value.get('content')\
            == _sourse_elements[i].get('content')

    # print('\ntest_content_elements_block:',
    #       '\n test_ContentElementBlock_init_success'
    #       '\n  elements ->', type(block_instance_dict.elements)
    #       )


# @pytest.mark.active
def test_ContentElementBlock_init_fail(
        element, elements_dict, elements_inst):
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'
    _elements_dict = elements_dict(_size)
    _elements_inst = elements_inst(_size)
    _wrong_element_key = 'wrong'
    _wrong_element = {
        **element(_size), _wrong_element_key: 'wrong key content'}
    _wrong_element.pop('title')

    _wrong_elements_dict = [*_elements_dict, _wrong_element]

    '''wrong content element key'''
    with pytest.raises(WrongElementKeyError) as e_info:
        ContentElementBlock(_type, _subtype, _name, _wrong_elements_dict)
    assert str(e_info.value)\
        == ("Content element value key should be either 'title' or "
            f"'content', but one of them is '{_wrong_element_key}'.")

    '''Wrong element type'''
    wrong_elements_type = [* _elements_inst]
    wrong_elements_type.append(1)
    with pytest.raises(WrongElementTypeError) as e_info:
        ContentElementBlock(_type, _subtype, _name, wrong_elements_type)
    assert str(e_info.value)\
        == ("Elements should be '['dict', 'ContentElement']', but at "
            f"least one of the elements has type '{type(1)}'.")

    '''wrong type'''
    _wrong_type = 'header'
    with pytest.raises(WrongTypeError) as e_info:
        ContentElementBlock(_wrong_type, _subtype, _name, _elements_inst)
    assert str(e_info.value)\
        == ("Upper level element could be '['vblock', 'hblock']', but "
            f"provided type is '{_wrong_type}'.")

    '''wrong subtype'''
    _wrong_subtype = 'shit'
    with pytest.raises(WrongTypeError) as e_info:
        ContentElementBlock(_type, _wrong_subtype, _name, _elements_inst)
    assert str(e_info.value)\
        == ("Block element type shoud be withing '['txt', 'pix']', but "
            f"provided subtype is '{_wrong_subtype}'.")

    print('\ntest_content_elements_block:',
          '\n test_ContentElementBlock_init_fail'
          '\n  e_info ->', e_info.value,
          )


# @pytest.mark.active
def test_ContentElementBlock_get_element(
        element,
        elements_dict,
        elements_inst
):
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    _elements_dict = elements_dict(_size)
    block_instance_dict = ContentElementBlock(
        _type, _subtype, _name, _elements_dict)
    '''success'''
    for i in range(_size):
        assert block_instance_dict.get_element(i).value.get('title')\
            == _elements_dict[i].get('title')
        assert block_instance_dict.get_element(i).value.get('content')\
            == _elements_dict[i].get('content')

    '''fail'''
    _negative_index = -1
    with pytest.raises(WrongIndexError) as e_info:
        block_instance_dict.get_element(_negative_index)
    assert str(e_info.value)\
        == (f"Length of element array is {_size} but you try to operate "
            f"with index '{_negative_index}'.")

    with pytest.raises(WrongIndexError) as e_info:
        block_instance_dict.get_element(_size)
    assert str(e_info.value)\
        == (f"Length of element array is {_size} but you try to operate "
            f"with index '{_size}'.")

    # print('\ntest_content_elements_block:',
    #       '\n test_ContentElementBlock_init_success'
    #       '\n  result ->', result.value
    #       )


# @pytest.mark.active
def test_ContentElementBlock_set_element(element, elements_dict):
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    _elements_dict = elements_dict(_size)
    block_instance_dict = ContentElementBlock(
        _type, _subtype, _name, _elements_dict)
    for i in range(_size):
        assert block_instance_dict.get_element(i).value.get('title')\
            == _elements_dict[i].get('title')
        assert block_instance_dict.get_element(i).value.get('content')\
            == _elements_dict[i].get('content')

    '''success'''
    _index_new_dict_element = 0
    _index_new_inst_element = 1
    _new_element_dict = element(_size)
    _new_element_inst = ContentElement(element(_size + 1))
    block_instance_dict.set_element(
        _index_new_dict_element, _new_element_dict)
    block_instance_dict.set_element(
        _index_new_inst_element, _new_element_inst)

    assert block_instance_dict.get_element(
        _index_new_dict_element).value.get('title')\
        == _new_element_dict.get('title')
    assert block_instance_dict.get_element(
        _index_new_dict_element).value.get('content')\
        == _new_element_dict.get('content')
    assert block_instance_dict.get_element(
        _index_new_inst_element).value.get('title')\
        == _new_element_inst.value.get('title')
    assert block_instance_dict.get_element(
        _index_new_inst_element).value.get('content')\
        == _new_element_inst.value.get('content')

    '''fail, wrong new element type'''
    _wrong_element = 1
    with pytest.raises(WrongElementTypeError) as e_info:
        block_instance_dict.set_element(0, _wrong_element)
    assert str(e_info.value)\
        == (f"Elements should be '{['dict', 'ContentElement']}', but at "
            "least one of the elements has type "
            f"'{type(_wrong_element)}'.")


@pytest.mark.active
def test_ContentElementBlock_insert(element, elements_dict):
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    _elements_dict = elements_dict(_size)
    _element = element(_size)
    block_instance = ContentElementBlock(
        _type, _subtype, _name, _elements_dict)
    assert len(block_instance.elements) == _size
    for i in range(_size):
        assert block_instance.get_element(i).value.get('title')\
            == _elements_dict[i].get('title')
        assert block_instance.get_element(i).value.get('content')\
            == _elements_dict[i].get('content')

    '''success'''
    '''insert to beginning'''
    _index = 0
    _old_last_element = block_instance.get_element(_size - 1)
    block_instance.insert(_index, _element)
    _new_last_element = block_instance.get_element(_size)

    assert len(block_instance.elements) == _size + 1
    assert block_instance.get_element(_index).value.get('title')\
        == _element.get('title')
    assert block_instance.get_element(_index).value.get('content')\
        == _element.get('content')
    assert _new_last_element.value == _old_last_element.value

    '''insert to end'''
    block_instance.remove(_index)  # return to previos conditions
    _index = _size - 1
    block_instance.insert(_index, _element)
    _new_last_element = block_instance.get_element(_size)
    assert len(block_instance.elements) == _size + 1
    # assert _new_last_element
    print('\ntest_content_elements_block:',
          '\n test_ContentElementBlock_insert',
          '\n  _element ->', _element,
          '\n  _new_last_element ->', _new_last_element.value
          )
