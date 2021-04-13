import pytest


@pytest.fixture
def url_index(root_url):
    return root_url + '/home/index'


@pytest.fixture
def url_localization(root_url):
    return root_url + '/home/localization'


# @pytest.mark.active
@pytest.mark.parametrize(
    'locale, time_zone',
    [
        ('ru', 3),
        # ('cn', 8),
        ('en', -8),
        ('de', 2)
    ]
)
def test_home_localization_post(
    client, url_localization,
    locale, time_zone
    ):

    _json = {
        "locale": locale,
        "time_zone": time_zone
    }

    resp = client.post(url_localization, json=_json)
    assert resp.status_code == 200
    assert resp.json['payload']['locale'] == locale
    assert resp.json['payload']['time_zone'] == f'ETC/GMT{-time_zone:+}'


# @pytest.mark.active
def test_home_index_get(app, client, url_index):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/' page is requested (GET)
    THEN check that the response is valid
    """
    # print('\ntest_home_index_get, SQLALCHEMY_DATABASE_URI ->', app.config['SQLALCHEMY_DATABASE_URI'])
    # print('\ntest_home_index_get, app.Config ->', client.Config())
    resp = client.get(url_index)
    assert resp.status_code == 200
    # print('\ntest.functonal.test_home.test_home_index_get, resp.data ->', resp.data)
    assert b"Text" in resp.data
    # assert b"Need an account?" in resp.data
    # assert b"Existing user?" in resp.data


# @pytest.mark.active
@pytest.mark.parametrize(
    'argument, result',
    [
        ('time', 'You asked about time'),
        # ('date', 'You asked about date'),
        ('other', 'Not clear what do you want'),
    ]
)
def test_home_index_post(client, url_index, argument, result):

    _json = {
        "what": argument
    }
    resp = client.post(url_index, json=_json)

    assert resp.status_code == 200
    assert result in resp.json['message']
