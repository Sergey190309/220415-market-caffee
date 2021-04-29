from datetime import datetime


class Sessions():
    '''
    The list consist of dictionaries:
    Session is
    'id': id sent fo get technical data (locale, list, structure).
    'time_stamp': of id entering.

    Sessions_ids is just a list of ids from session.

    It sould be cleard of old elements on daily basis using 'time_stamp'.
    '''
    sessions = []
    sessions_ids = []

    @classmethod
    def __init__(cls, sessions: list = []):
        # Sessions.sessions = sessions
        cls.sessions = [{
            'id': str(_id),
            'time_stamp': datetime.now().timestamp()
        } for _id in sessions]
        cls.update()
        # print('home, local_init_data, sessions ->', cls.session)
        # any(print(session) for session in cls.sessions)

    @classmethod
    def is_valid(cls, _id: str = '') -> bool:
        '''
        return true if session id is in session_ids
        '''
        return str(_id) in cls.sessions_ids

    @classmethod
    def update(cls):
        '''
        update session_id according to session
        '''
        # print(cls.sessions[0].get('id'))
        cls.sessions_ids = [item.get('id') for item in list(cls.sessions)]

    @classmethod
    def timestamp_by_id(cls, _id: str = ''):
        '''
        That's for testing purpose
        '''
        _timestamp = next((item.get('time_stamp')
                          for item in cls.sessions if item.get('id') == str(_id)), None)
        return _timestamp

    @classmethod
    def getter(cls) -> list:
        '''
        That's for testing purpose only
        '''
        # print(type(cls.sessions))
        return cls.sessions_ids

    @classmethod
    def setter(cls, _id: str = '') -> float:
        '''
        Get string as session id, return timestamp
        '''
        _id = str(_id)
        # remove all instances if it's in session_ids
        while True:
            _session_to_remove = next(
                (item for item in cls.sessions if item.get('id') == _id), None)
            if _session_to_remove is None:
                break
            cls.sessions.remove(_session_to_remove)
        # add new session type
        _timestamp = datetime.now().timestamp()
        # print('\nSessions.setter, _id ->', _id)
        cls.sessions.append({
            'id': _id,
            'time_stamp': _timestamp
        })
        # update session id list
        cls.update()
        return _timestamp

    @classmethod
    def clear(cls, period: float = 0) -> int:
        '''
        The method clear all instances older then period and return qnt of removed ones.
        Period is in seconds.
        '''
        _time_border_to_remove = datetime.now().timestamp() - period
        _count = 0
        while True:
            _session_to_remove = next((item for item in cls.sessions if item.get(
                'time_stamp') < _time_border_to_remove), None)
            if _session_to_remove is None:
                break
            cls.sessions.remove(_session_to_remove)
            _count += 1
        cls.update()
        return _count


sessions = Sessions()
