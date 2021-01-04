'''
Flask-Mail application
'''
from typing import List
from flask_mail import Mail, Message

from ..local_init_data_mailing import confirmation_email_data


class MailMailing(Mail):
    def __init__(self):
        super().__init__()

    def send(self, emails: List = [], link: str = None) -> [Message]:

        # Here I do not use list to send bulk mails.
        confirmation_email_data.refresh(email=emails[0], link=link)
        ed = confirmation_email_data.email_data
        # print(ed)
        msg = Message(
            subject=ed['subject'],
            html=ed['body_html'],
            recipients=emails,
        )
        # print('Link -', link)
        with super().record_messages() as outbox:
            super().send(msg)
        # print(outbox)
        return outbox


fml = MailMailing()
