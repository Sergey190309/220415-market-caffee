import pytest
from typing import Dict
from flask import url_for


@pytest.mark.parametrize(
    'lng, test_word, test_word01',
    [
        ('en', 'payload', 'sers'),
        ('ru', 'сообщения', 'ользователя'),
    ]
)
# @pytest.mark.active
def test_userhandle_post_user_own(  # Normal user can update own info but role_id
        client,
        created_user,
        lng, test_word, test_word01,
        access_token):
    _user = created_user('user')

    access_token_passive = access_token(_user)
    headers = {
        'Authorization': f"Bearer {access_token_passive}",
        'Accept-Language': lng
    }

    # User can update remarks:
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'remarks': 'Что-то на кириллице.'},
        headers=headers)
    assert resp.status_code == 200
    assert resp.json['payload']['remarks'] == 'Что-то на кириллице.'
    assert resp.json.get('message').find(test_word) != -1

    # User can update time_zone:
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'time_zone': 11},
        headers=headers)
    assert resp.status_code == 200
    assert resp.json.get('message').find(test_word) != -1
    assert resp.json['payload']['time_zone'] == 11

    # User can update locale:
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'locale_id': 'ru'},
        headers=headers)
    assert resp.status_code == 200
    assert resp.json.get('message').find(test_word) != -1
    assert resp.json['payload']['locale']['id'] == 'ru'

    # User can NOT update role_id:
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'role_id': 'admin'},
        headers=headers)
    assert resp.status_code == 401
    # print('\ntest_userhandle_post_user_own, json ->', resp.json.get('message'))
    assert resp.json.get('message').find(test_word01) != -1

    # User can NOT update any details of other user:
    _other_user = created_user('power_user')
    other_user_headers = {**headers,
                          'Authorization': f"Bearer {access_token(_other_user)}"}
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'remarks': 'Trying update from onther non admin user.'},
        headers=other_user_headers)
    assert resp.status_code == 401
    assert resp.json.get('message').find(test_word01) != -1
    # print('\ntest_userhandle_post_user_own, json ->', resp.json.get('message'))
    assert isinstance(resp.json['message'], str)


@pytest.mark.parametrize(
    'lng, test_word',
    [
        ('en', 'ser'),
        ('ru', 'ользовател'),
    ]
)
# @pytest.mark.active
def test_userhandle_post_admin_role_user_other(  # Normal user cannot update other
    # users' info and own role_id. Admin is not allowed anithing in other users
    # but role_id.
        client,
        created_user,
        lng, test_word,
        access_token):
    _user = created_user(role_id='user')
    _admin = created_user(role_id='admin')

    # Admin can change other roles.
    headers = {
        'Authorization': f"Bearer {access_token(_admin)}", 'Accept-Language': lng}

    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'role_id': 'power_user'},
        headers=headers)
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json['payload']['role']['id'] == 'power_user'
    assert resp.json.get('message').find(test_word) != -1

    # Admin can NOT update other users details above roles.
    resp = client.post(
        url_for('users_bp.userhandle', user_id=_user.id),
        json={'role_id': 'power_user', 'remarks': 'something'},
        headers=headers)
    assert resp.status_code == 401
    assert isinstance(resp.json['message'], str)
    assert resp.json.get('message').find(test_word) != -1

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
    assert resp.json.get('message').find(test_word) != -1


@pytest.mark.parametrize(
    'lng, test_word, test_word01',
    [
        ('en', 'user', 'User'),
        ('ru', 'пользователя', 'Пользовател'),
    ]
)
# @pytest.mark.active
def test_userhandle_get(  # Normal user cannot update other
    # users' info and own role_id. Admin is not allowed anithing in other users
    # but role_id.
        client,
        created_user,
        lng, test_word, test_word01,
        access_token):
    _user = created_user('user')
    _admin = created_user(role_id='admin')
    headers = {'Authorization': f"Bearer {access_token(_user)}", 'Accept-Language': lng}

    # Access to other user. Normal user:
    resp = client.get(
        url_for('users_bp.userhandle', user_id=_user.id - 1),
        headers=headers
    )
    assert resp.status_code == 401
    assert isinstance(resp.json['message'], str)
    assert resp.json.get('message').find(test_word) != -1

    # Access to own details
    resp = client.get(
        url_for('users_bp.userhandle', user_id=_user.id),
        headers=headers
    )
    assert resp.status_code == 200
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json['payload']['id'] == _user.id
    assert resp.json['payload']['role']['id'] == 'user'
    assert resp.json.get('message').find(test_word01) != -1

    # Admin to other account
    admin_headers = {**headers, 'Authorization': f"Bearer {access_token(_admin)}"}
    resp = client.get(
        url_for('users_bp.userhandle', user_id=_user.id),
        headers=admin_headers
    )
    assert resp.status_code == 200
    assert isinstance(resp.json['message'], str)
    assert isinstance(resp.json['payload'], Dict)
    assert resp.json['payload']['id'] == _user.id
    assert resp.json['payload']['role']['id'] == 'user'
    assert resp.json.get('message').find(test_word01) != -1


@pytest.mark.parametrize(
    'lng, test_word, test_word01',
    [
        ('en', 'User', 'Owners'),
        ('ru', 'Пользователь', 'Владельцам'),
    ]
)
# @pytest.mark.active
def test_userhandle_delete(  # Normal user cannot update other
    # users' info and own role_id. Admin is not allowed anithing in other users
    # but role_id.
        client,
        created_user,
        lng, test_word, test_word01,
        access_token):

    _user = created_user(role_id='user')
    _admin = created_user(role_id='admin')

    headers = {'Authorization': f"Bearer {access_token(_user)}", 'Accept-Language': lng}
    admin_headers = {
        'Authorization': f"Bearer {access_token(_admin)}", 'Accept-Language': lng}

    # User trys to remove other user:
    resp = client.delete(
        url_for('users_bp.userhandle', user_id=_admin.id),
        headers=headers)
    assert resp.status_code == 401
    assert isinstance(resp.json['message'], str)
    assert not ('payload' in resp.json.keys())
    assert resp.json.get('message').find(test_word01) != -1

    # Administrator kills other user:
    resp = client.delete(
        url_for('users_bp.userhandle', user_id=_user.id),
        headers=admin_headers
    )
    assert resp.status_code == 200
    assert isinstance(resp.json['message'], str)
    assert not ('payload' in resp.json.keys())
    assert resp.json.get('message').find(test_word) != -1

    # resp_get_user = client.get(url_for('users_bp.userhandle',
    #                                    user_id=_user.id), headers=admin_headers)
    # print('\nuser, json.message ->', resp_get_user.json)

    # resp_get_admin = client.get(url_for('users_bp.userhandle',
    #                                     user_id=_admin.id), headers=admin_headers)
    # print('\nadmin json.message ->', resp_get_admin.json)

    # Admin kills himself
    resp = client.delete(
        url_for('users_bp.userhandle', user_id=_admin.id),
        headers=admin_headers
    )
    # print('\njson.message ->', resp.json.get('message'))
    assert resp.status_code == 200
    assert isinstance(resp.json['message'], str)
    assert not ('payload' in resp.json.keys())
    assert resp.json.get('message').find(test_word) != -1
