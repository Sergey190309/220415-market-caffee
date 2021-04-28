import pytest
from typing import (
    Dict,
    # List
)
from flask import url_for


# @pytest.fixture(scope='module', autouse=True)
@pytest.fixture
def content_api_resp(
        content_instance,
        client, content_get_schema):
    '''
    It makes post reques to API and retunrn responce.
    '''
    def _method(values: Dict = {}, headers: Dict = {}):
        _content_json = content_get_schema.dump(content_instance(values))
        resp = client.post(url_for('contents_bp.contents'),
                           json=_content_json, headers=headers)
        # print('functional, contents, content code ->', resp.status_code)
        return resp
    return _method


@pytest.fixture
def creating_values_json():
    def _method(values: Dict = {}):
        return {
            key: value for (key, value) in values.items()
            if key not in ['view', 'locale', 'created', 'updated']}
    return _method


# @pytest.mark.active
def test_no_access(client, content_api_resp, user_instance, access_token):
    '''
    test calling API without and with non admin user ID
    '''
    # Test not admin is unable to access to the API
    _user = user_instance(values={'role_id': 'user'})  # user not admin
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}'}

    # post
    resp = content_api_resp(headers=_headers)
    # _params = {'view_id': resp.json.get('payload'). get}
    assert resp.status_code == 401
    assert 'message' in resp.json.keys()

    # get
    resp = client.get(url_for('contents_bp.contents'), headers=_headers)
    assert resp.status_code == 401
    assert 'message' in resp.json.keys()

    # put
    resp = client.put(url_for('contents_bp.contents'), headers=_headers)
    assert resp.status_code == 401
    assert 'message' in resp.json.keys()

    # put
    resp = client.delete(url_for('contents_bp.contents'), headers=_headers)
    assert resp.status_code == 401
    assert 'message' in resp.json.keys()

    # test user without access token is unable to access API
    # post
    resp = content_api_resp()
    assert resp.status_code == 401
    assert 'message' not in resp.json.keys()
    assert 'error' in resp.json.keys()
    assert resp.json.get('error') == 'authorization_required'

    # get
    resp = client.get(url_for('contents_bp.contents'))
    assert resp.status_code == 401
    assert 'message' not in resp.json.keys()
    assert 'error' in resp.json.keys()
    assert resp.json.get('error') == 'authorization_required'

    # put
    resp = client.put(url_for('contents_bp.contents'))
    assert resp.status_code == 401
    assert 'message' not in resp.json.keys()
    assert 'error' in resp.json.keys()
    assert resp.json.get('error') == 'authorization_required'

    # put
    resp = client.delete(url_for('contents_bp.contents'))
    assert resp.status_code == 401
    assert 'message' not in resp.json.keys()
    assert 'error' in resp.json.keys()
    assert resp.json.get('error') == 'authorization_required'

    # Clean up user table
    _user.delete_fm_db()


# @pytest.mark.active
def test_contents_post_already_exists(
        client, content_api_resp,
        user_instance, access_token):
    _user = user_instance(values={'role_id': 'admin'})  # user not admin
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}'}

    # Create one instance with random values:
    resp = content_api_resp(headers=_headers)
    assert resp.status_code == 201
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json.get('payload'), Dict)

    # Try to save other instance with same keys
    _create_json = {k: v for(k, v) in resp.json.get('payload').items()
                    if k not in ['created', 'view', 'locale']}
    resp = client.post(url_for('contents_bp.contents'), json=_create_json, headers=_headers)
    assert resp.status_code == 400
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()

    # Clean up user table
    _user.delete_fm_db()


# @pytest.mark.active
def test_contents_post_wrong_fk(client, content_api_resp, user_instance, access_token):
    '''
    Operation with foreign key that are not in appropriate tables.
    '''
    _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}'}

    # Create dict without relationships and dates:
    resp = content_api_resp(headers=_headers)
    assert resp.status_code == 201
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json.get('payload'), Dict)
    _create_json = {k: v for(k, v) in resp.json.get('payload').items()
                    if k not in ['created', 'view', 'locale']}

    # Try to create instance briching db's constrains:
    # wrong locale_id
    _wrong_creating_json = _create_json.copy()
    _wrong_creating_json['locale_id'] = 'not'
    resp = client.post(url_for('contents_bp.contents'),
                       json=_wrong_creating_json, headers=_headers)
    assert resp.status_code == 500
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], str)
    assert resp.json['payload'].find('foreign key constraint fails') != -1

    # wrong view_id
    _wrong_creating_json = _create_json.copy()
    _wrong_creating_json['view_id'] = 'not'
    resp = client.post(url_for('contents_bp.contents'),
                       json=_wrong_creating_json, headers=_headers)
    assert resp.status_code == 500
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], str)
    assert resp.json['payload'].find('foreign key constraint fails') != -1

    # Clean up user table
    _user.delete_fm_db()


# @pytest.mark.active
def test_contents_get(client, content_api_resp, user_instance, access_token):

    # Find data with normal set of keys:
    _user = user_instance(values={'role_id': 'admin'})  # user not admin
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}'}

    resp = content_api_resp(headers=_headers)
    _original_json = resp.json['payload'].copy()
    _key_json = {key: value for (key, value) in _original_json.items()
                 if key in ['view_id', 'identity', 'locale_id']}
    params = {k: v for (k, v) in _key_json.items() if k != 'locale_id'}
    headers = {**_headers, 'Accept-Language': _key_json['locale_id']}
    resp = client.get(url_for('contents_bp.contents', **params), headers=headers)
    # Check something found and data has been identical:
    assert resp.status_code == 200
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)
    for key in _original_json.keys():
        assert _original_json[key] == resp.json.get('payload')[key]

    # Try to find data with wrong value (404):
    for key in _key_json.keys():
        _wrong_value_json = _key_json.copy()
        _wrong_value_json[key] += '_wrong'
        params = {k: v for (k, v) in _wrong_value_json.items() if k != 'locale_id'}
        # print('\nTest_contents_get. params ->', params)
        headers = {**_headers, 'Accept-Language': _wrong_value_json['locale_id']}
        resp = client.get(url_for('contents_bp.contents', **params), headers=headers)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert 'message' in resp.json.keys()

    # Clean up user table
    _user.delete_fm_db()


# @pytest.mark.active
def test_content_put(client, content_api_resp, user_instance, access_token):
    _user = user_instance(values={'role_id': 'admin'})  # user not admin
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}'}

    # Create data with normal set of keys:
    resp = content_api_resp(headers=_headers)
    _original_json = {k: v for(k, v) in resp.json.get('payload').items() if k not in [
        'locale', 'created', 'updated', 'view']}
    _key_json = {key: value for (key, value) in _original_json.items() if key in [
        'identity', 'view_id', 'locale_id']}
    _value_json = {key: value for (key, value) in _original_json.items() if key not in [
        'identity', 'view_id', 'locale_id']}
    # Find and update data with normal set of keys:
    for key in _value_json.keys():
        # print(key)
        _corrected_data = _original_json.copy()
        if isinstance(_corrected_data[key], int):
            _corrected_data[key] = 0
        elif isinstance(_corrected_data[key], str):
            _corrected_data[key] += ' - corrected'
        resp = client.put(url_for('contents_bp.contents'),
                          json=_corrected_data, headers=_headers)
        assert resp.status_code == 200
        assert 'payload' in resp.json.keys()
        assert resp.json['payload'][key] == _corrected_data[key]

    # print('\nfunctional, contents, content code ->', resp.status_code)
    # print('functional, contents, content json ->', resp.json)

    # Try to find view with wrong value (404):
    for key in _key_json.keys():
        _wrong_key_value = _original_json.copy()
        _wrong_key_value[key] += '_wrong'
        resp = client.put(url_for('contents_bp.contents'),
                          json=_wrong_key_value, headers=_headers)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert isinstance(resp.json, Dict)

    # Clean up user table
    _user.delete_fm_db()


# @pytest.mark.active
def test_content_delete(client, content_api_resp, user_instance, access_token):
    # Create data with normal set of keys:
    _user = user_instance(values={'role_id': 'admin'})  # user not admin
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}'}

    resp = content_api_resp(headers=_headers)
    _key_json = {k: v for (k, v) in resp.json.get('payload').items()
                 if k in ['identity', 'view_id', 'locale_id']}

    # Insure content is exist in db:
    params = {k: v for (k, v) in _key_json.items() if k not in ['locale_id']}
    headers = {**_headers, 'Accept-Language': _key_json.get('locale_id')}
    # print('\ntest_content_delete, params ->', params, '\theaders ->', headers)
    resp = client.get(url_for('contents_bp.contents', **params), headers=headers)
    # print('\ntest_content_delete, resp ->', resp)
    assert resp.status_code == 200
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)

    # Try to find view with wrong value (404):
    for key in _key_json.keys():
        _wrong_key_value = _key_json.copy()
        _wrong_key_value[key] += '_wrong'
        params = {k: v for (k, v) in _wrong_key_value.items()
                  if k not in ['locale_id']}
        headers = {**_headers, 'Accept-Language': _wrong_key_value['locale_id']}
        # print('\ntest_content_delete, params ->', params, '\theaders ->', headers)
        resp = client.delete(url_for('contents_bp.contents', **params), headers=headers)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert isinstance(resp.json, Dict)
    # print('\ntest_content_delete, resp ->', resp)

    # delete view instance from db:
    params = {k: v for (k, v) in _key_json.items() if k not in ['locale_id']}
    headers = {**_headers, 'Accept-Language': _key_json['locale_id']}
    resp = client.delete(url_for('contents_bp.contents', **params), headers=headers)
    assert resp.status_code == 200
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json, Dict)

    # Insure view is deleted in db:
    params = {k: v for (k, v) in _key_json.items() if k not in ['locale_id']}
    headers = {**_headers, 'Accept-Language': _key_json['locale_id']}
    resp = client.get(url_for('contents_bp.contents', **params), headers=headers)
    assert resp.status_code == 404
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json, Dict)

    # Clean up user table
    _user.delete_fm_db()
