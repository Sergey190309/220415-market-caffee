# import pytest
# from typing import Dict
# from typing import Dict, List
# from datetime import datetime
# from random import randint

from application.users.models.users import UserModel
from application.users.models.confirmations import ConfirmationModel
from application.users.modules.dbs_init_users import create_default_admin

# from application.global_init_data import global_constants
# from application.users.local_init_data_users import users_constants


# @pytest.mark.active
def test_user_find_all(saved_user_instance, user_get_schema):
    '''
    Get list of user without searching criterian or emply criteraon.
    '''
    # Clean up user table
    ConfirmationModel.query.delete()
    UserModel.query.delete()
    create_default_admin()

    # create couple of users for searching
    _user_keys = []
    _user_gens = []
    _users = []
    _user_keys.append({'user_name': 'Sergey'})  # [0]
    _user_keys.append({**_user_keys[0], 'role_id': 'admin'})  # [1]
    for index, _user_key in enumerate(_user_keys):
        _user_gens.append(saved_user_instance(_user_key))
        # print('\nunit, users, test_user_find_all, _user_gen ->', _user_gens[index])
        _users.append(next(_user_gens[index]))
        print('\nunit, users, test_user_find_all, _user ->', _users[index])

    # find by user name
    _result = UserModel.find(_user_keys[0])
    assert len(_result) == 2
    assert user_get_schema.dump(_result[0]).get(
        'user_name') == _user_keys[0].get('user_name')
    assert user_get_schema.dump(_result[1]).get(
        'role_id') == _user_keys[1].get('role_id')
    print('\nunit, users, test_user_find_all, role_id ->',
          user_get_schema.dump(_result[1]).get('role_id'))
    #   user_schema.dump(_result[1]).get('role_id'))
    # Clean up db
    for _user_gen in _user_gens:
        next(_user_gen)


# @pytest.mark.active
def test_set_access(saved_user_instance, user_get_schema):
    _user_gen = saved_user_instance()
    _user = next(_user_gen)
    assert user_get_schema.dump(_user).get('accessed') is None
    _user.set_accessed()
    assert isinstance(user_get_schema.dump(_user).get('accessed'), str)
    # print('\nunit, users, test_set_access, accessed ->',
    #       type(user_get_schema.dump(_user).get('accessed')))
    next(_user_gen)


# @pytest.mark.active
def test_update_iss(saved_user_instance, user_get_schema):
    _email = 'test@email.mail'

    _user_gen = saved_user_instance()
    _user = next(_user_gen)
    # is_own_id
    _id = user_get_schema.dump(_user).get('id')
    assert _user.is_own_id(_id)
    # is_own_email
    assert not _user.is_own_email(_email)
    _user.update({'email': _email})
    assert _user.is_own_email(_email)
    # is_valid
    assert _user.is_valid
    # is_power
    assert not _user.is_power
    _user.update({'role_id': 'power_user'})
    assert _user.is_power
    # is_power
    assert not _user.is_admin
    _user.update({'role_id': 'admin'})
    assert _user.is_admin

    # print('\nunit, users, test_update_iss, testing ->', _user.is_own_email(_email))
    next(_user_gen)


# @pytest.mark.active
def test_get_tokens(saved_user_instance):
    _user_gen = saved_user_instance()
    _user = next(_user_gen)

    # access tokens
    _result = _user.get_tokens()
    assert 'access_token' in _result.keys()
    assert 'refresh_token' in _result.keys()
    # fresh token
    _result = _user.get_fresh_token()
    assert isinstance(_result, str)

    next(_user_gen)


# @pytest.mark.active
def test_find_by_id_email(saved_user_instance, user_get_schema):
    _email = 'test@email.mail'
    _user_gen = saved_user_instance({'email': _email})
    _user = next(_user_gen)
    # find_by_id
    _id = user_get_schema.dump(_user).get('id')
    _user_id = UserModel.find_by_id(_id)
    assert user_get_schema.dump(_user_id).get('email') == _email
    # find_by_email
    _user_email = UserModel.find_by_email(_email)
    assert user_get_schema.dump(_user_email).get('id') == _id
    # print('\nuser model testing ->', user_get_schema.dump(_user_email).get('id'))
    next(_user_gen)


# @pytest.mark.active
def test_update_password(saved_user_instance):
    _password = 'ojwoi888*()'
    _user_gen = saved_user_instance()
    _user = next(_user_gen)
    # update_password, check_password
    _user.update_password(_password)
    assert _user.check_password(_password)
    # print('\nuser model testing ->', user_get_schema.dump(_user_email).get('id'))
    next(_user_gen)


# @pytest.mark.active
def test_delete_fm_db(saved_user_instance, user_get_schema):
    _user_gen = saved_user_instance()
    _user = next(_user_gen)
    _id = user_get_schema.dump(_user).get('id')
    # just delete created user
    _user_id = UserModel.find_by_id(_id)
    assert isinstance(_user_id, UserModel)
    _user_id.delete_fm_db()
    assert UserModel.find_by_id(_id) is None
    # try to kill admin No1 without and with flag kill_first
    _admin = UserModel.find_by_id(1)
    assert isinstance(_admin, UserModel)
    _admin.delete_fm_db()
    assert isinstance(_admin, UserModel)
    _admin.delete_fm_db(kill_first=True)
    assert UserModel.find_by_id(1) is None
    # Create admin No1 again
    create_default_admin()
    # Clean up db
    next(_user_gen)
