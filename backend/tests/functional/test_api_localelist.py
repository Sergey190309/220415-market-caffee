import pytest
from typing import List, Dict
from uuid import uuid4
from flask import url_for

from flask_jwt_extended import create_access_token
from application.home.local_init_data_home import sessions
from application.global_init_data import global_constants
# from application.users.models import UserModel


# @pytest.mark.active
def test_contents_view_list_get_no_token(client):
    '''
    Wrong - logged admin can access to this info only.
    '''
    headers = {'Accept-Language': 'en', 'Content-Type': 'application/json'}
    _resp = client.get(url_for('localesglobal'), headers=headers)
    # print('\ntest, functional, test_api_localelist, code ->', _resp.status_code)
    # print('test, functional, test_api_localelist, json ->', _resp.json)
    assert _resp.status_code == 401
    assert isinstance(_resp.json, Dict)
    assert 'description' in _resp.json.keys()
    assert 'error' in _resp.json.keys()
    assert _resp.json['error'] == 'authorization_required'


@pytest.mark.parametrize(
    'lng, test_word', [
        ('en', 'Something went wrong'),
        ('ru', 'Что-то пошло не так')
    ]
)
# @pytest.mark.active
def test_locale_list_get_user(
        client,
        lng, test_word,
        access_token, user_instance):
    '''
    Wrong - wrong token.
    '''
    _user = user_instance()
    _user.save_to_db()
    _access_token_user = access_token(_user)
    headers = {'Authorization': f"Bearer {_access_token_user}",
               'Content-Type': 'application/json',
               'Accept-Language': lng}
    _resp = client.get(url_for('localesglobal'), headers=headers)
    assert _resp.status_code == 500
    assert 'message' in _resp.json.keys()
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1

    _user.delete_fm_db()


@pytest.mark.parametrize(
    'lng, test_word', [
        ('en', 'database'),
        ('ru', 'нашей базе')
    ]
)
# @pytest.mark.active
def test_users_list_get_admin(
        client,
        access_token, user_instance,
        lng, test_word,
        saved_locale_instance):
    '''
    Right
    '''
    _uuid = uuid4()
    sessions.setter(str(_uuid))
    _tech_token = create_access_token(_uuid, expires_delta=False)
    headers = {'Authorization': f"Bearer {_tech_token}",
               'Content-Type': 'application/json',
               'Accept-Language': lng}
    _resp = client.get(url_for('localesglobal'), headers=headers)

    assert _resp.status_code == 200
    assert isinstance(_resp.json.get('payload'), List)
    assert len(_resp.json['payload']) == len(global_constants.get_LOCALES)
    assert _resp.json.get('message').find(test_word) != -1
    # print('\ntests func, test_api_locale list, status ->', _resp.status_code)
    # print('tests func, test_api_locale list, json ->', _resp.json)
