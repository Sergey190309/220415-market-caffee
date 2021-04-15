import pytest
from typing import Dict
from flask import url_for


# from application.modules.dbs_global import dbs_global
# from application.contents.schemas.views import view_get_schema


@pytest.fixture
def view_api_resp(
        client, view_instance,
        view_get_schema):
    '''
    It makes post reques to API and retunrn responce.
    '''
    view_json = view_get_schema.dump(view_instance())
    return client.post(url_for('contents_bp.views'), json=view_json)


@pytest.fixture
def original_data(view_api_resp):
    '''
    Test responce from API and store result for further reference.
    There is success test here as well.
    '''
    resp = view_api_resp
    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)
    return resp.json['payload']


@pytest.fixture()
def original_key_data(original_data):
    _data = original_data.copy()
    _data.pop('description')
    return _data


@pytest.fixture()
def original_value_data(original_data):
    _data = original_data.copy()
    _data.pop('id_view')
    return _data


# @pytest.mark.active
def test_view_post_already_exists(
        client, original_data):
    # Make new request with same data as already created instance.
    # print('\ntest_view_post_already_exists')
    resp = client.post(url_for('contents_bp.views'), json=original_data)
    assert resp.status_code == 400
    assert 'payload' not in resp.json.keys()


# @pytest.mark.active
def test_view_get(
        client, original_key_data):
    # Find data with normal set of keys:
    params = {'id_view': original_key_data.get('id_view', 'wrong')}
    resp = client.get(url_for('contents_bp.views', **params))
    assert resp.status_code == 200
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)

    # Try to find data with wrong value (404):
    for key in original_key_data.keys():
        _key_data = original_key_data.copy()
        _key_data['id_view'] += '_wrong'
        params = {'id_view': _key_data.get('id_view')}
        resp = client.get(url_for('contents_bp.views', **params))
        # print('\nTest_view_get, resp.json ->', resp.json)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()


# @pytest.mark.active
def test_view_put(
        client,
        original_data, original_key_data, original_value_data):
    # Find and update data with normal set of keys:
    for key in original_value_data.keys():
        _corrected_data = original_data.copy()
        _corrected_data[key] += ' !corrected!'
        resp = client.put(url_for('contents_bp.views'), json=_corrected_data)
        assert resp.status_code == 200
        assert 'payload' in resp.json.keys()
        assert isinstance(resp.json['payload'], Dict)
        for resp_key in resp.json['payload'].keys():
            assert _corrected_data[resp_key] == resp.json['payload'][resp_key]

    # Try to find view with wrong value (404):
    for key in original_key_data.keys():
        _wrong_key_value = original_key_data.copy()
        _wrong_key_value[key] += '_wrong'
        resp = client.put(url_for('contents_bp.views'), json=_wrong_key_value)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()

    # Marshmallow tested within test_view_get.


# @pytest.mark.active
def test_view_delete(
        client,
        original_key_data):
    # Insure view is exist in db:
    params = {'id_view': original_key_data.get('id_view', 'wrong')}
    resp = client.get(url_for('contents_bp.views', **params))
    assert resp.status_code == 200
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)
    # Try to find view with wrong value (404):
    for key in original_key_data.keys():
        _wrong_key_value = original_key_data.copy()
        _wrong_key_value[key] += '_wrong'
        params = {'id_view': _wrong_key_value.get('id_view', 'wrong')}
        resp = client.delete(url_for('contents_bp.views', **params))
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()

    # delete view instance from db:
    params = {'id_view': original_key_data.get('id_view', 'wrong')}
    resp = client.delete(url_for('contents_bp.views', **params))
    assert resp.status_code == 200
    assert 'payload' not in resp.json.keys()

    # Insure view is deleted in db:
    params = {'id_view': original_key_data.get('id_view', 'wrong')}
    resp = client.get(url_for('contents_bp.views', **params))
    assert resp.status_code == 404
    assert 'payload' not in resp.json.keys()
    # print(resp.json)
    # print(resp.status_code)
