import pytest
from time import sleep

from application.users.models.users import UserModel


@pytest.fixture
def url_users(root_url):
    # def _method(user_id=None):
    return root_url + '/users'
    # return _method


@pytest.mark.active
def test_user_post(test_client, url_users, user_create_json):
    print()
    _user_create_json = user_create_json().copy()
    _email = _user_create_json['email']
    # print('email -', _user_create_json['email'])
    # print('email -', _email)
    resp = test_client.post(url_users, json=_user_create_json)
    _user = UserModel.find_by_email(_email)

    assert resp.status_code == 201

    print(_user)
    print(resp.status_code)
    print(resp.json)
