import pytest
from typing import Dict
# from time import time
from flask import url_for

from application.users.models.users import UserModel
from application.users.models.confirmations import ConfirmationModel


@pytest.fixture
def saved_user_instance(client, user_instance) -> UserModel:
    def _method(values: Dict = {}) -> UserModel:
        _saved_user = user_instance(values=values)
        _saved_user.save_to_db()
        yield _saved_user
        if _saved_user.is_exist:
            _saved_user.delete_fm_db()
        yield
    return _method


# @pytest.mark.active
def test_users_post(client, random_email, user_get_schema):

    # create user without email
    _user_create_json = {
        'password': 'qwerty'
    }
    resp = client.post(url_for('users_bp.user'), json=_user_create_json)
    assert resp.status_code == 400
    assert isinstance(resp.json, str)
    assert resp.json.find('email') != -1

    # create user without password
    _user_create_json = {
        'email': random_email()
    }
    resp = client.post(url_for('users_bp.user'), json=_user_create_json)
    assert resp.status_code == 400
    assert isinstance(resp.json, str)
    assert resp.json == 'Password must be non-empty.'

    # Do create user
    _user_create_json = {
        'email': random_email(),
        'password': 'qwerty'
    }

    resp = client.post(url_for('users_bp.user'), json=_user_create_json)
    _email = resp.json.get('payload').get('email')
    assert _email == _user_create_json.get('email')
    assert resp.status_code == 201
    assert isinstance(resp.json.get('message'), str)
    assert resp.json.get('message').find(_email) != -1
    assert isinstance(resp.json.get('payload'), Dict)
    _user = UserModel.find_by_email(_email)
    # _created_user_json = user_schema.dump(_user)
    _created_user_json = user_get_schema.dump(_user)
    assert _created_user_json.get('locale_id', 'nope') == 'en'
    assert _created_user_json.get('created') is not None
    assert _created_user_json.get('email') == _email
    assert _created_user_json.get('time_zone') == 3
    assert _created_user_json.get('role_id', 'nope') is None
    _confirmation = ConfirmationModel.find_by_user_id(_created_user_json.get('id'))
    assert _confirmation is not None
    # print('users, test_api_users, _confirmation ->', _confirmation)


# @pytest.mark.active
@pytest.mark.parametrize(
    'lng, message_word',
    [
        ('en', 'payload'),
        ('ru', 'сообщения')
    ]
)
def test_users_get_success(client, saved_user_instance, user_get_schema,
                           access_token, lng, message_word):

    _user_gen = saved_user_instance({'role_id': 'user'})
    _admin_gen = saved_user_instance({'role_id': 'admin'})
    _user = next(_user_gen)
    _admin = next(_admin_gen)

    # find user by own email, not admin user
    params = {'email': _user.email}
    _access_token = access_token(_user)
    _headers = {
        'Authorization': f'Bearer {_access_token}',
        'Accept-Language': lng
    }
    resp = client.get(url_for('users_bp.user', **params), headers=_headers)
    assert resp.status_code == 200
    assert isinstance(resp.json.get('message'), str)
    assert resp.json.get('message').find(message_word) != -1
    assert isinstance(resp.json.get('payload').get('role'), Dict)
    assert isinstance(resp.json.get('payload').get('locale'), Dict)

    # getting info by admin about other user
    params = {'email': _user.email}
    _access_token = access_token(_admin)
    _headers = {
        'Authorization': f'Bearer {_access_token}',
        'Accept-Language': lng
    }
    resp = client.get(url_for('users_bp.user', **params), headers=_headers)
    assert resp.status_code == 200
    assert isinstance(resp.json.get('message'), str)
    assert resp.json.get('message').find(message_word) != -1
    assert isinstance(resp.json.get('payload').get('role'), Dict)
    assert isinstance(resp.json.get('payload').get('locale'), Dict)
    # print('\ncode ->', resp.status_code)
    # print('json ->', resp.json)

    next(_user_gen)
    next(_admin_gen)


# @pytest.mark.active
@pytest.mark.parametrize(
    'lng, message_word',
    [
        ('en', 'email'),
        ('ru', 'почт')
    ]
)
def test_users_get_fail(client, saved_user_instance, user_get_schema,
                        access_token, lng, message_word):

    _user_gen = saved_user_instance({'role_id': 'user'})
    _admin_gen = saved_user_instance({'role_id': 'admin'})
    _user = next(_user_gen)
    _admin = next(_admin_gen)

    # try to access query without header
    params = {'email': _user.email}
    _headers = {
        'Accept-Language': lng
    }
    resp = client.get(url_for('users_bp.user', **params), headers=_headers)
    assert resp.status_code == 401
    assert resp.json.get('error') == 'authorization_required'

    # try to find other user info not admin user
    params = {'email': _admin.email}
    _access_token = access_token(_user)
    _headers = {
        'Authorization': f'Bearer {_access_token}',
        'Accept-Language': lng
    }
    resp = client.get(url_for('users_bp.user', **params), headers=_headers)
    assert resp.status_code == 401
    assert isinstance(resp.json.get('message'), str)
    assert 'payload' not in resp.json.keys()
    assert resp.json.get('message').find(message_word) != -1

    # Try to find account with wrong email
    params = {'email': 'wrong@r.mail'}
    _access_token = access_token(_admin)
    _headers = {
        'Authorization': f'Bearer {_access_token}',
        'Accept-Language': lng
    }
    resp = client.get(url_for('users_bp.user', **params), headers=_headers)
    assert resp.status_code == 404
    assert isinstance(resp.json.get('message'), str)
    assert 'payload' not in resp.json.keys()
    assert resp.json.get('message').find(message_word) != -1
    # print('\ncode ->', resp.status_code)
    # print('json ->', resp.json)

    next(_user_gen)
    next(_admin_gen)
