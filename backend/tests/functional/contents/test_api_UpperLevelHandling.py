import pytest
# from json import dumps
from random import randrange
from flask import url_for

from application.contents.models.contents import ContentModel
from application.structure.models.structure import StructureModel
from application.contents.models.content_elements_block import (
    ContentElementsBlock)
from application.contents.models.page_view import PageView


# @pytest.mark.active
@pytest.mark.parametrize(
    ('lng, test_word, test_word_01, test_word_02, test_word_03,'
     ' test_word_04'),
    [
        ('en', 'The content and structure', 'Request does not contain',
         'Sorry, access to views', 'Something went wrong.',
         'While trying to retrieve',),
        ('ru', 'Таблицы содержимого и структуры', 'Запрос не содержит',
         'Извиняйте, доступ', 'Что-то пошло не так.',
         'При попытке запросить',),
    ]
)
def test_UpperLevelHandling_post(
    client,
    create_test_content,
    user_instance, access_token,
    view_name, locale, elements,
    lng, test_word, test_word_01, test_word_02, test_word_03, test_word_04
):
    '''clean up tables'''
    [_content.delete_fm_db() for _content in ContentModel.find()]
    [_structure.delete_fm_db() for _structure in StructureModel.find()]
    '''create and save new contents in tables'''
    _view_name = view_name()
    _locale = lng
    _elements = elements()
    _page_view = PageView(
        view_name=_view_name, locale=_locale, elements=_elements)
    _page_view.save_to_db(user_id=randrange(128))
    # _index = 1

    '''Create user and admin'''
    _user = user_instance({'role_id': 'user'})
    _user.save_to_db()
    _admin = user_instance({'role_id': 'admin'})
    _admin.save_to_db()

    '''create tokens'''
    _admin_access_token = access_token(_admin)
    _user_access_token = access_token(_user)

    '''creating headers'''
    _admin_headers = {'Authorization': f'Bearer {_admin_access_token}',
                      'Content-Type': 'application/json',
                      'Accept-Language': _locale}
    _user_headers = {'Authorization': f'Bearer {_user_access_token}',
                     'Content-Type': 'application/json',
                     'Accept-Language': _locale}
    '''success'''
    _direction = 'up'
    _index = randrange(1, len(_elements))
    _index_key = str(_index).zfill(2)
    _info_json = _elements[_index].serialize_to_structure
    _identity = '_'.join([
        list(_info_json.keys())[0],
        _info_json.get(_index_key).get('type')])
    if isinstance(_page_view.elements[_index], ContentElementsBlock):
        _identity = '_'.join([
            _identity,
            _info_json.get(_index_key).get('subtype')])
    _json = {'view_id': _view_name,
             'identity': _identity,
             'direction': _direction}
    _resp = client.post(url_for('contents_bp.upperlevelhandling'),
                        json=_json, headers=_admin_headers)
    assert _resp.status_code == 200
    assert _resp.json.get('message').find(test_word) != -1
    '''down'''
    _direction = 'down'
    _index = randrange(len(_elements) - 1)
    _info_json = _elements[_index].serialize_to_structure
    _identity = '_'.join([
        list(_info_json.keys())[0],
        _info_json.get(str(_index).zfill(2)).get('type')])
    if isinstance(_page_view.elements[_index], ContentElementsBlock):
        _identity = '_'.join([
            _identity,
            _info_json.get(str(_index).zfill(2)).get('subtype')])
    _json = {'view_id': _view_name,
             'identity': _identity,
             'direction': _direction}
    _resp = client.post(url_for('contents_bp.upperlevelhandling'),
                        json=_json, headers=_admin_headers)
    assert _resp.status_code == 200
    assert _resp.json.get('message').find(test_word) != -1

    '''failues'''
    '''No tokens'''
    _no_token_header = {
        k: v for (k, v) in _admin_headers.items() if k != 'Authorization'}
    _resp = client.post(url_for('contents_bp.upperlevelhandling'),
                        json=_json, headers=_no_token_header)
    assert _resp.status_code == 401
    assert _resp.json.get('description').find(test_word_01) != -1

    '''Non admin'''
    _resp = client.post(url_for('contents_bp.upperlevelhandling'),
                        json=_json, headers=_user_headers)
    assert _resp.status_code == 401
    assert _resp.json.get('message').find(test_word_02) != -1

    '''No block identity'''
    _json_no_id = {k: v for (k, v) in _json.items() if k != 'identity'}
    _resp = client.post(url_for('contents_bp.upperlevelhandling'),
                        json=_json_no_id, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1
    assert _resp.json.get('payload') == "'identity'"

    '''wrong direction - index combination'''
    _index = 0
    _direction = 'up'
    _index_key = str(_index).zfill(2)
    _info_json = _elements[_index].serialize_to_structure
    _identity = '_'.join([
        _index_key,
        _info_json.get(_index_key).get('type')])
    if isinstance(_page_view.elements[_index], ContentElementsBlock):
        _identity = '_'.join([
            _identity,
            _info_json.get(_index_key).get('subtype')])
    _json_up = {'view_id': _view_name,
                'identity': _identity,
                'direction': _direction}
    _resp = client.post(url_for('contents_bp.upperlevelhandling'),
                        json=_json_up, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1
    assert _resp.json.get('payload').find(str(_index - 1)) != -1

    _index = len(_elements) - 1
    _direction = 'down'
    _index_key = str(_index).zfill(2)
    _info_json = _elements[_index].serialize_to_structure
    _identity = '_'.join([
        _index_key,
        _info_json.get(_index_key).get('type')])
    if isinstance(_page_view.elements[_index], ContentElementsBlock):
        _identity = '_'.join([
            _identity,
            _info_json.get(_index_key).get('subtype')])
    _json_down = {'view_id': _view_name,
                  'identity': _identity,
                  'direction': _direction}
    _resp = client.post(url_for('contents_bp.upperlevelhandling'),
                        json=_json_down, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1
    assert _resp.json.get('payload').find(str(_index + 1)) != -1

    '''generate not found error'''
    _wrong_view_id = 'wrong'
    _wrong_view_id_json = {**_json, 'view_id': _wrong_view_id}
    _resp = client.post(url_for('contents_bp.upperlevelhandling'),
                        json=_wrong_view_id_json, headers=_admin_headers)
    assert _resp.status_code == 404
    assert _resp.json.get('message').find(test_word_04) != -1
    assert _resp.json.get('message').find(_wrong_view_id) != -1

    '''clean up users'''
    if _user is not None:
        _user.delete_fm_db()
    if _admin is not None:
        _admin.delete_fm_db()


# @pytest.mark.active
@pytest.mark.parametrize(
    ('lng, test_word_00, test_word_01, '
     'test_word_02, test_word_03, '
     'test_word_04, test_word_05'),
    [
        ('en', 'The content and structure', 'Request does not contain',
         'Sorry, access to views', 'Something went wrong.',
         'While trying to retrieve', 'You try to use'),
        ('ru', 'Таблицы содержимого и структуры', 'Запрос не содержит',
         'Извиняйте, доступ', 'Что-то пошло не так.',
         'При попытке запросить', 'Вы пытаетесь использовать'),
    ]
)
def test_UpperLevelHandling_put(
    client,
    create_test_content,
    user_instance, access_token,
    view_name, locale, elements,
    lng, test_word_00, test_word_01, test_word_02, test_word_03,
    test_word_04, test_word_05
):
    '''clean up tables'''
    [_content.delete_fm_db() for _content in ContentModel.find()]
    [_structure.delete_fm_db() for _structure in StructureModel.find()]
    '''create and save new contents in tables'''
    _view_name = view_name()
    _locale = lng
    _elements = elements()
    _page_view = PageView(
        view_name=_view_name, locale=_locale, elements=_elements)
    _page_view.save_to_db(user_id=randrange(128))
    # _index = 1

    '''Create user and admin'''
    _user = user_instance({'role_id': 'user'})
    _user.save_to_db()
    _admin = user_instance({'role_id': 'admin'})
    _admin.save_to_db()

    '''create tokens'''
    _admin_access_token = access_token(_admin)
    _user_access_token = access_token(_user)

    '''creating headers'''
    _admin_headers = {'Authorization': f'Bearer {_admin_access_token}',
                      'Content-Type': 'application/json',
                      'Accept-Language': _locale}
    _user_headers = {'Authorization': f'Bearer {_user_access_token}',
                     'Content-Type': 'application/json',
                     'Accept-Language': _locale}
    '''success'''
    '''insert simple element'''
    _index = 1
    _type = 'header'
    _subtype = 'txt'
    _identity = '_'.join([str(_index).zfill(2), _type])
    if _type in ContentElementsBlock._types:
        _identity = '_'.join([_identity, _subtype])
    _json = {
        'view_id': _view_name,
        'identity': _identity
    }
    _resp = client.put(url_for('contents_bp.upperlevelhandling'),
                       json=_json, headers=_admin_headers)
    assert _resp.status_code == 200
    assert _resp.json.get('message').find(test_word_00) != -1

    _index = 1
    _type = 'vblock'
    _identity = '_'.join([str(_index).zfill(2), _type])
    if _type in ContentElementsBlock._types:
        _identity = '_'.join([_identity, _subtype])
    _json = {
        'view_id': _view_name,
        'identity': _identity
    }
    _resp = client.put(url_for('contents_bp.upperlevelhandling'),
                       json=_json, headers=_admin_headers)
    assert _resp.status_code == 200
    assert _resp.json.get('message').find(test_word_00) != -1

    '''failues'''
    '''No tokens'''
    _no_token_header = {
        k: v for (k, v) in _admin_headers.items() if k != 'Authorization'}
    _resp = client.put(url_for('contents_bp.upperlevelhandling'),
                       json=_json, headers=_no_token_header)
    assert _resp.status_code == 401
    assert _resp.json.get('description').find(test_word_01) != -1
    assert _resp.json.get('error') == 'authorization_required'

    '''Non admin'''
    _resp = client.put(url_for('contents_bp.upperlevelhandling'),
                       json=_json, headers=_user_headers)
    assert _resp.status_code == 401
    assert _resp.json.get('message').find(test_word_02) != -1

    '''No block identity'''
    _json_no_id = {k: v for (k, v) in _json.items() if k != 'identity'}
    _resp = client.put(url_for('contents_bp.upperlevelhandling'),
                       json=_json_no_id, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1
    assert _resp.json.get('payload') == "'identity'"

    '''wrong identity'''
    '''first part is not integer'''
    _wrong_identity = 'fuck'
    _json = {
        'view_id': _view_name,
        'identity': _wrong_identity
    }
    _resp = client.put(url_for('contents_bp.upperlevelhandling'),
                       json=_json, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json == (
        f"invalid literal for int() with base 10: '{_wrong_identity}'")
    '''wrong type'''
    _wrong_identity = '01_fuck'
    _json = {
        'view_id': _view_name,
        'identity': _wrong_identity
    }
    _resp = client.put(url_for('contents_bp.upperlevelhandling'),
                       json=_json, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1
    assert _resp.json.get('payload').find(test_word_05) != -1
    assert _resp.json.get('payload').find(_wrong_identity.split('_')[1])
    # print('\ntest_api_UpperLevelHandling:'
    #       '\n test_UpperLevelHandling_put')
    # print('  status ->', _resp.status_code,
    #       '\n  json ->', _resp.json,
    #       )


# @pytest.mark.active
@pytest.mark.parametrize(
    ('lng, test_word_00, test_word_01, '
     'test_word_02, test_word_03, '
     'test_word_04, test_word_05'),
    [
        ('en', 'The content and structure', 'Request does not contain',
         'Sorry, access to views', 'Something went wrong.',
         'While trying to retrieve', 'You try to use'),
        ('ru', 'Таблицы содержимого и структуры', 'Запрос не содержит',
         'Извиняйте, доступ', 'Что-то пошло не так.',
         'При попытке запросить', 'Вы пытаетесь использовать'),
    ]
)
def test_UpperLevelHandling_patch(
    client,
    create_test_content,
    user_instance, access_token,
    view_name, locale, elements,
    lng, test_word_00, test_word_01, test_word_02, test_word_03,
    test_word_04, test_word_05
):
    '''clean up tables'''
    [_content.delete_fm_db() for _content in ContentModel.find()]
    [_structure.delete_fm_db() for _structure in StructureModel.find()]
    '''create and save new contents in tables'''
    _view_name = view_name()
    _locale = lng
    _elements = elements()
    _page_view = PageView(
        view_name=_view_name, locale=_locale, elements=_elements)
    _page_view.save_to_db(user_id=randrange(128))
    # _index = 1

    '''Create user and admin'''
    _user = user_instance({'role_id': 'user'})
    _user.save_to_db()
    _admin = user_instance({'role_id': 'admin'})
    _admin.save_to_db()

    '''create tokens'''
    _admin_access_token = access_token(_admin)
    _user_access_token = access_token(_user)

    '''creating headers'''
    _admin_headers = {'Authorization': f'Bearer {_admin_access_token}',
                      'Content-Type': 'application/json',
                      'Accept-Language': _locale}
    _user_headers = {'Authorization': f'Bearer {_user_access_token}',
                     'Content-Type': 'application/json',
                     'Accept-Language': _locale}
    '''success'''
    '''remove random element'''
    _index = randrange(len(_elements) - 1)
    _identity = str(_index).zfill(2)
    _json = {
        'view_id': _view_name,
        'identity': _identity
    }
    _resp = client.patch(url_for('contents_bp.upperlevelhandling'),
                         json=_json, headers=_admin_headers)
    assert _resp.status_code == 200
    assert _resp.json.get('message').find(test_word_00) != -1

    '''failues'''
    '''No tokens'''
    _no_token_header = {
        k: v for (k, v) in _admin_headers.items() if k != 'Authorization'}
    _resp = client.patch(url_for('contents_bp.upperlevelhandling'),
                         json=_json, headers=_no_token_header)
    assert _resp.status_code == 401
    assert _resp.json.get('description').find(test_word_01) != -1
    assert _resp.json.get('error') == 'authorization_required'

    '''Non admin'''
    _resp = client.patch(url_for('contents_bp.upperlevelhandling'),
                         json=_json, headers=_user_headers)
    assert _resp.status_code == 401
    assert _resp.json.get('message').find(test_word_02) != -1

    '''No block identity'''
    _json_no_id = {k: v for (k, v) in _json.items() if k != 'identity'}
    _resp = client.patch(url_for('contents_bp.upperlevelhandling'),
                         json=_json_no_id, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1
    assert _resp.json.get('payload') == "'identity'"

    '''wrong identity'''
    '''first part is not integer'''
    _wrong_identity = 'fuck'
    _json = {
        'view_id': _view_name,
        'identity': _wrong_identity
    }
    _resp = client.patch(url_for('contents_bp.upperlevelhandling'),
                         json=_json, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json == (
        f"invalid literal for int() with base 10: '{_wrong_identity}'")

    '''index out of range'''
    _wrong_identity = '-1'
    _json = {
        'view_id': _view_name,
        'identity': _wrong_identity
    }
    _resp = client.patch(url_for('contents_bp.upperlevelhandling'),
                         json=_json, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1
    assert _resp.json.get('payload').find(_wrong_identity) != -1

    _wrong_identity = str(len(_page_view.elements))
    _json = {
        'view_id': _view_name,
        'identity': _wrong_identity
    }
    _resp = client.patch(url_for('contents_bp.upperlevelhandling'),
                         json=_json, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1
    assert _resp.json.get('payload').find(_wrong_identity) != -1

    # print('\ntest_api_UpperLevelHandling:'
    #       '\n test_UpperLevelHandling_patch')
    # print('  status ->', _resp.status_code,
    #       '\n  json ->', _resp.json,
    #       )
