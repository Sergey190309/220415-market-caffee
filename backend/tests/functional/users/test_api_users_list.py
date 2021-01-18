import pytest
from typing import Dict, List
# from time import time

from application.users.models.users import UserModel
# from application.users.models.confirmations import ConfirmationModel


@pytest.fixture
def url_users_list(root_url):
    return root_url + '/users/list'


# @pytest.mark.active
def test_users_list_get_no_token(
        test_client, url_users_list):
    '''
    Wrong - logged admin can access to this info only.
    '''
    _resp = test_client.get(url_users_list)
    assert _resp.status_code == 401
    assert isinstance(_resp.json, Dict)
    assert 'description' in _resp.json.keys()
    assert 'error' in _resp.json.keys()
    assert _resp.json['error'] == 'authorization_required'
    # print(_resp.status_code)
    # print(_resp.json)


# @pytest.mark.active
def test_users_list_get_user(
        test_client, url_users_list,
        access_token, user_instance):
    '''
    Wrong - not enought right.
    '''
    _user = user_instance()
    _user.save_to_db()
    # print(_user)
    _access_token_user = access_token(_user)
    # print(_access_token_user)
    headers = {'Authorization': f"Bearer {_access_token_user}"}
    _resp = test_client.get(url_users_list, headers=headers)
    assert _resp.status_code == 401
    assert isinstance(_resp.json, Dict)
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    _user.delete_fm_db()


# @pytest.mark.active
def test_users_list_get_admin(
        test_client, url_users_list,
        access_token, user_instance):
    '''
    Right
    '''
    _admin = UserModel.find_by_id(1)
    _access_token_admin = access_token(_admin)
    headers = {'Authorization': f"Bearer {_access_token_admin}"}
    _resp = test_client.get(url_users_list, headers=headers)
    assert _resp.status_code == 200
    assert isinstance(_resp.json, Dict)
    assert isinstance(_resp.json['payload'], List)
    assert len(_resp.json['payload']) >= 1
    for _user in _resp.json['payload']:
        # pass
        # assert isinstance(_user, UserModel)
        print(type(_user))
    print(_resp.json['payload'])
