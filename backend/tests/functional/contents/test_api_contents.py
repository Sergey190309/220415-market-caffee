from typing import Dict, List

import pytest

from application.contents.local_init_data_contents import contents_constants
from application.global_init_data import global_constants


@pytest.fixture(scope='session')
def url_contents(root_url):
    return root_url + '/contents'


@pytest.fixture(scope='session')
def langs():
    return [item['id'] for item in global_constants.get_LOCALES]


@pytest.fixture(scope='session')
def views():
    return [item['id_view'] for item in contents_constants.get_VIEWS]


# @pytest.fixture(scope='module', autouse=True)
def pytest_generate_tests(metafunc):
    # def pytest_generate_tests(metafunc, langs, views):
    '''
    Paramentrization.
    '''
    if 'lang' in metafunc.fixturenames:
        metafunc.parametrize(
            'lang', [item['id'] for item in global_constants.get_LOCALES])
        # 'lang', ['en'])
    if 'view' in metafunc.fixturenames:
        metafunc.parametrize(
            'view', [item['id_view'] for item in contents_constants.get_VIEWS])
        # 'view', ['main'])


# @pytest.fixture(scope='module', autouse=True)
@pytest.fixture
def key_data_json(
        random_words,
        lang, view) -> Dict:
    # lang: str = 'ru', view: str = 'main') -> Dict:
    '''
    This fixture called first upon starting testing in this module.
    '''
    _key_data_json = {}
    _key_data_json['identity'] = random_words(lang) + '_' + random_words(lang)
    _key_data_json['view_id'] = view
    _key_data_json['locale_id'] = lang
    # print('key_data_json -', _key_data_json)
    return _key_data_json


# @pytest.fixture(scope='module', autouse=True)
@pytest.fixture
def non_manipulated_keys_list() -> List:
    '''
    That is list to be excluded from responce result couse they
    are not manipulated whole testing.
    '''
    return [
        'created',
        'updated',
        'locale',
        'view']


# @pytest.fixture(scope='module', autouse=True)
@pytest.fixture(autouse=True)
def content_api_resp(
        test_client, url_contents, content_instance,
        content_get_schema, key_data_json):
    '''
    It makes post reques to API and retunrn responce.
    '''
    content_json = content_get_schema.dump(content_instance(
        identity=key_data_json['identity'],
        view_id=key_data_json['view_id'],
        locale_id=key_data_json['locale_id']))
    resp = test_client.post(url_contents, json=content_json)
    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)
    assert isinstance(resp.json['payload']['view'], Dict)
    assert isinstance(resp.json['payload']['locale'], Dict)
    return resp


# @pytest.fixture(scope='module')
@pytest.fixture
def original_data(content_api_resp):
    '''
    Get responce from API and store result for further reference.
    There is success test here as well.
    '''
    resp = content_api_resp
    # print('original_data -', resp)
    return resp.json['payload']


# @pytest.fixture(scope='module')
@pytest.fixture
def original_value_data(original_data, key_data_json, non_manipulated_keys_list):
    '''
    This is a part of original data that deliver information.
    In other words - original data witout key information.
    Nested elements and created and updated fieleds are removed as well.
    '''
    _data = original_data.copy()
    _data = {
        key: value for key, value in _data.items()
        if key not in non_manipulated_keys_list}
    _data = {
        key: value for key, value in _data.items()
        if key not in key_data_json.keys()}
    # print('original_value_data, after changing -', _data)
    return _data


# @pytest.mark.active
def test_contents_post_already_exists(
        test_client, url_contents,
        content_api_resp, key_data_json,
        original_data, original_value_data):

    # First make post request (all asserts are in fixture above):
    content_api_resp

    # Make other post request with same primary keys:
    resp = test_client.post(url_contents, json=key_data_json)
    assert resp.status_code == 400
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json['message'], str)


# @pytest.mark.active
def test_contents_post_create_other_instances(
        test_client, url_contents,
        langs, views,
        random_words, original_value_data,
        content_api_resp, key_data_json):
    '''
    Creating other instances with one of three primary keys changed.
    '''
    resp = content_api_resp
    for key in key_data_json.keys():
        _other_keys_json = key_data_json.copy()
        # Change one of key for other allowed one:
        if key == 'locale_id':
            _langs = langs.copy()
            _langs.remove(key_data_json[key])
            _other_keys_json[key] = _langs[0]
        elif key == 'view_id':
            _views = views.copy()
            _views.remove(key_data_json[key])
            _other_keys_json[key] = _views[0]
        else:
            _other_keys_json[key] = random_words() + random_words()

        # Create new data json that allowed create new instance:
        _new_original_data_json = dict(original_value_data, **_other_keys_json)
        resp = test_client.post(url_contents, json=_new_original_data_json)
        assert resp.status_code == 201
        assert 'payload' in resp.json.keys()
        assert isinstance(resp.json['payload'], Dict)
        # print(resp.status_code)
        # print(resp.json)
        # for key in _other_keys_json.keys():


# @pytest.mark.active
def test_contents_post_wrong_fk(
        test_client, url_contents,
        key_data_json, original_value_data,
        original_data):
    '''
    Operation with foreign key that are not in appropriate tables.
    '''
    # Create dict without relationships and dates:
    _original_data = dict(key_data_json, **original_value_data)

    # Try to create instance briching db's constrains:
    _original_data['locale_id'] = 'not'
    # _original_data['identity'] += 'not a view'
    resp = test_client.post(url_contents, json=_original_data)
    assert resp.status_code == 500
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], str)

    _original_data = dict(key_data_json, **original_value_data)

    _original_data['view_id'] = 'not'
    # _original_data['identity'] += 'not a view'
    resp = test_client.post(url_contents, json=_original_data)
    assert resp.status_code == 500
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], str)


# @pytest.mark.active
def test_contents_get(
        test_client, url_contents,
        key_data_json, original_value_data,
        content_api_resp):

    # Find data with normal set of keys:
    resp = test_client.get(url_contents, json=key_data_json)

    # Check something found and data has been identical:
    assert resp.status_code == 200
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)
    for key in original_value_data.keys():
        assert original_value_data[key] == resp.json['payload'][key]

    # Try to find data with wrong value (404):
    for key in key_data_json.keys():
        _wrong_key_json = key_data_json.copy()
        _wrong_key_json[key] += '_wrong'
        resp = test_client.get(url_contents, json=_wrong_key_json)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert 'message' in resp.json.keys()

    # Try to find data with wrong key (marshmallow error):
    for key in key_data_json.keys():
        _wrong_key = key + '_wrong'
        _key_json = key_data_json.copy()
        _key_json[_wrong_key] = _key_json.pop(key)
        resp = test_client.get(url_contents, json=_key_json)
        assert resp.status_code == 400
        assert isinstance(resp.json, str)
        # print(resp.status_code)
        # print(type(resp.json))


# @pytest.mark.active
def test_content_put(
        test_client, url_contents,
        key_data_json, original_value_data,
        content_api_resp):
    # Create origina dict without nonmanipulated keys
    _original_data_json = dict(key_data_json, **original_value_data)
    # Find and update data with normal set of keys:
    for key in original_value_data.keys():
        _corrected_data = _original_data_json.copy()
        if isinstance(_corrected_data[key], int):
            _corrected_data[key] += 5
        elif isinstance(_corrected_data[key], str):
            _corrected_data[key] += ' !corrected!'
        resp = test_client.put(url_contents, json=_corrected_data)
        assert resp.status_code == 200
        assert resp.json['payload'][key] == _corrected_data[key]

    # Try to find view with wrong value (404):
    for key in key_data_json.keys():
        _wrong_key_value = key_data_json.copy()
        _wrong_key_value[key] += '_wrong'
        resp = test_client.put(url_contents, json=_wrong_key_value)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert isinstance(resp.json, Dict)

    # Marshmallow tested within test_view_get.


# @pytest.mark.active
def test_content_delete(
        test_client, url_contents,
        key_data_json, original_value_data,
        content_api_resp):
    # Insure view is exist in db:
    resp = test_client.get(url_contents, json=key_data_json)
    assert resp.status_code == 200
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload'], Dict)
    # Try to find view with wrong value (404):
    for key in key_data_json.keys():
        _wrong_key_value = key_data_json.copy()
        _wrong_key_value[key] += '_wrong'
        resp = test_client.delete(url_contents, json=_wrong_key_value)
        assert resp.status_code == 404
        assert 'payload' not in resp.json.keys()
        assert isinstance(resp.json, Dict)
    # Marshmallow tested within test_view_get.

    # delete view instance from db:
    resp = test_client.delete(url_contents, json=key_data_json)
    assert resp.status_code == 200
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json, Dict)

    # Insure view is deleted in db:
    resp = test_client.get(url_contents, json=key_data_json)
    assert resp.status_code == 404
    assert 'payload' not in resp.json.keys()
    assert isinstance(resp.json, Dict)
    # print(resp.json)
    # print(resp.status_code)
