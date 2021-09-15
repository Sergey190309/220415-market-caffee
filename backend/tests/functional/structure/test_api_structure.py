import pytest
import random
from uuid import uuid4
from typing import (
    Dict,
    # List
)
# from datetime import datetime
from flask import url_for
from flask_jwt_extended import create_access_token

from application.global_init_data import global_constants
from application.structure.models import StructureModel
from application.structure.modules.dbs_init_structure import fill_structure


@pytest.fixture
def structure_api_resp(structure_instance, client, structure_get_schema):
    '''
    It makes post reques to API and return responce.
    '''
    def _method(values: Dict = {}, headers: Dict = {}):
        _content_json = structure_get_schema.dump(structure_instance(values))
        resp = client.post(url_for('structure_bp.structure'),
                           json=_content_json, headers=headers)
        # print('\nfunctional, contents, content _content_json ->', _content_json)
        return resp
    return _method


# @pytest.mark.active
@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'structure', 'Something went wrong.'),
        ('ru', 'труктур', 'Что-то пошло не так.')
    ]
)
def test_structure_post(structure_api_resp, client,
                        structure_get_schema,
                        user_instance, access_token,
                        lng, test_word, test_word_01,
                        attributes):
    '''
    Create structure insance in db. Replays are also tested.
    Success and fails.
    '''
    '''Fill structure table'''
    fill_structure()
    '''Success'''
    '''Admin in db'''
    _admin = user_instance(values={'role_id': 'admin'})
    _admin.save_to_db()
    _access_token = access_token(_admin)
    '''Choose ids for structure'''
    _criterions = {
        'view_id': random.choice(global_constants.get_VIEWS_PKS),
        # 'locale_id': random.choice(global_constants.get_PKS)
    }
    '''Clean structure table for specific structure'''
    _structure_to_delete = StructureModel.find_by_ids({**_criterions, 'locale_id': lng})
    if _structure_to_delete is not None:
        _structure_to_delete.delete_fm_db()

    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _json = {**_criterions, 'attributes': attributes}
    _resp = structure_api_resp(values=_json, headers=_headers)
    assert _resp.status_code == 201
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    '''Failures:'''
    '''Already exists'''
    _resp = client.post(url_for('structure_bp.structure'), json=_json, headers=_headers)
    assert _resp.status_code == 400
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    '''wrong fk'''
    _wrong_json = {**_json}
    _wrong_json['view_id'] = 'wrong_key'
    _resp = client.post(
        url_for('structure_bp.structure'), json=_wrong_json, headers=_headers)
    assert _resp.status_code == 500
    assert 'message' in _resp.json.keys()
    assert 'payload' in _resp.json.keys()
    assert _resp.json.get('message').find(test_word_01) != -1
    _wrong_heaners = {**_headers, 'Accept-Language': 'wrong_locale_id'}
    _resp = client.post(
        url_for('structure_bp.structure'), json=_json, headers=_wrong_heaners)
    assert _resp.status_code == 500
    assert 'message' in _resp.json.keys()
    assert 'payload' in _resp.json.keys()
    # assert _resp.json.get('message').find(test_word_01) != -1

    '''Non admin user.'''
    _user = user_instance(values={'role_id': 'user'})
    _user.save_to_db()
    _access_token = access_token(_user)
    _headers['Authorization'] = f'Bearer {_access_token}'
    _resp = client.post(url_for('structure_bp.structure'), json=_json, headers=_headers)
    assert _resp.status_code == 401
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1
    # print('\nstructure, test_post, rest ->', _resp.status_code)
    # print('structure, test_post, rest ->', _resp.json)

    '''clean up users tables'''
    if _user is not None:
        _user.delete_fm_db()
    if _admin is not None:
        _admin.delete_fm_db()
    '''clean up structure tables'''
    _structures = StructureModel.find()
    for _structure in _structures:
        _structure.delete_fm_db()


# @pytest.mark.active
@pytest.mark.parametrize(
    'lng, test_word, test_word_01, test_word_02, test_word_03',
    [
        ('en', 'structure', 'Request does not contain',
         'Signature verification failed', 'Something went wrong.'),
        ('ru', 'труктур', 'Запрос не содержит',
         'Подпись проверить не получилось', 'Что-то пошло не так.')
    ]
)
def test_structure_get(
        structure_api_resp, client, structure_get_schema,
        user_instance, access_token,
        lng, test_word, test_word_01, test_word_02, test_word_03,
        attributes, sessions
):
    '''
    getting instance form db.
    Localisation is tested also.
    Success and failures.
    '''
    '''Fill structure table'''
    fill_structure()
    '''Admin in db'''
    _admin = user_instance(values={'role_id': 'admin'})
    _admin.save_to_db()
    _access_token = access_token(_admin)
    '''Choose ids for structure'''
    _criterions = {
        'view_id': random.choice(global_constants.get_VIEWS_PKS),
        # 'locale_id': random.choice(global_constants.get_PKS)
    }
    '''Clean structure table for specific structure'''
    _structure_to_delete = StructureModel.find_by_ids({**_criterions, 'locale_id': lng})
    if _structure_to_delete is not None:
        _structure_to_delete.delete_fm_db()

    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _json = {**_criterions, 'attributes': attributes}
    _resp = structure_api_resp(values=_json, headers=_headers)
    assert _resp.status_code == 201
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    '''Success'''
    _uuid = uuid4()
    sessions.setter(str(_uuid))
    _tech_token = create_access_token(_uuid, expires_delta=False)
    _headers = {'Authorization': f'Bearer {_tech_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}

    _params = {**_criterions}
    _resp = client.get(url_for('structure_bp.structure', **_params), headers=_headers)
    assert _resp.status_code == 200
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    '''Failures'''
    '''Not found, wrong key'''
    _params = {**_criterions}
    _params['view_id'] = 'wrong_key'
    _resp = client.get(url_for('structure_bp.structure', **_params), headers=_headers)
    assert _resp.status_code == 404
    assert 'message' in _resp.json.keys()
    assert 'paiload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    _params = {**_criterions}
    _wrong_headers = {**_headers, 'Accept-Language': 'wrong_lng'}
    _resp = client.get(url_for('structure_bp.structure',
                       **_params), headers=_wrong_headers)
    assert _resp.status_code == 404
    assert 'message' in _resp.json.keys()
    assert 'paiload' not in _resp.json.keys()
    # assert _resp.json.get('message').find(test_word) != -1

    '''Non tech_token available.'''
    _headers.pop('Authorization')
    _params = {**_criterions}
    _resp = client.get(url_for('structure_bp.structure', **_params), headers=_headers)
    assert _resp.status_code == 401
    assert 'description' in _resp.json.keys()
    assert 'error' in _resp.json.keys()
    assert 'paiload' not in _resp.json.keys()
    assert _resp.json.get('error') == 'authorization_required'

    '''Not token available.'''
    _headers['Authorization'] = f'Bearer {"wrong_token"}'
    _resp = client.get(url_for('structure_bp.structure', **_params), headers=_headers)
    assert _resp.status_code == 401
    assert 'description' in _resp.json.keys()
    assert 'error' in _resp.json.keys()
    assert 'paiload' not in _resp.json.keys()
    assert _resp.json.get('error') == 'invalid_token'

    # Wrong token available.
    _headers['Authorization'] = f'Bearer {_access_token}'
    _resp = client.get(url_for('structure_bp.structure', **_params), headers=_headers)

    assert _resp.status_code == 500
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word_03) != -1
    # print('\nfunc, structure, test_get, resp ->', _resp.status_code)
    # print('func, structure, test_get, resp ->', _resp.json)

    '''clean up users tables'''
    # if _user is not None:
    #     _user.delete_fm_db()
    if _admin is not None:
        _admin.delete_fm_db()
    '''clean up structure tables'''
    [_structure.delete_fm_db() for _structure in StructureModel.find()]


# @pytest.mark.active
@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'structure', 'token'),
        ('ru', 'труктур', 'жетон')
    ]
)
def test_structure_put(
    structure_api_resp, client, structure_get_schema,
    user_instance, access_token,
    attributes, sessions,
    lng, test_word, test_word_01,
):
    '''
    Create structure insance in db. Then correct it.
    Localisation is tested also.
    Success and fails.
    '''
    '''Fill structure table'''
    fill_structure()
    '''Admin in db'''
    _admin = user_instance(values={'role_id': 'admin'})
    _admin.save_to_db()
    _access_token = access_token(_admin)
    '''Choose ids for structure'''
    _criterions = {
        'view_id': random.choice(global_constants.get_VIEWS_PKS),
        # 'locale_id': random.choice(global_constants.get_PKS)
    }
    '''Clean structure table for specific structure'''
    _structure_to_delete = StructureModel.find_by_ids({**_criterions, 'locale_id': lng})
    if _structure_to_delete is not None:
        _structure_to_delete.delete_fm_db()

    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _json = {**_criterions, 'attributes': attributes}
    _resp = structure_api_resp(values=_json, headers=_headers)
    assert _resp.status_code == 201
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    '''Success'''
    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _add_attrib = {'05': {'test_key': 'test_value'}}
    _json = {**_criterions, 'attributes': {
        **attributes, **_add_attrib}}
    _resp = client.put(url_for('structure_bp.structure'), json=_json, headers=_headers)

    '''Get updated structure to insure it's updated'''
    _uuid = uuid4()
    sessions.setter(str(_uuid))
    _tech_token = create_access_token(_uuid, expires_delta=False)
    _get_headers = {'Authorization': f'Bearer {_tech_token}',
                    'Content-Type': 'application/json',
                    'Accept-Language': lng}
    _params = {**_criterions}

    _resp = client.get(url_for('structure_bp.structure',
                       **_params), headers=_get_headers)
    assert _resp.status_code == 200
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1
    assert _resp.json.get('payload').get(
        'attributes').get('05') == _add_attrib.get('05')

    '''Failures'''
    '''Not found'''
    _wrong_criterions = {**_criterions, 'view_id': 'wrong_view_id'}
    _json = {**_wrong_criterions, 'attributes': {
        **attributes, **_add_attrib}}
    _resp = client.put(url_for('structure_bp.structure'), json=_json, headers=_headers)
    assert _resp.status_code == 404
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    _json = {**_criterions, 'attributes': {
        **attributes, **_add_attrib}}
    _wrong_headers = {**_headers, 'Accept-Language': 'wrong_locale'}
    _resp = client.put(url_for('structure_bp.structure'),
                       json=_json, headers=_wrong_headers)
    assert _resp.status_code == 404
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    # assert _resp.json.get('message').find(test_word) != -1

    '''Non admin'''
    _user = user_instance(values={'role_id': 'user'})  # just user
    _user.save_to_db()
    _user_access_token = access_token(_user)
    _headers['Authorization'] = f'Bearer {_user_access_token}'
    # _add_attrib = {'05': {'test_key': 'test_value'}}
    _json = {**_criterions, 'attributes': {**attributes, **_add_attrib}}
    _resp = client.put(url_for('structure_bp.structure'), json=_json, headers=_headers)
    assert _resp.status_code == 401
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    '''No token'''
    _headers.pop('Authorization')
    _add_attrib = {'05': {'test_key': 'test_value'}}
    _json = {**_criterions, 'attributes': {
        **attributes, **_add_attrib}}
    _resp = client.put(url_for('structure_bp.structure'), json=_json, headers=_headers)
    assert _resp.status_code == 401
    assert 'description' in _resp.json.keys()
    assert 'error' in _resp.json.keys()
    assert _resp.json.get('description').find(test_word_01) != -1
    # print('test_structure_put, status ->\n', _resp.status_code)
    # print('test_structure_put, resp.json ->\n', _resp.json)

    '''clean up users tables'''
    if _user is not None:
        _user.delete_fm_db()
    if _admin is not None:
        _admin.delete_fm_db()
    '''clean up structure tables'''
    [_structure.delete_fm_db() for _structure in StructureModel.find()]


# @pytest.mark.active
@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'structure', 'token'),
        ('ru', 'труктур', 'жетон')
    ]
)
def test_structure_delete(
    structure_api_resp, client, structure_get_schema,
    user_instance, access_token,
    lng, test_word, test_word_01,
    attributes, sessions
):
    '''
    Create structure insance in db. Then delete it.
    Localisation is tested also.
    Success and fails.
    '''
    '''Fill structure table'''
    fill_structure()
    '''Admin in db'''
    _admin = user_instance(values={'role_id': 'admin'})
    _admin.save_to_db()
    _access_token = access_token(_admin)
    '''Choose ids for structure'''
    _criterions = {
        'view_id': random.choice(global_constants.get_VIEWS_PKS),
        # 'locale_id': random.choice(global_constants.get_PKS)
    }
    '''Clean structure table for specific structure'''
    _structure_to_delete = StructureModel.find_by_ids({**_criterions, 'locale_id': lng})
    if _structure_to_delete is not None:
        _structure_to_delete.delete_fm_db()

    '''Create instance in db'''
    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _json = {**_criterions, 'attributes': attributes}
    _resp = structure_api_resp(values=_json, headers=_headers)
    assert _resp.status_code == 201
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    '''find instance in db'''
    _uuid = uuid4()
    sessions.setter(str(_uuid))
    _tech_token = create_access_token(_uuid, expires_delta=False)
    _get_headers = {'Authorization': f'Bearer {_tech_token}',
                    'Content-Type': 'application/json',
                    'Accept-Language': lng}
    _params = {**_criterions}
    _resp = client.get(url_for('structure_bp.structure',
                       **_params), headers=_get_headers)
    assert _resp.status_code == 200
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    '''Try to delete without token'''
    _no_token_headers = {**_headers}
    _no_token_headers.pop('Authorization')
    _params = {**_criterions}
    _resp = client.delete(url_for('structure_bp.structure',
                                  **_params), headers=_no_token_headers)
    assert _resp.status_code == 401
    assert 'description' in _resp.json.keys()
    assert 'error' in _resp.json.keys()
    assert _resp.json.get('error') == 'authorization_required'
    assert _resp.json.get('description').find(test_word_01) != -1

    '''Not admin'''
    _user = user_instance(values={'role_id': 'user'})  # just user
    _user.save_to_db()
    _user_access_token = access_token(_user)
    _not_admin_header = {**_headers, 'Authorization': f'Bearer {_user_access_token}'}
    _resp = client.delete(url_for('structure_bp.structure',
                          **_params), headers=_not_admin_header)
    assert _resp.status_code == 401
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    '''wrong key'''
    _wrong_key_params = {**_criterions, 'view_id': 'wrong_view_id'}
    _resp = client.delete(url_for('structure_bp.structure',
                          **_wrong_key_params), headers=_headers)
    assert _resp.status_code == 404
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    _wrong_lng_header = {**_headers, 'Accept-Language': 'whong_lng'}
    _resp = client.delete(url_for('structure_bp.structure',
                          **_criterions), headers=_wrong_lng_header)
    assert _resp.status_code == 404
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()

    '''insure instance still there'''
    _resp = client.get(url_for('structure_bp.structure',
                       **_params), headers=_get_headers)
    assert _resp.status_code == 200
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    '''delete the instance'''
    _resp = client.delete(url_for('structure_bp.structure',
                                  **_params), headers=_headers)
    assert _resp.status_code == 200
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    '''insure instance has been deleted'''
    _resp = client.get(url_for('structure_bp.structure',
                       **_params), headers=_get_headers)
    assert _resp.status_code == 404
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1
    # print('\nfunc, structure, delete, rest ->', _resp.status_code)
    # print('func, structure, delete, rest ->', _resp.json)

    '''clean up users tables'''
    if _user is not None:
        _user.delete_fm_db()
    if _admin is not None:
        _admin.delete_fm_db()
    '''clean up structure tables'''
    [_structure.delete_fm_db() for _structure in StructureModel.find()]
