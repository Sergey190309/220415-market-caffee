import pytest
# from dotenv import load_dotenv
# @pytest.fixture(scope='session', autouse=True)
# def load_env():
#     load_dotenv()


@pytest.fixture
def root_url():
    return 'http://127.0.0.1:5000'


@pytest.fixture
def url_users(root_url):
    '''
    Generate url for this file tests.
    '''
    return root_url + '/home/index'


@pytest.fixture
def post_json():
    '''
    Generate json for file tests.
    '''

    return {
        "email": "s@gmail.com",
        "password": "qwer"
    }
