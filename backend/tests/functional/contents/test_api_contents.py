from typing import (
    Dict,
    # List
)

import pytest

# from application.contents.local_init_data_contents import contents_constants
# from application.global_init_data import global_constants


@pytest.fixture(scope='session')
def url_contents(root_url):
    return root_url + '/contents'


# @pytest.fixture(scope='module', autouse=True)
@pytest.fixture
def content_api_resp(
        content_instance,
        client, url_contents, content_get_schema):
    '''
    It makes post reques to API and retunrn responce.
    '''
    def _method(values: Dict = {}):
        _content_json = (content_get_schema.dump(content_instance(values)))
        resp = client.post(url_contents, json=_content_json)
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
        client, url_contents):
    # Create one instance with random values:
    _original_values = {'view_id': allowed_view, 'locale_id': allowed_language}
    resp = content_api_resp(_original_values)

    # Get results of attemtion to create content indtance with same pks:
    _same_values = creating_values_json(resp.json['payload'])
    resp = client.post(url_contents, json=_same_values)
    # print('\ntest_contents_post_already_exists, resp.json[message] ->', resp.json['message'])
    assert resp.status_code == 400
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json['message'], str)


# @pytest.mark.active
def test_contents_post_create_other_instances(
        content_api_resp, creating_values_json,
        allowed_language, allowed_view,
        other_valid_item, random_text,
        client, url_contents):
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

        resp = client.post(url_contents, json=_changed_pks_json)
        assert resp.status_code == 201
        assert 'payload' in resp.json.keys()
        assert isinstance(resp.json['payload'], Dict)


@pytest.mark.active
def test_contents_post_wrong_fk(
        content_api_resp, creating_values_json,
        # allowed_language, allowed_view,
        # other_valid_item, random_text,
        client, url_contents):
    '''
    Operation with foreign key that are not in appropriate tables.
    '''
    # Create dict without relationships and dates:
    resp = content_api_resp()
    _creating_json = creating_values_json(resp.json['payload'])

    # Try to create instance briching db's constrains:
    _wrong_creating_json = _creating_json.copy()
    _wrong_creating_json['locale_id'] = 'not'
    print('\nTest_contents_post_wrong_fk, _wrong_creating_json ->', _wrong_creating_json)
    resp = client.post(url_contents, json=_wrong_creating_json)
    assert resp.status_code == 500
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], str)
    assert resp.json['payload'].find('foreign key constraint fails') != -1

    _wrong_creating_json = _creating_json.copy()
    _wrong_creating_json['view_id'] = 'not'
    resp = client.post(url_contents, json=_wrong_creating_json)
    assert resp.status_code == 500
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], str)
    assert resp.json['payload'].find('foreign key constraint fails') != -1


# @pytest.mark.active
def test_contents_get(
        content_api_resp, creating_values_json,
        # allowed_language, allowed_view,
        # other_valid_item, random_text,
        client, url_contents):

    # Find data with normal set of keys:
    resp = content_api_resp()
    _original_json = creating_values_json(resp.json['payload'])
    _get_json = {
        key: value for (key, value) in resp.json['payload'].items()
        if key in ['identity', 'view_id', 'locale_id']}
    resp = client.get(url_contents, json=_get_json)
    # Check something found and data has been identical:
    assert resp.status_code == 200
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)
    for key in _original_json.keys():
        assert _original_json[key] == resp.json['payload'][key]

    # Try to find data with wrong value (404):
    for key in _get_json.keys():
        _wrong_key_json = _get_json.copy()
        _wrong_key_json[key] += '_wrong'
        resp = client.get(url_contents, json=_wrong_key_json)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert 'message' in resp.json.keys()
        # print(resp.json)

    # Try to find data with wrong key (marshmallow error):
    for key in _get_json.keys():
        _wrong_key_json = _get_json.copy()
        _wrong_key = key + '_wrong'
        _wrong_key_json[_wrong_key] = _wrong_key_json.pop(key)
        resp = client.get(url_contents, json=_wrong_key_json)
        assert resp.status_code == 400
        assert isinstance(resp.json, str)
        assert resp.json.find('Missing data for required field') != -1
        assert resp.json.find('Unknown field') != -1
        # print(resp.status_code)
        # print(resp.json)
        # print(type(resp.json))


# @pytest.mark.active
def test_content_put(
        content_api_resp, creating_values_json,
        # allowed_language, allowed_view,
        # other_valid_item, random_text,
        client, url_contents):
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
        resp = client.put(url_contents, json=_corrected_data)
        assert resp.status_code == 200
        assert 'payload' in resp.json.keys()
        assert resp.json['payload'][key] == _corrected_data[key]

    # Try to find view with wrong value (404):
    for key in _key_json.keys():
        _wrong_key_value = _original_json.copy()
        _wrong_key_value[key] += '_wrong'
        resp = client.put(url_contents, json=_wrong_key_value)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert isinstance(resp.json, Dict)

    # Marshmallow tested within test_view_get.


# @pytest.mark.active
def test_content_delete(
        content_api_resp, creating_values_json,
        # allowed_language, allowed_view,
        # other_valid_item, random_text,
        test_client, url_contents):
    # Create data with normal set of keys:
    resp = content_api_resp()
    # print(resp.json['payload'])
    _original_json = creating_values_json(resp.json['payload'])
    _key_json = {
        key: value for (key, value) in _original_json.items()
        if key in ['identity', 'view_id', 'locale_id']}

    # Insure view is exist in db:
    resp = test_client.get(url_contents, json=_key_json)
    assert resp.status_code == 200
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)

    # Try to find view with wrong value (404):
    for key in _key_json.keys():
        _wrong_key_value = _key_json.copy()
        _wrong_key_value[key] += '_wrong'
        resp = test_client.delete(url_contents, json=_wrong_key_value)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert isinstance(resp.json, Dict)
    # Marshmallow tested within test_view_get.

    # delete view instance from db:
    resp = test_client.delete(url_contents, json=_key_json)
    assert resp.status_code == 200
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json, Dict)

    # Insure view is deleted in db:
    resp = test_client.get(url_contents, json=_key_json)
    assert resp.status_code == 404
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json, Dict)
    # print(resp.status_code)
    # print(resp.json)
