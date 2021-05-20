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
def test_post_create_sessions_localization(client, sessions, lng, test_world):
    # lng = 'ru'
    _json00 = {
        'tech_id': str(uuid4())
    }
    _json01 = {
        'tech_id': str(uuid4())
    }
    _headers = {
        'Content-Type': 'application/json',
        'Accept-Language': lng
    }

    resp = client.post(url_for('home_bp.techauth'), json=_json00, headers=_headers)
    print('\ntest, home, techauth code ->', resp.status_code)
    print('test, home, techauth json ->', resp.json.get('message'))
    resp = client.post(url_for('home_bp.techauth'), json=_json01, headers=_headers)

    # assert resp.status_code == 200
    # # check localisation
    # assert 'message' in resp.json
    # assert isinstance('message', str)
    # assert resp.json.get('message').find(test_world) != -1
    # assert 'payload' in resp.json
    # assert isinstance('payload', str)

    # # check sessions
    # assert len(sessions.getter()) == 2


# @pytest.mark.active
def test_post_tech_token_extraction(client):
    lng = 'en'
    _tech_id = str(uuid4())
    _json = {
        'tech_id': _tech_id
    }
    _headers = {
        'Content-Type': 'application/json',
        'Accept-Language': lng
    }
    # print('\ntest, home, techauth teck_id ->', _tech_id)
    resp = client.post(url_for('home_bp.techauth'), json=_json, headers=_headers)
    _tech_token = resp.json.get('payload')
    assert resp.status_code == 200
    assert decode_token(_tech_token).get('id') == _tech_id


@pytest.mark.parametrize(
    'lng, test_world',
    [
        ('en', 'Something went wrong'),
        ('ru', 'Что-то пошло не так')
    ]
)
# @pytest.mark.active
def test_post_no_bad_json(client, lng, test_world):
    # no JSON
    _headers = {
        'Content-Type': 'application/json',
        'Accept-Language': lng
    }
    resp = client.post(url_for('home_bp.techauth'), headers=_headers)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_world) != -1

    # bad JSON
    _json = 'bad_JSON'
    resp = client.post(url_for('home_bp.techauth'), json=_json, headers=_headers)
    resp = client.post(url_for('home_bp.techauth'), headers=_headers)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_world) != -1
    # print('\ntest, home, techauth code ->', resp.status_code)
    # print('test, home, techauth json ->', resp.json.get('message'))


@pytest.mark.parametrize(
    'lng, test_world',
    [
        ('en', 'Something went wrong'),
        ('ru', 'Что-то пошло не так')
    ]
)
# @pytest.mark.active
def test_post_no_wrong_key(client, lng, test_world):
    # lng = 'en'
    _json = {
        'whong_key': str(uuid4())
    }
    _headers = {
        'Content-Type': 'application/json',
        'Accept-Language': lng
    }
    resp = client.post(url_for('home_bp.techauth'), json=_json, headers=_headers)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_world) != -1

    # print('\ntest, home, techauth code ->', resp.status_code)
    # print('test, home, techauth json ->', resp.json.get('message'))
    # print('test, home, techauth json ->', resp.json.get('payload'))
