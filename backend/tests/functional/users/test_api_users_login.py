import pytest
from flask import url_for
# from application.users.models.users import UserModel


@pytest.fixture
def login_json(user_create_json):
    _user_create_json = user_create_json()
    return {
        "email": _user_create_json.get('email'),
        "password": _user_create_json.get('password')
    }


# @pytest.fixture
# def access_token():
#     def _method(user):
#         return user.get_tokens()['access_token']
#     return _method


@pytest.fixture
def refresh_token():
    def _method(user):
        return user.get_tokens()['refresh_token']
    return _method


@pytest.mark.parametrize(
    'lng, test_word, test_word_01, test_word_02, test_word_03',
    [
        ('en', 'Check email stated', 'You are welcome',
         'User with', 'Wrong password for user'),
        ('ru', 'Проверьте указанную электронную почту', 'Добро пожаловать',
         'Пользователь с', 'Неверный пароль для пользователя')
    ]
)
# @pytest.mark.active
def test_user_login_post(
        client,
        created_user,
        login_json,
        lng, test_word, test_word_01, test_word_02, test_word_03
):
    '''Create new user:'''
    _user = created_user({'email': login_json.get('email')})
    assert _user is not None
    headers = {'Content-Type': 'application/json', 'Accept-Language': lng}

    '''login user is not valid'''
    resp = client.post(url_for('users_bp.userlogin'),
                       headers=headers, json=login_json, )
    assert resp.status_code == 400
    assert isinstance(resp.json['message'], str)
    assert 'message' in resp.json.keys()  # There is message in responce.
    assert resp.json.get('message').find(test_word) != -1
    assert not ('payload' in resp.json.keys())  # No payload in the responce.

    '''login user is valid'''
    _user.update({'role_id': 'user'})
    resp = client.post(url_for('users_bp.userlogin'), headers=headers, json=login_json)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert resp.json.get('message').find(test_word_01) != -1

    '''login user does not exists'''
    login_json_wrong_email = login_json.copy()
    login_json_wrong_email['email'] = 'wrong@email.com'
    resp = client.post(url_for('users_bp.userlogin'),
                       headers=headers, json=login_json_wrong_email)
    assert resp.status_code == 404
    assert 'message' in resp.json.keys()
    assert not ('payload' in resp.json.keys())
    assert resp.json.get('message').find(test_word_02) != -1

    '''login wrong password'''
    login_json_wrong_password = login_json.copy()
    login_json_wrong_password['password'] = 'wrong password'
    resp = client.post(url_for('users_bp.userlogin'),
                       headers=headers, json=login_json_wrong_password)
    assert resp.status_code == 400
    assert 'message' in resp.json.keys()
    assert not('payload' in resp.json.keys())
    assert resp.json.get('message').find(test_word_03) != -1
    # print('\ntest_user_login_post, resp.status_code ->', resp.status_code)
    # print('test_user_login_post, resp.json ->', resp.json.get('message'))
    _user.delete_fm_db()


@pytest.mark.parametrize(
    'lng, test_word, test_word01',
    [
        ('en', 'Token successfully refreshed', 'Wrong password.'),
        ('ru', 'Жетон благополучно освежен', 'Неверный пароль.')
    ]
)
# @pytest.mark.active
def test_user_login_put(
        client,
        created_user,
        refresh_token,
        lng, test_word, test_word01
):
    '''Success refreshing'''
    _json_password = {'password': 'qwerty'}
    _user = created_user(_json_password)
    headers = {'Content-Type': 'application/json',
               'Authorization': f'Bearer {refresh_token(_user)}',
               'Accept-Language': lng}
    resp = client.put(
        url_for('users_bp.userlogin'), headers=headers, json=_json_password)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json.get('payload').get('access_token'), str)
    assert resp.json.get('message').find(test_word) != -1

    '''Wrong password'''
    _json_wrong_password = {'password': 'wrong'}
    resp = client.put(
        url_for('users_bp.userlogin'), headers=headers, json=_json_wrong_password)
    assert resp.status_code == 401
    assert 'message' in resp.json.keys()
    # assert 'payload' in resp.json.keys()
    assert resp.json.get('message').find(test_word01) != -1
    # print('\ntest_user_login_delete, status ->', resp.status_code)
    # print('test_user_login_delete, resp.json ->', resp.json)


@pytest.mark.parametrize(
    'lng, test_word, test_word_01',
    [
        ('en', 'Successfully logged out', 'The token has been revoked'),
        ('ru', 'Пользователь успешно прекратил регистрацию', 'Жетон отозван')
    ]
)
# @pytest.mark.active
def test_user_login_delete(
        client,
        created_user,
        access_token,
        lng, test_word, test_word_01
):
    _user = created_user()
    headers = {'Authorization': f'Bearer {access_token(_user)}',
               'Content-Type': 'application/json',
               'Accept-Language': lng}
    resp = client.delete(url_for('users_bp.userlogin'), headers=headers)
    # print(resp.json)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert resp.json.get('message').find(test_word) != -1

    resp = client.delete(url_for('users_bp.userlogin'), headers=headers)
    assert resp.status_code == 401
    assert 'description' in resp.json.keys()
    assert resp.json.get('description').find(test_word_01) != -1
