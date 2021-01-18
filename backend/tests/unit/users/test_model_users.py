import pytest
from datetime import datetime
from random import randint

from application.users.models.users import UserModel

from application.global_init_data import global_constants
from application.users.local_init_data_users import users_constants


@pytest.fixture
def date_time():
    return datetime.now()


@pytest.fixture
def default_user_json():
    '''
    Fields values set automatically (by default) while creating user
    with email and password.
    '''
    # After save condition
    return {
        'id': 'int',
        'created': 'str',
        'updated': 'None',
        'accessed': 'None',
        'user_name': 'None',
        'email': 'str',
        'role_id': 'None',
        'first_name': 'None',
        'last_name': 'None',
        'locale_id': 'str',
        'time_zone': 'int',
        'remarks': 'None'}


@pytest.fixture(scope='module')
def saved_user(
        user_create_json,
        user_schema):
    _user = user_schema.load(user_create_json())
    _user.save_to_db()
    return _user


# @pytest.mark.active
def test_user_find_all():
    '''
    Get list of user without searching criterian or emply criteraon.
    '''
    _result1 = UserModel.find()
    _result2 = UserModel.find({})
    _result3 = UserModel.find(None)
    assert len(_result1) == len(_result2)
    assert len(_result1) == len(_result3)


# @pytest.mark.active
def test_user_find(
        allowed_language, random_text, random_text_underscore,
        user_instance, user_get_schema):
    '''
    Create 3 user models, save and find them correctly.
    '''
    _users = []
    # print(allowed_language())
    _values1 = {'first_name': random_text(lang=allowed_language)}
    _users.append(user_instance(_values1))
    _values2 = {**_values1, 'last_name': random_text(lang=allowed_language)}
    _users.append(user_instance(_values2))
    _values3 = {
        **_values2, 'user_name': random_text_underscore(lang=allowed_language, qnt=2)}
    _users.append(user_instance(_values3))
    for _user in _users:
        _user.save_to_db()
        # print(user_get_schema.dump(_user))

    _result1 = UserModel.find(_values1)
    assert len(_result1) == 3
    for item in _result1:
        for key in _values1.keys():
            assert _values1[key] == user_get_schema.dump(item)[key]

    _result2 = UserModel.find(_values2)
    assert len(_result1) == 3
    for item in _result2:
        for key in _values2.keys():
            assert _values2[key] == user_get_schema.dump(item)[key]

    _result3 = UserModel.find(_values3)
    assert len(_result1) == 3
    # print(len(_result3))
    for item in _result3:
        for key in _values3.keys():
            assert _values3[key] == user_get_schema.dump(item)[key]
            # print(user_get_schema.dump(item)[key])

    for _user in _users:
        _user.delete_fm_db()


# @pytest.mark.active
def test_default_user_create(
        saved_user,
        user_create_json, default_user_json,
        user_get_schema):
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
    # print(saved_user)
    _saved_user_json = user_get_schema.dump(saved_user).copy()
    for key in _saved_user_json.keys():
        if key in [
            none_key for (none_key, value) in default_user_json.items()
                if value == 'None']:
            assert _saved_user_json[key] is None
            # print(key, '\t', _saved_user_json[key])
        if key in [
            none_key for (none_key, value) in default_user_json.items()
                if value == 'str']:
            assert isinstance(_saved_user_json[key], str)
            # print(key, '\t', type(_saved_user_json[key]))
        if key in [
            none_key for (none_key, value) in default_user_json.items()
                if value == 'int']:
            assert isinstance(_saved_user_json[key], int)
            # print(key, '\t', type(_saved_user_json[key]))


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


@pytest.fixture
def user_update_json(
        default_user_json,
        random_email, random_text):
    _user_update_json = {
        key: value for (key, value) in default_user_json.items()
        if key not in ['id', 'created', 'updated', 'accessed']}
    lang = global_constants.get_LOCALES[0]['id']
    _user_update_json['user_name'] = random_text(lang=lang, qnt=2)
    _user_update_json['email'] = random_email()
    _user_update_json['role_id'] = users_constants.get_ROLES[0]['id']
    _user_update_json['first_name'] = random_text(lang=lang)
    _user_update_json['last_name'] = random_text(lang=lang)
    _user_update_json['locale_id'] = lang
    _user_update_json['time_zone'] = randint(-12, 12)
    _user_update_json['remarks'] = random_text(lang=lang, qnt=12)
    # for key in _user_update_json.keys():
    #     print(key, '\t', _user_update_json[key])
    return _user_update_json


# @pytest.mark.active
def test_user_update(
        user_get_schema,
        saved_user,
        user_update_json):
    _user = saved_user
    _user_id = _user.id  # For further getting the user from db.
    _user_update_json = user_update_json.copy()  # To avoind original changed.
    # Insure user has not been chenched after creation:
    assert user_get_schema.dump(_user)['updated'] is None
    # Update each element separatelly:
    for key in _user_update_json.keys():
        _update_dict = {}
        _update_dict[key] = user_update_json[key]
        _user.update(_update_dict)
    # Get updated user from db.
    _updated_user = UserModel.find_by_id(_user_id)
    # Insure all elements are updated correctly:
    for key in _user_update_json.keys():
        assert _user_update_json[key] == getattr(_updated_user, key)
    # Insure element updated is not None any more.
    assert isinstance(_updated_user.updated, datetime)


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
def test_user_update_wrong_fk(
        role, role_testing_result,
        language, lang_testing_result,
        user_get_schema, user_schema,
        created_user):

    # print(created_user(role_id=role).id)
    _user_id = created_user().id
    _user = UserModel.find_by_id(_user_id)
    # print(_user)
    _update_json = {
        key: value for (key, value) in user_get_schema.dump(_user).items()
        if key in ['role_id', 'locale_id']}
    _update_json['role_id'] = role
    _update_json['locale_id'] = language
    # print(_update_json)
    result = _user.update(_update_json)
    # print(result)
    if lang_testing_result == 'None' and role_testing_result == 'None':
        assert result is None
    else:
        # print(result)
        result.find('foreign key constraint fails') != -1


# @pytest.mark.active
@pytest.mark.parametrize(
    'password',
    [
        ('1234'),
        ('kaljgi(87%^78'),
        ('askojiiI*Y&')
    ])
def test_user_update_password(
        password,
        created_user):
    _user_id = created_user().id  # Get id for further reference.
    _user = UserModel.find_by_id(_user_id)  # Get user from db.
    _wrong_password = password + 'wrong'  # Prepare wrong password.
    _user.update_password(password)
    _user_after = UserModel.find_by_id(_user_id)
    assert _user_after.accessed is None
    assert _user_after.check_password(password)
    assert not _user_after.check_password(_wrong_password)
    assert isinstance(_user_after.accessed, datetime)
    # print(type(_user_after.accessed))


# @pytest.mark.active
def test_user_get_fresh_token(created_user):
    # print(created_user.id)
    _user = created_user()
    tokens = _user.get_tokens()
    for key in tokens.keys():
        assert key in ['access_token', 'refresh_token']
        # print(key, '\t', type(tokens[key]))
        assert isinstance(tokens[key], str)

    fresh_token = _user.get_fresh_token()
    assert isinstance(fresh_token, str)


# @pytest.mark.active
def test_user_most_recent_confirmation(created_user):
    _user = created_user()
    _confirmation = _user.most_recent_confirmation
    assert _user.id == _confirmation.user_id
    assert not _confirmation.confirmed
    # print(_confirmation.user_id)


# @pytest.mark.active
def test_usermodel_send_confirmation_request(
        created_user):
    _user = created_user()
    # print('test_usermodel_send_confirmation_request _user.id -', _user.id)
    _user.send_confirmation_request()
    # print('User ID -', _user.id)
    # for item in user_schema.dump(_user):
    #     print(item, '\t', user_schema.dump(_user)[item])
    # _user.send_confirmation_request()


# @pytest.mark.active
def test_user_is(created_user):
    _user = created_user()
    assert not _user.is_own_id(_user.id - 1)
    assert _user.is_own_id(_user.id)

    assert not _user.is_own_email(_user.email + '_')
    assert _user.is_own_email(_user.email)

    assert not _user.is_valid
    _update_json = {}
    _update_json['role_id'] = users_constants.get_ROLES[0]['id']
    _user.update(_update_json)
    assert _user.is_valid
    _update_json['role_id'] = users_constants.get_ROLES[1]['id']
    _user.update(_update_json)
    assert _user.is_power
    _update_json['role_id'] = users_constants.get_ROLES[2]['id']
    _user.update(_update_json)
    assert _user.is_admin

    # print(_user.role_id)


# @pytest.mark.active
def test_user_finds(created_user):
    _user = created_user()
    _found_user = UserModel.find_last()
    assert _user.id == _found_user.id

    # print(_user)
    # print(_found_user)

    _found_user = UserModel.find_by_id(_user.id)
    assert _user.email == _found_user.email
    _found_user = UserModel.find_by_id(_user.id + 1)
    assert _found_user is None

    _found_user = UserModel.find_by_email(_user.email)
    assert _user.id == _found_user.id
    _found_user = UserModel.find_by_email(_user.email + '-')
    assert _found_user is None
