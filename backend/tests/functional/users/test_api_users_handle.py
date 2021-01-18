import pytest
from typing import Dict
# from application.users.models.users import UserModel


@pytest.fixture
def url_usershandle(root_url):
    def _method(user_id=None):
        return root_url + f'/users/handle/{user_id}'
    return _method


# @pytest.mark.active
def test_userhandle_post_user_own(  # Normal user can update own info but role_id
        test_client,
        created_user,
        access_token,
        url_usershandle):
    _user = created_user('user')

    # print()
    access_token_passive = access_token(_user)
    headers = {'Authorization': f"Bearer {access_token_passive}"}
    # print(headers)
    # User can update remarks:
    resp = test_client.post(
        url_usershandle(_user.id),
        json={'remarks': 'Что-то на кириллице.'},
        headers=headers)
    assert resp.status_code == 200
    assert resp.json['payload']['remarks'] == 'Что-то на кириллице.'
    # User can update time_zone:
    resp = test_client.post(
        url_usershandle(_user.id),
        json={'time_zone': 11},
        headers=headers)
    assert resp.status_code == 200
    assert resp.json['payload']['time_zone'] == 11
    # User can update locale:
    resp = test_client.post(
        url_usershandle(_user.id),
        json={'locale_id': 'ru'},
        headers=headers)
    assert resp.status_code == 200
    assert resp.json['payload']['locale']['id'] == 'ru'
    # User can NOT update role_id:
    resp = test_client.post(
        url_usershandle(_user.id),
        json={'role_id': 'admin'},
        headers=headers)
    assert resp.status_code == 401
    # User can NOT update any details of other user:
    _other_user = created_user('power_user')
    headers = {'Authorization': f"Bearer {access_token(_other_user)}"}
    resp = test_client.post(
        url_usershandle(_user.id),
        json={'remarks': 'Trying update from onther non admin user.'},
        headers=headers)
    assert resp.status_code == 401
    assert isinstance(resp.json['message'], str)

    # Users can Not update even roles that allowd for admin


# @pytest.mark.active
def test_userhandle_post_admin_role_user_other(  # Normal user cannot update other
    # users' info and own role_id. Admin is not allowed anithing in other users
    # but role_id.
        test_client,
        created_user,
        access_token,
        url_usershandle
):
    # print()
    _user = created_user(role_id='user')
    _admin = created_user(role_id='admin')
    # print(_user.id, '\t', _user.role_id)
    # print(_admin.id, '\t', _admin.role_id)

    # Admin can change other roles.
    headers = {'Authorization': f"Bearer {access_token(_admin)}"}

    resp = test_client.post(
        url_usershandle(_user.id),
        json={'role_id': 'power_user'},
        headers=headers)
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json['payload']['role']['id'] == 'power_user'
    # Admin can NOT update other users details above roles.
    resp = test_client.post(
        url_usershandle(_user.id),
        json={'role_id': 'power_user', 'remarks': 'something'},
        headers=headers)
    assert resp.status_code == 401
    assert isinstance(resp.json['message'], str)
    # Admin can update own role as well.
    resp = test_client.post(
        url_usershandle(_admin.id),
        json={'role_id': 'power_user', 'remarks': 'something'},
        headers=headers)
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json['payload']['role']['id'] == 'power_user'
    assert resp.json['payload']['remarks'] == 'something'


# @pytest.mark.active
def test_userhandle_get(  # Normal user cannot update other
    # users' info and own role_id. Admin is not allowed anithing in other users
    # but role_id.
        test_client,
        created_user,
        access_token,
        url_usershandle
):
    print()
    _user = created_user('user')
    _admin = created_user(role_id='admin')
    headers = {'Authorization': f"Bearer {access_token(_user)}"}

    # Access to other user. Normal user:
    resp = test_client.get(
        url_usershandle(_user.id - 1),
        headers=headers
    )
    assert resp.status_code == 401
    assert isinstance(resp.json['message'], str)
    # Access to own details
    resp = test_client.get(
        url_usershandle(_user.id),
        headers=headers
    )
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json['payload']['id'] == _user.id
    assert resp.json['payload']['role']['id'] == 'user'
    # Admin to other account
    headers = {'Authorization': f"Bearer {access_token(_admin)}"}
    resp = test_client.get(
        url_usershandle(_user.id),
        headers=headers
    )
    assert resp.status_code == 200
    assert isinstance(resp.json['message'], str)
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json['payload']['id'] == _user.id
    assert resp.json['payload']['role']['id'] == 'user'
    # print(_user.id, '\t', _user.role_id)
    # print(_admin.id, '\t', _admin.role_id)
    # print(resp.status_code)
    # print(resp.json)


# @pytest.mark.active
def test_userhandle_delete(  # Normal user cannot update other
    # users' info and own role_id. Admin is not allowed anithing in other users
    # but role_id.
        test_client,
        created_user,
        access_token,
        url_usershandle
):
    # print()
    _user = created_user(role_id='user')
    _admin = created_user(role_id='admin')
    # _power_user = created_user(role_id='power_user')
    # print(_user.id, '\t', _user.role_id)
    # print(_admin.id, '\t', _admin.role_id)

    # User trys to remove other user:
    headers = {'Authorization': f"Bearer {access_token(_user)}"}
    resp = test_client.delete(
        url_usershandle(_admin.id),
        headers=headers
    )
    assert resp.status_code == 401
    assert isinstance(resp.json['message'], str)
    assert not ('payload' in resp.json.keys())

    # Administrator trys to kill ohter user:
    headers = {'Authorization': f"Bearer {access_token(_admin)}"}
    resp = test_client.delete(
        url_usershandle(_user.id),
        headers=headers
    )
    assert resp.status_code == 200
    assert isinstance(resp.json['message'], str)
    assert not ('payload' in resp.json.keys())

    # Admin kills himself
    resp = test_client.delete(
        url_usershandle(_admin.id),
        headers=headers
    )
    assert resp.status_code == 200
    assert isinstance(resp.json['message'], str)
    assert not ('payload' in resp.json.keys())

    # assert resp.status_code == 200
    # assert isinstance(resp.json['payload'], Dict)
    # assert resp.json['payload']['id'] == _user.id
    # assert resp.json['payload']['role']['id'] == 'user'
    # # Attempt to update already confirmed user:
    # resp = test_client.delete(
    #     url_usershandle(_user.id),
    #     headers=headers
    # )
    # assert resp.status_code == 400
    # assert isinstance(resp.json['message'], str)
    # assert not ('payload' in resp.json.keys())
