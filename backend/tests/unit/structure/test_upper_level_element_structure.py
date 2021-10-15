import pytest

from application.global_init_data import global_constants
from application.structure.errors.custom_exceptions import (
    UpperLevelElementWrongKey,
    UpperLevelElementWrongValue,
    UpperLevelElementIncorrectQntAction,
    # UpperLevelStructureWrongKeys
)
from application.structure.models.upper_level_element_structure import UpperLevelElement


@pytest.fixture
def block_raw_data():
    return {
        "type": "hblock",
        "subtype": "pix",
        "qnt": 7,
        "name": "hblock00",
    }


@pytest.fixture
def simple_raw_data():
    return {
        "type": "header",
        "name": "header00",
    }


# @pytest.mark.active
def test_UpperLevelElement_init(block_raw_data, simple_raw_data):
    '''It tests correct keys are workable only'''
    '''success'''
    _block_raw_data = {f'_{k}': v for (k, v) in block_raw_data.items()}
    _simple_raw_data = {f'_{k}': v for (k, v) in simple_raw_data.items()}
    block_upper_level_element = UpperLevelElement(block_raw_data)
    header_upper_level_element = UpperLevelElement(simple_raw_data)
    # print('\ntest_upper_level_element_structure:',
    #       '\n test_UpperLevelElement_init'
    #       '\n  block_upper_level_element ->', block_upper_level_element.__dict__,
    #       '\n  header_upper_level_element ->', header_upper_level_element.__dict__
    #       )
    block_common_items = \
        block_upper_level_element.__dict__.items() & \
        _block_raw_data.items()
    header_common_items = \
        header_upper_level_element.__dict__.items() & \
        _simple_raw_data.items()
    assert len(
        block_upper_level_element.__dict__) == len(
            block_raw_data) == len(
                block_common_items)
    assert len(
        header_upper_level_element.__dict__) == len(
            simple_raw_data) == len(
                header_common_items)
    '''wrong keys'''
    for k in block_raw_data.keys():
        wrong_raw_data = {**block_raw_data}
        wrong_raw_data.pop(k)
        wrong_raw_data[f'{k}_'] = block_raw_data.get(k)
        with pytest.raises(
                UpperLevelElementWrongKey) as e_info:
            UpperLevelElement(wrong_raw_data)
        assert str(e_info.value) == f'_{k}_'

    for k in simple_raw_data.keys():
        wrong_raw_data = {**simple_raw_data}
        wrong_raw_data.pop(k)
        wrong_raw_data[f'{k}_'] = simple_raw_data.get(k)
        with pytest.raises(
                UpperLevelElementWrongKey) as e_info:
            UpperLevelElement(wrong_raw_data)
        assert str(e_info.value) == f'_{k}_'
    '''wrong type'''
    wrong_raw_data = {
        **block_raw_data,
        'type': f'{block_raw_data.get("type")}_'}
    with pytest.raises(UpperLevelElementWrongValue) as e_info:
        UpperLevelElement((wrong_raw_data))
    assert str(e_info.value) == wrong_raw_data.get('type')
    '''wrong subtype'''
    wrong_raw_data = {
        **block_raw_data,
        'subtype': f'{block_raw_data.get("subtype")}_'}
    with pytest.raises(UpperLevelElementWrongValue) as e_info:
        UpperLevelElement((wrong_raw_data))
    assert str(e_info.value) == wrong_raw_data.get('subtype')


# @pytest.mark.active
def test_UpperLevelElement_set_get_success(
        block_raw_data, simple_raw_data):
    '''create valid structures'''
    block_upper_level_element = UpperLevelElement(block_raw_data)
    simple_upper_level_element = UpperLevelElement(simple_raw_data)

    block_common_elemements = block_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in block_raw_data.items()}.items()
    assert len(block_upper_level_element.__dict__) \
        == len(block_raw_data) == len(block_common_elemements)
    simple_common_elemements =\
        simple_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in simple_raw_data.items()}.items()
    assert len(simple_upper_level_element.__dict__) \
        == len(simple_raw_data) == len(simple_common_elemements)

    '''success, no upper level element complexity changed'''
    _block_type = 'vblock'
    _simple_type = 'footer'
    _name = 'fancy_name'
    block_upper_level_element.setter(
        {'type': _block_type, 'name': _name})
    simple_upper_level_element.setter(
        {'type': _simple_type, 'name': _name})
    assert block_upper_level_element.type == _block_type
    assert simple_upper_level_element.type == _simple_type
    assert block_upper_level_element.name\
        == simple_upper_level_element.name == _name

    '''success, block to simple'''
    _type = 'footer'
    _name = 'block_to_simple'
    block_upper_level_element.setter({'type': _type, 'name': _name})
    assert block_upper_level_element.type == _type
    assert block_upper_level_element.name == _name
    assert block_upper_level_element.subtype is None
    assert block_upper_level_element.qnt is None

    '''success, simple to block, default'''
    _type = 'vblock'
    _name = 'simple_to_block'
    _qnt = 15
    simple_upper_level_element.setter(
        {'type': _type, 'name': _name, 'qnt': _qnt})
    assert simple_upper_level_element.type == _type
    assert simple_upper_level_element.name == _name
    assert simple_upper_level_element.qnt == _qnt
    assert simple_upper_level_element.subtype\
        == global_constants.get_UPPER_LEVEL_SUBTYPES_PKS[0]
    print('\ntest_upper_level_element_structure:',
          '\n test_UpperLevelElement_set_get_success',
          '\n  block_upper_level_element.__dict__ ->',
          simple_upper_level_element.__dict__
          )


# @pytest.mark.active
def test_UpperLevelElement_set_get_fail(block_raw_data, simple_raw_data):
    '''create valid structures'''
    block_upper_level_element = UpperLevelElement(block_raw_data)
    simple_upper_level_element = UpperLevelElement(simple_raw_data)

    block_common_elemements = block_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in block_raw_data.items()}.items()
    assert len(block_upper_level_element.__dict__) \
        == len(block_raw_data) == len(block_common_elemements)
    simple_common_elemements =\
        simple_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in simple_raw_data.items()}.items()
    assert len(simple_upper_level_element.__dict__) \
        == len(simple_raw_data) == len(simple_common_elemements)

    '''send wrong type'''
    _type = 'wrong'
    _name = 'some_name'
    with pytest.raises(UpperLevelElementWrongValue) as e_info:
        block_upper_level_element.setter({'type': _type, 'name': _name})
    assert str(e_info.value) == _type
    with pytest.raises(UpperLevelElementWrongValue) as e_info:
        simple_upper_level_element.setter({'type': _type, 'name': _name})
    assert str(e_info.value) == _type

    '''wrong key set for specific type'''
    _type = 'vblock'
    _subtype = 'txt'
    with pytest.raises(UpperLevelElementWrongKey) as e_info:
        block_upper_level_element.setter(
            {'type': _type, 'wrong': _subtype})
    # print(e_info.value)
    assert str(e_info.value) == 'wrong'
    _type = 'footer'
    _subtype = 'txt'
    with pytest.raises(UpperLevelElementWrongKey) as e_info:
        block_upper_level_element.setter(
            {'type': _type, 'subtype': _subtype})
    assert str(e_info.value) == 'subtype'

    '''wrong key values'''
    '''subtype'''
    _type = 'vblock'
    _subtype = 'wrong'
    with pytest.raises(UpperLevelElementWrongValue) as e_info:
        block_upper_level_element.setter(
            {'type': _type, 'subtype': _subtype})
    # print(e_info.value)
    assert str(e_info.value) == _subtype
    '''qnt'''
    _type = 'vblock'
    _qnt = 120
    with pytest.raises(UpperLevelElementWrongValue) as e_info:
        block_upper_level_element.setter(
            {'type': _type, 'qnt': _qnt})
    assert int(str(e_info.value)) == _qnt

    # print('\ntest_upper_level_element_structure:',
    #       '\n test_UpperLevelElement_set_get_fail'
    #       '\n  block_raw_data.get(type) ->', block_raw_data.get('type'),
    #       '\n  type ->', block_upper_level_element.type,
    #       '\n  e_info.value ->', e_info.value
    #       )


# @pytest.mark.active
def test_UpperLevelElement_getter_success(
        block_raw_data, simple_raw_data):
    '''create valid structures'''
    block_upper_level_element = UpperLevelElement(block_raw_data)
    simple_upper_level_element = UpperLevelElement(simple_raw_data)

    block_common_elemements = block_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in block_raw_data.items()}.items()
    assert len(block_upper_level_element.__dict__) \
        == len(block_raw_data) == len(block_common_elemements)
    simple_common_elemements =\
        simple_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in simple_raw_data.items()}.items()
    assert len(simple_upper_level_element.__dict__) \
        == len(simple_raw_data) == len(simple_common_elemements)
    '''block element'''
    _keys = ['type', 'subtype', 'name', 'qnt']
    result = block_upper_level_element.getter(_keys)
    block_common_elemements = result.items()\
        & block_raw_data.items()
    assert len(result) == len(block_raw_data)\
        == len(block_common_elemements)
    '''simple element'''
    _keys = ['type', 'name']
    result = simple_upper_level_element.getter(_keys)
    simple_common_elemements = result.items()\
        & simple_raw_data.items()
    assert len(result) == len(simple_raw_data)\
        == len(simple_common_elemements)

    # print('test_upper_level_element_structure:',
    #       '\n test_UpperLevelElement_getter_success',
    #       '\n  block_raw_data ->', simple_raw_data,
    #       '\n  result ->', result)


# @pytest.mark.active
def test_UpperLevelElement_getter_fail(
        block_raw_data, simple_raw_data):
    '''create valid structures'''
    block_upper_level_element = UpperLevelElement(block_raw_data)
    simple_upper_level_element = UpperLevelElement(simple_raw_data)

    block_common_elemements = block_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in block_raw_data.items()}.items()
    assert len(block_upper_level_element.__dict__) \
        == len(block_raw_data) == len(block_common_elemements)
    simple_common_elemements =\
        simple_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in simple_raw_data.items()}.items()
    assert len(simple_upper_level_element.__dict__) \
        == len(simple_raw_data) == len(simple_common_elemements)
    '''get unknown key element'''
    _wrong_type = 'wrong_type'
    with pytest.raises(UpperLevelElementWrongKey) as e_info:
        block_upper_level_element.getter([_wrong_type])
    assert str(e_info.value) == _wrong_type
    '''block element key on simple one'''
    _wrong_type = 'subtype'
    with pytest.raises(UpperLevelElementWrongKey) as e_info:
        simple_upper_level_element.getter([_wrong_type])
    assert str(e_info.value) == _wrong_type


# @pytest.mark.active
def test_UpperLevelElement_get_all(block_raw_data):
    '''create valid structures'''
    block_upper_level_element = UpperLevelElement(block_raw_data)
    block_common_elemements = block_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in block_raw_data.items()}.items()
    assert len(block_upper_level_element.__dict__) \
        == len(block_raw_data) == len(block_common_elemements)
    result = block_upper_level_element.get_all()
    block_common_elemements = result.items()\
        & block_raw_data.items()
    assert len(result) == len(block_raw_data)\
        == len(block_common_elemements)
    # print('test_upper_level_element_structure:',
    #       '\n test_UpperLevelElement_getter_success',
    #       '\n  block_raw_data ->', block_raw_data,
    #       '\n  result ->', result)


# @pytest.mark.active
def test_UpperLevelElement_insert_element(
        block_raw_data, simple_raw_data):
    '''create valid structures'''
    block_upper_level_element = UpperLevelElement(block_raw_data)
    simple_upper_level_element = UpperLevelElement(simple_raw_data)

    block_common_elemements = block_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in block_raw_data.items()}.items()
    assert len(block_upper_level_element.__dict__) \
        == len(block_raw_data) == len(block_common_elemements)
    simple_common_elemements =\
        simple_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in simple_raw_data.items()}.items()
    assert len(simple_upper_level_element.__dict__) \
        == len(simple_raw_data) == len(simple_common_elemements)

    '''success'''
    block_upper_level_element.insert_element()
    assert block_upper_level_element.qnt == block_raw_data.get('qnt') + 1

    '''fails'''
    '''no attribute'''
    with pytest.raises(UpperLevelElementIncorrectQntAction) as e_info:
        simple_upper_level_element.insert_element()
    _type = simple_raw_data.get('type')
    assert str(e_info.value) == f'Element type {_type} has no qnt attribute.'

    '''qnt above limit'''
    block_upper_level_element.setter({'qnt': 100})
    with pytest.raises(UpperLevelElementIncorrectQntAction) as e_info:
        block_upper_level_element.insert_element()
    assert str(e_info.value) == f'Attribute qnt is already - {100}.'


# @pytest.mark.active
def test_UpperLevelElement_remove_element(
        block_raw_data, simple_raw_data):
    '''create valid structures'''
    block_upper_level_element = UpperLevelElement(block_raw_data)
    simple_upper_level_element = UpperLevelElement(simple_raw_data)

    block_common_elemements = block_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in block_raw_data.items()}.items()
    assert len(block_upper_level_element.__dict__) \
        == len(block_raw_data) == len(block_common_elemements)
    simple_common_elemements =\
        simple_upper_level_element.__dict__.items()\
        & {f'_{k}': v for (k, v) in simple_raw_data.items()}.items()
    assert len(simple_upper_level_element.__dict__) \
        == len(simple_raw_data) == len(simple_common_elemements)

    '''success'''
    block_upper_level_element.remove_element()
    assert block_upper_level_element.qnt == block_raw_data.get('qnt') - 1

    '''fails'''
    '''no attribute'''
    with pytest.raises(UpperLevelElementIncorrectQntAction) as e_info:
        simple_upper_level_element.remove_element()
    _type = simple_raw_data.get('type')
    assert str(e_info.value) == f'Element type {_type} has no qnt attribute.'

    '''qnt above limit'''
    block_upper_level_element.setter({'qnt': 1})
    with pytest.raises(UpperLevelElementIncorrectQntAction) as e_info:
        block_upper_level_element.remove_element()
    assert str(e_info.value) == f'Attribute qnt is already - {1}.'
