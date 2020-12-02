import pytest
# import requests

# from flask_extentions.app_init import FlaskInit
# from initiation.init import connect_modules

# from ..conftest import appTesting

'''
The below functions should be successfull in case of application is running
with flask development server.
'''


@pytest.fixture
def root_url():
    return 'http://127.0.0.1:5000'


def test_index_page(appTesting, root_url):
    # app_for_testing = FlaskInit(__name__)
    # connect_modules(app_for_testing)
    app = appTesting()
    with app.test_client() as test_client:

        resp = test_client.get(root_url + '/test')  # Assumses that it has a path of "/"
        # print('\ntest_index resp -', resp.json)
        assert resp.status_code == 200  # Assumes that it will return a 200 response


# @pytest.fixture
# def page_test_url(root_url):
#     return root_url + '/test'


# def test_test_page(page_test_url):
#     resp_get = requests.get(page_test_url)
#     assert resp_get.status_code == 200


# @pytest.mark.parametrize('data', [
#     'date',
#     'time'
# ])
# def test_test_post_(page_test_url, data):
#     resp_post = requests.post(page_test_url, json={"what": data})
#     assert resp_post.json()['payload'] is not None


# def test_test_post_other(page_test_url):
#     resp_post = requests.post(page_test_url, json={"what": "other"})
#     assert resp_post.json()['payload'] is None
