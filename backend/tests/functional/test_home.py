def test_home_page_get(test_client, root_url):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/' page is requested (GET)
    THEN check that the response is valid
    """
    resp = test_client.get(root_url + '/home')
    assert resp.status_code == 200
    assert b"Text" in resp.data
    # assert b"Need an account?" in resp.data
    # assert b"Existing user?" in resp.data
