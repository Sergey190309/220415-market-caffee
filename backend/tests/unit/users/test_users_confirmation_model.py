import pytest

from random import randint
from time import time

from application.users.models.confirmations import ConfirmationModel


@pytest.fixture
# @pytest.yield_fixture
def confirmaion_instance():
    confirmaion = ConfirmationModel(randint(1, 10))
    # print(confirmaion.id)
    # confirmaion.save_to_db()
    yield confirmaion
    confirmation_left = ConfirmationModel.find_first()
    while confirmation_left:
        # print(confirmation_left.user_id)
        confirmation_left.delete_fm_db()
        confirmation_left = ConfirmationModel.find_first()
    # print('Nothing left')


# @pytest.mark.active
def test_confirmaion_save_finds_delete(test_client, confirmaion_instance):
    # print()
    _id = confirmaion_instance.id
    confirmaion_instance.save_to_db()
    _confirmaion_by_id = ConfirmationModel.find_by_id(confirmaion_instance.id)
    _confirmaion_by_user_id = ConfirmationModel.find_by_user_id(
        confirmaion_instance.user_id)
    assert confirmaion_instance.id == _confirmaion_by_user_id.id
    assert confirmaion_instance.id == _confirmaion_by_id.id
    assert confirmaion_instance.user_id == _confirmaion_by_user_id.user_id
    assert confirmaion_instance.user_id == _confirmaion_by_id.user_id
    assert confirmaion_instance.expire_at == _confirmaion_by_user_id.expire_at
    assert confirmaion_instance.expire_at == _confirmaion_by_id.expire_at
    assert confirmaion_instance.confirmed == _confirmaion_by_user_id.confirmed
    assert confirmaion_instance.confirmed == _confirmaion_by_id.confirmed
    confirmaion_instance.delete_fm_db()
    _confirmaion_by_id = ConfirmationModel.find_by_id(_id)
    assert _confirmaion_by_id is None


# @pytest.mark.active
def test_confirmation_expiring(test_client, confirmaion_instance):
    # print()
    # Maturity in seconds
    _maturity = confirmaion_instance.expire_at - int(time())
    assert 1790 <= _maturity <= 1800
    assert not confirmaion_instance.is_expired

    # Forse expiring.
    confirmaion_instance.force_to_expire()
    _maturity = confirmaion_instance.expire_at - int(time())
    assert _maturity <= 0
    assert confirmaion_instance.is_expired


# @pytest.mark.active
def test_confirmation_confirmed(test_client, confirmaion_instance):
    # print()
    assert not confirmaion_instance.is_confirmed
    confirmaion_instance.confirmed = True
    assert confirmaion_instance.is_confirmed
    # print('Confirmed', confirmaion_instance.is_confirmed)
