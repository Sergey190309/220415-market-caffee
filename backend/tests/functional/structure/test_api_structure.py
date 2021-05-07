import pytest
from uuid import uuid4
from typing import (
    Dict,
    # List
)
# from datetime import datetime
from flask import url_for
from flask_jwt_extended import create_access_token

from application.structure.models import StructureModel


@pytest.fixture
def structure_api_resp(structure_instance, client, structure_get_schema):
    '''
    It makes post reques to API and retunrn responce.
    '''
    def _method(values: Dict = {}, headers: Dict = {}):
        _content_json = structure_get_schema.dump(structure_instance(values))
        resp = client.post(url_for('structure_bp.structure'),
                           json=_content_json, headers=headers)
        # print('functional, contents, content code ->', resp.status_code)
        return resp
    return _method


@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'structure', 'Something went wrong.'),
        ('ru', 'труктур', 'Что-то пошло не так.')
    ]
)
# @pytest.mark.active
def test_structure_post(structure_api_resp, client, structure_get_schema,
                        user_instance, access_token,
                        lng, test_word, test_word_01,
                        view_id, attributes):
    '''
    Create structure insance in db. Replays are also tested.
    Success and fails.
    '''
    # Success
    # lng = 'ru'
    # Admin in db
    _admin = user_instance(values={'role_id': 'admin'})  # user admin
    _admin.save_to_db()
    _access_token = access_token(_admin)
    # Clean structure with same view_id if exists in db
    _structure = StructureModel.find_by_id(view_id=view_id)
    if _structure is not None:
        _structure.delete_fm_db()

    _headers = {'Authorization': f'Bearer {_access_token}',
                'Accept-Language': lng}
    _json = {'view_id': view_id, 'attributes': attributes}
    _resp = structure_api_resp(values=_json, headers=_headers)
    assert _resp.status_code == 201
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    # Failure
    # Already exists
    _resp = client.post(url_for('structure_bp.structure'), json=_json, headers=_headers)
    assert _resp.status_code == 400
    assert 'message' in _resp.json.keys()
    assert 'paiload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    # wrong fk
    if _structure is not None:
        _structure.delete_fm_db()
    _json['view_id'] = 'wrong_key'
    _resp = client.post(url_for('structure_bp.structure'), json=_json, headers=_headers)
    assert _resp.status_code == 500
    assert 'message' in _resp.json.keys()
    assert 'paiload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word_01) != -1
    # print('\nfunc, structure, test_post, rest ->', resp.status_code)
    # print('func, structure, test_post, rest ->', resp.json)

    # Non admin user.
    _user = user_instance(values={'role_id': 'user'})  # just user
    _user.save_to_db()
    _access_token = access_token(_user)
    _headers['Authorization'] = f'Bearer {_access_token}'
    _resp = client.post(url_for('structure_bp.structure'), json=_json, headers=_headers)
    assert _resp.status_code == 401
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    # clean up users tables
    _user.delete_fm_db()
    _admin.delete_fm_db()
    # clean up structure tables
    _structure = StructureModel.find_by_id(view_id=view_id)
    if _structure is not None:
        _structure.delete_fm_db()


@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'structure', 'Something went wrong.'),
        ('ru', 'труктур', 'Что-то пошло не так.')
    ]
)
# @pytest.mark.active
def test_structure_get(
        structure_api_resp, client, structure_get_schema,
        user_instance, access_token,
        lng, test_word, test_word_01,
        view_id, attributes, sessions
):
    '''
    getting instance form db.
    Localisation is tested also.
    Success and failures.
    '''
    # Success
    # lng = 'ru'
    # Admin in db
    _admin = user_instance(values={'role_id': 'admin'})  # user admin
    _admin.save_to_db()
    _access_token = access_token(_admin)
    # Clean structure with same view_id if exists in db
    _structure = StructureModel.find_by_id(view_id=view_id)
    if _structure is not None:
        _structure.delete_fm_db()

    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _json = {'view_id': view_id, 'attributes': attributes}
    _resp = structure_api_resp(values=_json, headers=_headers)
    assert _resp.status_code == 201
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    _uuid = uuid4()
    sessions.setter(str(_uuid))
    _tech_token = create_access_token(_uuid, expires_delta=False)
    _headers = {'Authorization': f'Bearer {_tech_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}

    _params = {'view_id': view_id}
    _resp = client.get(url_for('structure_bp.structure', **_params), headers=_headers)
    assert _resp.status_code == 200
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    # Failure
    # Not found, wrong key
    _params = {'view_id': 'wrong_key'}
    _resp = client.get(url_for('structure_bp.structure', **_params), headers=_headers)
    assert _resp.status_code == 404
    assert 'message' in _resp.json.keys()
    assert 'paiload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    # Non tech_token available.
    _headers.pop('Authorization')
    _params = {'view_id': view_id}
    _resp = client.get(url_for('structure_bp.structure', **_params), headers=_headers)
    assert _resp.status_code == 401
    assert 'description' in _resp.json.keys()
    assert 'error' in _resp.json.keys()
    assert 'paiload' not in _resp.json.keys()
    assert _resp.json.get('error') == 'authorization_required'

    # Not token available.
    _headers['Authorization'] = f'Bearer {"wrong_token"}'
    _resp = client.get(url_for('structure_bp.structure', **_params), headers=_headers)
    assert _resp.status_code == 401
    assert 'description' in _resp.json.keys()
    assert 'error' in _resp.json.keys()
    assert 'paiload' not in _resp.json.keys()
    assert _resp.json.get('error') == 'invalid_token'

    # Whong token available.
    _headers['Authorization'] = f'Bearer {_access_token}'
    _resp = client.get(url_for('structure_bp.structure', **_params), headers=_headers)

    assert _resp.status_code == 500
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word_01) != -1
    # print('\nfunc, structure, test_get, resp ->', _resp.status_code)
    # print('func, structure, test_get, resp ->', _resp.json)

    # # clean up users tables
    # _user.delete_fm_db()
    _admin.delete_fm_db()
    # clean up structure tables
    _structure = StructureModel.find_by_id(view_id=view_id)
    if _structure is not None:
        _structure.delete_fm_db()


@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'structure', 'token'),
        ('ru', 'труктур', 'жетон')
    ]
)
# @pytest.mark.active
def test_structure_put(
    structure_api_resp, client, structure_get_schema,
    user_instance, access_token,
    lng, test_word, test_word_01,
    view_id, attributes, sessions
):
    '''
    Create structure insance in db.
    Localisation is tested also.
    Success and fails.
    '''
    # Success
    # lng = 'ru'
    # Admin in db
    _admin = user_instance(values={'role_id': 'admin'})  # user admin
    _admin.save_to_db()
    _access_token = access_token(_admin)
    # Clean structure with same view_id if exists in db
    _structure = StructureModel.find_by_id(view_id=view_id)
    if _structure is not None:
        _structure.delete_fm_db()

    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _json = {'view_id': view_id, 'attributes': attributes}
    _resp = structure_api_resp(values=_json, headers=_headers)
    assert _resp.status_code == 201
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _add_attrib = {'05': {'test_key': 'test_value'}}
    _json = {'view_id': view_id, 'attributes': {
        **attributes, **_add_attrib}}
    _resp = client.put(url_for('structure_bp.structure'), json=_json, headers=_headers)
    assert _resp.status_code == 200
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    _uuid = uuid4()
    sessions.setter(str(_uuid))
    _tech_token = create_access_token(_uuid, expires_delta=False)
    _get_headers = {'Authorization': f'Bearer {_tech_token}',
                    'Content-Type': 'application/json',
                    'Accept-Language': lng}
    _params = {'view_id': view_id}

    _resp = client.get(url_for('structure_bp.structure',
                       **_params), headers=_get_headers)
    assert _resp.status_code == 200
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1
    assert _resp.json.get('payload').get(
        'attributes').get('05') == _add_attrib.get('05')

    # Failure
    # Not found
    _add_attrib = {'05': {'test_key': 'test_value'}}
    _json = {'view_id': 'wrong', 'attributes': {
        **attributes, **_add_attrib}}
    _resp = client.put(url_for('structure_bp.structure'), json=_json, headers=_headers)
    assert _resp.status_code == 404
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    # Non admin
    _user = user_instance(values={'role_id': 'user'})  # just user
    _user.save_to_db()
    _user_access_token = access_token(_user)
    _headers['Authorization'] = f'Bearer {_user_access_token}'
    _add_attrib = {'05': {'test_key': 'test_value'}}
    _json = {'view_id': view_id, 'attributes': {**attributes, **_add_attrib}}
    _resp = client.put(url_for('structure_bp.structure'), json=_json, headers=_headers)
    assert _resp.status_code == 401
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    # No token
    _headers.pop('Authorization')
    _add_attrib = {'05': {'test_key': 'test_value'}}
    _json = {'view_id': view_id, 'attributes': {
        **attributes, **_add_attrib}}
    _resp = client.put(url_for('structure_bp.structure'), json=_json, headers=_headers)
    assert _resp.status_code == 401
    assert 'description' in _resp.json.keys()
    assert 'error' in _resp.json.keys()
    assert _resp.json.get('description').find(test_word_01) != -1

    # clean up users tables
    _user.delete_fm_db()
    _admin.delete_fm_db()
    # clean up structure tables
    _structure = StructureModel.find_by_id(view_id=view_id)
    if _structure is not None:
        _structure.delete_fm_db()


@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'structure', 'token'),
        ('ru', 'труктур', 'жетон')
    ]
)
# @pytest.mark.active
def test_structure_delete(
    structure_api_resp, client, structure_get_schema,
    user_instance, access_token,
    lng, test_word, test_word_01,
    view_id, attributes, sessions
):
    '''
    Create structure insance in db.
    Localisation is tested also.
    Success and fails.
    '''
    # Success

    # Admin in db
    _admin = user_instance(values={'role_id': 'admin'})  # user admin
    _admin.save_to_db()
    _access_token = access_token(_admin)

    # Clean structure with same view_id if exists in db
    _structure = StructureModel.find_by_id(view_id=view_id)
    if _structure is not None:
        _structure.delete_fm_db()

    # Create instance in db
    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _json = {'view_id': view_id, 'attributes': attributes}
    _resp = structure_api_resp(values=_json, headers=_headers)
    assert _resp.status_code == 201
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    # find instance in db
    _uuid = uuid4()
    sessions.setter(str(_uuid))
    _tech_token = create_access_token(_uuid, expires_delta=False)
    _get_headers = {'Authorization': f'Bearer {_tech_token}',
                    'Content-Type': 'application/json',
                    'Accept-Language': lng}
    _params = {'view_id': view_id}
    _resp = client.get(url_for('structure_bp.structure',
                       **_params), headers=_get_headers)
    assert _resp.status_code == 200
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    # Try to delete without token
    _no_token_headers = {'Content-Type': 'application/json',
                         'Accept-Language': lng}
    _params = {'view_id': view_id}
    _resp = client.delete(url_for('structure_bp.structure',
                                  **_params), headers=_no_token_headers)
    assert _resp.status_code == 401
    assert 'description' in _resp.json.keys()
    assert 'error' in _resp.json.keys()
    assert _resp.json.get('description').find(test_word_01) != -1

    # Not admin
    _user = user_instance(values={'role_id': 'user'})  # just user
    _user.save_to_db()
    _user_access_token = access_token(_user)

    _headers['Authorization'] = f'Bearer {_user_access_token}'
    _resp = client.delete(url_for('structure_bp.structure',
                          **_params), headers=_headers)
    assert _resp.status_code == 401
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    # wrong key
    _headers['Authorization'] = f'Bearer {_access_token}'
    _wrong_key_params = {'view_id': 'wrong_key'}
    _resp = client.delete(url_for('structure_bp.structure',
                          **_wrong_key_params), headers=_headers)

    assert _resp.status_code == 404
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    # insure instance still there
    _resp = client.get(url_for('structure_bp.structure',
                       **_params), headers=_get_headers)
    assert _resp.status_code == 200
    assert 'message' in _resp.json.keys()
    assert isinstance(_resp.json.get('payload'), Dict)
    assert _resp.json.get('message').find(test_word) != -1

    # delete the instance
    _resp = client.delete(url_for('structure_bp.structure',
                                  **_params), headers=_headers)
    assert _resp.status_code == 200
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    # insure instance has been deleted
    _resp = client.get(url_for('structure_bp.structure',
                       **_params), headers=_get_headers)
    assert _resp.status_code == 404
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    # print('\nfunc, structure, delete, rest ->', _resp.status_code)
    # print('func, structure, delete, rest ->', _resp.json)

    # clean up users tables
    _user.delete_fm_db()
    _admin.delete_fm_db()
    # clean up structure tables
    if _structure is not None:
        _structure.delete_fm_db()
