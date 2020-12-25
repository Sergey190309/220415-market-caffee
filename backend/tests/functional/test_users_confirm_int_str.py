import pytest
from typing import Dict
# from application.users.models.users import UserModel
from application.users.models.confirmations import ConfirmationModel


@pytest.fixture
def url_users_confirm_int(root_url):
    def _method(user_id=None):
        return root_url + f'/users/confirm/{user_id}'
    return _method


@pytest.fixture
def url_users_confirmation_str(root_url):
    def _method(confirmation_id=None):
        return root_url + f'/users/confirmation/{confirmation_id}'
    return _method


@pytest.fixture
def url_users_confirmedbyuser_int(root_url):
    def _method(user_id=None):
        return root_url + f'/users/confirmationbyuser/{user_id}'
    return _method


@pytest.fixture
def access_token():
    def _method(user):
        # print('\n\naccess_token fixture')
        return user.get_tokens()['access_token']
    return _method


# @pytest.mark.active
def test_users_confirm_get(  # Normal user cannot update other
    # users' info and own role_id. Admin is not allowed anithing in other users
    # but role_id.
        test_client,
        created_user,
        access_token,
        url_users_confirm_int):
    # print()
    _user = created_user()
    _power_user = created_user(role_id='power_user')
    headers = {'Authorization': f"Bearer {access_token(_power_user)}"}

    # User confirmaion. Update role_id from None to user:
    resp = test_client.get(
        url_users_confirm_int(_user.id),
        headers=headers
    )
    # print(_user.id, '\t', _user.role_id)
    # print(_power_user.id, '\t', _power_user.role_id)
    assert resp.status_code == 200
    # Attempt to update (confirm) already confirmed user:
    resp = test_client.get(
        url_users_confirm_int(_user.id),
        headers=headers
    )
    assert resp.status_code == 400
    assert isinstance(resp.json['message'], str)
    assert not ('payload' in resp.json.keys())


# @pytest.mark.active
def test_users_confirmation_get(
        test_client, created_user, url_users_confirmation_str):
    # Non existing confirmations.
    resp = test_client.get(url_users_confirmation_str('pooijoijisi'))
    assert resp.status_code == 404
    assert isinstance(resp.json['message'], str)
    # Normal update:
    _user = created_user()
    _confirmation = ConfirmationModel.find_by_user_id(_user.id)
    resp = test_client.get(url_users_confirmation_str(_confirmation.id))
    assert resp.status_code == 200
    # Update already confirmed user:
    _user = created_user(role_id='power_user')
    _confirmation = ConfirmationModel.find_by_user_id(_user.id)
    resp = test_client.get(url_users_confirmation_str(_confirmation.id))
    assert resp.status_code == 400
    assert isinstance(resp.json['message'], str)
    # Expired confirmation:
    _user = created_user()
    _confirmation = ConfirmationModel.find_by_user_id(_user.id)
    _confirmation.force_to_expire()
    resp = test_client.get(url_users_confirmation_str(_confirmation.id))
    assert resp.status_code == 400
    assert isinstance(resp.json['message'], str)

    # print()
    # print(resp.status_code)
    # print(resp.json)


@pytest.mark.active
def test_users_confirmationbyuser_post(
        test_client, created_user, url_users_confirmedbyuser_int):
    _user = created_user('power_user')
    resp = test_client.post(url_users_confirmedbyuser_int(_user.id + 1))
    assert resp.status_code == 404
    assert isinstance(resp.json, Dict)
    assert isinstance(resp.json['message'], str)
    resp = test_client.post(url_users_confirmedbyuser_int(_user.id))
    assert resp.status_code == 400
    assert isinstance(resp.json, Dict)
    assert isinstance(resp.json['message'], str)
    _invalid_user = created_user()
    resp = test_client.post(url_users_confirmedbyuser_int(_invalid_user.id))
    assert resp.status_code == 200
    assert isinstance(resp.json, Dict)
    assert isinstance(resp.json['message'], str)
    # print()
    # print(_user.id)
    # print(resp.status_code)
    # print(resp.json)
