import pytest
from datetime import datetime

from sqlalchemy.exc import OperationalError
# from flask import current_app

from application import create_app
from application.users.models.users import UserModel

from application.global_init_data import global_constants
from application.users.local_init_data_users import users_constants


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
        'email': random_email(),
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
    user_create_json_dict = user_create_json()
    _user_create_json = user_create_json_dict.copy()  # avoid dictionary changing
    # Below to remove user with same email if exists.
    # Create and save user.
    _user = user_schema.load(_user_create_json)
    _user.save_to_db()
    _user_created = UserModel.find_by_id(_user.id)
    _password = user_create_json_dict.pop('password')
    # print(_password)
    for key in user_create_json_dict.keys():
        # print(key)
        assert getattr(_user_created, key) == user_create_json_dict[key]
    assert _user_created.check_password(_password) is True


# @pytest.mark.active
@pytest.mark.parametrize(
    'role, role_testing_result', [
        (users_constants.get_ROLES[0]['id'], 'None'),
        ('not', 'message'),
        ('', 'message')
    ])
@pytest.mark.parametrize(
    'language, lang_testing_result', [
        (global_constants.get_LOCALES[0]['id'], 'None'),
        ('not', 'message'),
        ('', 'message')
    ])
def test_user_save_wrong_fk(
        role, role_testing_result,
        language, lang_testing_result,
        user_get_schema, user_schema,
        created_user):

    # print(created_user(role_id=role).id)
    _user = UserModel.find_by_id(created_user().id)
    # user_schema.load(user_get_schema.dump(created_user(role_id=role)))
    # print(_user.id, '\t', _user.role_id, '\t', _user.locale_id)
    # print(role, '\t', language)
    _user.role_id = role
    _user.locale_id = language
    result = _user.save_to_db()
    if lang_testing_result == 'None' and role_testing_result == 'None':
        assert result is None
    else:
        # print(result)
        result.find('foreign key constraint fails') != -1


# @pytest.mark.active
def test_user_update(
        user_fm_db,
        user_update_json):
    # _user_create_json = user_create_json.copy()  # avoid dictionary changing
    _user_update_json = user_update_json.copy()
    user_fm_db.update(_user_update_json)
    _user_after = UserModel.find_by_id(user_fm_db.id)
    # print(user_schema.dump(_user_fm_db_after))
    for key in _user_update_json.keys():
        # print(key)
        assert getattr(_user_after, key) == _user_update_json[key]
    assert _user_after.is_own_id(user_fm_db.id) is True
    assert _user_after.is_own_email(user_fm_db.email) is True
    assert _user_after.is_valid is True


# @pytest.mark.active
@pytest.mark.parametrize(
    'role, role_testing_result', [
        # (users_constants.get_ROLES[0]['id'], 'None'),
        ('not', 'message'),
        # ('', 'message')
    ])
@pytest.mark.parametrize(
    'language, lang_testing_result', [
        (global_constants.get_LOCALES[0]['id'], 'None'),
        # ('not', 'message'),
        # ('', 'message')
    ])
def test_user_update_wrong_fk(
        role, role_testing_result,
        language, lang_testing_result,
        user_get_schema, user_schema,
        created_user):

    # print(created_user(role_id=role).id)
    _user = UserModel.find_by_id(created_user().id)
    # user_schema.load(user_get_schema.dump(created_user(role_id=role)))
    # print(_user.id, '\t', _user.role_id, '\t', _user.locale_id)
    # print(role, '\t', language)
    _update_json = user_get_schema.dump(_user)
    _update_json.pop('accessed')
    _update_json.pop('created')
    _update_json.pop('updated')
    _user.role_id = role
    _user.locale_id = language
    print(_update_json)
    result = _user.update(_update_json)
    print(result)
    if lang_testing_result == 'None' and role_testing_result == 'None':
        assert result is None
    else:
        print(result)
        # result.find('foreign key constraint fails') != -1


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


# @pytest.mark.active
def test_usermodel_send_confirmation_request(
        created_user,
        user_schema):
    _user = created_user()
    # print('test_usermodel_send_confirmation_request _user.id -', _user.id)
    _user.send_confirmation_request()
    # print('User ID -', _user.id)
    # for item in user_schema.dump(_user):
    #     print(item, '\t', user_schema.dump(_user)[item])
    # _user.send_confirmation_request()
