import pytest

# from application.users.models.users import UserModel


@pytest.fixture
def url_usershandle(root_url):
    def _method(user_id):
        return root_url + f'/users/handle/{user_id}'
    return _method


@pytest.fixture
def access_token(confirmed_user):
    return confirmed_user.get_tokens()['access_token']


@pytest.mark.active
def test_userhandle_post(
        test_client,
        confirmed_user,
        access_token,
        url_usershandle):
    print('\nConfirmed -', confirmed_user.role_id)
    headers = {'Authorization': f'Bearer {access_token}'}
    _json_payload = {'remarks': 'И я не знаю что здесь писать!'}
    print(url_usershandle(confirmed_user.id))
    resp = test_client.post(
        url_usershandle(confirmed_user.id),
        json=_json_payload,
        headers=headers)

    print(resp.status_code)
    print(resp.json)


