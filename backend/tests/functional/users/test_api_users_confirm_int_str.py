# import pytest
from typing import Dict
from flask import url_for
# from application.users.models.users import UserModel
from application.users.models.confirmations import ConfirmationModel


# @pytest.fixture
# def access_token():
#     def _method(user):
#         # print('\n\naccess_token fixture')
#         return user.get_tokens()['access_token']
#     return _method


# @pytest.mark.active
def test_users_confirm_get(  # Normal user cannot update other
    # users' info and own role_id. Admin is not allowed anithing in other users
    # but role_id.
        client,
        created_user,
        access_token):
    # print('\ntest_users_confirm_get, url_for ->',
    #       url_for('users_bp.userconfirm', user_id=1))
    _user = created_user()
    _power_user = created_user(role_id='power_user')
    headers = {'Authorization': f"Bearer {access_token(_power_user)}"}

    # User confirmaion. Update role_id from None to user:
    resp = client.get(
        url_for('users_bp.userconfirm', user_id=_user.id),
        headers=headers
    )
    assert resp.status_code == 200

    # Attempt to update (confirm) already confirmed user:
    resp = client.get(url_for('users_bp.userconfirm', user_id=_user.id), headers=headers)
    assert resp.status_code == 400
    assert isinstance(resp.json['message'], str)
    assert not ('payload' in resp.json.keys())


# @pytest.mark.active
def test_users_confirmation_get(
        client, created_user):
    # print('\ntest_users_confirmation_get, url_for ->',
    #       url_for('users_bp.confirmation', confirmation_id='Fuck!'))

    # Non existing confirmations.
    resp = client.get(url_for('users_bp.confirmation',
                      confirmation_id='Fucking confirmation!'))
    assert resp.status_code == 404
    assert isinstance(resp.json['message'], str)

    # Normal update:
    _user = created_user()
    _confirmation = ConfirmationModel.find_by_user_id(_user.id)
    resp = client.get(url_for('users_bp.confirmation', confirmation_id=_confirmation.id))
    assert resp.status_code == 200

    # Update already confirmed user:
    _user = created_user(role_id='power_user')
    _confirmation = ConfirmationModel.find_by_user_id(_user.id)
    resp = client.get(url_for('users_bp.confirmation', confirmation_id=_confirmation.id))
    assert resp.status_code == 400
    assert isinstance(resp.json['message'], str)

    # Expired confirmation:
    _user = created_user()
    _confirmation = ConfirmationModel.find_by_user_id(_user.id)
    _confirmation.force_to_expire()
    resp = client.get(url_for('users_bp.confirmation', confirmation_id=_confirmation.id))
    assert resp.status_code == 400
    assert isinstance(resp.json['message'], str)


# @pytest.mark.active
def test_users_confirmationbyuser_post(
        client, created_user):
    _user = created_user('power_user')
    resp = client.post(url_for('users_bp.confirmationbyuser', user_id=_user.id + 1))
    assert resp.status_code == 404
    assert isinstance(resp.json, Dict)
    assert isinstance(resp.json['message'], str)
    resp = client.post(url_for('users_bp.confirmationbyuser', user_id=_user.id))
    assert resp.status_code == 400
    assert isinstance(resp.json, Dict)
    assert isinstance(resp.json['message'], str)
    _invalid_user = created_user()
    resp = client.post(url_for('users_bp.confirmationbyuser', user_id=_invalid_user.id))
    assert resp.status_code == 200
    assert isinstance(resp.json, Dict)
    assert isinstance(resp.json['message'], str)
