import pytest


@pytest.fixture
def url_index(root_url):
    return root_url + '/home/index'


@pytest.fixture
def url_localization(root_url):
    return root_url + '/home/localization'


# @pytest.mark.active
@pytest.mark.home
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
    test_client, url_localization,
    locale, time_zone
):
    _json = {
        "locale": locale,
        "time_zone": time_zone
    }
    resp = test_client.post(url_localization, json=_json)
    assert resp.status_code == 200
    assert resp.json['payload']['locale'] == locale
    assert resp.json['payload']['time_zone'] == f'ETC/GMT{-time_zone:+}'


@pytest.mark.home
def test_home_index_get(test_client, url_index):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/' page is requested (GET)
    THEN check that the response is valid
    """
    print('test.functonal.test_home.test_home_index url_index -', url_index)
    resp = test_client.get(url_index)
    assert resp.status_code == 200
    assert b"Text" in resp.data
    # assert b"Need an account?" in resp.data
    # assert b"Existing user?" in resp.data


@pytest.mark.home
@pytest.mark.parametrize(
    'argument, result',
    [
        ('date', 'You asked about date'),
        ('time', 'You asked about time'),
        ('other', 'Not clear what do you want'),
    ]
)
def test_home_index_post(test_client, url_index, argument, result):

    _json = {
        "what": argument
    }
    resp = test_client.post(url_index, json=_json)

    assert resp.status_code == 200
    assert result in resp.json['message']
