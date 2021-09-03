import pytest
import random
# from pprint import pprint as pp
from flask import url_for

from application.global_init_data import global_constants
from application.structure.models import StructureModel
from application.structure.modules.dbs_init_structure import fill_structure


# @pytest.mark.active
@pytest.mark.parametrize(
    'lng, test_word, test_word_01, test_word_02',
    [
        ('en', 'Request does not contain',
         'Sorry, access', 'Something wrong'),
        ('ru', 'Запрос не содержит',
         'Извиняйте, доступ', 'Что-то не так'),
    ]
)
def test_contents_handling_put(
    client, structure_get_schema,
    user_instance, access_token,
    attributes,
    lng, test_word, test_word_01, test_word_02
):
    '''clean up structure tables'''
    [_structure.delete_fm_db() for _structure in StructureModel.find()]
    '''Fill structure table'''
    fill_structure()
    '''Choose ids for structure'''
    _criterions = {
        'view_id': random.choice(global_constants.get_VIEWS_PKS),
        # 'locale_id': random.choice(global_constants.get_PKS)
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
        "block_index": 1,
        "block_id": "01_vblock_txt_3"
    }
    '''Success'''
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json, headers=_admin_headers)

    print('\ntest, api, contents_handling, status ->', _resp.status_code)
    print('test, api, contents_handling, json ->', _resp.json)

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

    '''wrong block index'''
    '''no block index'''
    _json_wrong_index = {k: v for (k, v) in _json.items() if k != 'block_index'}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word) != -1

    '''Negative block index'''
    _json_wrong_index = {**_json, 'block_index': -1}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_02) != -1

    '''Block index above block element quontity'''
    _json_wrong_index = {**_json, 'block_index': 4}
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
