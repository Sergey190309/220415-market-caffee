from typing import Dict, Union
from flask_babelplus import lazy_gettext as _


# Global variables here:
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


class GlobalConstants():
    '''
    The class contains constants that are accessible from all application.
    Currently those are:
    '''
    def __init__(self):
        self._ROLES = [
            {'id': 'user', 'remarks': 'Registered user after confirmation.'},
            {'id': 'power_user', 'remarks': 'By admin decision.'},
            {'id': 'admin', 'remarks': 'By owners decision.'}
        ]
        self._LOCALES = [
            {'id': 'ru', 'remarks': 'Общий русский.'},
            {'id': 'en', 'remarks': 'General english.'},
        ]
        # This is a perion after confirmation exparation in
        # seconds after user confirmaiton.
        self._CONFIRMATION_EXPIRATION_DELTA = 30 * 60  # 30 minutes.
        # Confirmation e-mail details.

    @property
    def get_CONFIRMATION_EXPIRATION_DELTA(self):
        # print('globals -', self._CONFIRMATION_EXPIRATION_DELTA)
        return self._CONFIRMATION_EXPIRATION_DELTA

    @property
    def get_ROLES(self):
        return self._ROLES

    @property
    def get_LOCALES(self):
        return self._LOCALES


global_constants = GlobalConstants()


class ConfirmationEmailData():
    def __init__(self, email_data: Dict = None):
        if email_data is not None:
            self.__email_data = email_data
        else:
            self.__email_data = {
                'email_fm': '',
                'subject': '',
                # 'body_text': '',
                'body_html': ''
            }

    @property
    def email_data(self):
        return self.__email_data

    @email_data.setter
    def email_data(self, email_data: Dict):
        self.__email_data = email_data

    def refresh(self, email: str = None, link: str = None) -> None:
        '''
        To update data based on locale set.
        '''
        _email_data = self.email_data.copy()
        _email_data['subject'] = str(_("That's registration confirmatin."))
        # _email_data['body_text'] = str(_('Please follow the link.'))
        _email_data['body_html'] = str(_(
            "<p>Hello Friend,</p>"
            "<p>You or someone else use %(email)s to register on our site.</p>"
            "<p>To finish registration, please follow "
            "<a href=%(link)s><strong>link</strong></a>.</p>"
            "<p>If you did not register, you can simply ignore "
            "this email.</p>"
            "<p>Best regards,</p>"
            "<p>Sergey</p>", email=email, link=link
        ))
        self.email_data = _email_data


confirmation_email_data = ConfirmationEmailData()


class GlobalVariables():
    '''
    The class contains variables that are accessible from all application.
    Currently those with default values are:
    'locale': 'en',
    'time_zone': 'ETC/GMT-3'

    '''
    def __init__(self, values: Dict = {
        # 'locale': 'ru',
        'locale': 'en',
        'time_zone': 'ETC/GMT-3'
    }):

        self.app_globals = values

    def set_globals(self, set_values: Dict):
        for item in set_values:
            # print(item)
            self.app_globals[item] = set_values[item]

    def get_global_by_name(self, get_what: str) -> Union[str, None]:
        # print('get_globals self.app_globals -', self.app_globals)
        if get_what in self.app_globals.keys():
            return self.app_globals[get_what]
        return None

    def get_globals(self) -> Dict:
        return self.app_globals
