import pytest

from application.structure.errors.custom_exceptions import (
    UpperLevelStructureWrongKeys,
    UpperLevelStructureWrongIndex,
    UpperLevelStructureRemoveLastElement
)

from application.structure.models.view_page_structure import ViewPageStructure
from application.structure.models.upper_level_element_structure import UpperLevelElement


@pytest.fixture
def header():
    return UpperLevelElement({
        'type': 'header',
        'name': 'header_name'
    })


@pytest.fixture
def hblock():
    return UpperLevelElement({
        'qnt': 7,
        'name': 'hblock00',
        'type': 'hblock',
        'subtype': 'pix'
    })


@pytest.fixture
def vblock():
    return UpperLevelElement({
        'qnt': 5,
        'name': 'vblock00',
        'type': 'vblock',
        'subtype': 'txt'
    })


@pytest.fixture
def footer():
    return UpperLevelElement({
        'type': 'footer',
        'name': 'footer_name'
    })


@pytest.fixture
def view_page_structure(header, footer, hblock, vblock):
    return ViewPageStructure({
        '00': header,
        '01': hblock,
        '02': vblock,
        '03': footer
    })


# @pytest.mark.active
def test_ViewPageStructure_init(header, footer, hblock, vblock):

    view_page_structure = ViewPageStructure({
        '00': header,
        '01': footer,
        '02': hblock,
        '03': vblock
    })
    assert len(view_page_structure.__dict__) == 4

    '''Upper level element key is not digit.'''
    with pytest.raises(UpperLevelStructureWrongKeys) as e_info:
        ViewPageStructure({
            '00': header,
            'zz': footer,
            '02': hblock,
            '03': vblock
        })
    assert str(e_info.value) == 'zz'

    '''Upper level element keys are not sequential.'''
    with pytest.raises(UpperLevelStructureWrongKeys) as e_info:
        ViewPageStructure({
            '00': header,
            '02': footer,
            '04': hblock,
            '03': vblock
        })
    assert str(e_info.value) == '02'
    # print(e_info.value)
    '''Upper level element keys are not started with 00.'''
    with pytest.raises(UpperLevelStructureWrongKeys) as e_info:
        ViewPageStructure({
            '01': header,
            '02': footer,
            '03': hblock,
            '04': vblock
        })
    assert str(e_info.value) == '01'


# @pytest.mark.active
def test_ViewPageStructure_get(view_page_structure):
    _view_page_structure = view_page_structure
    _length = _view_page_structure.len()
    assert _length == 4
    for i in range(_length):
        _element = _view_page_structure.get_element(i)
        # print('test_view_page_structure:\n test_ViewPageStructure_get',
        #       '\n type _element ->', type(_element))
        assert isinstance(_element, UpperLevelElement)


# @pytest.mark.active
def test_ViewPageStructure_set(view_page_structure):
    _view_page_structure = view_page_structure
    _length = _view_page_structure.len()
    _index = 2
    _element_name = 'inserted_element_name'
    _element_type = 'footer'
    assert _length == 4

    '''add element out of range'''
    _wrong_index = -1
    with pytest.raises(UpperLevelStructureWrongIndex) as e_info:
        _view_page_structure.set_element(_wrong_index, UpperLevelElement({
            'type': _element_type,
            'name': _element_name
        }))
    assert str(
        e_info.value) == f'Index {_wrong_index} has been out of range.'

    _wrong_index = _length
    with pytest.raises(UpperLevelStructureWrongIndex) as e_info:
        _view_page_structure.set_element(_wrong_index, UpperLevelElement({
            'type': _element_type,
            'name': _element_name
        }))
    assert str(
        e_info.value) == f'Index {_wrong_index} has been out of range.'

    '''add upper level element as a class instance'''
    _view_page_structure.set_element(_index, UpperLevelElement({
        'type': _element_type,
        'name': _element_name
    }))
    _element = _view_page_structure.get_element(_index)
    assert isinstance(_element, UpperLevelElement)

    '''add dictionary to construct UpperLevelElement'''
    _element_name = 'next_element_name'
    _view_page_structure.set_element(_index, {
        'type': _element_type,
        'name': _element_name
    })
    _element = _view_page_structure.get_element(_index)
    assert isinstance(_element, UpperLevelElement)
    # print('test_view_page_structure:\n test_UpperLevelElement_set',
    #       '\n _element type ->', type(_element),
    #       '\n _element ->', _element)

    '''add dictionary extending view page structure'''
    _index = _length
    with pytest.raises(UpperLevelStructureWrongIndex) as e_info:
        _view_page_structure.set_element(_index, {
            'type': _element_type,
            'name': _element_name
        })
    assert str(
        e_info.value) == f'Index {_index} has been out of range.'
    _view_page_structure.set_element(_index, {
        'type': _element_type,
        'name': _element_name
    }, ext=True)
    _element = _view_page_structure.get_element(_index)
    assert isinstance(_element, UpperLevelElement)


# @pytest.mark.active
def test_ViewPageStructure_insert(view_page_structure):
    _view_page_structure = view_page_structure
    _length = _view_page_structure.len()
    _element_name = 'inserted_element_name'
    _element_type = 'header'
    '''index out of range'''
    _index = -1
    with pytest.raises(UpperLevelStructureWrongIndex) as e_info:
        _view_page_structure.insert_element(
            _index, {'name': _element_name, 'type': _element_type})
    assert str(e_info.value) == f'Index {_index} has been out of range.'
    _index = _view_page_structure.len() + 1
    with pytest.raises(UpperLevelStructureWrongIndex) as e_info:
        _view_page_structure.insert_element(
            _index, {'name': _element_name, 'type': _element_type})
    assert str(e_info.value) == f'Index {_index} has been out of range.'

    '''success'''
    '''insert in a middle'''
    _index = 1
    _view_page_structure.insert_element(
        _index, {'name': _element_name, 'type': _element_type})
    assert _view_page_structure.len() == _length + 1
    assert _view_page_structure.get_element(_index).__dict__.get('_name')\
        == _element_name
    assert _view_page_structure.get_element(_index).__dict__.get('_type')\
        == _element_type
    '''insert at the end'''
    _index = _view_page_structure.len()
    _view_page_structure.insert_element(
        _index, {'name': _element_name, 'type': _element_type})
    assert _view_page_structure.len() == _index + 1
    assert _view_page_structure.get_element(_index).__dict__.get('_name')\
        == _element_name
    assert _view_page_structure.get_element(_index).__dict__.get('_type')\
        == _element_type

    # print('test_view_page_structure:\n test_UpperLevelElement_insert',
    #       '\n  _view_page_structure ->', _view_page_structure)


# @pytest.mark.active
def test_ViewPageStructure_remove(hblock, vblock, footer, view_page_structure):
    _view_page_structure = view_page_structure
    _length = _view_page_structure.len()
    assert _length == 4
    '''index out of range'''
    # _index = -1
    # with pytest.raises(UpperLevelStructureWrongIndex) as e_info:
    #     _view_page_structure.remove_element(_index)
    # assert str(e_info.value) == f'Index {_index} has been out of range.'
    # _index = _view_page_structure.len()
    # with pytest.raises(UpperLevelStructureWrongIndex) as e_info:
    #     _view_page_structure.remove_element(_index)
    # assert str(e_info.value) == f'Index {_index} has been out of range.'

    '''success'''
    '''remove in a middle'''
    _index = 1
    removed_element = _view_page_structure.remove_element(_index)
    substitute_element = _view_page_structure.get_element(_index)
    assert _view_page_structure.len() == _length - 1
    assert isinstance(removed_element, UpperLevelElement)
    assert isinstance(substitute_element, UpperLevelElement)
    common_removed_element = removed_element.__dict__.items()\
        & hblock.__dict__.items()
    assert len(common_removed_element) == len(removed_element.__dict__)\
        == len(vblock.__dict__)
    common_substitute_element = substitute_element.__dict__.items()\
        & vblock.__dict__.items()
    assert len(common_substitute_element)\
        == len(substitute_element.__dict__)\
        == len(vblock.__dict__)
    '''remove from the end'''
    _index = _view_page_structure.len() - 1
    removed_element = _view_page_structure.remove_element(_index)
    assert _view_page_structure.len() == _index
    common_removed_element = removed_element.__dict__.items()\
        & footer.__dict__.items()
    assert len(common_removed_element) == len(removed_element.__dict__)\
        == len(footer.__dict__)
    # assert _view_page_structure.get_element(_index).__dict__.get('_name')\
    #     == _element_name
    # assert _view_page_structure.get_element(_index).__dict__.get('_type')\
    #     == _element_type
    '''try to remove the last element'''
    view_page_structure.remove_element(0)
    assert view_page_structure.len() == 1
    # print('test_view_page_structure:\n test_UpperLevelElement_insert',
    #       '\n  length ->', view_page_structure.len())
    with pytest.raises(UpperLevelStructureRemoveLastElement) as e_info:
        view_page_structure.remove_element(0)
    assert str(e_info.value) == 'not allowed!'


# @pytest.mark.active
def test_ViewPageStructure_serialize(
        header, footer, hblock, vblock, view_page_structure):
    result = view_page_structure.serialize()
    for k, v in result.items():
        if v.get('type') == 'header':
            assert v.get('name') == header.__dict__.get('_name')
        if v.get('type') == 'footer':
            assert v.get('name') == footer.__dict__.get('_name')
        if v.get('type') == 'hblock':
            assert v.get('name') == hblock.__dict__.get('_name')
            assert v.get('subtype') == hblock.__dict__.get('_subtype')
            assert v.get('qnt') == hblock.__dict__.get('_qnt')
        if v.get('type') == 'vblock':
            assert v.get('name') == vblock.__dict__.get('_name')
            assert v.get('subtype') == vblock.__dict__.get('_subtype')
            assert v.get('qnt') == vblock.__dict__.get('_qnt')

    # print('\ntest_view_page_structure:',
    #       '\n test_ViewPageStructure_serialize',
    #       '\n  result ->', result,
    #       '\n  header ->', header.__dict__
    #       )
