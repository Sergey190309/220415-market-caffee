from typing import Dict

import pytest


@pytest.fixture
def url_components(root_url):
    # def _method(user_id=None):
    return root_url + '/components'
    # return _method


# @pytest.mark.parametrize('lang', [('ru'), ('en')])
# @pytest.mark.active
def test_components_post(
        test_client, url_components, component_instance, component_test_schema):
    # Create random instance. Good.
    _component_json = component_test_schema.dump(component_instance('en'))

    resp = test_client.post(url_components, json=_component_json)

    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)

    # Try to create instance with bad json keys.
    for key in _component_json.keys():
        _component_bad_json = _component_json.copy()
        _temp = _component_json[key]
        _bad_key = key + '_'
        _component_bad_json.pop(key)
        _component_bad_json[_bad_key] = _temp
        resp = test_client.post(url_components, json=_component_bad_json)
        assert resp.status_code == 400
        assert isinstance(resp.json, str)

    # Try to create instance with same primary keys. Bad.
    resp = test_client.post(url_components, json=_component_json)
    assert resp.status_code == 400
    assert isinstance(resp.json, Dict)
    # Create instance with same part of primary keys. Good.
    # change identity:
    _component_changed_json = _component_json.copy()
    _component_changed_json['identity'] = _component_changed_json['identity'] + '_'
    resp = test_client.post(url_components, json=_component_changed_json)
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)
    # Change locale_id:
    _component_changed_json = _component_json.copy()
    _component_changed_json['locale_id'] = 'ru'
    resp = test_client.post(url_components, json=_component_changed_json)
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)
    # print(resp.status_code)
    # print(resp.json)

    # print(_component_json)


# @pytest.mark.active
def test_components_get(
        test_client, url_components, component_test_schema, component_instance):
    # Create new random instance and send to API:
    _component_json = component_test_schema.dump(component_instance('en'))
    resp = test_client.post(url_components, json=_component_json)
    assert resp.status_code == 200
    # Get component instance from API:
    # Create json for requests:
    _component_request_json = _component_json.copy()
    _component_request_json.pop('title')
    _component_request_json.pop('content')
    _component_request_json.pop('details')
    resp = test_client.get(url_components, json=_component_request_json)
    # Insure component is correctly gotten:
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)
    for key in _component_json.keys():
        assert _component_json[key] == resp.json['payload'][key]
    # Change some searching criterion fail to get 404 from API:
    _component_bad_content_request_json = _component_request_json.copy()
    _component_bad_content_request_json['locale_id'] = 'ru'
    resp = test_client.get(url_components, json=_component_bad_content_request_json)
    assert resp.status_code == 404
    _component_bad_content_request_json = _component_request_json.copy()
    _component_bad_content_request_json['identity'] = 'asjgapos'
    resp = test_client.get(url_components, json=_component_bad_content_request_json)
    assert resp.status_code == 404

    # print(resp.status_code)
    # print(resp.json)


@pytest.fixture
def url_component_kinds(url_components):
    return url_components + '/kinds'


@pytest.fixture
def component_kind_api_resp(
        test_client, url_component_kinds, component_kind_instance,
        component_kinds_test_schema, random_words):
    _components_kinds_json = \
        component_kinds_test_schema.dump(component_kind_instance(random_words()))
    return test_client.post(url_component_kinds, json=_components_kinds_json)


# @pytest.mark.active
def test_components_kinds_post(
        test_client, url_component_kinds, component_kind_api_resp):

    resp = component_kind_api_resp
    # print(resp.status_code)
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)

    _components_kinds_json = resp.json['payload'].copy()
    # Try to create other instance with same id_kind
    _components_kinds_same_id_json = {
        'id_kind': _components_kinds_json['id_kind']
    }
    resp = test_client.post(url_component_kinds, json=_components_kinds_same_id_json)
    assert resp.status_code == 400
    assert 'payload' not in resp.json.keys()

    # Get marshmallow errors
    for key in _components_kinds_json.keys():
        _components_kinds_bad_json = _components_kinds_json.copy()
        _components_kinds_bad_json[key + '_'] = _components_kinds_bad_json.pop(key)
        resp = test_client.post(url_component_kinds, json=_components_kinds_bad_json)
        # print(resp.status_code)
        assert resp.status_code == 400

    # print(resp.status_code)
    # print(_components_kinds_json)


@pytest.mark.active
def test_components_kinds_get(
        test_client, url_component_kinds, component_kind_api_resp):
    # Create new random instance and send to API:
    pass
    # _component_kind_json =
    # print(resp.status_code)
    # print(resp.json)
