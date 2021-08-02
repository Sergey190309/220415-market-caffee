import pytest
import os
import io
from uuid import uuid4
from typing import (Dict)
from flask import url_for
from flask_jwt_extended import create_access_token


@pytest.fixture
def images_api_resp(client):
    def _method(params: Dict = {}, headers: Dict = {}, data: Dict = {}):
        # print('\nfixture, images_api_resp, data ->', data)
        resp = client.post(url_for('images_bp.imageshandling', **params),
                           data=data, headers=headers)
        return resp
    return _method


@pytest.fixture
def access_token(user_instance, access_token,):
    def _method(role: str = ''):
        _user = user_instance(values={'role_id': role})  # user admin
        _user.save_to_db()
        _access_token = access_token(_user)
        return _access_token
    return _method


@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'Sorry', 'Request does not contain an access token'),
        ('ru', 'Извиняйте', 'Запрос не содержит жетона доступа')
    ]
)
# @pytest.mark.active
def test_images_post_no_auth_or_user(
    images_api_resp,
    access_token,
    lng, test_word, test_word_01
):
    _headers = {'Content-Type': 'multipart/form-data',
                'Authorization': f'Bearer {access_token("user")}',
                'Accept-Language': lng}
    _params = {'view_id': 'landing', 'image_id': '01_vblock_pix_001'}

    resp = images_api_resp(params=_params, headers=_headers)
    assert resp.status_code == 401
    assert 'message' in resp.json.keys()
    assert resp.json.get('message').find(test_word) != -1

    _headers.pop('Authorization')
    resp = images_api_resp(params=_params, headers=_headers)
    assert resp.status_code == 401
    assert 'description' in resp.json.keys()
    assert resp.json.get('description').find(test_word_01) != -1
    # print('\ntest_images_post, resp ->\n', resp.status_code)
    # print('test_images_post, resp ->\n', resp.json)


@pytest.mark.parametrize(
    'lng, test_word',
    [
        ('en', 'Image for view'),
        ('ru', 'Картинка для странички')
    ]
)
# @pytest.mark.active
def test_images_post_success(
    client,
    images_api_resp,
    access_token,
    lng, test_word
):
    image_id = '01_vblock_pix_001'
    view_id = 'testing'
    path_name = (f'./application/images/static/images/for_{view_id}/'
                 f'{image_id}.jpg')
    if os.path.exists(path_name):
        os.remove(path_name)
    _data = {'image': (io.BytesIO(b"abcdef"), 'test.jpg')}
    _headers = {'Content-Type': 'multipart/form-data',
                'Authorization': f'Bearer {access_token("admin")}',
                'Accept-Language': lng}
    _params = {'view_id': view_id, 'image_id': image_id}

    resp = images_api_resp(params=_params, headers=_headers, data=_data)
    assert resp.status_code == 201
    assert 'message' in resp.json.keys()
    assert resp.json.get('message').find(test_word) != -1
    assert os.path.exists(path_name)

    if os.path.exists(path_name):
        os.remove(path_name)

    # print('\ntest_images_post_success, resp ->', resp.status_code)
    # print('test_images_post_success, resp ->', resp.json)


@pytest.mark.parametrize(
    'lng, test_word',
    [
        ('en', 'A picture for view'),
        ('ru', 'Картинка для странички')
    ]
)
# @pytest.mark.active
def test_images_post_already_exists(
    images_api_resp,
    access_token,
    lng, test_word
):
    image_id = '01_vblock_pix_001'
    view_id = 'testing'
    path_name = (f'./application/images/static/images/for_{view_id}/'
                 f'{image_id}.jpg')
    if not os.path.exists(path_name):
        if not os.path.exists(os.path.dirname(path_name)):
            os.mkdir(os.path.dirname(path_name))
        pix = open(path_name, 'w')
        pix.close()
    _data = {'image': (io.BytesIO(b"abcdef"), 'test.jpg')}
    _headers = {'Content-Type': 'multipart/form-data',
                'Authorization': f'Bearer {access_token("admin")}',
                'Accept-Language': lng}
    _params = {'view_id': view_id, 'image_id': image_id}

    resp = images_api_resp(params=_params, headers=_headers, data=_data)
    assert resp.status_code == 400
    assert 'message' in resp.json.keys()
    assert resp.json.get('message').find(test_word) != -1

    if os.path.exists(path_name):
        os.remove(path_name)


@pytest.mark.parametrize(
    'lng, test_word, test_word_01, test_word_02',
    [
        ('en', 'Sorry but', 'A picture for page', 'Request does not contain'),
        ('ru', 'Извиняйте, но', 'Картинка для странички', 'Запрос не содержит')
    ]
)
# @pytest.mark.active
def test_image_get(
    client,
    access_token, sessions,
    lng, test_word, test_word_01, test_word_02
):
    '''All possibilities are tested here.'''
    image_id = '01_vblock_pix_001'
    view_id = 'testing'
    path_name = (f'./application/images/static/images/for_{view_id}/'
                 f'{image_id}.jpg')
    if not os.path.exists(path_name):
        if not os.path.exists(os.path.dirname(path_name)):
            os.mkdir(os.path.dirname(path_name))
        pix = open(path_name, 'w')
        pix.close()

    _uuid = uuid4()
    sessions.setter(str(_uuid))
    _tech_token = create_access_token(_uuid, expires_delta=False)

    '''success'''
    _headers = {'Authorization': f'Bearer {_tech_token}',
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _params = {'view_id': view_id, 'image_id': image_id}
    resp = client.get(url_for('images_bp.imageshandling', **_params), headers=_headers)
    assert resp.status_code == 200

    '''illigal chracters'''
    _params = {'view_id': '_illigal_view_id', 'image_id': image_id}
    resp = client.get(url_for('images_bp.imageshandling', **_params), headers=_headers)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_word) != -1

    _params = {'view_id': view_id, 'image_id': '_illigal_image_id'}
    resp = client.get(url_for('images_bp.imageshandling', **_params), headers=_headers)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_word) != -1

    '''not found'''
    _params = {'view_id': 'wrong_view_id', 'image_id': image_id}
    resp = client.get(url_for('images_bp.imageshandling', **_params), headers=_headers)
    assert resp.status_code == 404
    assert resp.json.get('message').find(test_word_01) != -1

    _params = {'view_id': view_id, 'image_id': 'wrong_image_id'}
    resp = client.get(url_for('images_bp.imageshandling', **_params), headers=_headers)
    assert resp.status_code == 404
    assert resp.json.get('message').find(test_word_01) != -1

    '''no token'''
    _params = {'view_id': view_id, 'image_id': image_id}
    _headers.pop('Authorization')
    resp = client.get(url_for('images_bp.imageshandling', **_params), headers=_headers)
    assert resp.status_code == 401
    assert resp.json.get('description').find(test_word_02) != -1
    # print('\ntest_images_get, resp ->', resp.status_code)
    # print('test_images_get, resp ->', resp.json)
    if os.path.exists(path_name):
        os.remove(path_name)


@pytest.mark.parametrize(
    'lng, test_word, test_word_01, test_word_02',
    [
        ('en', 'A picture for', 'Sorry', 'Request'),
        ('ru', 'Картинка для', 'Извиняйте', 'Запрос')
    ]
)
# @pytest.mark.active
def test_images_put(
    client,
    access_token,
    lng, test_word, test_word_01, test_word_02
):
    image_id = '01_vblock_pix_001'
    view_id = 'testing'
    path_name = (f'./application/images/static/images/for_{view_id}/'
                 f'{image_id}.jpg')
    _headers = {'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token("admin")}',
                'Accept-Language': lng}
    _json = {'view_id': view_id, 'image_id': image_id}

    '''does not exists, actually success couse it's possible to post other image'''
    if not os.path.exists(os.path.dirname(path_name)):
        os.mkdir(os.path.dirname(path_name))
    else:
        if os.path.exists(path_name):
            os.remove(path_name)
    resp = client.put(url_for('images_bp.imageshandling'), headers=_headers, json=_json)
    assert resp.status_code == 404
    assert resp.json.get('message').find(test_word) != -1

    '''exists, so to post new image, first previous one should be deleted'''
    if not os.path.exists(path_name):
        pix = open(path_name, 'w')
        pix.close()
    resp = client.put(url_for('images_bp.imageshandling'), headers=_headers, json=_json)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_word) != -1

    '''not admin'''
    _headers['Authorization'] = f'Bearer {access_token("user")}'

    resp = client.put(url_for('images_bp.imageshandling'), headers=_headers, json=_json)
    assert resp.status_code == 401
    assert resp.json.get('message').find(test_word_01) != -1

    '''no token'''
    _headers.pop('Authorization')

    resp = client.put(url_for('images_bp.imageshandling'), headers=_headers, json=_json)
    assert resp.status_code == 401
    assert resp.json.get('description').find(test_word_02) != -1

    if os.path.exists(path_name):
        os.remove(path_name)


@pytest.mark.parametrize(
    'lng, test_word, test_word_01, test_word_02, test_word_03',
    [
        ('en', 'An image for view', 'Sorry',
         'A picture for page', 'Request does not contain'),
        ('ru', 'Картинка для странички', 'Извиняйте',
         'Картинка для странички', 'Запрос не содержит')
    ]
)
@pytest.mark.active
def test_images_delete(
    client,
    access_token,
    lng, test_word, test_word_01, test_word_02, test_word_03
):
    image_id = '01_vblock_pix_001'
    view_id = 'testing'
    path_name = (f'./application/images/static/images/for_{view_id}/'
                 f'{image_id}.jpg')
    _headers = {'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token("admin")}',
                'Accept-Language': lng}
    _params = {'view_id': view_id, 'image_id': image_id}

    if not os.path.exists(path_name):
        if not os.path.exists(os.path.dirname(path_name)):
            os.mkdir(os.path.dirname(path_name))
        pix = open(path_name, 'w')
        pix.close()

    '''success'''
    # print('\ntest_images_put, path_name ->', path_name)
    # print('\ntest_images_put, path_name ->', os.path.exists(path_name))
    resp = client.delete(url_for('images_bp.imageshandling', **_params),
                         headers=_headers)
    assert resp.status_code == 200
    assert resp.json.get('message').find(test_word) != -1

    '''illigal chracters'''
    _params = {'view_id': '_illigal_view_id', 'image_id': image_id}
    resp = client.delete(url_for('images_bp.imageshandling', **_params),
                         headers=_headers)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_word_01) != -1

    _params = {'view_id': view_id, 'image_id': '_illigal_image_id'}
    resp = client.delete(url_for('images_bp.imageshandling', **_params),
                         headers=_headers)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_word_01) != -1

    '''not found'''
    _params = {'view_id': view_id, 'image_id': image_id}
    resp = client.delete(url_for('images_bp.imageshandling', **_params),
                         headers=_headers)
    assert resp.status_code == 404
    assert resp.json.get('message').find(test_word_02) != -1

    '''not admin'''
    _headers['Authorization'] = f'Bearer {access_token("user")}'
    resp = client.delete(url_for('images_bp.imageshandling', **_params),
                         headers=_headers)
    assert resp.status_code == 401
    assert resp.json.get('message').find(test_word_01) != -1

    '''no token'''
    _headers.pop('Authorization')
    resp = client.delete(url_for('images_bp.imageshandling', **_params),
                         headers=_headers)
    assert resp.status_code == 401
    assert resp.json.get('description').find(test_word_03) != -1
    # print('\ntest_images_put, resp ->', resp.status_code)
    # print('test_images_put, resp ->', resp.json)
