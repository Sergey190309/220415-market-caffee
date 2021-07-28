import pytest
from typing import (Dict)
from flask import url_for


@pytest.fixture
def images_api_resp(client):
    def _method(params: Dict = {}, headers: Dict = {}):
        resp = client.post(url_for('images_bp.imageshandling', **params),
                           headers=headers)
        return resp
    return _method


@pytest.fixture
def admin_access_token(user_instance, access_token,):
    _admin = user_instance(values={'role_id': 'admin'})  # user admin
    _admin.save_to_db()
    _access_token = access_token(_admin)
    return _access_token


@pytest.fixture
def user_access_token(user_instance, access_token,):
    _admin = user_instance(values={'role_id': 'user'})  # user admin
    _admin.save_to_db()
    _access_token = access_token(_admin)
    return _access_token


@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'structure', 'Something went wrong.'),
        ('ru', 'труктур', 'Что-то пошло не так.')
    ]
)
# @pytest.mark.active
def test_images_post_no_auth(
    images_api_resp,
    # admin_access_token,
    lng, test_word, test_word_01
):
    _headers = {'Content-Type': 'multipart/form-data',
                'Accept-Language': lng}
    _params = {'view_id': 'landing', 'image_id': '01_vblock_pix_001'}

    resp = images_api_resp(params=_params, headers=_headers)
    print('\ntest_images_post, resp ->', resp.status_code)
    print('\ntest_images_post, resp ->', resp.json)


# @pytest.mark.active
def est_images_post_user(
    images_api_resp,
    user_access_token,
    lng, test_word, test_word_01
):
    _headers = {'Authorization': f'Bearer {user_access_token}',
                'Accept-Language': lng}
    _params = {'view_id': 'landing', 'image_id': '01_vblock_pix_001'}

    resp = images_api_resp(params=_params, headers=_headers)
    print('\ntest_images_post, resp ->', resp.status_code)
    print('\ntest_images_post, resp ->', resp.json)
