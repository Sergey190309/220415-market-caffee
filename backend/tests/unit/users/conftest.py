import pytest
from typing import Dict
from application.users.models.users import UserModel


@pytest.fixture
def saved_user_instance(client, user_instance) -> UserModel:
    def _method(values: Dict = {}) -> UserModel:
        _user = user_instance(values)
        _user.save_to_db()
        yield _user
        if _user.is_exist:
            _user.delete_fm_db()
        yield
    return _method
