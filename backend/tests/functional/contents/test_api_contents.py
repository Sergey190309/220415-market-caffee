from typing import Dict, List

import pytest

from application.contents.local_init_data_contents import contents_constants
from application.global_init_data import global_constants


@pytest.fixture(scope='session')
def url_contents(root_url):
    return root_url + '/contents'


# @pytest.fixture(scope='session')
# def langs():
#     return [item['id'] for item in global_constants.get_LOCALES]


# @pytest.fixture(scope='session')
# def views():
#     return [item['id_view'] for item in contents_constants.get_VIEWS]


# @pytest.fixture(scope='module', autouse=True)
def pytest_generate_tests(metafunc):
    # def pytest_generate_tests(metafunc, langs, views):
    '''
    Paramentrization.
    '''
    if 'lang' in metafunc.fixturenames:
        metafunc.parametrize(
            # 'lang', [item['id'] for item in global_constants.get_LOCALES])
            'lang', ['en'])
    if 'view' in metafunc.fixturenames:
        metafunc.parametrize(
            # 'view', [item['id_view'] for item in contents_constants.get_VIEWS])
            'view', ['main'])


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
@pytest.fixture
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
    # print('api resp -', content_json)
    resp = test_client.post(url_contents, json=content_json)
    assert resp.status_code == 201
    assert isinstance(resp.json['payload'], Dict)
    assert isinstance(resp.json['payload']['view'], Dict)
    assert isinstance(resp.json['payload']['locale'], Dict)
    # print('api_resp -', resp.json)
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
# def test_contents_post_create_other_instances():
#     '''
#     '''
#     print(resp.status_code)
#     print(resp.json)


# # @pytest.mark.active
# def test_view_get(
#         test_client, url_view, original_key_data):
#     # Find data with normal set of keys:
#     resp = test_client.get(url_view, json=original_key_data)
#     assert resp.status_code == 200
#     assert 'payload' in resp.json.keys()
#     assert isinstance(resp.json['payload'], Dict)

#     # Try to find data with wrong value (404):
#     for key in original_key_data.keys():
#         _key_data = original_key_data.copy()
#         _key_data['id_view'] += '_wrong'
#         resp = test_client.get(url_view, json=_key_data)
#         assert resp.status_code == 404
#         assert 'payload' not in resp.json.keys()

#     # Try to find data with wrong key (marshmallow error):
#     for key in original_key_data.keys():
#         _key = key + '_wrong'
#         _key_data = original_key_data.copy()
#         _key_data[_key] = _key_data.pop(key)
#         resp = test_client.get(url_view, json=_key_data)
#         assert resp.status_code == 400
#         # print(resp.json)
#         # print(resp.status_code)


# # @pytest.mark.active
# def test_view_put(
#         test_client, url_view,
#         original_data, original_key_data, original_value_data):
#     # Find and update data with normal set of keys:
#     for key in original_value_data.keys():
#         _corrected_data = original_data.copy()
#         _corrected_data[key] += ' !corrected!'
#         resp = test_client.put(url_view, json=_corrected_data)
#         assert resp.status_code == 200
#         assert 'payload' in resp.json.keys()
#         assert isinstance(resp.json['payload'], Dict)
#         for resp_key in resp.json['payload'].keys():
#             assert _corrected_data[resp_key] == resp.json['payload'][resp_key]

#     # Try to find view with wrong value (404):
#     for key in original_key_data.keys():
#         _wrong_key_value = original_key_data.copy()
#         _wrong_key_value[key] += '_wrong'
#         resp = test_client.put(url_view, json=_wrong_key_value)
#         assert resp.status_code == 404
#         assert 'payload' not in resp.json.keys()

#     # Marshmallow tested within test_view_get.


# @pytest.mark.active
# def test_view_delete(
#         test_client, url_view,
#         original_key_data):
#     # Insure view is exist in db:
#     resp = test_client.get(url_view, json=original_key_data)
#     assert resp.status_code == 200
#     assert 'payload' in resp.json.keys()
#     assert isinstance(resp.json['payload'], Dict)
#     # Try to find view with wrong value (404):
#     for key in original_key_data.keys():
#         _wrong_key_value = original_key_data.copy()
#         _wrong_key_value[key] += '_wrong'
#         resp = test_client.delete(url_view, json=_wrong_key_value)
#         assert resp.status_code == 404
#         assert 'payload' not in resp.json.keys()
#     # Marshmallow tested within test_view_get.

#     # delete view instance from db:
#     resp = test_client.delete(url_view, json=original_key_data)
#     assert resp.status_code == 200
#     assert 'payload' not in resp.json.keys()

#     # Insure view is deleted in db:
#     resp = test_client.get(url_view, json=original_key_data)
#     assert resp.status_code == 404
#     assert 'payload' not in resp.json.keys()
#     # print(resp.json)
#     # print(resp.status_code)
