import pytest
import random
# from pprint import pprint as pp
from flask import url_for

from application.modules.dbs_global import dbs_global
from application.global_init_data import global_constants
from application.structure.models import StructureModel
from application.contents.models import ContentModel
from application.contents.schemas.contents import content_schema
from application.structure.modules.dbs_init_structure import (
    fill_structure)


# @pytest.mark.active
@pytest.mark.parametrize(
    'lng, test_word, test_word_01, test_word_02, test_word_03',
    [
        ('en', 'Request does not contain',
         'Sorry, access', 'Something wrong', 'structure'),
        # ('ru', 'Запрос не содержит',
        #  'Извиняйте, доступ', 'Что-то не так', 'структура'),
    ]
)
def test_ContentsHandling_put(
    client, structure_get_schema,
    user_instance, access_token,
    attributes,
    lng, test_word, test_word_01, test_word_02, test_word_03
):
    '''clean up structure and contents tables'''
    [_structure.delete_fm_db() for _structure in StructureModel.find()]
    [_content.delete_fm_db() for _content in ContentModel.find()]

    '''Create test constants'''
    _block_id = '01'
    _content = ContentModel()
    # _locale_id = random.choice(global_constants.get_PKS)
    _view_id = random.choice(global_constants.get_VIEWS_PKS)
    _record_id_body = '_'.join([
        _block_id,
        attributes.get(_block_id).get('type'),
        attributes.get(_block_id).get('subtype')
    ])
    _qnt = attributes.get(_block_id).get('qnt')
    # print('\ntest_ContentsHandling_put:\n_qnt ->', _qnt)
    _block_id = '_'.join([_record_id_body, str(_qnt)])
    _item_index = 2
    _record_ids = _content.elem_ids('', _block_id)

    '''Fill contents table'''
    def create_save(record_id: str = ''):
        record = content_schema.load({
            'identity': record_id, 'view_id': _view_id,
            'locale_id': lng, 'title': f'Title {record_id}',
            'content': f'Content {record_id}'
        }, session=dbs_global.session)
        record.save_to_db()
        return record
    [create_save(_record_id) for _record_id in _record_ids]
    '''Fill structure and contents tables'''
    fill_structure()

    '''Choose ids for structure'''
    _criterions = {
        'view_id': _view_id
    }
    '''Update structure'''
    _updating_structure = StructureModel.find_by_ids({**_criterions, 'locale_id': lng})
    _updating_structure.update({'attributes': attributes})
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
        **_criterions,
        'item_index': _item_index,
        'block_id': _block_id
    }
    '''Success'''
    # print('\ntest, api, contents, handling, \nview_id ->\t', _view_id,
    #       '\nlocale_id ->\t', lng)
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json, headers=_admin_headers)
    assert _resp.status_code == 200
    assert _resp.json.get('message').find(test_word_03) != -1
    # print('\ntest, api, contents_handling, status ->', _resp.status_code)
    # print('test, api, contents_handling, json ->', _resp.json)

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
    _json_no_id = {k: v for (k, v) in _json.items() if k != 'block_id'}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_no_id, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word) != -1

    '''wrong item index'''
    '''no item index'''
    _json_wrong_index = {k: v for (k, v) in _json.items() if k != 'item_index'}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word) != -1

    '''Negative item index'''
    _json_wrong_index = {**_json, 'item_index': -1}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_02) != -1

    '''Block index above item element quontity'''
    _json_wrong_index = {**_json, 'item_index': _qnt + 1}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_02) != -1

    '''clean up users tables'''
    if _user is not None:
        _user.delete_fm_db()
    if _admin is not None:
        _admin.delete_fm_db()
    # '''clean up structure tables'''
    # [_structure.delete_fm_db() for _structure in StructureModel.find()]


# @pytest.mark.active
@pytest.mark.parametrize(
    'lng, test_word, test_word_01, test_word_02, test_word_03',
    [
        ('en',
            'Request does not contain', 'Sorry, access',
            'Something wrong', 'structure'),
        ('ru',
            'Запрос не содержит', 'Извиняйте, доступ',
            'Что-то не так', 'структура'),
    ]
)
def test_ContentsHandling_delete(
    client, structure_get_schema,
    user_instance, access_token,
    attributes,
    lng, test_word, test_word_01, test_word_02, test_word_03
):
    '''clean up structure and contents tables'''
    [_structure.delete_fm_db() for _structure in StructureModel.find()]
    [_content.delete_fm_db() for _content in ContentModel.find()]

    '''Create test constants'''
    _block_id = '01'  # block's identity 01_vblock_txt_5
    _content = ContentModel()
    # _locale_id = random.choice(global_constants.get_PKS)
    _view_id = random.choice(global_constants.get_VIEWS_PKS)
    _record_id_body = '_'.join([
        _block_id,
        attributes.get(_block_id).get('type'),
        attributes.get(_block_id).get('subtype')
    ])
    _qnt = attributes.get(_block_id).get('qnt')  # quontity of elements in a block
    _block_id = '_'.join([_record_id_body, str(_qnt)])  # block's
    # identity without element quontity.
    _item_index = 2  # element to be deleted serial number.
    _record_ids = _content.elem_ids('', _block_id)  # list of records'
    # ids for respective element.

    '''Fill contents table'''
    def create_save(record_id: str = ''):
        record = content_schema.load({
            'identity': record_id, 'view_id': _view_id,
            'locale_id': lng, 'title': f'Title {record_id}',
            'content': f'Content {record_id}'
        }, session=dbs_global.session)
        record.save_to_db()
        return record
    [create_save(_record_id) for _record_id in _record_ids]
    '''Fill structure and contents tables'''
    fill_structure()

    '''Choose ids for structure'''
    _criterions = {
        'view_id': _view_id
    }
    '''Update structure'''
    _updating_structure = StructureModel.find_by_ids({**_criterions, 'locale_id': lng})
    _updating_structure.update({'attributes': attributes})
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
        **_criterions,
        'item_index': _item_index,
        'block_id': _block_id
    }
    '''Success'''
    # # print('\ntest, api, contents, handling, \nview_id ->\t', _view_id,
    # #       '\nlocale_id ->\t', lng)
    _resp = client.patch(url_for('contents_bp.contentshandling'),
                         json=_json, headers=_admin_headers)
    # assert _resp.status_code == 200
    # assert _resp.json.get('message').find(test_word_03) != -1
    print('\ntest, api, contents_handling,\n'
          '_resp.status_code ->', _resp.status_code)
    print('test, api, contents_handling,\n'
          '_resp.json ->', _resp.json)

    # '''Failures'''
    # '''No tokens'''
    # _no_token_header = {
    #     k: v for (k, v) in _admin_headers.items() if k != 'Authorization'}
    # _resp = client.patch(url_for('contents_bp.contentshandling'),
    #                      json=_json, headers=_no_token_header)
    # assert _resp.status_code == 401
    # assert _resp.json.get('error') == 'authorization_required'
    # assert _resp.json.get('description').find(test_word) != -1

    # '''Non admin'''
    # _resp = client.patch(url_for('contents_bp.contentshandling'),
    #                      json=_json, headers=_user_headers)
    # assert _resp.status_code == 401
    # assert _resp.json.get('message').find(test_word_01) != -1

    # '''No block identity'''
    # _json_no_id = {k: v for (k, v) in _json.items() if k != 'block_id'}
    # _resp = client.put(url_for('contents_bp.contentshandling'),
    #                    json=_json_no_id, headers=_admin_headers)
    # assert _resp.status_code == 400
    # assert _resp.json.get('message').find(test_word) != -1

    # '''wrong item index'''
    # '''no item index'''
    # _json_wrong_index = {k: v for (k, v) in _json.items() if k != 'item_index'}
    # _resp = client.put(url_for('contents_bp.contentshandling'),
    #                    json=_json_wrong_index, headers=_admin_headers)
    # assert _resp.status_code == 400
    # assert _resp.json.get('message').find(test_word) != -1

    # '''Negative item index'''
    # _json_wrong_index = {**_json, 'item_index': -1}
    # _resp = client.put(url_for('contents_bp.contentshandling'),
    #                    json=_json_wrong_index, headers=_admin_headers)
    # assert _resp.status_code == 400
    # assert _resp.json.get('message').find(test_word_02) != -1

    # '''Block index above item element quontity'''
    # _json_wrong_index = {**_json, 'item_index': _qnt + 1}
    # _resp = client.put(url_for('contents_bp.contentshandling'),
    #                    json=_json_wrong_index, headers=_admin_headers)
    # assert _resp.status_code == 400
    # assert _resp.json.get('message').find(test_word_02) != -1

    # '''clean up users tables'''
    # if _user is not None:
    #     _user.delete_fm_db()
    # if _admin is not None:
    #     _admin.delete_fm_db()
    # '''clean up structure tables'''
    # [_structure.delete_fm_db() for _structure in StructureModel.find()]
