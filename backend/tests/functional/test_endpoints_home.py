import pytest


@pytest.fixture
def url(root_url):
    return root_url + '/home/index'


@pytest.mark.home
@pytest.mark.active
def test_home_page_get(test_client, url):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/' page is requested (GET)
    THEN check that the response is valid
    """
    print('test.functonal.test_home.test_home_page url -', url)
    resp = test_client.get(url)
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
def test_home_page_post(test_client, url, argument, result):
    # print('test_home_page_post -', url)
    _json = {
        "what": argument
    }
    resp = test_client.post(url, json=_json)

    assert resp.status_code == 200
    assert result in resp.json['message']
