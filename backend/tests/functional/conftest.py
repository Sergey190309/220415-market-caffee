import pytest

# from typing import Dict
# from random import choice  # randint

# from
#  application.users.models import UserModel
from application.global_init_data import global_constants


@pytest.fixture(scope='module')
def user_create_json(random_email):
    def _method(args: dict = {}):
        return {
            'role_id': args.get('role_id', None),
            'email': args.get('email', random_email()),
            'password': args.get('password', 'qwerty' )
        }
    return _method


@pytest.fixture
def access_token():
    def _method(user):
        # print('\n\naccess_token fixture')
        return user.get_tokens().get('access_token')
    return _method


@pytest.fixture
def refresh_token():
    def _method(user):
        # print('\n\nrefresh_token fixture')
        return user.get_tokens().get('access_token')
    return _method


@pytest.fixture(params=[item['id'] for item in global_constants.get_LOCALES])
def allowed_language(request):
    return request.param
