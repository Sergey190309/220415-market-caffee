import pytest
from typing import Dict

from flask import url_for


@pytest.fixture
def locale_api_resp(
        client, locale_global_instance,
        locale_global_get_schema):
    '''
    It makes post reques to API and retunrn responce.
    '''
    def _method(values: Dict = {}, headers: Dict = {}):
        _values_json = locale_global_get_schema.dump(locale_global_instance(values))
        resp = client.post(url_for('viewglobal'), json=_values_json, headers=headers)
        return resp
    return _method


# @pytest.mark.active
def tes_no_access(client, locale_api_resp, user_instance, access_token):
    '''
    Calling all APIs with no authorization token or with non admin one
    '''
    lng = 'en'
    # access with not admin user
    _user = user_instance(values={'role_id': 'user'})  # user not admin
    # _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()  # to have user with this id

    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}', 'Accept-Language': lng}
    resp = locale_api_resp(headers=_headers)
    # _user.delete_fm_db()
    print('\nfunctional, test_api_locale, resp ->', resp)
    print('functional, test_api_locale, status ->', resp.status_code)
    print('functional, test_api_locale, json ->', resp.json)
    # assert resp.status_code == 401
    # assert 'message' in resp.json.keys()

    # resp = client.get(url_for('viewglobal'), headers=_headers)
    # assert resp.status_code == 401
    # assert 'message' in resp.json.keys()

    # resp = client.put(url_for('viewglobal'), headers=_headers)
    # assert resp.status_code == 401
    # assert 'message' in resp.json.keys()

    # resp = client.delete(url_for('viewglobal'), headers=_headers)
    # assert resp.status_code == 401
    # assert 'message' in resp.json.keys()

    # access without access_token
    # resp = locale_api_resp()
    # assert resp.status_code == 401
    # assert 'description' in resp.json.keys()

    # resp = client.get(url_for('viewglobal'))
    # assert resp.status_code == 401
    # assert 'description' in resp.json.keys()

    # resp = client.put(url_for('viewglobal'))
    # assert resp.status_code == 401
    # assert 'description' in resp.json.keys()

    # resp = client.delete(url_for('viewglobal'))
    # assert resp.status_code == 401
    # assert 'description' in resp.json.keys()

    # clean up user table
    _user.delete_fm_db()


# @pytest.mark.active
def tes_view_post_already_exists(
        client, view_api_resp, user_instance, access_token):
    # Make new request with same data as already created instance.
    # access with not admin user
    _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}'}
    resp = view_api_resp(headers=_headers)
    original_key = {}
    original_key['view_id'] = resp.json.get('payload').get('view_id')
    resp = client.post(url_for('viewglobal'), json=original_key, headers=_headers)
    assert resp.status_code == 400
    assert 'payload' not in resp.json.keys()
    assert 'message' in resp.json.keys()
    _user.delete_fm_db()


# @pytest.mark.active
def tes_view_get(client, view_api_resp, user_instance, access_token):
    # Make new request with same data as already created instance.
    _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}'}
    resp = view_api_resp(headers=_headers)
    # Find data with normal set of keys:
    # print('\ntest, functional, contents, view json ->', resp.json)
    params = {'view_id': resp.json.get('payload').get('view_id')}
    resp = client.get(url_for('viewglobal', **params), headers=_headers)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)

    params = {'view_id': 'wrong_id'}
    resp = client.get(url_for('viewglobal', **params), headers=_headers)
    assert resp.status_code == 404
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json.get('message'), str)
    # clean up users table
    _user.delete_fm_db()


# @pytest.mark.active
def tes_view_put(client, view_api_resp, user_instance, access_token):
    # Make new request with same data as already created instance.
    _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()  # to have user with this id
    _headers = {'Authorization': f'Bearer {access_token(_user)}'}
    resp = view_api_resp(headers=_headers)
    # Find data with normal set of keys:
    # print('functional, contents, view json ->', resp.json)
    _json = {
        'view_id': resp.json.get('payload').get('view_id'),
        'description': 'Corrected!'
    }
    _params = {k: v for (k, v) in _json.items() if k in ['view_id']}
    resp = client.put(url_for('viewglobal'), json=_json, headers=_headers)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)

    resp = client.get(url_for('viewglobal', **_params), headers=_headers)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json.get('payload'), Dict)
    assert resp.json.get('payload').get('description') == 'Corrected!'

    # print('functional, contents, view code ->', resp.status_code)
    # print('functional, contents, view json ->', resp.json)

    # Try to update view with wrong key
    _wrong_key_json = _json.copy()
    _wrong_key_json['view_id'] = 'wrong'
    resp = client.put(url_for('viewglobal'), json=_wrong_key_json, headers=_headers)
    assert resp.status_code == 404
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json.get('message'), str)
    # print('functional, contents, view code ->', resp.status_code)
    # print('functional, contents, view json ->', resp.json)
    _user.delete_fm_db()


# @pytest.mark.active
def tes_view_delete(client, view_api_resp, user_instance, access_token):
    _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()  # to have user with this id
    _headers = {'Authorization': f'Bearer {access_token(_user)}'}
    resp = view_api_resp(headers=_headers)
    # Ensure epecific view exists
    _params = {'view_id': resp.json.get('payload').get('view_id')}
    resp = client.get(url_for('viewglobal', **_params), headers=_headers)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json.get('payload'), Dict)

    # try to delete with wring key
    _wrong_params = {'view_id': 'wrong_key'}
    resp = client.delete(url_for('viewglobal', **_wrong_params), headers=_headers)
    assert resp.status_code == 404
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json.get('message'), str)

    # delete wire with corrct key
    resp = client.delete(url_for('viewglobal', **_params), headers=_headers)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json.get('message'), str)

    # try to get killed view
    resp = client.get(url_for('viewglobal', **_params), headers=_headers)
    assert resp.status_code == 404
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json.get('message'), str)
    # print('functional, contents, view code ->', resp.status_code)
    # print('functional, contents, view json ->', resp.json)

    _user.delete_fm_db()
