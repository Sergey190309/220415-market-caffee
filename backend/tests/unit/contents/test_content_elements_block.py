import pytest
# from json import dumps
from random import randrange, choice

from application.modules.dbs_global import dbs_global
from application.global_init_data import global_constants
from application.contents.errors.custom_exceptions import (
    WrongElementKeyError, WrongElementTypeError, WrongTypeError,
    WrongIndexError, WrongValueError)
from application.contents.models.content_elements_block import (
    ContentElementsBlock)
from application.contents.models.content_element import ContentElement
from application.contents.models.contents import ContentModel
from application.contents.schemas.contents import (
    content_schema, content_get_schema)
from application.structure.models.structure import StructureModel


# @pytest.mark.active
def test_check_index(elements_dict):
    _upper_index = 9
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'
    _elements_dict = elements_dict(_size)
    block_instance_dict = ContentElementsBlock(
        upper_index=_upper_index, type=_type, subtype=_subtype,
        name=_name, elements=_elements_dict)

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
def test_ContentElementsBlock_init_success(
        element, elements_dict, elements_inst):
    _upper_index = 6
    _size = 5
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    '''list of dictionary elements'''
    _elements_dict = elements_dict(_size)
    block_instance_dict = ContentElementsBlock(
        upper_index=_upper_index,
        type=_type, subtype=_subtype, name=_name,
        elements=_elements_dict)
    assert block_instance_dict.upper_index == _upper_index
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
    block_instance_inst = ContentElementsBlock(
        upper_index=_upper_index,
        type=_type, subtype=_subtype, name=_name,
        elements=_elements_inst)
    assert block_instance_dict.upper_index == _upper_index
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
    #       '\n test_ContentElementsBlock_init_success'
    #       '\n  elements ->', type(block_instance_dict.elements)
    #       )


# @pytest.mark.active
def test_ContentElementsBlock_init_fail(
        element, elements_dict, elements_inst):
    _upper_index = 9
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
        ContentElementsBlock(
            upper_index=_upper_index, type=_type, subtype=_subtype,
            name=_name, elements=_wrong_elements_dict)
    assert str(e_info.value)\
        == ("Content element value key should be either 'title' or "
            f"'content', but one of them is '{_wrong_element_key}'.")

    '''Wrong element type'''
    wrong_elements_type = [* _elements_inst]
    wrong_elements_type.append(1)
    with pytest.raises(WrongElementTypeError) as e_info:
        ContentElementsBlock(
            upper_index=_upper_index, type=_type, subtype=_subtype,
            name=_name, elements=wrong_elements_type)
    assert str(e_info.value)\
        == ("Elements should be '['dict', 'ContentElement']', but at "
            f"least one of the elements has type '{type(1)}'.")

    '''wrong type'''
    _wrong_type = 'header'
    with pytest.raises(WrongTypeError) as e_info:
        ContentElementsBlock(
            upper_index=_upper_index, type=_wrong_type, subtype=_subtype,
            name=_name, elements=_elements_inst)
    assert str(e_info.value)\
        == ("Upper level element could be '['vblock', 'hblock']', but "
            f"provided type is '{_wrong_type}'.")

    '''wrong subtype'''
    _wrong_subtype = 'shit'
    with pytest.raises(WrongValueError) as e_info:
        ContentElementsBlock(
            upper_index=_upper_index, type=_type, subtype=_wrong_subtype,
            name=_name, elements=_elements_inst)
    assert str(e_info.value)\
        == ("Block element subtype shoud be within "
            f"'{ContentElementsBlock._subtypes}', but provided subtype "
            f"is '{_wrong_subtype}'.")

    # print('\ntest_content_elements_block:',
    #       '\n test_ContentElementsBlock_init_fail'
    #       '\n  e_info ->', e_info.value,
    #       )


# @pytest.mark.active
def test_ContentElementsBlock_get_set_subtype(
        element,
        elements_dict,
        # elements_inst
):
    _upper_index = 9
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    _elements_dict = elements_dict(_size)
    block_instance_dict = ContentElementsBlock(
        upper_index=_upper_index, type=_type, subtype=_subtype,
        name=_name, elements=_elements_dict)

    assert block_instance_dict.subtype == _subtype

    _other_subtype = 'pix'
    block_instance_dict.subtype = _other_subtype
    assert block_instance_dict.subtype == _other_subtype
    # print('\ntest_content_elements_block:',
    #       '\n test_ContentElementsBlock_get_set_subtype')
    # print('  block_instance_dict ->', block_instance_dict.subtype)


# @pytest.mark.active
def test_ContentElementsBlock_get_set_elements(
        element,
        elements_dict,
        # elements_inst
):
    _upper_index = 9
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    _elements_dict = elements_dict(_size)
    _block_instance = ContentElementsBlock(
        upper_index=_upper_index, type=_type, subtype=_subtype,
        name=_name, elements=_elements_dict)
    assert len(_block_instance.elements) == _size
    # print('\ntest_content_elements_block:',
    #       '\n test_ContentElementsBlock_get_set_elements')
    '''getter testing'''
    for i, element in enumerate(_elements_dict):
        assert element == _block_instance.elements[i].value
    '''setter, dictionary testing'''
    _size = 5
    _elements_dict = elements_dict(_size)
    _block_instance.elements = _elements_dict
    assert len(_block_instance.elements) == _size
    for i, element in enumerate(_elements_dict):
        assert element == _block_instance.elements[i].value
    '''setter, ContentElement instance'''
    _size = 6
    _elements_dict = elements_dict(_size)
    _elements_instances = []
    for element in _elements_dict:
        _elements_instances.append(ContentElement(element))
    _block_instance.elements = _elements_instances
    assert len(_block_instance.elements) == _size
    for i, element in enumerate(_elements_dict):
        assert element == _block_instance.elements[i].value

    '''fail, wrong element type'''
    _wrong_type_element = 25
    _elements_instances.append(_wrong_type_element)
    with pytest.raises(WrongElementTypeError) as e_info:
        _block_instance.elements = _elements_instances
    assert str(e_info.value) ==\
        ("Elements should be '['dict', 'ContentElement']', but at least "
         f"one of the elements has type '{type(_wrong_type_element)}'.")


# @pytest.mark.active
def test_ContentElementsBlock_get_set_element(
        element,
        elements_dict,
        # elements_inst
):
    _upper_index = 9
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    _elements_dict = elements_dict(_size)
    _block_instance = ContentElementsBlock(
        upper_index=_upper_index, type=_type, subtype=_subtype,
        name=_name, elements=_elements_dict)
    '''success'''
    for i, _element in enumerate(_elements_dict):
        assert _block_instance.get_element(i).value == _element
    # print('\ntest_content_elements_block:',
    #       '\n test_ContentElementsBlock_get_set_element')
    # print('  element ->', element(99))
    '''success, dictionary'''
    _index = randrange(_size)
    _element_dict = element(99)
    _block_instance.set_element(index=_index, value=_element_dict)
    assert _block_instance.get_element(index=_index).value\
        == _element_dict
    '''success, dictionary'''
    _index = randrange(_size)
    _element_inst = ContentElement(element(100))
    _block_instance.set_element(index=_index, value=_element_inst)
    assert _block_instance.get_element(index=_index).value\
        == _element_inst.value
    '''fail, wrong element type'''
    _wrong_element = 'wrong'
    _index = randrange(_size)
    with pytest.raises(WrongElementTypeError) as e_info:
        _block_instance.set_element(index=_index, value=_wrong_element)
    assert str(e_info.value) ==\
        ("Elements should be '['dict', 'ContentElement']', but at least "
         f"one of the elements has type '{type(_wrong_element)}'.")
    '''fail, indexes'''
    _negative_index = -1
    with pytest.raises(WrongIndexError) as e_info:
        _block_instance.get_element(_negative_index)
    assert str(e_info.value)\
        == (f"Length of element array is {_size} but you try to operate "
            f"with index '{_negative_index}'.")
    with pytest.raises(WrongIndexError) as e_info:
        _block_instance.get_element(_size)
    assert str(e_info.value)\
        == (f"Length of element array is {_size} but you try to operate "
            f"with index '{_size}'.")


# @pytest.mark.active
def test_ContentElementsBlock_insert(element, elements_dict):
    _upper_index = 9
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    _elements_dict = elements_dict(_size)
    _block_instance = ContentElementsBlock(
        upper_index=_upper_index, type=_type, subtype=_subtype,
        name=_name, elements=_elements_dict)
    # print('\ntest_content_elements_block:',
    #       '\n test_ContentElementsBlock_insert')
    assert len(_block_instance.elements) == _size
    for i, _element in enumerate(_elements_dict):
        assert _block_instance.get_element(i).value == _element
    '''success'''
    '''insert anywhare but append'''
    _index = randrange(_size)
    _element = element(555)
    _block_instance.insert(index=_index, value=_element)
    _length = len(_block_instance.elements)
    assert _length == _size + 1
    assert _block_instance.get_element(index=_index).value == _element
    assert _block_instance.get_element(index=_size).value\
        == _elements_dict[_size - 1]
    '''insert to end'''
    _element = element(999)
    _block_instance.insert(_length, _element)
    assert len(_block_instance.elements) == _length + 1
    assert _block_instance.get_element(index=_length).value == _element
    '''fails'''
    '''negative index'''
    _negative_index = -1
    with pytest.raises(WrongIndexError) as e_info:
        _block_instance.insert(_negative_index, _element)
    assert str(e_info.value)\
        == (f"Length of element array is {_length + 1} but you try to "
            f"operate with index '{_negative_index}'.")
    '''exceeding index'''
    _exceeding_index = _length + 2
    with pytest.raises(WrongIndexError) as e_info:
        _block_instance.insert(_exceeding_index, _element)
    assert str(e_info.value)\
        == (f"Length of element array is {_length + 1} but you try to "
            f"operate with index '{_exceeding_index}'.")
    '''wrong element type'''
    _wrong_element = 5
    with pytest.raises(WrongElementTypeError) as e_info:
        _block_instance.insert(_size, _wrong_element)
    assert str(e_info.value)\
        == ("Elements should be '['dict', 'ContentElement']', "
            "but at least one of the elements has type "
            f"'{type(_wrong_element)}'.")


# @pytest.mark.active
def test_ContentElementsBlock_remove(element, elements_dict):
    _upper_index = 9
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    _elements_dict = elements_dict(_size)
    # _element = element(_size)
    block_instance = ContentElementsBlock(
        upper_index=_upper_index, type=_type, subtype=_subtype,
        name=_name, elements=_elements_dict)
    assert len(block_instance.elements) == _size
    for i in range(_size):
        assert block_instance.get_element(i).value.get('title')\
            == _elements_dict[i].get('title')
        assert block_instance.get_element(i).value.get('content')\
            == _elements_dict[i].get('content')

    '''success'''
    '''remove from to beginning'''
    _index = 0
    _old_last_element = block_instance.get_element(_size - 1)
    _removed_element = block_instance.remove(_index)
    _new_last_element = block_instance.get_element(_size - 2)

    assert len(block_instance.elements) == _size - 1
    assert isinstance(_removed_element, ContentElement)
    assert _removed_element.value == element(_index)
    assert _new_last_element.value == _old_last_element.value

    '''remove from end'''
    '''restore block element'''
    block_instance.insert(_index, _removed_element)
    _index = _size - 1
    _removed_element = block_instance.remove(_index)
    _new_last_element = block_instance.get_element(_index - 1)
    # print('\n_removed_element ->', _removed_element.value,
    # '\n_removed_element ->', _removed_element.value,
    # '\n _new_last_element ->', _new_last_element.value)
    assert len(block_instance.elements) == _size - 1
    assert _removed_element.value == element(_index)
    assert _new_last_element.value == element(_index - 1)

    '''index checks have been tested above'''


# @pytest.mark.active
def test_ContentElementsBlock_serialize_to_content_element(
        element, elements_dict):
    _upper_index = 9
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    _elements_dict = elements_dict(_size)
    block_instance = ContentElementsBlock(
        upper_index=_upper_index, type=_type, subtype=_subtype,
        name=_name, elements=_elements_dict)
    assert len(block_instance.elements) == _size
    '''success'''
    for i in range(_size):
        # print('\ntest_content_elements_block',
        #       '\n test_ContentElementsBlock_serialize_element',
        #       '\n  block_instance.serialize_to_content(i) ->',
        #       block_instance.serialize_to_content(i).get('identity'),
        #       '\n  block_instance.serialize_to_content(i) ->',
        #       block_instance.serialize_to_content(i).get('element')
        #       )
        assert block_instance.serialize_to_content_element(
            i).get('element') == element(i)
        assert block_instance.serialize_to_content_element(
            i).get('identity') == '_'.join([
                str(_upper_index).zfill(2),
                _type, _subtype,
                str(i).zfill(3)])
    '''index checks have been tested above'''


# @pytest.mark.active
def test_ContentElementsBlock_serialize_to_content(
        element, elements_dict):
    _upper_index = 9
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    _elements_dict = elements_dict(_size)
    block_instance = ContentElementsBlock(
        upper_index=_upper_index, type=_type, subtype=_subtype,
        name=_name, elements=_elements_dict)
    assert len(block_instance.elements) == _size
    '''success'''
    for i, _element in enumerate(block_instance.serialize_to_content):
        assert _element.get('title') == element(i).get('title')
        assert _element.get('content') == element(i).get('content')
        assert _element.get('identity') == '_'.join([
            str(_upper_index).zfill(2),
            _type, _subtype,
            str(i).zfill(3)])
    '''index checks have been tested above'''


# @pytest.mark.active
def test_ContentElementsBlock_serialize_to_structure(
        element, elements_dict):
    _upper_index = 9
    _size = 3
    _type = 'vblock'
    _subtype = 'txt'
    _name = 'name'

    _key = str(_upper_index).zfill(2)
    _exp_result = {
        _key: {
            'qnt': _size,
            'name': _name,
            'type': _type,
            'subtype': _subtype
        }
    }
    _elements_dict = elements_dict(_size)
    block_instance = ContentElementsBlock(
        upper_index=_upper_index, type=_type, subtype=_subtype,
        name=_name, elements=_elements_dict)
    _result = block_instance.serialize_to_structure
    assert _result.get(_key) == _exp_result.get(_key)
    # print('\ntest_content_elements_block',
    #       '\n test_ContentElementsBlock_serialize',
    #       '\n  result ->', _result)


# @pytest.mark.active
def test_ContentElementsBlock_load_fm_db(client, element, elements_dict):
    '''clean up content tables'''
    # [_structure.delete_fm_db() for _structure in StructureModel.find()]
    [_content.delete_fm_db() for _content in ContentModel.find()]

    _view_id = choice(global_constants.get_VIEWS_PKS)
    _locale_id = choice(global_constants.get_PKS)
    _upper_index_00 = randrange(100)
    _upper_index_01 = randrange(100)
    while _upper_index_01 == _upper_index_00:
        _upper_index_01 = randrange(100)
    _size_00 = 3
    _size_01 = 5
    _type_00 = choice(ContentElementsBlock._types)
    _type_01 = choice([item for item in ContentElementsBlock._types
                       if item != _type_00])
    _subtype = choice(ContentElementsBlock._subtypes)
    _name_00 = f'name of {_type_00}'
    _name_01 = f'name of {_type_01}'

    _elements_dict_00 = elements_dict(_size_00)
    _block_instance_00 = ContentElementsBlock(
        upper_index=_upper_index_00, type=_type_00, subtype=_subtype,
        name=_name_00, elements=_elements_dict_00)
    assert len(_block_instance_00.elements) == _size_00
    for element in _block_instance_00.serialize_to_content:
        _content_record = content_schema.load({
            **element, 'view_id': _view_id, 'locale_id': _locale_id},
            session=dbs_global.session)
        _content_record.save_to_db()

    _elements_dict_01 = elements_dict(_size_01)
    _block_instance_01 = ContentElementsBlock(
        upper_index=_upper_index_01, type=_type_01, subtype=_subtype,
        name=_name_01, elements=_elements_dict_01)
    assert len(_block_instance_01.elements) == _size_01

    for element in _block_instance_01.serialize_to_content:
        _content_record = content_schema.load({
            **element, 'view_id': _view_id, 'locale_id': _locale_id},
            session=dbs_global.session)
        _content_record.save_to_db()

    '''testing'''
    _identity = '_'.join(
        [str(_upper_index_00).zfill(2), _type_00, _subtype])
    loaded_block_instance = ContentElementsBlock.load_fm_db(
        identity=_identity, view_id=_view_id, locale_id=_locale_id)

    for i, instance in enumerate(loaded_block_instance.elements):
        assert instance.value == _elements_dict_00[i]


# @pytest.mark.active
def test_ContentElementsBlock_save_to_db_content_structure(
        client, element, elements_dict):
    '''clean up content table'''
    [_structure.delete_fm_db() for _structure in StructureModel.find()]
    [_content.delete_fm_db() for _content in ContentModel.find()]

    '''create testing consants'''
    _view_id = choice(global_constants.get_VIEWS_PKS)
    _locale_id = choice(global_constants.get_PKS)
    _upper_index = randrange(100)
    _user_id = randrange(128)
    _size = randrange(3, 20)
    _type = choice(ContentElementsBlock._types)
    _subtype = choice(ContentElementsBlock._subtypes)
    _name = f'name of {_type}'
    _elements_dict = elements_dict(_size)

    '''create ContentElementsBlock instance'''
    _block_instance = ContentElementsBlock(
        upper_index=_upper_index, type=_type, subtype=_subtype,
        name=_name, elements=_elements_dict)
    assert len(_block_instance.elements) == _size

    '''save it to db'''
    _block_instance.save_to_db_content(
        view_id=_view_id, locale_id=_locale_id, user_id=_user_id,
        save_structure=True)

    '''load insance having PKs and check it adequate to source'''
    _loaded_instance = ContentElementsBlock.load_fm_db(
        identity='_'.join([str(_upper_index).zfill(2), _type, _subtype]),
        view_id=_view_id, locale_id=_locale_id, load_name=True
    )
    assert _loaded_instance.upper_index == _upper_index
    assert _loaded_instance.type == _type
    assert _loaded_instance.subtype == _subtype
    assert _loaded_instance.name == _name
    for i, element in enumerate(_loaded_instance.elements):
        assert element.value == _elements_dict[i]
    # print('\ntest_content_elements_block:',
    #       '\n test_ContentElementsBlock_save_to_db_content',
    #       '\n  _loaded_instance ->', _loaded_instance)

    '''get records directly from content table'''
    _identity_like = '_'.join(
        [str(_upper_index).zfill(2), _type, _subtype])
    _content_model_instance = ContentModel.find_identity_like(
        searching_criterions={'view_id': _view_id,
                              'locale_id': _locale_id},
        identity_like=f"{_identity_like}%",
    )
    assert len(_content_model_instance) == _size
    for i, element in enumerate(_content_model_instance):
        _element_dict = content_get_schema.dump(element)
        assert _element_dict == {
            'identity': '_'.join([_identity_like, str(i).zfill(3)]),
            'view_id': _view_id,
            'locale_id': _locale_id,
            'user_id': _user_id,
            **_elements_dict[i]
        }
    '''get record from structure table, check it'''
    _structure_dict = StructureModel.find_by_ids({
        'view_id': _view_id,
        'locale_id': _locale_id
    }).get_element(_upper_index)
    assert _structure_dict == {
        'type': _type,
        'subtype': _subtype,
        'qnt': _size,
        'name': f'name of {_type}'}

    '''correct loaded ContentElementsBlock instance and reduce element
        quantity'''
    _block_instance.remove(randrange(len(_block_instance.elements)))
    _block_instance.remove(randrange(len(_block_instance.elements)))
    _index = randrange(len(_block_instance.elements))
    _new_title = f"corrected title for element No '{_index}'"
    _new_element = {**_block_instance.get_element(index=_index).value,
                    'title': _new_title}
    _block_instance.set_element(index=_index, value=_new_element)
    '''save it to db'''
    _block_instance.save_to_db_content(
        view_id=_view_id, locale_id=_locale_id, user_id=_user_id,
        save_structure=True)
    '''load new instance and check it adequate to changes'''
    _corrected_model_instance = ContentModel.find_identity_like(
        searching_criterions={'view_id': _view_id,
                              'locale_id': _locale_id},
        identity_like=f"{_identity_like}%",
    )
    assert len(_corrected_model_instance) == _size - 2
    assert _corrected_model_instance[_index].serialize().get('title')\
        == _new_title

    '''get record from structure table, check it'''
    _structure_dict = StructureModel.find_by_ids({
        'view_id': _view_id,
        'locale_id': _locale_id
    }).get_element(_upper_index)
    assert _structure_dict == {
        'type': _type,
        'subtype': _subtype,
        'qnt': _size - 2,
        'name': f'name of {_type}'}


# @pytest.mark.active
def test_ContentElementsBlock_delete_fm_db(
        client, create_test_content):
    '''create testing consants'''
    _size = 6
    blocks_details = create_test_content(size_00=_size)
    _view_id = blocks_details.get('view_id')
    _locale_id = blocks_details.get('locale_id')
    _block = blocks_details.get('block_00')
    _identity = '_'.join([
        str(_block.get('upper_index')).zfill(2),
        _block.get('type'), _block.get('subtype')])

    '''load insance having PKs'''
    loaded_instance = ContentElementsBlock.load_fm_db(
        identity=_identity,
        view_id=_view_id,
        locale_id=_locale_id)
    assert len(loaded_instance.elements) == _size

    '''load respective structure record'''
    # _structure_record = StructureModel.find_by_ids({
    #     'view_id': _view_id,
    #     'locale_id': _locale_id
    # })

    '''test structure records corresponds to sources'''
    # blocks = [item for item in blocks_details.keys()
    #           if item not in ['view_id', 'locale_id']]
    # assert len(_structure_record.attributes) == len(blocks)
    # for item in blocks:
    #     _dict_source = blocks_details.get(item)
    #     _key = _dict_source.pop('upper_index')
    #     _dict_target = _structure_record.attributes.get(
    #         str(_key).zfill(2))
    #     _json_source = dumps(_dict_source, sort_keys=True)
    #     _json_target = dumps(_dict_target, sort_keys=True)
    #     assert dumps(_dict_source, sort_keys=True)\
    #         == dumps(_dict_target, sort_keys=True)

    # print('\ntest_content_elements_block',
    #       '\n test_ContentElementsBlock_delete_fm_db',
    #       '\n  blocks_details ->', dumps(blocks_details, indent=4),
    #       )

    '''delete instance'''
    loaded_instance.delete_fm_db(view_id=_view_id, locale_id=_locale_id)
    '''try to load it again'''
    # loaded_instance = ContentElementsBlock.load_fm_db(
    #     identity=_identity, view_id=_view_id, locale_id=_locale_id)
    # assert loaded_instance is None

    '''load again respective structure record'''
    # _structure_record = StructureModel.find_by_ids({
    #     'view_id': _view_id,
    #     'locale_id': _locale_id
    # })

    '''test structure records corresponds to sources'''
    # blocks = [item for item in blocks_details.keys()
    #           if item not in ['view_id', 'locale_id']]
    # assert len(_structure_record.attributes) == len(blocks) - 1

    # print('\n  _structure_record ->',
    #       dumps(_structure_record.attributes, indent=4),
    #       )
