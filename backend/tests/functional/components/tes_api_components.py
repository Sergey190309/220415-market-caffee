from typing import Dict

import pytest


@pytest.fixture
def url_components(root_url):
    # def _method(user_id=None):
    return root_url + '/components'
    # return _method


@pytest.fixture
def component_api_resp(
        client, url_components, component_instance,
        component_get_schema, random_words):
    def _method(lang: str = 'en'):
        values = {'locale_id': lang}
        _components_json = \
            component_get_schema.dump(component_instance(values))
        # print(_components_json.keys())
        return client.post(url_components, json=_components_json)
    return _method


# @pytest.mark.active
def test_components_post(
        allowed_language,
        client, url_components,
        component_api_resp):

    # Create random instance. Good.
    resp = component_api_resp(allowed_language)
    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)
    _component_json = resp.json['payload'].copy()
    # Create json for requests:
    _component_json.pop('kind')
    _component_json.pop('locale')
    # print(resp.status_code)

    # Try to create instance with bad json keys. Generate marshmallow errors.
    for key in _component_json.keys():
        _component_bad_json = _component_json.copy()
        _temp = _component_json[key]
        _bad_key = key + '_'
        _component_bad_json.pop(key)
        _component_bad_json[_bad_key] = _temp
        # print(_component_bad_json.keys())
        resp = client.post(url_components, json=_component_bad_json)
        assert resp.status_code == 400
        assert isinstance(resp.json, str)

    # Try to create instance with same primary keys. Bad.
    # print(_component_json.keys())
    resp = client.post(url_components, json=_component_json)
    # print(resp.status_code)
    assert resp.status_code == 400
    assert isinstance(resp.json, Dict)

    # Create instance with same part of primary keys. Good.
    # change identity:
    _component_changed_json = _component_json.copy()
    _component_changed_json['identity'] = _component_changed_json['identity'] + '_'
    resp = client.post(url_components, json=_component_changed_json)
    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)
    # # Change locale_id:
    _component_changed_json = _component_json.copy()
    if _component_changed_json['locale_id'] == 'en':
        _component_changed_json['locale_id'] = 'ru'
    elif _component_changed_json['locale_id'] == 'ru':
        _component_changed_json['locale_id'] = 'en'
    else:
        _component_changed_json['locale_id'] = 'ru'

    resp = client.post(url_components, json=_component_changed_json)
    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)


# @pytest.mark.active
def test_components_get(
        allowed_language,
        client, url_components, component_api_resp):
    # Create new random instance and send to API:
    # Create random instance. Good.
    resp = component_api_resp(allowed_language)

    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)
    _component_json = resp.json['payload'].copy()
    # Get component instance from API:
    # Create json for requests:
    _component_request_json = _component_json.copy()
    _component_request_json.pop('locale')
    _component_request_json.pop('kind')
    # print(_component_request_json.keys())
    resp = client.get(url_components, json=_component_request_json)
    # Insure component is correctly gotten:
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)
    for key in _component_json.keys():
        assert _component_json[key] == resp.json['payload'][key]
    # Change some searching criterion fail to get 404 from API:
    _component_bad_content_request_json = _component_request_json.copy()
    if _component_bad_content_request_json['locale_id'] == 'en':
        _component_bad_content_request_json['locale_id'] = 'ru'
    elif _component_bad_content_request_json['locale_id'] == 'ru':
        _component_bad_content_request_json['locale_id'] = 'en'
    else:
        _component_bad_content_request_json['locale_id'] = 'ru'
    resp = client.get(url_components, json=_component_bad_content_request_json)
    assert resp.status_code == 404
    _component_bad_content_request_json = _component_request_json.copy()
    _component_bad_content_request_json['identity'] = 'asjgapos'
    resp = client.get(url_components, json=_component_bad_content_request_json)
    assert resp.status_code == 404


# @pytest.mark.active
def test_components_put(
        allowed_language,
        client, url_components, component_api_resp):

    # Create new random instance and send to API:
    # resp = component_api_resp('en')
    resp = component_api_resp(allowed_language)
    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)

    # Create jsons for further testing:
    _component_json = {
        key: value for (key, value) in resp.json['payload'].items()
        if key not in ['locale', 'kind']}
    _component_keys_json = {
        key: value for (key, value) in resp.json['payload'].items()
        if key in ['identity', 'kind_id', 'locale_id']}
    _component_values_json = {
        key: value for (key, value) in resp.json['payload'].items()
        if key in ['title', 'content', 'details']}

    # Get object and test it's correctness:
    resp = client.get(url_components, json=_component_keys_json)
    assert resp.status_code == 200
    for key in _component_json.keys():
        assert _component_json[key] == resp.json['payload'][key]

    # Try to put object with wrong key (get marshmallow errors):
    for key in _component_keys_json.keys():
        _put_component_wrong_keys_json = _component_json.copy()
        _wrong_key = key + '_'
        _put_component_wrong_keys_json[_wrong_key] =\
            _put_component_wrong_keys_json.pop(key)
        resp = client.put(url_components, json=_put_component_wrong_keys_json)
        assert resp.status_code == 400

    # Try to put object with wrong key values (get 404):
    for key in _component_keys_json.keys():
        _put_component_wrong_values_json = _component_json.copy()
        _put_component_wrong_values_json[key] += '_'
        resp = client.put(url_components, json=_put_component_wrong_values_json)
        assert resp.status_code == 404
        # print(key, '\t', _put_component_wrong_values_json[key])

    # Create json for correction and correct object:
    for key in _component_values_json.keys():
        _put_component_values_json = _component_json.copy()
        # print(_put_component_values_json)
        if isinstance(_put_component_values_json[key], int):
            _put_component_values_json[key] = 5
        else:
            # pass
            _put_component_values_json[key] += '- corrected!'
        resp = client.put(url_components, json=_put_component_values_json)
        assert resp.status_code == 200
        assert resp.json['payload'][key] == _put_component_values_json[key]


# @pytest.mark.active
def test_components_delete(
        allowed_language,
        client, url_components, component_api_resp):

    # Create new random instance and send to API:
    # resp = component_api_resp('en')
    resp = component_api_resp(allowed_language)
    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)

    # Create jsons for further testing:
    _component_json = {
        key: value for (key, value) in resp.json['payload'].items()
        if key not in ['locale', 'kind']}

    # Get object and test it's correctness:
    _component_keys_json = {
        key: value for (key, value) in resp.json['payload'].items()
        if key in ['identity', 'kind_id', 'locale_id']}

    # Get object and test it's correctness:
    resp = client.get(url_components, json=_component_keys_json)
    assert resp.status_code == 200
    for key in _component_json.keys():
        assert _component_json[key] == resp.json['payload'][key]

    # Try to delete object with wrong key (get marshmallow errors):
    for key in _component_keys_json.keys():
        _delete_component_wrong_keys_json = _component_keys_json.copy()
        _wrong_key = key + '_'
        _delete_component_wrong_keys_json[_wrong_key] =\
            _delete_component_wrong_keys_json.pop(key)
        resp = client.delete(
            url_components, json=_delete_component_wrong_keys_json)
        assert resp.status_code == 400

    # Try to delete object with wrong key values (get 404):
    for key in _component_keys_json.keys():
        _delete_component_wrong_values_json = _component_keys_json.copy()
        _delete_component_wrong_values_json[key] += '_'
        resp = client.delete(
            url_components, json=_delete_component_wrong_values_json)
        assert resp.status_code == 404

    # Create json for deleting and delete object from db:
    _delete_component_json = _component_keys_json.copy()
    resp = client.delete(url_components, json=_delete_component_json)
    assert resp.status_code == 200
    assert isinstance(resp.json, Dict)

    # try to get object from API:
    resp = client.delete(url_components, json=_delete_component_json)
    assert resp.status_code == 404
    assert isinstance(resp.json, Dict)

    # print(_put_component_values_json[key])
    # print(_get_component_json.keys())
