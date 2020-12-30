from typing import Dict

import pytest


@pytest.fixture
def url_components(root_url):
    # def _method(user_id=None):
    return root_url + '/components'
    # return _method


# @pytest.mark.parametrize('lang', [('ru'), ('en')])
# @pytest.mark.active
def test_users_post(
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


@pytest.mark.active
def test_users_get(
        test_client, url_components, component_test_schema, component_instance):
    # Create and save new random instance send to API:
    _component_json = component_test_schema.dump(component_instance('en'))
    for key in _component_json.keys():
        print(key, '\t', _component_json[key])
    _component_request_json = _component_json.copy()
    _component_request_json.pop('title')
    _component_request_json.pop('content')
    print()
    for key in _component_request_json.keys():
        print(key, '\t', _component_request_json[key])
    resp = test_client.post(url_components, json=_component_request_json)

    print()
    print(resp.status_code)
    print(resp.json)
    # Get component instance from API:
    # Change some key fail to get the instance from API:

    # resp = test_client.get(url_components)
