import pytest
# from dotenv import load_dotenv

from application import create_app

# @pytest.fixture(scope='session', autouse=True)
# def load_env():
#     load_dotenv()


@pytest.fixture
def root_url():
    return 'http://127.0.0.1:5000'


@pytest.fixture(scope='module')
def test_client():
    # print('\nclient')
    app = create_app('testing_config.py')

    with app.test_client() as test_client:
        with app.app_context():
            yield test_client
