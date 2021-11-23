import pytest
import json
from random import choice, randrange

from application.modules.dbs_global import dbs_global
from application.global_init_data import global_constants
from application.contents.errors.custom_exceptions import (
    WrongTypeError, WrongElementKeyError, WrongElementTypeError,
    RecordNotFoundError)

from application.contents.models.contents import ContentModel
from application.contents.schemas.contents import content_schema
from application.contents.models.content_elements_simple import (
    ContentElementsSimple)
from application.contents.models.content_element import ContentElement
from application.structure.models.structure import StructureModel


# @pytest.mark.active
def test_ContentElementsSimple_init_success(value, content_element):
    '''initializing using values'''
    _upper_index = 6
    _type = 'header'
    _name = 'name'
    content_elements_simple_value = ContentElementsSimple(
        upper_index=_upper_index, type=_type, name=_name, element=value())
    assert content_elements_simple_value.upper_index == _upper_index
    assert content_elements_simple_value.type == _type
    assert content_elements_simple_value.name == _name
    assert isinstance(content_elements_simple_value.element,
                      ContentElement)
    assert content_elements_simple_value.element.value == value()

    '''initializing using instance'''
    content_elements_simple_instance = ContentElementsSimple(
        upper_index=_upper_index, type=_type, name=_name, element=value())
    assert content_elements_simple_instance.upper_index == _upper_index
    assert content_elements_simple_instance.type == _type
    assert content_elements_simple_instance.name == _name
    assert isinstance(content_elements_simple_instance.element,
                      ContentElement)
    assert content_elements_simple_instance.element.value == value()


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
            name=_name, element=value())
    assert str(e_info.value)\
        == ("Upper level element could be "
            f"'{ContentElementsSimple._type_values}', but "
            f"provided type is '{_wrong_type}'.")

    '''wrong value key'''
    _wrong_key = 'wrong'
    _wrong_value = {**value(), _wrong_key: 'new value for wrong key'}
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
        name=_wrong_name, element=value())
    assert content_elements_simple.name == ''


# @pytest.mark.active
def test_ContentElementsSimple_set_get(value):
    '''init'''
    _upper_index = 6
    _type = 'header'
    _name = 'name'
    content_elements_simple = ContentElementsSimple(
        upper_index=_upper_index, type=_type,
        name=_name, element=value())
    # _type, _name, value)
    assert content_elements_simple.upper_index == _upper_index
    assert content_elements_simple.type == _type
    assert content_elements_simple.name == _name
    assert content_elements_simple.element.value == value()

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
        'title': value().get('title'),
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
    _wrong_value = {**value(), _wrong_key: 'new value for wrong key'}
    _wrong_value.pop('title')
    with pytest.raises(WrongElementKeyError) as e_info:
        content_elements_simple.element = _wrong_value
    assert str(e_info.value)\
        == ("Content element value key should be either 'title' or "
            f"'content', but one of them is '{_wrong_key}'.")


# @pytest.mark.active
def test_ContentElementsSimple_serialize_to_content(value):
    '''init'''
    _upper_index = randrange(100)
    _type = 'header'
    _name = 'name'
    content_element = ContentElementsSimple(
        upper_index=_upper_index, type=_type,
        name=_name, element=value())
    assert content_element.upper_index == _upper_index
    assert content_element.type == _type
    assert content_element.name == _name
    assert content_element.element.value == value()
    _element_json = json.dumps(content_element.serialize_to_content,
                               sort_keys=True)
    _testing_json = json.dumps({
        'identity': '_'.join([str(_upper_index).zfill(2), _type]),
        'title': value().get('title'),
        'content': value().get('content'),
    }, sort_keys=True)
    assert _element_json == _testing_json
    # result = content_element.serialize_to_content
    # print('\ntest_content_element:',
    #       '\n test_ContentElementsSimple_serialize_to_content',
    #       '\n  result ->', result
    #       )


# @pytest.mark.active
def test_ContentElementsSimple_serialize_to_structure(value):
    '''init'''
    _upper_index = 6
    _type = 'header'
    _name = 'name'
    content_element = ContentElementsSimple(
        upper_index=_upper_index, type=_type,
        name=_name, element=value())
    assert content_element.upper_index == _upper_index
    assert content_element.type == _type
    assert content_element.name == _name
    assert content_element.element.value == value()
    assert content_element.serialize_to_structure\
        == {
            str(_upper_index).zfill(2): {
                'name': _name,
                'type': _type
            }
        }
    # result = content_element.serialize_to_structure


# @pytest.mark.active
def test_ContentElementsSimple_load_fm_db(client, value):
    '''clean up structure and content tables'''
    # [_structure.delete_fm_db() for _structure in StructureModel.find()]
    [_content.delete_fm_db() for _content in ContentModel.find()]
    '''init'''
    '''Create test constants'''
    _view_id = choice(global_constants.get_VIEWS_PKS)
    _locale_id = choice(global_constants.get_PKS)
    _record_id = '_'.join([
        str(randrange(99)).zfill(2),
        choice(ContentElementsSimple._types)])
    _value = value('simple element load fm db testing')
    '''Fill contents table'''
    _record = content_schema.load({
        'identity': _record_id, 'view_id': _view_id,
        'locale_id': _locale_id, 'title': _value.get('title'),
        'content': _value.get('content')
    }, session=dbs_global.session)
    _record.save_to_db()
    content_elements_simple = ContentElementsSimple.load_fm_db(
        identity=_record_id, view_id=_view_id, locale_id=_locale_id)
    assert content_elements_simple.upper_index\
        == int(_record_id.split('_')[0])
    assert content_elements_simple.type == _record_id.split('_')[1]
    _simple_json = json.dumps(
        content_elements_simple.element.value, sort_keys=True)
    # _value_json =
    assert _simple_json == json.dumps(_value, sort_keys=True)
    # print('\ntest_content_elements_simple:',
    #       '\n test_ContentElementsSimple_load_fm_db',
    #       '\n  value ->', content_elements_simple.element.value,
    #       )


# @pytest.mark.active
def test_ContentElementsSimple_save_to_db_content_structure(
        client, value):
    '''clean up structure and content tables'''
    [_structure.delete_fm_db() for _structure in StructureModel.find()]
    [_content.delete_fm_db() for _content in ContentModel.find()]
    '''init'''
    _view_id = choice(global_constants.get_VIEWS_PKS)
    _locale_id = choice(global_constants.get_PKS)
    _upper_index = randrange(100)
    _user_id = randrange(64)
    _type = 'header'
    _name = 'name'
    # _value = value('db value')
    _element = value('element value')

    '''creating element for testing'''
    _content_element = ContentElementsSimple(
        upper_index=_upper_index, type=_type,
        name=_name, element=_element)
    _content_element.save_to_db_content(
        view_id=_view_id, locale_id=_locale_id, user_id=_user_id,
        save_structure=True)
    '''testing useing load'''
    _loaded_instance = ContentElementsSimple.load_fm_db(
        identity={'_'.join([str(_upper_index).zfill(2), _type])},
        view_id=_view_id, locale_id=_locale_id, load_name=True)

    '''test loaded element'''
    assert _loaded_instance.upper_index == _upper_index
    assert _loaded_instance.type == _type
    assert _loaded_instance.name == _name
    assert _loaded_instance.element.value == _element

    '''testing records in tables'''
    _found_db_instance = ContentModel.find_by_identity_view_locale(
        identity='_'.join([str(_upper_index).zfill(2), _type]),
        view_id=_view_id, locale_id=_locale_id
    )
    assert _found_db_instance.identity\
        == '_'.join([str(_upper_index).zfill(2), _type])
    assert _found_db_instance.title == _element.get('title')
    assert _found_db_instance.content == _element.get('content')

    '''update db record with element instance, same PKs'''
    _element = value(marker='new value')
    _name = f'new {_name}'
    # _upper_index = randrange(50, 100)
    _user_id = randrange(64, 128)
    _new_instance = ContentElementsSimple(
        upper_index=_upper_index, type=_type,
        name=_name, element=_element)
    _new_instance.save_to_db_content(
        view_id=_view_id, locale_id=_locale_id,
        user_id=_user_id, save_structure=True)
    _found_identity = ContentElementsSimple.load_fm_db(
        identity='_'.join([str(_upper_index).zfill(2), _type]),
        view_id=_view_id,
        locale_id=_locale_id,
        load_name=True
    )
    assert _found_identity.upper_index == _upper_index
    assert _found_identity.type == _type
    # assert _found_identity.name == _name
    assert _found_identity.element.value == _element
    # print('\ntest_content_element:',
    #       '\n ContentElementsSimple_save_to_db_content_structure',
    #       '\n  _new_instance ->', _new_instance.name,
    #       '\n  _found_identity ->', _found_identity.name,
    #       )


# @pytest.mark.active
def test_ContentElementsSimple_delete_fm_db(client, value):
    '''clean up structure and content tables'''
    # [_structure.delete_fm_db() for _structure in StructureModel.find()]
    [_content.delete_fm_db() for _content in ContentModel.find()]
    '''init'''
    _view_id = choice(global_constants.get_VIEWS_PKS)
    _locale_id = choice(global_constants.get_PKS)
    _upper_index = randrange(100)
    _type = 'header'
    _name = 'name'
    _value = value('db value')
    _element = value('element value')
    _identity = '_'.join([str(_upper_index).zfill(2), _type])

    '''creating record in db'''
    _record = content_schema.load({
        'identity': _identity,
        'view_id': _view_id, 'locale_id': _locale_id,
        'title': _value.get('title'), 'content': _value.get('content')
    }, session=dbs_global.session)
    _record.save_to_db()
    '''test it exists'''
    _found_db_instance = ContentModel.find_by_identity_view_locale(
        identity=_identity,
        view_id=_view_id, locale_id=_locale_id
    )
    assert _found_db_instance.identity\
        == _identity
    assert _found_db_instance.view_id == _view_id
    assert _found_db_instance.locale_id == _locale_id
    assert _found_db_instance.title == _value.get('title')
    assert _found_db_instance.content == _value.get('content')

    '''create element instance with same PKs and delete record with
        the element'''
    _element_instance = ContentElementsSimple(
        upper_index=_upper_index, type=_type,
        name=_name, element=_element)
    _element_instance.delete_fm_db(view_id=_view_id, locale_id=_locale_id)
    '''check there is nothing in db'''
    _found_db_instance = ContentModel.find_by_identity_view_locale(
        identity=_identity,
        view_id=_view_id, locale_id=_locale_id)
    assert _found_db_instance is None

    '''try to delete the instance once more'''
    with pytest.raises(RecordNotFoundError) as e_info:
        _element_instance.delete_fm_db(
            view_id=_view_id, locale_id=_locale_id)
    # assert str(e_info.value)\
    #     == (f"Record with identity '{_identity}', view id '{_view_id}' "
    #         f"and locale id '{_locale_id}' has not been found.")
    assert str(e_info.value).find(_identity) != -1
    assert str(e_info.value).find(_view_id) != -1
    assert str(e_info.value).find(_locale_id) != -1
    # print('\ntest_content_element:',
    #       '\n test_ContentElementsSimple_delete_fm_db',
    #       '\n  e_info.value ->\n  ', e_info.value)
