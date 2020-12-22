import pytest

from random import choice

from application import create_app

from application.users.models.users import UserModel
from application.users.schemas.users import UserSchema

# from dotenv import load_dotenv
# @pytest.fixture(scope='session', autouse=True)
# def load_env():
#     load_dotenv()


@pytest.fixture(scope='session')
def root_url():
    return 'http://127.0.0.1:5000'


@pytest.fixture(scope='session')
def url_users(root_url):
    '''
    Generate url for this file tests.
    '''
    return root_url + '/home/index'


@pytest.fixture(scope='session')
def post_json():
    '''
    Generate json for file tests.
    '''

    return {
        "email": "s@gmail.com",
        "password": "qwer"
    }


@pytest.fixture(scope='module')
def test_client():
    # print('\nclient')
    app = create_app('testing_config.py')

    with app.test_client() as test_client:
        with app.app_context():
            yield test_client


@pytest.fixture
def random_email():
    def _method(arg=None):
        source = (
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
            'Blanditiis, iste doloribus? Facilis sapiente fugit commodi et '
            'nostrum amet aspernatur, illum necessitatibus maiores, '
            'perspiciatis ipsam, omnis modi beatae? Saepe, eius neque.')
        result = \
            source.lower().replace(',', '').\
            replace('.', '').replace('?', '').split(' ')
        domens = ('com', 'ru', 'uk', 'ua', 'org', 'mil')
        return choice(result) + '@' + choice(result) + '.' + choice(domens)
    return _method


@pytest.fixture()
def user_create_json(random_email):
    def _method(arg=None):
        return {
            'user_name': 'user_name',
            'email': random_email(),
            'password': 'qwer'
        }
    return _method


@pytest.fixture
def user_schema(scope='session'):
    return UserSchema()


@pytest.fixture
def created_user(
        test_client,
        url_users,
        user_schema,
        user_create_json):
    def _method(role_id=None, email=None):
        test_client.get(url_users)
        _user_create_json = user_create_json().copy()  # avoid dictionary changing
        _user_create_json['role_id'] = role_id
        if email is not None:
            _user_create_json['email'] = email
        _user = user_schema.load(_user_create_json)
        _user.save_to_db()
        # Get user from db:
        user = UserModel.find_by_id(_user.id)
        # print(user_schema.dump(user)['role'])

        return user
    return _method
