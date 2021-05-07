import pytest
from uuid import uuid4
from typing import (
    Dict,
    # List
)
from flask import url_for
from flask_jwt_extended import create_access_token


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
        resp = client.post(url_for('contents_bp.content'),
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
def test_no_access(client, content_api_resp, user_instance, access_token, sessions):
    '''
    test calling API without and with non admin user ID
    '''
    # Test not admin is unable to access to the API
    _user = user_instance(values={'role_id': 'user'})  # user not admin
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Accept-Language': 'en',
                'Authorization': f'Bearer {_access_token}'}

    # post
    resp = content_api_resp(headers=_headers)
    # _params = {'view_id': resp.json.get('payload'). get}
    assert resp.status_code == 401
    assert 'message' in resp.json.keys()

    # put
    resp = client.put(url_for('contents_bp.content'), headers=_headers)
    assert resp.status_code == 401
    assert 'message' in resp.json.keys()

    # delete
    resp = client.delete(url_for('contents_bp.content'), headers=_headers)
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
    resp = client.get(url_for('contents_bp.content'))
    assert resp.status_code == 401
    assert 'message' not in resp.json.keys()
    assert 'error' in resp.json.keys()
    assert resp.json.get('error') == 'authorization_required'

    # put
    resp = client.put(url_for('contents_bp.content'))
    assert resp.status_code == 401
    assert 'message' not in resp.json.keys()
    assert 'error' in resp.json.keys()
    assert resp.json.get('error') == 'authorization_required'

    # put
    resp = client.delete(url_for('contents_bp.content'))
    assert resp.status_code == 401
    assert 'message' not in resp.json.keys()
    assert 'error' in resp.json.keys()
    assert resp.json.get('error') == 'authorization_required'

    # Clean up user table
    _user.delete_fm_db()


@pytest.mark.parametrize(
    'lng, test_word',
    [
        ('en', 'content'),
        ('ru', 'одержание'),
    ]
)
# @pytest.mark.active
def test_contents_post_already_exists(client, content_api_resp,
                                      lng, test_word,
                                      user_instance, access_token):
    _user = user_instance(values={'role_id': 'admin'})  # user admin
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    # Create one instance
    resp = content_api_resp(values={'locale_id': lng}, headers=_headers)
    assert resp.status_code == 201
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json.get('payload'), Dict)
    assert resp.json.get('message').find(test_word) != -1

    # Try to save other instance with same keys
    _create_json = {k: v for(k, v) in resp.json.get('payload').items()
                    if k not in ['created', 'view', 'locale']}
    resp = client.post(url_for('contents_bp.content'),
                       json=_create_json, headers=_headers)
    assert resp.status_code == 400
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert resp.json.get('message').find(test_word) != -1

    # Clean up user table
    _user.delete_fm_db()


@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'content', 'Something went wrong'),
        ('ru', 'одержание', 'Что-то пошло не так'),
    ]
)
# @pytest.mark.active
def test_contents_post_wrong_fk(client, content_api_resp,
                                lng, test_word, test_word_01,
                                user_instance, access_token):
    '''
    Operation with foreign key that are not in appropriate tables.
    '''
    _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    # create content instance to confirm it works
    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _lng_key = {'locale_id': lng}
    resp = content_api_resp(values=_lng_key, headers=_headers)
    assert resp.status_code == 201
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json.get('payload'), Dict)
    assert resp.json.get('message').find(test_word) != -1
    assert resp.json.get('payload').get('locale_id') == lng

    # Create dict without relationships and dates:
    _create_json = {k: v for(k, v) in resp.json.get('payload').items()
                    if k not in ['created', 'view', 'locale']}

    # Try to create instance briching db's constrains:
    # wrong locale_id
    _wrong_creating_json = _create_json.copy()
    _wrong_creating_json['locale_id'] = 'not'
    resp = client.post(url_for('contents_bp.content'),
                       json=_wrong_creating_json, headers=_headers)
    assert resp.status_code == 500
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], str)
    assert resp.json['message'].find(test_word_01) != -1
    assert resp.json['payload'].find('foreign key constraint fails') != -1

    # wrong view_id
    _wrong_creating_json = _create_json.copy()
    _wrong_creating_json['view_id'] = 'not'
    resp = client.post(url_for('contents_bp.content'),
                       json=_wrong_creating_json, headers=_headers)
    assert resp.status_code == 500
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], str)
    assert resp.json['message'].find(test_word_01) != -1
    assert resp.json['payload'].find('foreign key constraint fails') != -1
    # print('\ntest_content_post, code ->', resp.status_code)
    # print('test_content_post, json ->', resp.json)

    # Clean up user table
    _user.delete_fm_db()


@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'content', 'not found'),
        ('ru', 'одержание', 'не обнаружено'),
    ]
)
# @pytest.mark.active
def test_contents_get(client, content_api_resp,
                      lng, test_word, test_word_01,
                      sessions, user_instance, access_token):
    # user admin to create content instance
    _user = user_instance(values={'role_id': 'admin'})
    _user.save_to_db()
    _access_token = access_token(_user)

    # Create instance
    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _lng_key = {'locale_id': lng}
    resp = content_api_resp(values=_lng_key, headers=_headers)
    assert resp.status_code == 201
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert resp.json.get('message').find(test_word) != -1
    assert resp.json.get('payload').get('locale_id') == lng

    # Find data with normal set of keys having tech_token and sessions:
    _uuid = uuid4()
    sessions.setter(str(_uuid))
    _tech_token = create_access_token(_uuid, expires_delta=False)
    _original_json = resp.json.get('payload').copy()
    _key_json = {key: value for (key, value) in _original_json.items()
                 if key in ['view_id', 'identity', 'locale_id']}
    _get_headers = {**_headers, 'Authorization': f'Bearer {_tech_token}'}
    resp = client.get(url_for('contents_bp.content', **_key_json), headers=_get_headers)

    # Check found data has been identical:
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert resp.json.get('message').find(test_word) != -1
    for key in _original_json.keys():
        assert _original_json.get(key) == resp.json.get('payload').get(key)

    # Try to find data with wrong value (404):
    for key in _key_json.keys():
        _wrong_value_json = _key_json.copy()
        _wrong_value_json[key] += '_wrong'

        resp = client.get(url_for('contents_bp.content',
                                  **_wrong_value_json), headers=_get_headers)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert 'message' in resp.json.keys()
        assert resp.json.get('message').find(test_word) != -1
        assert resp.json.get('message').find(lng) != -1
        print('\ntest_content_get, code ->', resp.status_code)
        print('test_content_get, json ->', resp.json)

    # Clean up user table
    _user.delete_fm_db()


@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'content', 'not found'),
        ('ru', 'одержание', 'не обнаружено'),
    ]
)
# @pytest.mark.actives
def test_content_put(client, content_api_resp,
                     lng, test_word, test_word_01,
                     user_instance, access_token):
    _admin = user_instance(values={'role_id': 'admin'})
    _admin.save_to_db()  # to have user with this id
    _access_token = access_token(_admin)
    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    # Create data with normal set of keys:
    _lng_key = {'locale_id': lng}
    resp = content_api_resp(values=_lng_key, headers=_headers)
    _original_json = {k: v for(k, v) in resp.json.get('payload').items() if k not in [
        'locale', 'created', 'updated', 'view']}
    _key_json = {key: value for (key, value) in _original_json.items() if key in [
        'identity', 'view_id', 'locale_id']}
    _value_json = {key: value for (key, value) in _original_json.items() if key not in [
        'identity', 'view_id', 'locale_id']}
    assert resp.status_code == 201
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert resp.json.get('message').find(test_word) != -1
    assert resp.json.get('payload').get('locale_id') == lng

    # Find and update data with normal set of keys:
    for key in _value_json.keys():
        # print(key)
        _corrected_data = _original_json.copy()
        if isinstance(_corrected_data.get(key), int):
            _corrected_data[key] = 0
        elif isinstance(_corrected_data.get(key), str):
            _corrected_data[key] += ' - corrected'
        resp = client.put(url_for('contents_bp.content'),
                          json=_corrected_data, headers=_headers)
        assert resp.status_code == 200
        assert 'payload' in resp.json.keys()
        assert resp.json['payload'][key] == _corrected_data[key]
        assert resp.json.get('message').find(test_word) != -1
        assert resp.json.get('payload').get('locale_id') == lng

    # Try to find view with wrong value (404):
    for key in _key_json.keys():
        _wrong_key_value = _original_json.copy()
        _wrong_key_value[key] += '_wrong'
        resp = client.put(url_for('contents_bp.content'),
                          json=_wrong_key_value, headers=_headers)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert isinstance(resp.json, Dict)
        assert resp.json.get('message').find(test_word) != -1
        assert resp.json.get('message').find(lng) != -1
        # print('\nfunctional, contents, put code ->', resp.status_code)
        # print('functional, contents, put json ->', resp.json)

    # Clean up user table
    _admin.delete_fm_db()


@pytest.mark.parametrize(
    'lng, test_word',
    [
        ('en', 'content'),
        ('ru', 'одержание'),
    ]
)
# @pytest.mark.active
def test_content_delete(client, content_api_resp,
                        sessions, user_instance,
                        lng, test_word,
                        access_token):
    # lng = 'en'
    # Create data with normal set of keys:
    _user = user_instance(values={'role_id': 'admin'})  # user not admin
    _user.save_to_db()  # to have user with this id
    _access_token = access_token(_user)
    _headers = {'Authorization': f'Bearer {_access_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}

    resp = content_api_resp(values={'locale_id': lng}, headers=_headers)
    _key_json = {k: v for (k, v) in resp.json.get('payload').items()
                 if k in ['identity', 'view_id', 'locale_id']}

    # Insure content is exist in db:
    _uuid = uuid4()
    sessions.setter(str(_uuid))
    _tech_token = create_access_token(_uuid, expires_delta=False)
    params = _key_json.copy()
    # params = {k: v for (k, v) in _key_json.items() if k not in ['locale_id']}
    _get_headers = {**_headers, 'Authorization': f'Bearer {_tech_token}'}

    resp = client.get(url_for('contents_bp.content', **params), headers=_get_headers)
    assert resp.status_code == 200
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json.get('message').find(test_word) != -1

    # Try to find view with wrong value (404):
    for key in _key_json.keys():
        _wrong_key_value = _key_json.copy()
        _wrong_key_value[key] += '_wrong'
        # params = {k: v for (k, v) in _wrong_key_value.items()
        # if k not in ['locale_id']}
        headers = {**_headers, 'Accept-Language': lng}
        # print('\ntest_content_delete, params ->', params, '\theaders ->', headers)
        resp = client.delete(url_for('contents_bp.content',
                                     **_wrong_key_value), headers=headers)
        assert resp.status_code == 404
        assert 'message' in resp.json.keys()
        assert 'payload' not in resp.json.keys()
        assert resp.json.get('message').find(test_word) != -1

    # delete view instance from db:
    resp = client.delete(url_for('contents_bp.content', **_key_json), headers=_headers)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert resp.json.get('message').find(test_word) != -1

    # try to delete already deleted instance
    resp = client.delete(url_for('contents_bp.content', **_key_json), headers=_headers)
    assert resp.status_code == 404
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert resp.json.get('message').find(test_word) != -1

    # Insure view is deleted in db:
    resp = client.get(url_for('contents_bp.content', **_key_json), headers=_get_headers)
    assert resp.status_code == 404
    assert 'message' in resp.json.keys()
    assert 'payload' not in resp.json.keys()
    assert resp.json.get('message').find(test_word) != -1
    # print('\ntest_content_delete, resp ->', resp.status_code)
    # print('test_content_delete, resp ->', resp.json)

    # Clean up user table
    _user.delete_fm_db()
