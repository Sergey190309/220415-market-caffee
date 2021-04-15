import pytest
from typing import (
    Dict,
    # List
)
from flask import url_for

# from application.contents.local_init_data_contents import contents_constants
# from application.global_init_data import global_constants


# @pytest.fixture(scope='session')
# def url_contents(root_url):
#     return root_url + '/contents'


# @pytest.fixture(scope='module', autouse=True)
@pytest.fixture
def content_api_resp(
        content_instance,
        client, content_get_schema):
    '''
    It makes post reques to API and retunrn responce.
    '''
    def _method(values: Dict = {}):
        _content_json = (content_get_schema.dump(content_instance(values)))
        resp = client.post(url_for('contents_bp.contents'), json=_content_json)
        # print(resp.json['payload'])
        assert resp.status_code == 201
        assert isinstance(resp.json['payload'], Dict)
        assert isinstance(resp.json['payload']['view'], Dict)
        assert isinstance(resp.json['payload']['locale'], Dict)
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
def test_contents_post_already_exists(
        content_api_resp, creating_values_json,
        allowed_language, allowed_view,
        client):
    # Create one instance with random values:
    _original_values = {'view_id': allowed_view, 'locale_id': allowed_language}
    resp = content_api_resp(_original_values)

    # Get results of attemtion to create content indtance with same pks:
    _same_values = creating_values_json(resp.json['payload'])
    resp = client.post(url_for('contents_bp.contents'), json=_same_values)
    # print(
    #     '\ntest_contents_post_already_exists, resp.json[message] ->',
    #     resp.json['message'])
    assert resp.status_code == 400
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json['message'], str)


# @pytest.mark.active
def test_contents_post_create_other_instances(
        content_api_resp, creating_values_json,
        allowed_language, allowed_view,
        other_valid_item, random_text,
        client):
    '''
    Creating other instances with one of three primary keys changed.
    '''
    _original_values = {'view_id': allowed_view, 'locale_id': allowed_language}
    resp = content_api_resp(_original_values)
    _pks_json = creating_values_json(resp.json['payload'])
    # Create new data json that allowed create new instance:
    for key in ['identity', 'view_id', 'locale_id']:
        _changed_pks_json = _pks_json.copy()
        # Change one of key for other allowed one:
        if key == 'locale_id':
            _changed_pks_json[key] = other_valid_item(
                item_kind='locale_id', prev_item=_pks_json['locale_id'])
        elif key == 'view_id':
            _changed_pks_json[key] = other_valid_item(
                item_kind='view_id', prev_item=_pks_json['view_id'])
        else:
            _changed_pks_json[key] = random_text(qnt=1)

        resp = client.post(url_for('contents_bp.contents'), json=_changed_pks_json)
        assert resp.status_code == 201
        assert 'payload' in resp.json.keys()
        assert isinstance(resp.json['payload'], Dict)


# @pytest.mark.active
def test_contents_post_wrong_fk(
        content_api_resp, creating_values_json,
        client):
    '''
    Operation with foreign key that are not in appropriate tables.
    '''
    # Create dict without relationships and dates:
    resp = content_api_resp()
    _creating_json = creating_values_json(resp.json['payload'])

    # Try to create instance briching db's constrains:
    _wrong_creating_json = _creating_json.copy()
    _wrong_creating_json['locale_id'] = 'not'
    # print(
    #     '\nTest_contents_post_wrong_fk, _wrong_creating_json ->',
    #     _wrong_creating_json)
    resp = client.post(url_for('contents_bp.contents'), json=_wrong_creating_json)
    assert resp.status_code == 500
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], str)
    assert resp.json['payload'].find('foreign key constraint fails') != -1

    _wrong_creating_json = _creating_json.copy()
    _wrong_creating_json['view_id'] = 'not'
    resp = client.post(url_for('contents_bp.contents'), json=_wrong_creating_json)
    assert resp.status_code == 500
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], str)
    assert resp.json['payload'].find('foreign key constraint fails') != -1


# @pytest.mark.active
def test_contents_get(
        content_api_resp, creating_values_json,
        client):

    # Find data with normal set of keys:
    resp = content_api_resp()
    _original_json = resp.json['payload'].copy()
    _key_json = {key: value for (key, value) in _original_json.items()
                 if key in ['view_id', 'identity', 'locale_id']}
    params = {k: v for (k, v) in _key_json.items() if k != 'locale_id'}
    headers = {'Accept-Language': _key_json['locale_id']}
    resp = client.get(url_for('contents_bp.contents', **params), headers=headers)
    # Check something found and data has been identical:
    assert resp.status_code == 200
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)
    for key in _original_json.keys():
        assert _original_json[key] == resp.json['payload'][key]

    # Try to find data with wrong value (404):
    for key in _key_json.keys():
        _wrong_value_json = _key_json.copy()
        _wrong_value_json[key] += '_wrong'
        params = {k: v for (k, v) in _wrong_value_json.items() if k != 'locale_id'}
        # print('\nTest_contents_get. params ->', params)
        headers = {'Accept-Language': _wrong_value_json['locale_id']}
        resp = client.get(url_for('contents_bp.contents',
                          **params), headers=headers)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert 'message' in resp.json.keys()

    # print('\nTest_contents_get. resp.json ->', resp.json)


# @pytest.mark.active
def test_content_put(
        content_api_resp, creating_values_json,
        # allowed_language, allowed_view,
        # other_valid_item, random_text,
        client):
    # Create data with normal set of keys:
    resp = content_api_resp()
    # print(resp.json['payload'])
    _original_json = creating_values_json(resp.json['payload'])
    _key_json = {
        key: value for (key, value) in _original_json.items()
        if key in ['identity', 'view_id', 'locale_id']}
    _value_json = {
        key: value for (key, value) in _original_json.items()
        if key not in ['identity', 'view_id', 'locale_id']}
    # Find and update data with normal set of keys:
    for key in _value_json.keys():
        # print(key)
        _corrected_data = _original_json.copy()
        if isinstance(_corrected_data[key], int):
            _corrected_data[key] = 0
        elif isinstance(_corrected_data[key], str):
            _corrected_data[key] += ' - corrected'
        resp = client.put(url_for('contents_bp.contents'), json=_corrected_data)
        assert resp.status_code == 200
        assert 'payload' in resp.json.keys()
        assert resp.json['payload'][key] == _corrected_data[key]

    # Try to find view with wrong value (404):
    for key in _key_json.keys():
        _wrong_key_value = _original_json.copy()
        _wrong_key_value[key] += '_wrong'
        resp = client.put(url_for('contents_bp.contents'), json=_wrong_key_value)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert isinstance(resp.json, Dict)


# @pytest.mark.active
def test_content_delete(
        content_api_resp, creating_values_json,
        client):
    # Create data with normal set of keys:
    resp = content_api_resp()
    _original_json = creating_values_json(resp.json['payload'])
    _key_json = {
        key: value for (key, value) in _original_json.items()
        if key in ['identity', 'view_id', 'locale_id']}

    # Insure content is exist in db:
    params = {k: v for (k, v) in _key_json.items() if k not in ['locale_id']}
    headers = {'Accept-Language': _key_json['locale_id']}
    # print('\ntest_content_delete, params ->', params, '\theaders ->', headers)
    resp = client.get(
        url_for('contents_bp.contents', **params), headers=headers)
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
        headers = {'Accept-Language': _wrong_key_value['locale_id']}
        # print('\ntest_content_delete, params ->', params, '\theaders ->', headers)
        resp = client.delete(
            url_for('contents_bp.contents', **params), headers=headers)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert isinstance(resp.json, Dict)
    # print('\ntest_content_delete, resp ->', resp)

    # delete view instance from db:
    params = {k: v for (k, v) in _key_json.items() if k not in ['locale_id']}
    headers = {'Accept-Language': _key_json['locale_id']}
    resp = client.delete(url_for('contents_bp.contents', **params), headers=headers)
    assert resp.status_code == 200
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json, Dict)

    # Insure view is deleted in db:
    params = {k: v for (k, v) in _key_json.items() if k not in ['locale_id']}
    headers = {'Accept-Language': _key_json['locale_id']}
    resp = client.get(url_for('contents_bp.contents', **params), headers=headers)
    assert resp.status_code == 404
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json, Dict)
    # print(resp.status_code)
    # print(resp.json)
