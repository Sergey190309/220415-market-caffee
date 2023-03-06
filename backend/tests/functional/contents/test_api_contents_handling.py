import pytest
# from typing import Dict
# from json import dumps
from random import randrange
# from pprint import pprint as pp
from flask import url_for

# from application.modules.dbs_global import dbs_global
# from application.global_init_data import global_constants
# from application.structure.models import StructureModel
from application.contents.models import ContentModel
# from application.contents.schemas.contents import content_schema
# from application.structure.modules.dbs_init_structure import (
#     fill_structure)
# from application.contents.models.content_elements_block import (
#     ContentElementsBlock)


# @pytest.mark.active
@pytest.mark.parametrize(
    ('lng, test_word_00, test_word_01, '
     'test_word_02, test_word_03,'
     'test_word_04'),
    [
        ('en', 'The content quontity', 'Request does not contain',
         'Sorry, access', 'Something went wrong',
         'While trying to retrieve'),
        ('ru', 'Количество содержимого', 'Запрос не содержит',
         'Извиняйте, доступ', 'Что-то пошло не так',
         'При попытке запросить'),
    ]
)
def test_ContentsHandling_post(
    client,
    create_test_content,
    # structure_get_schema,
    user_instance, access_token,
    # attributes,
    lng, test_word_00, test_word_01,
    test_word_02, test_word_03,
    test_word_04
):
    '''clean up old values and create new ones in structure and contents
        tables'''
    block_details = create_test_content(locale=lng)
    '''setting contants'''
    _block_00 = block_details.get('block_00')
    _view_id = block_details.get('view_id')
    _identity = '_'.join([str(_block_00.get('upper_index')).zfill(2),
                          _block_00.get('type'),
                          _block_00.get('subtype')])

    '''Create user and admin'''
    _user = user_instance({'role_id': 'user'})
    _user.save_to_db()
    _admin = user_instance({'role_id': 'admin'})
    _admin.save_to_db()

    '''Create tokens'''
    _admin_access_token = access_token(_admin)
    _user_access_token = access_token(_user)
    _admin_headers = {
        'Authorization': f'Bearer {_admin_access_token}',
        'Content-Type': 'application/json',
        'Accept-Language': lng}
    _user_headers = {
        'Authorization': f'Bearer {_user_access_token}',
        'Content-Type': 'application/json',
        'Accept-Language': lng}
    _qnt = _block_00.get('qnt')

    '''Success'''
    _item_index = randrange(_qnt - 1)
    _direction = 'down'
    _json = {'view_id': _view_id,
             'identity': _identity,
             'item_index': _item_index,
             'direction': _direction}
    _resp = client.post(url_for('contents_bp.contentshandling'),
                        json=_json, headers=_admin_headers)
    assert _resp.status_code == 200
    assert _resp.json.get('message').find(test_word_00) != -1

    _item_index = randrange(1, _qnt)
    _direction = 'up'
    _json = {'view_id': _view_id,
             'identity': _identity,
             'item_index': _item_index,
             'direction': _direction}
    _resp = client.post(url_for('contents_bp.contentshandling'),
                        json=_json, headers=_admin_headers)
    assert _resp.status_code == 200
    assert _resp.json.get('message').find(test_word_00) != -1

    '''Failures'''
    '''No tokens'''
    _no_token_header = {
        k: v for (k, v) in _admin_headers.items() if k != 'Authorization'}
    _resp = client.post(url_for('contents_bp.contentshandling'),
                        json=_json, headers=_no_token_header)
    assert _resp.status_code == 401
    assert _resp.json.get('error') == 'authorization_required'
    assert _resp.json.get('description').find(test_word_01) != -1

    '''Non admin'''
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json, headers=_user_headers)
    assert _resp.status_code == 401
    assert _resp.json.get('message').find(test_word_02) != -1

    '''No block identity'''
    _json_no_id = {k: v for (k, v) in _json.items() if k != 'identity'}
    _resp = client.post(url_for('contents_bp.contentshandling'),
                        json=_json_no_id, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.find(
        'invalid literal for int() with base 10') != -1

    '''wrong item index'''
    '''no item index'''
    _json_wrong_index = {k: v for (k, v) in _json.items()
                         if k != 'item_index'}
    _resp = client.post(url_for('contents_bp.contentshandling'),
                        json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1

    '''negative item index'''
    _wrong_index = 0
    _json_wrong_index = {**_json, 'item_index': _wrong_index}
    _resp = client.post(url_for('contents_bp.contentshandling'),
                        json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1
    assert _resp.json.get('payload').find(str(_wrong_index - 1)) != -1

    '''block index above item element quontity'''
    _wrong_index = _qnt + 1
    _json_wrong_index = {**_json, 'item_index': _wrong_index}
    _resp = client.post(url_for('contents_bp.contentshandling'),
                        json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1
    assert _resp.json.get('payload').find(str(_wrong_index - 1)) != -1

    '''generate not found error'''
    [_content.delete_fm_db() for _content in ContentModel.find()]
    _resp = client.post(url_for('contents_bp.contentshandling'),
                        json=_json, headers=_admin_headers)
    assert _resp.status_code == 404
    _message = _resp.json.get('message')
    assert _message.find(test_word_04) != -1
    assert _message.find(_view_id) != -1
    assert _message.find(_identity) != -1
    assert _message.find(lng) != -1
    # print('\ntest_api_contents_handling:\n test_ContentsHandling_put',
    #       '\n  status ->', _resp.status_code,
    #       '\n  json ->', _resp.json)

    '''clean up user tables'''
    if _user is not None:
        _user.delete_fm_db()
    if _admin is not None:
        _admin.delete_fm_db()


# @pytest.mark.active
@pytest.mark.parametrize(
    ('lng, test_word, test_word_01, test_word_02, test_word_03,'
     'test_word_04'),
    [
        ('en', 'Request does not contain', 'Sorry, access',
         'Something went wrong', 'structure', 'While trying to retrieve'),
        ('ru', 'Запрос не содержит', 'Извиняйте, доступ',
         'Что-то пошло не так', 'структура', 'При попытке запросить'),
    ]
)
def test_ContentsHandling_put(
    client,
    create_test_content,
    # structure_get_schema,
    user_instance, access_token,
    # attributes,
    lng, test_word, test_word_01, test_word_02, test_word_03, test_word_04
):
    '''clean up old values and create new ones in structure and contents
        tables'''
    block_details = create_test_content(locale=lng)
    '''setting contants'''
    _block_00 = block_details.get('block_00')
    _view_id = block_details.get('view_id')
    _identity = '_'.join([str(_block_00.get('upper_index')).zfill(2),
                          _block_00.get('type'),
                          _block_00.get('subtype')])
    _item_index = randrange(_block_00.get('qnt'))
    _qnt = _block_00.get('qnt')

    '''Create user and admin'''
    _user = user_instance({'role_id': 'user'})
    _user.save_to_db()
    _admin = user_instance({'role_id': 'admin'})
    _admin.save_to_db()

    '''Create tokens'''
    _admin_access_token = access_token(_admin)
    _user_access_token = access_token(_user)
    _admin_headers = {
        'Authorization': f'Bearer {_admin_access_token}',
        'Content-Type': 'application/json',
        'Accept-Language': lng}
    _user_headers = {
        'Authorization': f'Bearer {_user_access_token}',
        'Content-Type': 'application/json',
        'Accept-Language': lng}
    _json = {
        'view_id': _view_id,
        'identity': _identity,
        'item_index': _item_index
    }

    '''Success'''
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json, headers=_admin_headers)
    assert _resp.status_code == 200
    assert _resp.json.get('message').find(test_word_03) != -1
    # print('\ntest_api_contents_handling:\n test_ContentsHandling_put',
    #       '\n  status ->', _resp.status_code,
    #       '\n  json ->', _resp.json)

    '''Failures'''
    '''No tokens'''
    _no_token_header = {
        k: v for (k, v) in _admin_headers.items() if k != 'Authorization'}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json, headers=_no_token_header)
    assert _resp.status_code == 401
    assert _resp.json.get('error') == 'authorization_required'
    assert _resp.json.get('description').find(test_word) != -1

    '''Non admin'''
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json, headers=_user_headers)
    assert _resp.status_code == 401
    assert _resp.json.get('message').find(test_word_01) != -1

    '''No block identity'''
    _json_no_id = {k: v for (k, v) in _json.items() if k != 'identity'}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_no_id, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.find(
        'invalid literal for int() with base 10') != -1

    '''wrong item index'''
    '''no item index'''
    _json_wrong_index = {k: v for (k, v) in _json.items()
                         if k != 'item_index'}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_02) != -1

    '''negative item index'''
    _json_wrong_index = {**_json, 'item_index': -1}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_02) != -1

    '''block index above item element quontity'''
    _json_wrong_index = {**_json, 'item_index': _qnt + 2}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_02) != -1

    '''generate not found error'''
    [_content.delete_fm_db() for _content in ContentModel.find()]
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json, headers=_admin_headers)
    assert _resp.status_code == 404
    _message = _resp.json.get('message')
    assert _message.find(test_word_04) != -1
    assert _message.find(_view_id) != -1
    assert _message.find(_identity) != -1
    assert _message.find(lng) != -1

    # print('\ntest_api_contents_handling:\n test_ContentsHandling_put',
    #       '\n  status ->', _resp.status_code,
    #       '\n  json ->', _resp.json)

    '''clean up user tables'''
    if _user is not None:
        _user.delete_fm_db()
    if _admin is not None:
        _admin.delete_fm_db()
    # '''clean up structure tables'''
    # [_structure.delete_fm_db() for _structure in StructureModel.find()]


# @pytest.mark.active
@pytest.mark.parametrize(
    ('lng, test_word, test_word_01, test_word_02, test_word_03,'
     'test_word_04, test_word_05'),
    [
        ('en',
            'The content quontity and db structure',
            'Request does not contain',
            'Sorry, access',
            'Something went wrong',
            'Length of element array',
            'While trying to retrieve content'),
        ('ru',
            'Количество содержимого и структура БД',
            'Запрос не содержит',
            'Извиняйте, доступ',
            'Что-то пошло не так',
            'Длинна множества элементов',
            'При попытке запросить содержание'),
    ]
)
def test_ContentsHandling_patch(
    client,
    create_test_content,
    user_instance, access_token,
    lng, test_word, test_word_01, test_word_02, test_word_03,
    test_word_04, test_word_05
):
    '''clean up old values and create new ones in structure and contents
        tables'''
    block_details = create_test_content(lng)

    '''setting contants'''
    _block_00 = block_details.get('block_00')
    _view_id = block_details.get('view_id')
    _identity = '_'.join([str(_block_00.get('upper_index')).zfill(2),
                          _block_00.get('type'),
                          _block_00.get('subtype')])
    _item_index = randrange(_block_00.get('qnt'))
    _qnt = _block_00.get('qnt')

    '''Create user and admin'''
    _user = user_instance({'role_id': 'user'})
    _user.save_to_db()
    _admin = user_instance({'role_id': 'admin'})
    _admin.save_to_db()

    '''Create tokens, headers and payloads'''
    _admin_access_token = access_token(_admin)
    _user_access_token = access_token(_user)
    _admin_headers = {
        'Authorization': f'Bearer {_admin_access_token}',
        'Content-Type': 'application/json',
        'Accept-Language': lng}
    _user_headers = {
        'Authorization': f'Bearer {_user_access_token}',
        'Content-Type': 'application/json',
        'Accept-Language': lng}
    _json = {
        'view_id': _view_id,
        'identity': _identity,
        'item_index': _item_index
    }

    '''Success'''
    _resp = client.patch(url_for('contents_bp.contentshandling'),
                         json=_json, headers=_admin_headers)
    assert _resp.status_code == 200
    assert _resp.json.get('message').find(test_word) != -1
    assert _resp.json.get('message').find(_view_id) != -1
    assert _resp.json.get('message').find(_identity) != -1
    assert _resp.json.get('message').find(lng) != -1

    '''Failures'''
    '''No tokens'''
    _no_token_header = {
        k: v for (k, v) in _admin_headers.items() if k != 'Authorization'}
    _resp = client.patch(url_for('contents_bp.contentshandling'),
                         json=_json, headers=_no_token_header)
    assert _resp.status_code == 401
    assert _resp.json.get('error') == 'authorization_required'
    assert _resp.json.get('description').find(test_word_01) != -1

    '''Non admin'''
    _resp = client.patch(url_for('contents_bp.contentshandling'),
                         json=_json, headers=_user_headers)
    assert _resp.status_code == 401
    assert _resp.json.get('message').find(test_word_02) != -1

    '''No block identity'''
    _json_no_id = {k: v for (k, v) in _json.items() if k != 'identity'}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_no_id, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.find(
        'invalid literal for int() with base 10') != -1

    '''wrong item index'''
    '''no item index'''
    _json_wrong_index = {k: v for (k, v) in _json.items()
                         if k != 'item_index'}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1

    '''Negative item index'''
    _json_wrong_index = {**_json, 'item_index': -1}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1
    assert _resp.json.get('payload').find(test_word_04) != -1

    '''Block index above item element quontity'''
    _json_wrong_index = {**_json, 'item_index': _qnt}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_03) != -1
    assert _resp.json.get('payload').find(test_word_04) != -1

    '''generate not found error'''
    [_content.delete_fm_db() for _content in ContentModel.find()]
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json, headers=_admin_headers)
    assert _resp.status_code == 404
    _message = _resp.json.get('message')
    assert _message.find(test_word_05) != -1
    assert _message.find(_view_id) != -1
    assert _message.find(_identity) != -1
    assert _message.find(lng) != -1
    # print('\ntest_api_contents_handling:\n test_ContentsHandling_patch',
    #       '\n  _resp ->', _resp.status_code,
    #       '\n  _resp ->', _resp.json,
    #       )

    '''clean up users tables'''
    if _user is not None:
        _user.delete_fm_db()
    if _admin is not None:
        _admin.delete_fm_db()
