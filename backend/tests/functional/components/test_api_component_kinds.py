from typing import Dict

import pytest


@pytest.fixture
def url_component_kinds(root_url):
    return root_url + '/components/kinds'


@pytest.fixture
def component_kind_api_resp(
        test_client, url_component_kinds, component_kind_instance,
        component_kinds_get_schema, random_words):
    _components_kinds_json = \
        component_kinds_get_schema.dump(
            component_kind_instance(random_words() + random_words()))
    return test_client.post(url_component_kinds, json=_components_kinds_json)


# @pytest.mark.active
def test_components_kinds_post(
        test_client, url_component_kinds, component_kind_api_resp):
    resp = component_kind_api_resp
    # print(resp.status_code)
    assert resp.status_code == 201
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


# @pytest.mark.active
def test_components_kinds_get(
        test_client, url_component_kinds, component_kind_api_resp):
    # Create new random instance and send to API:
    resp = component_kind_api_resp
    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)
    # Create json for enquiry:
    _components_kinds_json = resp.json['payload'].copy()
    _search_components_kinds_json = _components_kinds_json.copy()
    _search_components_kinds_json.pop('description')
    # Get component instance from API:
    resp = test_client.get(url_component_kinds, json=_search_components_kinds_json)
    # Insure component is correctly gotten:
    for key in _components_kinds_json.keys():
        assert _components_kinds_json[key] == resp.json['payload'][key]

    # Change some searching criterion fail to get 404 from API:
    _search_components_kinds_json['id_kind'] += '_'
    resp = test_client.get(url_component_kinds, json=_search_components_kinds_json)
    assert resp.status_code == 404
    # print(resp.json)


# @pytest.mark.active
def test_components_kinds_put(
        test_client, url_component_kinds, component_kind_api_resp):

    # Create new random instance and send to API:
    resp = component_kind_api_resp
    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)
    # Create json for further testing:
    _component_kind_json = resp.json['payload'].copy()

    # Get object and test it's correctness:
    _get_component_kind_json = _component_kind_json.copy()
    _get_component_kind_json.pop('description')
    resp = test_client.get(url_component_kinds, json=_get_component_kind_json)
    for key in _component_kind_json.keys():
        assert resp.json['payload'][key] == _component_kind_json[key]

    # Try to put object with wrong key:
    _put_component_kind_wrong_json = _component_kind_json.copy()
    _put_component_kind_wrong_json['id_kind'] += ' wrong'
    _put_component_kind_wrong_json['description'] += ' Corrected!'
    resp = test_client.put(url_component_kinds, json=_put_component_kind_wrong_json)
    assert resp.status_code == 404
    assert 'payload' not in resp.json.keys()

    # Create json for correction:
    _put_component_kind_json = _component_kind_json.copy()
    _put_component_kind_json['description'] = ''
    # _put_component_kind_json['description'] += ' Corrected!'
    # print(_put_component_kind_json)

    # Correct object:
    resp = test_client.put(url_component_kinds, json=_put_component_kind_json)
    assert resp.status_code == 200
    print('resp.json -', resp.json)
    for key in _put_component_kind_json.keys():
        assert resp.json['payload'][key] == _put_component_kind_json[key]


# @pytest.mark.active
def test_components_kinds_delete(
        test_client, url_component_kinds, component_kind_api_resp):

    # Create new random instance and send to API:
    resp = component_kind_api_resp
    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)
    _component_kind_json = resp.json['payload'].copy()

    # Try to delete with wrong id:
    _delete_component_kind_wrong_json = _component_kind_json.copy()
    _delete_component_kind_wrong_json['id_kind'] += ' wrong'
    resp = test_client.delete(
        url_component_kinds, json=_delete_component_kind_wrong_json)
    assert resp.status_code == 404
    assert 'payload' not in resp.json.keys()

    # Create json for deleting and delete object from db:
    _delete_component_kind_json = _component_kind_json.copy()
    resp = test_client.delete(
        url_component_kinds, json=_delete_component_kind_json)
    assert resp.status_code == 200
    assert isinstance(resp.json, Dict)
    # print(resp.status_code)
    # print(type(resp.json))

    # try to get object from API:
    resp = test_client.get(
        url_component_kinds, json=_delete_component_kind_json)
    assert resp.status_code == 404
    assert 'payload' not in resp.json.keys()
