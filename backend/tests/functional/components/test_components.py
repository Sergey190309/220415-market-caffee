import pytest
# from typing import Dict
# from time import time

# from application.users.models.users import UserModel
# from application.users.schemas.users import user_schema
# from application.users.models.confirmations import ConfirmationModel


@pytest.fixture
def url_components(root_url):
    # def _method(user_id=None):
    return root_url + '/components'
    # return _method

# @pytest.fixture


# @pytest.mark.active
def test_users_get(test_client, url_components):
    resp = test_client.get(url_components)
    print()
    print(resp.status_code)
    print(resp.json)
