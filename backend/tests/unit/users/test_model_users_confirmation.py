import pytest

# from random import randint
# from time import time

from application.users.models.confirmations import ConfirmationModel


# @pytest.fixture
# def confirmaion_instance():
#     _confirmaion = ConfirmationModel(user_id=randint(2, 10))
#     # print(_confirmaion.id)
#     # _confirmaion.save_to_db()
#     return _confirmaion
#     # confirmation_left = ConfirmationModel.find_first()
#     # while confirmation_left:
#     #     # print(confirmation_left.user_id)
#     #     confirmation_left.delete_fm_db()
#     #     confirmation_left = ConfirmationModel.find_first()
#     # # print('Nothing left')


@pytest.fixture
def saved_confirmaion_instance(client, saved_user_instance, user_get_schema):
    def _method():
        _user_gen = saved_user_instance()
        _user = next(_user_gen)
        _confimation = ConfirmationModel(user_id=user_get_schema.dump(_user).get('id'))
        _confimation.save_to_db()
        yield _confimation
        if _confimation.is_exist:
            _confimation.delete_fm_db()
        if _user.is_exist:
            _user.delete_fm_db()
        yield
    return _method

    # yield _confimation


# @pytest.mark.active
def test_confirmaion_finds_all(saved_confirmaion_instance):
    _confirmaiton_gen = saved_confirmaion_instance()
    _confirmaiton = next(_confirmaiton_gen)
    _id = _confirmaiton.id
    _user_id = _confirmaiton.user_id
    # find_by_id
    _user_by_id = ConfirmationModel.find_by_id('0')
    assert _user_by_id is None
    _user_by_id = ConfirmationModel.find_by_id(_id)
    assert _user_by_id.id == _id
    # find_by_user_id
    _user_by_user_id = ConfirmationModel.find_by_user_id('_user_id')
    assert _user_by_user_id is None
    _user_by_user_id = ConfirmationModel.find_by_user_id(_user_id)
    assert _user_by_user_id.id == _id
    # find_first
    _user_find_first = ConfirmationModel.find_first()
    assert _user_find_first.id == _id
    next(_confirmaiton_gen)
    # _user_find_first = ConfirmationModel.find_first()
    # assert _user_find_first is None


# @pytest.mark.active
def test_confirmaion_iss_force_to_expier(saved_confirmaion_instance):
    _confirmaiton_gen = saved_confirmaion_instance()
    _confirmaiton = next(_confirmaiton_gen)
    # is_exist
    assert _confirmaiton.is_exist
    # is_confirmed
    assert not _confirmaiton.is_confirmed
    _confirmaiton.confirmed = True
    assert _confirmaiton.is_confirmed
    # is_expired
    assert not _confirmaiton.is_expired
    _confirmaiton.force_to_expire()
    assert _confirmaiton.is_expired
    next(_confirmaiton_gen)
