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
        ('en', 'TecAuth'),
        ('ru', 'ТехРег')
    ]
)
# @pytest.mark.active
def test_post_create_sessions_localization(client, sessions, lng, test_world):
    # lng = 'ru'
    _json00 = {
        'tec_id': str(uuid4())
    }
    _json01 = {
        'tec_id': str(uuid4())
    }
    _headers = {
        'Content-Type': 'application/json',
        'Accept-Language': lng
    }

    resp = client.post(url_for('home_bp.tecauth'), json=_json00, headers=_headers)
    resp = client.post(url_for('home_bp.tecauth'), json=_json01, headers=_headers)

    assert resp.status_code == 200
    # check localisation
    assert 'message' in resp.json
    assert isinstance('message', str)
    assert resp.json.get('message').find(test_world) != -1
    assert 'payload' in resp.json
    assert isinstance('payload', str)

    # check sessions
    assert len(sessions.getter()) == 2


# @pytest.mark.active
def test_post_tec_token_extraction(client):
    lng = 'en'
    _tec_id = str(uuid4())
    _json = {
        'tec_id': _tec_id
    }
    _headers = {
        'Content-Type': 'application/json',
        'Accept-Language': lng
    }
    # print('\ntest, home, tecauth teck_id ->', _tec_id)
    resp = client.post(url_for('home_bp.tecauth'), json=_json, headers=_headers)
    _tec_token = resp.json.get('payload')
    assert resp.status_code == 200
    assert decode_token(_tec_token).get('id') == _tec_id


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
    resp = client.post(url_for('home_bp.tecauth'), headers=_headers)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_world) != -1

    # bad JSON
    _json = 'bad_JSON'
    resp = client.post(url_for('home_bp.tecauth'), json=_json, headers=_headers)
    resp = client.post(url_for('home_bp.tecauth'), headers=_headers)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_world) != -1
    # print('\ntest, home, tecauth code ->', resp.status_code)
    # print('test, home, tecauth json ->', resp.json.get('message'))


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
    resp = client.post(url_for('home_bp.tecauth'), json=_json, headers=_headers)
    assert resp.status_code == 400
    assert resp.json.get('message').find(test_world) != -1

    # print('\ntest, home, tecauth code ->', resp.status_code)
    # print('test, home, tecauth json ->', resp.json.get('message'))
    # print('test, home, tecauth json ->', resp.json.get('payload'))
