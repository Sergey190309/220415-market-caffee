import pytest
from typing import List, Dict
from flask import url_for

from application.users.models import UserModel


# @pytest.mark.active
def test_contents_view_list_get_no_token(client):
    '''
    Wrong - logged admin can access to this info only.
    '''
    headers = {'Accept-Language': 'en'}
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
        ('en', 'Sorry'),
        ('ru', 'Извиняйте')
    ]
)
# @pytest.mark.active
def test_locale_list_get_user(
        client,
        lng, test_word,
        access_token, user_instance):
    '''
    Wrong - not enought right.
    '''
    _user = user_instance()
    _user.save_to_db()
    _access_token_user = access_token(_user)
    headers = {'Authorization': f"Bearer {_access_token_user}",
               'Accept-Language': lng}
    _resp = client.get(url_for('localesglobal'), headers=headers)
    assert _resp.status_code == 401
    assert isinstance(_resp.json, Dict)
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
    _locale_gen00 = saved_locale_instance()
    _locale_gen01 = saved_locale_instance()

    next(_locale_gen00)
    next(_locale_gen01)
    _admin = UserModel.find_by_id(1)
    _access_token_admin = access_token(_admin)
    headers = {'Authorization': f"Bearer {_access_token_admin}",
               'Accept-Language': lng}
    _resp = client.get(url_for('localesglobal'), headers=headers)

    assert _resp.status_code == 200
    assert isinstance(_resp.json, Dict)
    assert isinstance(_resp.json.get('payload'), List)
    assert len(_resp.json['payload']) >= 4
    assert _resp.json.get('message').find(test_word) != -1

    next(_locale_gen00)
    next(_locale_gen01)
