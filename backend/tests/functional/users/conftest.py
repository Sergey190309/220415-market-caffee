import pytest

from application.users.models import ConfirmationModel, UserModel


@pytest.fixture
def created_user(
        random_email,
        client,
        user_schema,
        user_create_json):
    def _method(role_id=None, email=None):
        _user_create_json = user_create_json().copy()  # avoid dictionary changing
        _user_create_json['role_id'] = role_id
        if email is not None:
            _user_create_json['email'] = email
        else:
            _user_create_json['email'] = random_email()
        _user = user_schema.load(_user_create_json)
        _user.save_to_db()
        _confirmation = ConfirmationModel(_user.id)
        _confirmation.save_to_db()
        # Get user from db:
        user = UserModel.find_by_id(_user.id)
        # print(user_schema.dump(user)['role'])

        return user
        # yield user
    yield _method
    # print('created_user')
    # user.delete_fm_db()
