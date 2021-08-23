import pytest

from application.users.models import ConfirmationModel, UserModel


@pytest.fixture
def created_user(
        random_email,
        client,
        user_schema,
        user_create_json):
    def _method(args: dict = {}):
        _user_create_json = user_create_json(args).copy()
        _user = user_schema.load(_user_create_json)
        _user.save_to_db()
        _confirmation = ConfirmationModel(_user.id)
        _confirmation.save_to_db()
        '''Get user from db:'''
        user = UserModel.find_by_id(_user.id)

        return user
    yield _method
