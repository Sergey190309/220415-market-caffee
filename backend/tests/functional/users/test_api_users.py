import pytest
from typing import Dict
from time import time

from application.users.models.users import UserModel
# from application.users.schemas.users import user_schema
from application.users.models.confirmations import ConfirmationModel


@pytest.fixture
def url_users(root_url):
    # def _method(user_id=None):
    return root_url + '/users'
    # return _method

# @pytest.fixture


# @pytest.mark.active
def test_users_post(test_client, url_users, user_create_json):
    # print()
    _user_create_json = user_create_json().copy()
    _email = _user_create_json['email']
    _password = _user_create_json['password']
    # print('email -', _user_create_json['email'])
    # print('email -', _email)
    resp = test_client.post(url_users, json=_user_create_json)
    _user = UserModel.find_by_email(_email)
    # print()
    # print('test')
    assert resp.status_code == 201
    assert isinstance(resp.json['message'], str)
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json['payload']['email'] == _email
    assert _user.email == _email
    assert resp.json['payload']['created'] is not None
    assert _user.created is not None
    assert _user.check_password(_password)

    _confirmation = ConfirmationModel.find_by_user_id(_user.id)

    assert _confirmation.id is not None
    assert _confirmation.expire_at - int(time()) <= 1800
    assert _confirmation.user_id == _user.id
    assert not _confirmation.confirmed


# @pytest.mark.active
def test_users_get(test_client, url_users, access_token):
    _user = UserModel.find_last()
    resp = test_client.get(url_users, json={'email': _user.email})
    assert 'error' in resp.json.keys()
    _access_token = access_token(_user)
    headers = {'Authorization': f"Bearer {_access_token}"}
    resp = test_client.get(url_users, json={'email': _user.email}, headers=headers)
    assert isinstance(resp.json['payload'], Dict)
    assert _user.email == resp.json['payload']['email']
    # print(user_schema.dump(_user))
    # print(resp.json)
