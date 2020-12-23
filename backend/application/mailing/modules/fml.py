'''
Flask-Mail application
'''
from typing import List
from flask_mail import Mail, Message

from application.globals import confirmation_email_data


class MailMailing(Mail):
    def __init__(self):
        super().__init__()

    def send(self, emails: List = [], link: str = None) -> bool:
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
        super().send(msg)


fml = MailMailing()
