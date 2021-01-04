from typing import Dict

from flask_babelplus import lazy_gettext as _


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
