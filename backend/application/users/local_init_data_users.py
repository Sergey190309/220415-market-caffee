class DefaultAdmin():
    '''
    Those credentials would be loaded with id = 1 and role = admin
    '''
    def __init__(self):
        self._admin = {
            'id': 1,
            'user_name': 'admin',
            'email': 'a@agatha-ng.com',
            'password': 'qwer',
            'role_id': 'admin',
            'locale_id': 'en',
            'time_zone': 3,
            'remarks': (
                "It's dummy admin to handle database. "
                "It's better, at least, to change email for "
                "real one and password for strong one."
            )
        }

    @property
    def get_default_admin(self):
        return self._admin


default_admin = DefaultAdmin()


class UsersConstants():
    '''
    The class contains constants that are accessible by all elements
    from users blueprint.
    '''
    def __init__(self):
        # Below is initial data for users' roles table:
        self._ROLES = [
            {'id': 'user', 'remarks': 'Registered user after confirmation.'},
            {'id': 'power_user', 'remarks': 'By admin decision.'},
            {'id': 'admin', 'remarks': 'By owners decision.'}]
        # This is a perion after confirmation exparation in
        # seconds after user confirmaiton.
        self._CONFIRMATION_EXPIRATION_DELTA = 30 * 60  # 30 minutes.
        # Confirmation e-mail details.

    @property
    def get_ROLES(self):
        return self._ROLES

    @property
    def get_CONFIRMATION_EXPIRATION_DELTA(self):
        # print('globals -', self._CONFIRMATION_EXPIRATION_DELTA)
        return self._CONFIRMATION_EXPIRATION_DELTA


users_constants = UsersConstants()
