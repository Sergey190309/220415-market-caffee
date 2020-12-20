import pytest

from datetime import datetime


from sqlalchemy.exc import OperationalError
# from flask import current_app

from application import create_app

from application.users.models.users import UserModel


@pytest.fixture(scope='module')
def test_client_unit():
    # print('\nclient')
    app = create_app('testing_config.py')

    with app.test_client() as test_client_unit:
        with app.app_context():
            yield test_client_unit


@pytest.fixture
def date_time():
    return datetime.now()


@pytest.fixture
def user_update_json(random_email):
    return {
        'user_name': 'update_user_name',
        'email': random_email,
        'role_id': 'power_user',
        'first_name': 'update_first_name',
        'last_name': 'update_last_name',
        'locale_id': 'ru',
        'time_zone': 10,
        'remarks': 'update_remarks'
    }


@pytest.fixture
def user_fm_db(
        test_client_unit,
        url_users):
    try:
        # Check whether user exists
        user = None
        user = UserModel.find_last()
    except OperationalError:
        test_client_unit.get(url_users)
    finally:
        if user is None:
            user = UserModel.find_last()
        return user


# @pytest.mark.active
def test_application_unit(
        test_client_unit,
        url_users):
    resp = test_client_unit.get(url_users)
    assert resp.status_code == 200


# @pytest.mark.active
def test_user_create(
        user_create_json,
        user_schema,
        user_fm_db):
    '''
    GIVEN a User model
    WHEN a new User is created
    THEN check the email, hashed_password, and role fields are defined correctly
    The following procedures tested:
    schema load and dump
    find_by_email
    delete_fm_db
    save_to_db
    check_password
    '''
    _user_create_json = user_create_json.copy()  # avoid dictionary changing
    # Below to remove user with same email if exists.
    # Create and save user.
    _user = user_schema.load(_user_create_json)
    _user.save_to_db()
    _user_created = UserModel.find_by_id(_user.id)
    _password = user_create_json.pop('password')
    # print(_password)
    for key in user_create_json.keys():
        # print(key)
        assert getattr(_user_created, key) == user_create_json[key]
    assert _user_created.check_password(_password) is True


# @pytest.mark.active
def test_user_update(
        user_fm_db,
        user_update_json):
    # _user_create_json = user_create_json.copy()  # avoid dictionary changing
    user_fm_db.update(user_update_json)
    _user_after = UserModel.find_by_id(user_fm_db.id)
    # print(user_schema.dump(_user_fm_db_after))
    for key in user_update_json.keys():
        # print(key)
        assert getattr(_user_after, key) == user_update_json[key]
    assert _user_after.is_own_id(user_fm_db.id) is True
    assert _user_after.is_own_email(user_fm_db.email) is True
    assert _user_after.is_valid is True


# @pytest.mark.active
@pytest.mark.parametrize(
    'password',
    [
        ('1234'),
        ('kaljgi(87%^78'),
        ('askojiiI*Y&')
    ])
def test_user_update_password(
        user_fm_db,
        password):
    user_fm_db.update_password(password)
    _user_after = UserModel.find_by_id(user_fm_db.id)
    assert _user_after.check_password(password) is True
    assert _user_after.is_admin is not True
    assert _user_after.is_power is True
    assert _user_after.is_valid is True


# @pytest.mark.active
def test_user_get_fresh_token(user_fm_db):
    # print(user_fm_db.id)
    tokens = user_fm_db.get_tokens()
    for key in tokens.keys():
        assert key in ['access_token', 'refresh_token']
        # print(key, '\t', type(tokens[key]))
        assert isinstance(tokens[key], str)

    fresh_token = user_fm_db.get_fresh_token()
    assert isinstance(fresh_token, str)
