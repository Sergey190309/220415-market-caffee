import pytest

from typing import Dict

# from random import choice, randint

from application import create_app

# from sqlalchemy import create_engine

from application.modules.dbs_global import dbs_global

from application.users.models.users import UserModel
from application.users.schemas.users import UserSchema, UserGetSchema
from application.users.models.confirmations import ConfirmationModel

# from application.components.models import ComponentModel
# from application.components.models.component_kinds import ComponentKindsModel
# from application.components.schemas.components import (
#     ComponentGetSchema, ComponentSchema)
# from application.components.schemas.component_kinds import (
#     ComponentKindGetSchema, ComponentKindSchema)

from application.contents.models.views import ViewModel
from application.contents.schemas.views import ViewGetSchema, ViewSchema

# from application.contents.models.contents import ContentModel
# from application.contents.schemas.contents import ContentGetSchema, ContentSchema

from application.testing_config import SQLALCHEMY_DATABASE_URI
from application.global_init_data import global_constants
from application.contents.local_init_data_contents import contents_constants
from application.components.local_init_data_components import components_constants
from application.users.local_init_data_users import users_constants


@pytest.fixture(params=['button'])
# @pytest.fixture(params=[item['id_kind'] for item in components_constants.get_KINDS])
def allowed_component_kind(request):
    return request.param


@pytest.fixture(scope='session')
def root_url():
    return 'http://127.0.0.1:5000'


@pytest.fixture(scope='session')
def url_users(root_url):
    '''
    Generate url for this file tests.
    '''
    return root_url + '/home/index'


@pytest.fixture(scope='session', autouse=True)
def test_client(root_url):
    # print('\ntest_client')
    app = create_app('testing_config.py')

    with app.test_client() as test_client:
        with app.app_context():
            test_client.get(root_url)  # to initiate dbs
            yield test_client


@pytest.fixture(scope='module')
def user_create_json(random_email):
    def _method(arg=None):
        return {
            # 'user_name': 'user_name',
            'email': random_email(),
            'password': 'qwer'
        }
    return _method


@pytest.fixture(scope='session')
def user_get_schema():
    return UserGetSchema()


@pytest.fixture
def created_user(
        random_email,
        test_client,
        user_schema,
        user_create_json):
    def _method(role_id=None, email=None):
        _user_create_json = user_create_json().copy()  # avoid dictionary changing
        _user_create_json['role_id'] = role_id
        if email is not None:
            _user_create_json['email'] = email
        else:
            _user_create_json['email'] = random_email()
        _user = user_schema.load(_user_create_json)
        _user.save_to_db()
        _confirmation = ConfirmationModel(_user.id)
        _confirmation.save_to_db()
        # Get user from db:
        user = UserModel.find_by_id(_user.id)
        # print(user_schema.dump(user)['role'])

        return user
        # yield user
    yield _method
    # print('created_user')
    # user.delete_fm_db()


@pytest.fixture
def _app_folder():
    '''
    Used as an addendum to generate SQLite file path.
    '''
    return 'application/'

