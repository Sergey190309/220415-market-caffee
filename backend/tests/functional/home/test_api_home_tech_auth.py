import pytest
from uuid import uuid4

from flask import url_for
from flask_jwt_extended import (
    # get_jwt_identity,
    # get_unverified_jwt_headers,
    # get_jti,
    decode_token,
)


@pytest.mark.parametrize(
    'lng, test_world',
    [
        ('en', 'TechAuth'),
        ('ru', 'ТехРег')
    ]
)
# @pytest.mark.active
def test_get_create_sessions_localization(client, sessions, lng, test_world):
    # lng = 'ru'
    _params00 = {
        'tech_id': str(uuid4())
    }
    _headers = {
        'Content-Type': 'application/json',
        'Accept-Language': lng
    }

    resp = client.get(url_for('home_bp.techauth', **_params00), headers=_headers)

    assert resp.status_code == 200
    '''check localisation'''
    assert 'message' in resp.json
    assert isinstance('message', str)
    assert resp.json.get('message').find(test_world) != -1
    assert 'payload' in resp.json
    assert isinstance('payload', str)

    # print('\ntest, home, techauth code ->', resp.status_code)
    # print('test, home, techauth json ->', resp.json.get('message'))


# @pytest.mark.active
def test_get_tech_token_extraction(client):
    lng = 'en'
    _tech_id = str(uuid4())
    _params = {
        'tech_id': _tech_id
    }
    _headers = {
        'Content-Type': 'application/json',
        'Accept-Language': lng
    }
    resp = client.get(url_for('home_bp.techauth', **_params), headers=_headers)
    _tech_token = resp.json.get('payload')
    assert resp.status_code == 200
    assert decode_token(_tech_token).get('id') == _tech_id
    # print('\ntest, home, techauth _params ->', _params)


@pytest.mark.parametrize(
    'lng, test_world',
    [
        ('en', 'Something went wrong'),
        ('ru', 'Что-то пошло не так')
    ]
)
# @pytest.mark.active
def test_post_no_params(client, lng, test_world):
    '''no JSON'''
    _headers = {
        'Content-Type': 'application/json',
        'Accept-Language': lng
    }
    resp = client.get(url_for('home_bp.techauth'), headers=_headers)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_world) != -1

    # print('\ntest, home, techauth code ->', resp.status_code)
    # print('test, home, techauth json ->', resp.json)


@pytest.mark.parametrize(
    'lng, test_world',
    [
        ('en', 'Something went wrong'),
        ('ru', 'Что-то пошло не так')
    ]
)
@pytest.mark.active
def test_post_no_wrong_key(client, lng, test_world):
    # lng = 'en'
    _params = {
        'whong_key': str(uuid4())
    }
    _headers = {
        'Content-Type': 'application/json',
        'Accept-Language': lng
    }
    resp = client.get(url_for('home_bp.techauth', **_params), headers=_headers)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_world) != -1

    # print('\ntest, home, techauth code ->', resp.status_code)
    # print('test, home, techauth json ->', resp.json.get('message'))
