import pytest
import json
from typing import Dict, List
from random import choice

from application.global_init_data import global_constants

from application.contents.errors.custom_exceptions import (
    WrongViewNameError, WrongLocaleError, WrongTypeError, WrongIndexError,
    WrongValueError)
from application.contents.models.content_element import (
    ContentElement)
from application.contents.models.content_elements_simple import (
    ContentElementsSimple)
from application.contents.models.content_elements_block import (
    ContentElementsBlock)
from application.contents.models.page_view import (
    PageView, ul_element_extractor, ul_element_serializer)


@pytest.fixture
def view_name():
    return choice(global_constants.get_VIEWS_PKS)


@pytest.fixture
def locale():
    return choice(global_constants.get_PKS)


@pytest.fixture
def simple_element():
    def _method(
            upper_index: int = 0, type: str = '', marker: str = ''):
        return ContentElementsSimple(
            upper_index=upper_index, type=type, name=f'name of {type}',
            element=ContentElement({
                'title': f'Title for {type} {marker}',
                'content': f'Content for {type} {marker}'
            })
        )
    return _method


@pytest.fixture
def block_element():
    def _method(
            upper_index: int = 0, type: str = '', subtype: str = '',
            qnt: int = 1, marker: str = ''):
        _elements = []
        for i in range(qnt):
            _elements.append(ContentElement({
                'title':
                    f'Title for {type} ContentElement No {i}; {marker}!',
                'content':
                    f'Content for {type} ContentElement No {i}; {marker}.'
            }))
        return ContentElementsBlock(
            upper_index=upper_index, type=type,
            subtype=subtype, name=f'name of {type}',
            elements=_elements
        )
    return _method


@pytest.fixture
def elements(simple_element, block_element):
    _header = simple_element(upper_index=0, type='header')
    _vblock = block_element(
        upper_index=_header.upper_index + 1, type='vblock',
        subtype='txt', qnt=4)
    _hblock = block_element(
        upper_index=_vblock.upper_index + 1, type='hblock',
        subtype='pix', qnt=5)
    _footer = simple_element(
        upper_index=_hblock.upper_index + 1, type='footer')
    return [
        _header, _vblock, _hblock, _footer
    ]


# @pytest.mark.active
def test_PageView_ul_element_serializer(simple_element, block_element):
    '''simple element'''
    _simple_index = 10
    _simple_type = 'header'
    _simple_marker = 'simple marker'
    _simple_element = simple_element(
        upper_index=_simple_index, type=_simple_type,
        marker=_simple_marker)
    _simple_serialized = ul_element_serializer(_simple_element)
    assert _simple_serialized[0].get('identity')\
        == '_'.join([str(_simple_index).zfill(2), _simple_type])
    assert _simple_serialized[0].get('title')\
        == _simple_element.element.value.get('title')
    assert _simple_serialized[0].get('content')\
        == _simple_element.element.value.get('content')

    '''block element'''
    _block_index = 15
    _block_type = 'vblock'
    _block_subtype = 'txt'
    _qnt = 3
    _block_marker = 'block marker'
    _block_element = block_element(
        upper_index=_block_index, type=_block_type,
        subtype=_block_subtype, qnt=_qnt,
        marker=_block_marker)
    _block_serialized = ul_element_serializer(_block_element)

    # print()
    for i, item in enumerate(_block_serialized):
        assert item.get('identity') == '_'.join(
            [
                str(_block_index).zfill(2),
                _block_type,
                _block_subtype,
                str(i).zfill(3)
            ]
        )
        _serialized =\
            _block_element.serialize_to_content[i]

        assert item.get('title') == _serialized.get('title')
        assert item.get('content') == _serialized.get('content')
        # assert item.get('title') == _serialized.get('title')
        # assert item.get('content') == _serialized.get('content')
        # print(_block_element.serialize_to_content[i])

    '''fail, wrong upper level element type'''
    _wron_ul_element = 'shit'
    with pytest.raises(WrongTypeError) as e_info:
        ul_element_serializer(_wron_ul_element)
    assert str(e_info.value)\
        == ("You try to operate upper level element type - "
            f"'{type(_wron_ul_element)}', it's wrong.")


# @pytest.mark.active
def test_PageView_ul_element_extractor(simple_element, block_element):
    _simple_index = 10
    _simple_type = 'header'
    _simple_marker = 'simple marker'
    _simple_element = simple_element(
        upper_index=_simple_index, type=_simple_type,
        marker=_simple_marker)
    _simple_extracted = ul_element_extractor(_simple_element)
    assert _simple_extracted.get('index') == _simple_index
    assert _simple_extracted.get('type') == _simple_type
    assert _simple_extracted.get(
        'element').get('title').find(_simple_marker) != -1
    assert _simple_extracted.get(
        'element').get('content').find(_simple_marker) != -1
    _block_index = 15
    _block_type = 'vblock'
    _block_subtype = 'txt'
    _qnt = 3
    _block_marker = 'block marker'
    _block_element = block_element(
        upper_index=_block_index, type=_block_type,
        subtype=_block_subtype, qnt=_qnt,
        marker=_block_marker)
    _block_extracted = ul_element_extractor(_block_element)
    assert _block_extracted.get('index') == _block_index
    assert _block_extracted.get('type') == _block_type
    assert _block_extracted.get('subtype') == _block_subtype
    assert len(_block_extracted.get('elements')) == _qnt
    for element in _block_extracted.get('elements'):
        assert element.get('title').find(_block_marker) != -1
        assert element.get('content').find(_block_marker) != -1
    # print('\ntest_page_view:\n test_PageView_ul_element_extractor',
    #       '\n  _block_element ->', _block_extracted,
    #       )


# @pytest.mark.active
def test_PageView_check_index(view_name, locale, elements):
    _page_view = PageView(
        view_name=view_name, locale=locale, elements=elements)
    _length = len(_page_view.elements)
    '''success'''
    for index in range(_length):
        assert _page_view.check_index(index)
    assert _page_view.check_index(_length, ext=True)

    '''fails'''
    _negative_index = -1
    with pytest.raises(WrongIndexError) as e_info:
        _page_view.check_index(_negative_index)
    assert str(e_info.value)\
        == (f"Length of element array is {_length} but you try to "
            f"operate with index '{_negative_index}'.")

    '''exeed without ext'''
    _index = _length
    with pytest.raises(WrongIndexError) as e_info:
        _page_view.check_index(_index)
    assert str(e_info.value)\
        == (f"Length of element array is {_length} but you try to "
            f"operate with index '{_index}'.")

    '''with ext'''
    assert _page_view.check_index(_index, ext=True)


# @pytest.mark.active
def test_PageView_init_success(view_name, locale, elements):
    _page_view = PageView(
        view_name=view_name, locale=locale, elements=elements)
    assert _page_view.view_name == view_name
    assert _page_view.locale == locale
    assert len(_page_view.elements) == len(elements)
    for ul_element in _page_view.elements:
        assert isinstance(ul_element, ContentElementsSimple)\
            or isinstance(ul_element, ContentElementsBlock)


# @pytest.mark.active
def test_PageView_init_fail(view_name, locale, elements):
    '''wrong view name'''
    _wrong_name = 'wrong'
    with pytest.raises(WrongViewNameError) as e_info:
        PageView(
            view_name=_wrong_name, locale=locale, elements=elements)
    assert str(e_info.value)\
        == ("Page view should be withing '['landing', 'price_list', "
            f"'pictures', 'private', 'admin']' but '{_wrong_name}' has "
            "been delivered.")

    '''wrong locale'''
    _wrong_locale = 'wrong'
    with pytest.raises(WrongLocaleError) as e_info:
        PageView(
            view_name=view_name, locale=_wrong_locale, elements=elements)
    assert str(e_info.value)\
        == (f"Locale should be within '['en', 'ru']' but '{_wrong_name}' "
            "has been delivered.")

    '''wrong upper level element type'''
    _wrong_ul_element = 'shit'
    _wrong_elements = [*elements, _wrong_ul_element]
    with pytest.raises(WrongTypeError) as e_info:
        PageView(
            view_name=view_name, locale=locale, elements=_wrong_elements)
    assert str(e_info.value)\
        == (f"Type of upper level element should be within "
            "'[ContentElementsSimple, ContentElementsBlock]' but "
            f"'{type(_wrong_ul_element)}' has been delivered.")
    # print('\ntest_page_view:\n test_PageView_init_fail',
    #       '\n  _view_name ->', _page_view.view_name,
    #       '\n  _locale ->', _page_view.locale,
    #       '\n  _elements ->', _page_view.elements,
    #       )


# @pytest.mark.active
def test_PageView_get_element_vals(view_name, locale, elements):
    _page_view = PageView(
        view_name=view_name, locale=locale, elements=elements)
    # print('\ntest_page_view:\n test_PageView_get_element_vals')
    for i, element in enumerate(_page_view.elements):
        _el_getter = _page_view.get_element_vals(i)
        _el_extract = ul_element_extractor(elements[i])
        assert _el_getter == _el_extract
        # print('  getter ->', _el_getter,
        #       '\n  extractor ->', _el_extract)

    '''wrong index'''
    _negative_index = -1
    _exeeding_index = len(elements)
    with pytest.raises(WrongIndexError) as e_info:
        _page_view.get_element_vals(_negative_index)
    assert str(e_info.value)\
        == (f"Length of element array is {_exeeding_index} but you try "
            f"to operate with index '{_negative_index}'.")

    with pytest.raises(WrongIndexError) as e_info:
        _page_view.get_element_vals(_exeeding_index)
    assert str(e_info.value)\
        == (f"Length of element array is {_exeeding_index} but you try "
            f"to operate with index '{_exeeding_index}'.")


# @pytest.mark.active
def test_PageView_set_element_dict(view_name, locale, simple_element,
                                   block_element, elements):
    _page_view = PageView(
        view_name=view_name, locale=locale, elements=elements)
    _marker = 'corrected upper level element'
    for i, ul_element in enumerate(_page_view.elements):
        if isinstance(ul_element, ContentElementsSimple):
            '''preparation values for update'''
            new_type = [
                type for type in ['footer', 'header']
                if type != ul_element.type][0]
            _new_simple = simple_element(
                upper_index=ul_element.upper_index, type=new_type,
                marker=_marker)
            '''update itself'''
            _page_view.set_element_vals(
                index=ul_element.upper_index,
                element_type=_new_simple.type,
                name=_new_simple.name,
                element_value=_new_simple.element.value
            )
            '''testing'''
            _ul_element_dict = _page_view.get_element_vals(i)
            assert _ul_element_dict.get('index') == i
            assert _ul_element_dict.get('type') == new_type
            assert _ul_element_dict.get('name') == _new_simple.name
            assert _ul_element_dict.get('name') == _new_simple.name
            assert isinstance(_ul_element_dict.get('element'), Dict)
            assert len(_ul_element_dict.get('element')) == 2
            for item in _ul_element_dict.get('element').values():
                assert item.find(_marker) != -1
        if isinstance(ul_element, ContentElementsBlock):
            '''preparation values for update'''
            new_type = [
                type for type in ['vblock', 'hblock']
                if type != ul_element.type][0]
            _new_block = block_element(
                upper_index=ul_element.upper_index, type=new_type,
                subtype=ul_element.subtype, qnt=len(ul_element.elements),
                marker=_marker)
            _values = [item.value for item in _new_block.elements]

            '''update itself'''
            _page_view.set_element_vals(
                index=ul_element.upper_index,
                element_type=_new_block.type,
                subtype=_new_block.subtype,
                name=_new_block.name,
                element_value=_values
            )
            _ul_element_dict = _page_view.get_element_vals(i)
            # print('\ntest_page_view:\n test_PageView_set_element_dict')
            assert _ul_element_dict.get('index') == i
            assert _ul_element_dict.get('type') == new_type
            assert _ul_element_dict.get('subtype') == _new_block.subtype
            assert _ul_element_dict.get('name') == _new_block.name
            assert isinstance(_ul_element_dict.get('elements'), List)
            assert len(_ul_element_dict.get('elements')) == len(_values)
            for element in _ul_element_dict.get('elements'):
                for item in element.values():
                    assert item.find(_marker) != -1


# @pytest.mark.active
def test_PageView_insert_vals_success(
        view_name, locale, simple_element, block_element, elements):
    _page_view = PageView(
        view_name=view_name, locale=locale, elements=elements)
    '''insert to beginning'''
    _insert_position = 0
    _el_type = 'header'
    _marker = 'insert to beginning'
    _simple_element = simple_element(type=_el_type, marker=_marker)
    _inserting_json = json.dumps(
        ul_element_extractor(_simple_element), sort_keys=True)
    simple_kwargs = {
        'element_type': _simple_element.type,
        # 'subtype': '',
        'name': _simple_element.name,
        'element_value': _simple_element.element.value
    }
    _length = len(_page_view.elements)
    _last_elem_json = json.dumps(
        _page_view.get_element_vals(_length - 1), sort_keys=True)
    _page_view.insert_vals(_insert_position, **simple_kwargs)

    '''tests'''
    assert len(_page_view.elements) == _length + 1
    assert _inserting_json == json.dumps(_page_view.get_element_vals(
        _insert_position), sort_keys=True)
    assert _last_elem_json == json.dumps(_page_view.get_element_vals(
        _length), sort_keys=True)

    '''insert to end'''
    _insert_position = 0
    _el_type = 'hblock'
    _el_subtype = 'pix'
    _qnt = 3
    _marker = 'insert to end'
    _length = len(_page_view.elements)
    _block_element = block_element(
        upper_index=_length, type=_el_type, subtype=_el_subtype,
        qnt=_qnt, marker=_marker)
    _inserting_json = json.dumps(
        ul_element_extractor(_block_element), sort_keys=True)
    _element_values = [item.value for item in _block_element.elements]
    _block_kwargs = {
        'element_type': _block_element.type,
        'subtype': _block_element.subtype,
        'name': _block_element.name,
        'element_value': _element_values
    }
    _page_view.insert_vals(_length, **_block_kwargs)
    '''testing'''
    assert len(_page_view.elements) == _length + 1
    assert _inserting_json == json.dumps(_page_view.get_element_vals(
        _length), sort_keys=True)
    # print('\ntest_page_view:\ntest_PageView_insert_vals'
    #       '\n  _inserting_json ->', _inserting_json,
    #       '\n  last el json    ->',
    #       json.dumps(_page_view.get_element_vals(
    #           _length), sort_keys=True),
    #       )


# @pytest.mark.active
def test_PageView_insert_vals_fail(
        view_name, locale, simple_element, block_element, elements):
    _page_view = PageView(
        view_name=view_name, locale=locale, elements=elements)
    _insert_position = 1
    _el_type = 'header'
    _marker = 'insert to beginning'
    _simple_element = simple_element(type=_el_type, marker=_marker)
    '''not element type'''
    simple_kwargs = {
        # 'element_type': _simple_element.type,
        # 'subtype': '',
        'name': _simple_element.name,
        'element_value': _simple_element.element.value
    }
    with pytest.raises(WrongValueError) as e_info:
        _page_view.insert_vals(_insert_position, **simple_kwargs)
    assert str(e_info.value) == (
        f"You try to use '{''}' as upper level element type. It's wrong.")
    '''wrong element type'''
    _wrong_element_type = 5
    simple_kwargs = {
        'element_type': _wrong_element_type,
        # 'subtype': '',
        'name': _simple_element.name,
        'element_value': _simple_element.element.value
    }
    with pytest.raises(WrongTypeError) as e_info:
        _page_view.insert_vals(_insert_position, **simple_kwargs)
    assert str(e_info.value) == (
        "You try to operate upper level element type - "
        f"'{type(_wrong_element_type)}', it's wrong.")
    '''wrong subtype'''
    _insert_position = 2
    _el_type = 'hblock'
    _el_subtype = 'txt'
    _qnt = 3
    _marker = 'insert to end'
    _block_element = block_element(
        type=_el_type, subtype=_el_subtype,
        qnt=_qnt, marker=_marker)
    _element_values = [item.value for item in _block_element.elements]
    _wrong_subtype = 'shit'
    _block_kwargs = {
        'element_type': _block_element.type,
        'subtype': _wrong_subtype,
        'name': _block_element.name,
        'element_value': _element_values
    }
    with pytest.raises(WrongValueError) as e_info:
        _page_view.insert_vals(_insert_position, **_block_kwargs)
    assert str(e_info.value) == (
        "Block element subtype shoud be within "
        f"'{ContentElementsBlock._subtypes}', but provided subtype is "
        f"'{_wrong_subtype}'.")
    # print('\ntest_page_view:\ntest_PageView_insert_vals\n\n',)


# @pytest.mark.active
def test_PageView_remove_vals(view_name, locale, simple_element,
                              block_element, elements):
    _remove_position = 1
    _page_view = PageView(
        view_name=view_name, locale=locale, elements=elements)
    _length = len(_page_view.elements)
    _element_in_page = json.dumps(
        _page_view.get_element_vals(_remove_position), sort_keys=True)
    _removed_element = json.dumps(
        _page_view.remove_vals(_remove_position), sort_keys=True)
    assert len(_page_view.elements) == _length - 1
    assert _element_in_page == _removed_element
    # print('\ntest_page_view:\ntest_PageView_remove_vals',
    #       '\n  _removed_element ->', _removed_element
    #       )


# @pytest.mark.active
def test_PageView_serialize_to_content(
        view_name, locale, simple_element, block_element, elements):
    _page_view = PageView(
        view_name=view_name, locale=locale, elements=elements)
    result = _page_view.serialize_to_content
    # print('\ntest_page_view:\ntest_PageView_serialize_to_content',
    #       )
    _length = 0
    for element in _page_view.elements:
        if isinstance(element, ContentElementsSimple):
            _length += 1
        elif isinstance(element, ContentElementsBlock):
            _length += len(element.elements)
    assert len(result) == _length
    for element in result:
        # print(element)
        assert isinstance(element, Dict)
        assert sorted(
            ['identity', 'title', 'content', 'view_id',
             'locale_id']) == sorted(list(element.keys()))


# @pytest.mark.active
def test_PageView_serialize_to_structure(
        view_name, locale, simple_element, block_element, elements):
    _page_view = PageView(
        view_name=view_name, locale=locale, elements=elements)
    result = _page_view.serialize_to_structure
    assert result.get('view_id') == view_name
    assert result.get('locale_id') == locale
    _attributes = {}
    for element in elements:
        _attributes = {**_attributes, **element.serialize_to_structure}
    assert result.get('attributes') == _attributes
