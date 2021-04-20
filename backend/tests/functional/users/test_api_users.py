# import pytest
from typing import Dict
from time import time
from flask import url_for

from application.users.models.users import UserModel
from application.users.models.confirmations import ConfirmationModel


# @pytest.mark.active
def test_users_post(client, user_create_json):
    _user_create_json = user_create_json().copy()
    _email = _user_create_json['email']
    _password = _user_create_json['password']
    resp = client.post(url_for('users_bp.user'), json=_user_create_json)
    _user = UserModel.find_by_email(_email)
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
def test_users_get(client, access_token):
    _user = UserModel.find_last()
    params = {'email': _user.email}
    resp = client.get(url_for('users_bp.user', **params))
    assert 'error' in resp.json.keys()
    _access_token = access_token(_user)
    headers = {'Authorization': f"Bearer {_access_token}"}
    resp = client.get(url_for('users_bp.user', **params), headers=headers)

    assert isinstance(resp.json['payload'], Dict)
    assert _user.email == resp.json['payload']['email']
