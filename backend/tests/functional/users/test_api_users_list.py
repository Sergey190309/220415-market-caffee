# import pytest
from typing import Dict, List
from flask import url_for

from application.users.models.users import UserModel


# @pytest.mark.active
def test_users_list_get_no_token(
        client):
    '''
    Wrong - logged admin can access to this info only.
    '''
    _resp = client.get(url_for('users_bp.userlist'))
    assert _resp.status_code == 401
    assert isinstance(_resp.json, Dict)
    assert 'description' in _resp.json.keys()
    assert 'error' in _resp.json.keys()
    assert _resp.json['error'] == 'authorization_required'


# @pytest.mark.active
def test_users_list_get_user(
        client,
        access_token, user_instance):
    '''
    Wrong - not enought right.
    '''
    _user = user_instance()
    _user.save_to_db()
    _access_token_user = access_token(_user)
    headers = {'Authorization': f"Bearer {_access_token_user}"}
    _resp = client.get(url_for('users_bp.userlist'), headers=headers)
    assert _resp.status_code == 401
    assert isinstance(_resp.json, Dict)
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    _user.delete_fm_db()


# @pytest.mark.active
def test_users_list_get_admin(
        client,
        access_token, user_instance):
    '''
    Right
    '''
    _admin = UserModel.find_by_id(1)
    _access_token_admin = access_token(_admin)
    headers = {'Authorization': f"Bearer {_access_token_admin}"}
    _resp = client.get(url_for('users_bp.userlist'), headers=headers)
    assert _resp.status_code == 200
    assert isinstance(_resp.json, Dict)
    assert isinstance(_resp.json['payload'], List)
    assert len(_resp.json['payload']) >= 1
    for _user in _resp.json['payload']:
        assert isinstance(_user, Dict)
