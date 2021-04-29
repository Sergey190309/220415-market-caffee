# import pytest
from time import sleep
from uuid import uuid4

from application.home.local_init_data_home import Sessions


# @pytest.mark.active
def test_setter():
    _ids = [uuid4() for i in range(3)]
    _sessions = Sessions(_ids)
    # _sessions = sessions_instance(ids=_ids)
    assert len(_sessions.getter()) == 3
    # add one new unique id
    _uuid = uuid4()
    _sessions.setter(_uuid)
    _timestamp = _sessions.timestamp_by_id(_uuid)
    assert len(_sessions.getter()) == 4
    # add again id but same as already added setter will delete
    # previous instance
    _sessions.setter(_uuid)
    assert len(_sessions.getter()) == 4
    assert _timestamp < _sessions.timestamp_by_id(_uuid)
    # print('\ntest, unit, home timestamp ->', _timestamp)
    # print('\ntest, unit, home timestamp ->', _sessions.timestamp_by_id(_uuid))
    # any(print(_id) for _id in _sessions.getter())


# @pytest.mark.active
def test_is_valid():
    _ids = [uuid4() for i in range(5)]
    _uuid = uuid4()
    _ids.insert(int(len(_ids) / 2), _uuid)
    _sessions = Sessions(_ids)
    assert len(_sessions.getter()) == 6
    assert _sessions.is_valid(_uuid)

    # _sessions = sessions_instance(ids=_ids)
    # add one new unique id
    # print('\ntest, unit, home timestamp ->', _timestamp)
    # print('\ntest, unit, home timestamp ->', _sessions.timestamp_by_id(_uuid))
    # any(print(_id) for _id in _sessions.getter())


# @pytest.mark.active
def test_timestamp_by_id():
    _ids = [uuid4() for i in range(5)]
    _sessions = Sessions(_ids)
    _uuid = uuid4()
    _timestamp = _sessions.setter(_uuid)
    assert len(_sessions.getter()) == 6
    assert _sessions.timestamp_by_id(_uuid) == _timestamp
    assert _sessions.timestamp_by_id('_uuid') is None
    assert _sessions.timestamp_by_id() is None
    # print('\ntest, unit, home timestamp ->', _timestamp)


# @pytest.mark.active
def test_clean():
    _ids = [uuid4() for i in range(5)]
    _sessions = Sessions(_ids)
    sleep(.5)
    _uuid00 = uuid4()
    _uuid01 = uuid4()
    _sessions.setter(_uuid00)
    _sessions.setter(_uuid01)
    assert len(_sessions.getter()) == 7
    # nothing cleared
    print()
    _qnt = _sessions.clear(1)
    assert _qnt == 0
    assert len(_sessions.getter()) == 7
    _qnt = _sessions.clear(.5)
    assert _qnt == 5
    assert len(_sessions.getter()) == 2
    _qnt = _sessions.clear()
    assert _qnt == 2
    assert len(_sessions.getter()) == 0
