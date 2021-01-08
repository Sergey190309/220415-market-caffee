from typing import Dict

import pytest

# from application.modules.dbs_global import dbs_global
# from application.contents.schemas.views import view_get_schema


@pytest.fixture(scope='module')
def url_view(root_url):
    return root_url + '/contents/views'


@pytest.fixture(scope='module')
def view_api_resp(
        test_client, url_view, view_instance,
        view_get_schema, random_words):
    '''
    It makes post reques to API and retunrn responce.
    '''
    view_json = view_get_schema.dump(
        view_instance(random_words() + random_words()))
    return test_client.post(url_view, json=view_json)


@pytest.fixture(scope='module')
def original_data(view_api_resp):
    '''
    Test responce from API and store result for further reference.
    There is success test here as well.
    '''
    resp = view_api_resp
    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)
    return resp.json['payload']


@pytest.fixture(scope='module')
def original_key_data(original_data):
    _data = original_data.copy()
    _data.pop('description')
    return _data


@pytest.fixture(scope='module')
def original_value_data(original_data):
    _data = original_data.copy()
    _data.pop('id_view')
    return _data


# @pytest.mark.active
def test_view_post_already_exists(
        test_client, url_view, original_data):
    # Make new request with same data as already created instance.
    resp = test_client.post(url_view, json=original_data)
    assert resp.status_code == 400
    assert 'payload' not in resp.json.keys()


# @pytest.mark.active
def test_view_get(
        test_client, url_view, original_key_data):
    # Find data with normal set of keys:
    resp = test_client.get(url_view, json=original_key_data)
    assert resp.status_code == 200
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)

    # Try to find data with wrong value (404):
    for key in original_key_data.keys():
        _key_data = original_key_data.copy()
        _key_data['id_view'] += '_wrong'
        resp = test_client.get(url_view, json=_key_data)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()

    # Try to find data with wrong key (marshmallow error):
    for key in original_key_data.keys():
        _key = key + '_wrong'
        _key_data = original_key_data.copy()
        _key_data[_key] = _key_data.pop(key)
        resp = test_client.get(url_view, json=_key_data)
        assert resp.status_code == 400
        # print(resp.json)
        # print(resp.status_code)


# @pytest.mark.active
def test_view_put(
        test_client, url_view,
        original_data, original_key_data, original_value_data):
    # Find and update data with normal set of keys:
    for key in original_value_data.keys():
        _corrected_data = original_data.copy()
        _corrected_data[key] += ' !corrected!'
        resp = test_client.put(url_view, json=_corrected_data)
        assert resp.status_code == 200
        assert 'payload' in resp.json.keys()
        assert isinstance(resp.json['payload'], Dict)
        for resp_key in resp.json['payload'].keys():
            assert _corrected_data[resp_key] == resp.json['payload'][resp_key]

    # Try to find view with wrong value (404):
    for key in original_key_data.keys():
        _wrong_key_value = original_key_data.copy()
        _wrong_key_value[key] += '_wrong'
        resp = test_client.put(url_view, json=_wrong_key_value)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()

    # Marshmallow tested within test_view_get.


@pytest.mark.active
def test_view_delete(
        test_client, url_view,
        original_key_data):
    # Insure view is exist in db:
    resp = test_client.get(url_view, json=original_key_data)
    assert resp.status_code == 200
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)
    # Try to find view with wrong value (404):
    for key in original_key_data.keys():
        _wrong_key_value = original_key_data.copy()
        _wrong_key_value[key] += '_wrong'
        resp = test_client.delete(url_view, json=_wrong_key_value)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
    # Marshmallow tested within test_view_get.

    # delete view instance from db:
    resp = test_client.delete(url_view, json=original_key_data)
    assert resp.status_code == 200
    assert 'payload' not in resp.json.keys()

    # Insure view is deleted in db:
    resp = test_client.get(url_view, json=original_key_data)
    assert resp.status_code == 404
    assert 'payload' not in resp.json.keys()
    # print(resp.json)
    # print(resp.status_code)
