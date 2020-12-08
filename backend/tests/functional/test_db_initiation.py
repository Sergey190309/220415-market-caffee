import pytest

from sqlalchemy import create_engine
from application.testing_config import SQLALCHEMY_DATABASE_URI


@pytest.fixture
def url_users(root_url):
    return root_url + '/users'


@pytest.fixture
def post_json():
    return {
        "email": "sa6702@gmail.com",
        "password": "qwer"
    }


@pytest.fixture
def _app_folder():
    return 'application/'


@pytest.fixture
def _engine(_app_folder):
    URI_cuts = SQLALCHEMY_DATABASE_URI.split('///')
    URI = URI_cuts[0] + '///' + _app_folder + URI_cuts[1]
    return create_engine(URI, echo=True)


# @pytest.fixture
@pytest.mark.init_db
def test_client(
    test_client, url_users,
    post_json
):
    resp = test_client.post(url_users, json=post_json)
    assert resp.status_code == 200
    # return


@pytest.mark.init_db
def test_db_creation(
    _engine
):
    '''
    Test checks all tables availability
    '''

    tables = _engine.table_names()

    table_names = [
        'locales',
        'confirmations',
        'roles',
        'users'
    ]
    assert tables.sort() == table_names.sort()


@pytest.mark.active
@pytest.mark.init_db
def test_roles(
    _engine
):
    pass
