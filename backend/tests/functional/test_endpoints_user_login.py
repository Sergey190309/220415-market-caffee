import pytest

# from application.users.models.users import UserModel


@pytest.fixture
def url_users_login(root_url):
    return root_url + '/users/login'


@pytest.fixture
def login_json(user_create_json):
    return {
        "email": user_create_json['email'],
        "password": user_create_json['password']
    }


@pytest.fixture
def access_token(confirmed_user):
    return confirmed_user.get_tokens()['access_token']


@pytest.fixture
def refresh_token(confirmed_user):
    return confirmed_user.get_tokens()['refresh_token']


# @pytest.mark.active
def test_user_login_post(
        test_client,
        created_user,
        login_json,
        url_users_login):
    # Create new user:
    # print(created_user)
    assert created_user is not None
    # login user is not valid
    resp = test_client.post(url_users_login, json=login_json)
    assert resp.status_code == 400
    assert isinstance(resp.json['message'], str)
    assert 'message' in resp.json.keys()  # There is message in responce.
    assert not('payload' in resp.json.keys())  # No payload in the responce.
    # login user is valid
    created_user.update({'role_id': 'user'})
    resp = test_client.post(url_users_login, json=login_json)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    # login user does not exists
    login_json_wrong_email = login_json.copy()
    login_json_wrong_email['email'] = 'wrong@email.com'
    resp = test_client.post(url_users_login, json=login_json_wrong_email)
    assert resp.status_code == 404
    assert 'message' in resp.json.keys()
    assert not('payload' in resp.json.keys())
    # login wrong password
    login_json_wrong_password = login_json.copy()
    login_json_wrong_password['password'] = 'wrong password'
    resp = test_client.post(url_users_login, json=login_json_wrong_password)
    assert resp.status_code == 400
    assert 'message' in resp.json.keys()
    assert not('payload' in resp.json.keys())


# @pytest.mark.active
def test_user_login_put(
        test_client,
        url_users_login,
        access_token):
    headers = {'Authorization': f'Bearer {access_token}'}
    resp = test_client.put(url_users_login, headers=headers)
    # print(resp.json)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()


# @pytest.mark.active
def test_user_login_patch(
        test_client,
        url_users_login,
        refresh_token):
    headers = {'Authorization': f'Bearer {refresh_token}'}
    resp = test_client.patch(url_users_login, headers=headers)
    # print(resp.json)
    assert resp.status_code == 200
    assert 'message' in resp.json.keys()
    assert 'payload' in resp.json.keys()
    assert isinstance(resp.json['payload']['access_token'], str)
