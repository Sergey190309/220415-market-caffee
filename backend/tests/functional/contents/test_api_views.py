import pytest
from typing import Dict
from flask import url_for


# from application.modules.dbs_global import dbs_global
# from application.contents.schemas.views import view_get_schema


@pytest.fixture
def view_api_resp(
        client, view_instance,
        view_get_schema):
    '''
    It makes post reques to API and retunrn responce.
    '''
    def _method(values: Dict = {}, headers: Dict = {}):
        _values_json = view_get_schema.dump(view_instance(values))
        resp = client.post(url_for('contents_bp.view'), json=_values_json, headers=headers)
        return resp
    return _method


# @pytest.mark.active
def test_no_access(client, view_api_resp, user_instance, access_token):
    '''
    Calling all APIs with no authorization token or with non admin one
    '''

    # access with not admin user
    _user = user_instance(values={'role_id': 'user'})  # user not admin
    # _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}'}
    resp = view_api_resp(headers=_headers)
    # _user.delete_fm_db()
    assert resp.status_code == 401
    assert 'message' in resp.json.keys()

    resp = client.get(url_for('contents_bp.view'), headers=_headers)
    assert resp.status_code == 401
    assert 'message' in resp.json.keys()

    resp = client.put(url_for('contents_bp.view'), headers=_headers)
    assert resp.status_code == 401
    assert 'message' in resp.json.keys()

    resp = client.delete(url_for('contents_bp.view'), headers=_headers)
    assert resp.status_code == 401
    assert 'message' in resp.json.keys()

    # access without access_token
    resp = view_api_resp()
    assert resp.status_code == 401
    assert 'description' in resp.json.keys()

    resp = client.get(url_for('contents_bp.view'))
    assert resp.status_code == 401
    assert 'description' in resp.json.keys()

    resp = client.put(url_for('contents_bp.view'))
    assert resp.status_code == 401
    assert 'description' in resp.json.keys()

    resp = client.delete(url_for('contents_bp.view'))
    assert resp.status_code == 401
    assert 'description' in resp.json.keys()

    # print('\nfunctional, contents, view resp ->', resp)
    # print('functional, contents, view status ->', resp.status_code)
    # print('functional, contents, view json ->', resp.json)
    _user.delete_fm_db()


# @pytest.mark.active
def test_view_post_already_exists(
        client, view_api_resp, user_instance, access_token):
    # Make new request with same data as already created instance.
    # access with not admin user
    _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}'}
    resp = view_api_resp(headers=_headers)
    original_key = {}
    original_key['id_view'] = resp.json.get('payload').get('id_view')
    resp = client.post(url_for('contents_bp.view'), json=original_key, headers=_headers)
    assert resp.status_code == 400
    assert 'payload' not in resp.json.keys()
    assert 'message' in resp.json.keys()
    _user.delete_fm_db()


# @pytest.mark.active
def test_view_get(client, view_api_resp, user_instance, access_token):
    # Make new request with same data as already created instance.
    _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}'}
    resp = view_api_resp(headers=_headers)
    # Find data with normal set of keys:
    # print('functional, contents, view json ->', resp.json)
    params = {'id_view': resp.json.get('payload').get('id_view')}
    resp = client.get(url_for('contents_bp.view', **params), headers=_headers)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)

    params = {'id_view': 'wrong_id'}
    resp = client.get(url_for('contents_bp.view', **params), headers=_headers)
    assert resp.status_code == 404
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json.get('message'), str)
    _user.delete_fm_db()


# @pytest.mark.active
def test_view_put(client, view_api_resp, user_instance, access_token):
    # Make new request with same data as already created instance.
    _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()  # to have user with this id
    _headers = {'Authorization': f'Bearer {access_token(_user)}'}
    resp = view_api_resp(headers=_headers)
    # Find data with normal set of keys:
    # print('functional, contents, view json ->', resp.json)
    _json = {
        'id_view': resp.json.get('payload').get('id_view'),
        'description': 'Corrected!'
    }
    _params = {k: v for (k, v) in _json.items() if k in ['id_view']}
    resp = client.put(url_for('contents_bp.view'), json=_json, headers=_headers)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)

    resp = client.get(url_for('contents_bp.view', **_params), headers=_headers)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json.get('payload'), Dict)
    assert resp.json.get('payload').get('description') == 'Corrected!'

    # print('functional, contents, view code ->', resp.status_code)
    # print('functional, contents, view json ->', resp.json)

    # Try to update view with wrong key
    _wrong_key_json = _json.copy()
    _wrong_key_json['id_view'] = 'wrong'
    resp = client.put(url_for('contents_bp.view'), json=_wrong_key_json, headers=_headers)
    assert resp.status_code == 404
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json.get('message'), str)
    # print('functional, contents, view code ->', resp.status_code)
    # print('functional, contents, view json ->', resp.json)
    _user.delete_fm_db()


# @pytest.mark.active
def test_view_delete(client, view_api_resp, user_instance, access_token):
    _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()  # to have user with this id
    _headers = {'Authorization': f'Bearer {access_token(_user)}'}
    resp = view_api_resp(headers=_headers)
    # Ensure epecific view exists
    _params = {'id_view': resp.json.get('payload').get('id_view')}
    resp = client.get(url_for('contents_bp.view', **_params), headers=_headers)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json.get('payload'), Dict)

    # try to delete with wring key
    _wrong_params = {'id_view': 'wrong_key'}
    resp = client.delete(url_for('contents_bp.view', **_wrong_params), headers=_headers)
    assert resp.status_code == 404
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json.get('message'), str)

    # delete wire with corrct key
    resp = client.delete(url_for('contents_bp.view', **_params), headers=_headers)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json.get('message'), str)

    # try to get killed view
    resp = client.get(url_for('contents_bp.view', **_params), headers=_headers)
    assert resp.status_code == 404
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json.get('message'), str)
    # print('functional, contents, view code ->', resp.status_code)
    # print('functional, contents, view json ->', resp.json)

    _user.delete_fm_db()
