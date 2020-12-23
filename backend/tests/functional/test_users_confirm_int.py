import pytest
# from typing import Dict
# from application.users.models.users import UserModel


@pytest.fixture
def url_usersconfirm(root_url):
    def _method(user_id=None):
        return root_url + f'/users/confirm/{user_id}'
    return _method


@pytest.fixture
def access_token():
    def _method(user):
        # print('\n\naccess_token fixture')
        return user.get_tokens()['access_token']
    return _method


# @pytest.mark.active
def test_userhandle_get(  # Normal user cannot update other
    # users' info and own role_id. Admin is not allowed anithing in other users
    # but role_id.
        test_client,
        created_user,
        access_token,
        url_usersconfirm
):
    # print()
    _user = created_user()
    _power_user = created_user(role_id='power_user')
    headers = {'Authorization': f"Bearer {access_token(_power_user)}"}

    # User confirmaion. Update role_id from None to user:
    resp = test_client.get(
        url_usersconfirm(_user.id),
        headers=headers
    )
    # print(_user.id, '\t', _user.role_id)
    # print(_power_user.id, '\t', _power_user.role_id)
    assert resp.status_code == 200
    # assert isinstance(resp.json['payload'], Dict)
    # assert resp.json['payload']['id'] == _user.id
    # assert resp.json['payload']['role']['id'] == 'user'
    # Attempt to update already confirmed user:
    resp = test_client.get(
        url_usersconfirm(_user.id),
        headers=headers
    )
    assert resp.status_code == 400
    assert isinstance(resp.json['message'], str)
    assert not ('payload' in resp.json.keys())
