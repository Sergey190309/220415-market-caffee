# import pytest
from typing import Dict
from flask import url_for


# @pytest.mark.active
def test_userhandle_post_user_own(  # Normal user can update own info but role_id
        client,
        created_user,
        access_token):
    _user = created_user('user')

    access_token_passive = access_token(_user)
    headers = {'Authorization': f"Bearer {access_token_passive}"}

    # User can update remarks:
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'remarks': 'Что-то на кириллице.'},
        headers=headers)
    assert resp.status_code == 200
    assert resp.json['payload']['remarks'] == 'Что-то на кириллице.'

    # User can update time_zone:
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'time_zone': 11},
        headers=headers)
    assert resp.status_code == 200
    assert resp.json['payload']['time_zone'] == 11

    # User can update locale:
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'locale_id': 'ru'},
        headers=headers)
    assert resp.status_code == 200
    assert resp.json['payload']['locale']['id'] == 'ru'

    # User can NOT update role_id:
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'role_id': 'admin'},
        headers=headers)
    assert resp.status_code == 401

    # User can NOT update any details of other user:
    _other_user = created_user('power_user')
    headers = {'Authorization': f"Bearer {access_token(_other_user)}"}
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'remarks': 'Trying update from onther non admin user.'},
        headers=headers)
    assert resp.status_code == 401
    assert isinstance(resp.json['message'], str)


# @pytest.mark.active
def test_userhandle_post_admin_role_user_other(  # Normal user cannot update other
    # users' info and own role_id. Admin is not allowed anithing in other users
    # but role_id.
        client,
        created_user,
        access_token):
    _user = created_user(role_id='user')
    _admin = created_user(role_id='admin')

    # Admin can change other roles.
    headers = {'Authorization': f"Bearer {access_token(_admin)}"}

    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'role_id': 'power_user'},
        headers=headers)
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json['payload']['role']['id'] == 'power_user'

    # Admin can NOT update other users details above roles.
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'role_id': 'power_user', 'remarks': 'something'},
        headers=headers)
    # print('\ntest_userhandle_post_admin_role_user_other, admin other'
    #       ' remark update resp.json ->', resp.json)
    assert resp.status_code == 401
    assert isinstance(resp.json['message'], str)

    # Admin can update own role as well.
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_admin.id),
        json={'role_id': 'power_user', 'remarks': 'something'},
        # json={'role_id': 'power_user', 'remarks': 'something'},
        headers=headers)
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json['payload']['role']['id'] == 'power_user'
    assert resp.json['payload']['remarks'] == 'something'


# @pytest.mark.active
def test_userhandle_get(  # Normal user cannot update other
    # users' info and own role_id. Admin is not allowed anithing in other users
    # but role_id.
        client,
        created_user,
        access_token):
    _user = created_user('user')
    _admin = created_user(role_id='admin')
    headers = {'Authorization': f"Bearer {access_token(_user)}"}

    # Access to other user. Normal user:
    resp = client.get(
        url_for('users_bp.userhandle', user_id=_user.id - 1),
        headers=headers
    )
    assert resp.status_code == 401
    assert isinstance(resp.json['message'], str)

    # Access to own details
    resp = client.get(
        url_for('users_bp.userhandle', user_id=_user.id),
        headers=headers
    )
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json['payload']['id'] == _user.id
    assert resp.json['payload']['role']['id'] == 'user'

    # Admin to other account
    headers = {'Authorization': f"Bearer {access_token(_admin)}"}
    resp = client.get(
        url_for('users_bp.userhandle', user_id=_user.id),
        headers=headers
    )
    assert resp.status_code == 200
    assert isinstance(resp.json['message'], str)
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json['payload']['id'] == _user.id
    assert resp.json['payload']['role']['id'] == 'user'


# @pytest.mark.active
def test_userhandle_delete(  # Normal user cannot update other
    # users' info and own role_id. Admin is not allowed anithing in other users
    # but role_id.
        client,
        created_user,
        access_token):

    _user = created_user(role_id='user')
    _admin = created_user(role_id='admin')

    # User trys to remove other user:
    headers = {'Authorization': f"Bearer {access_token(_user)}"}
    resp = client.delete(
        url_for('users_bp.userhandle', user_id=_admin.id),
        headers=headers)
    assert resp.status_code == 401
    assert isinstance(resp.json['message'], str)
    assert not ('payload' in resp.json.keys())

    # Administrator trys to kill ohter user:
    headers = {'Authorization': f"Bearer {access_token(_admin)}"}
    resp = client.delete(
        url_for('users_bp.userhandle', user_id=_user.id),
        headers=headers
    )
    assert resp.status_code == 200
    assert isinstance(resp.json['message'], str)
    assert not ('payload' in resp.json.keys())

    # Admin kills himself
    resp = client.delete(
        url_for('users_bp.userhandle', user_id=_admin.id),
        headers=headers
    )
    assert resp.status_code == 200
    assert isinstance(resp.json['message'], str)
    assert not ('payload' in resp.json.keys())
