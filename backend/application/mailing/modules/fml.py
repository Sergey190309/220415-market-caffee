'''
Flask-Mail application
'''
# from typing import List
# from flask import jsonify
from flask_mailing import Mail, Message
print('\nmailing moduless\n')
import tracemalloc

from ..local_init_data_mailing import confirmation_email_data


class MailMailing(Mail):
    def __init__(self):
        super().__init__()

    async def send(
            self, emails: list = [], link: str = None) -> [Message]:
        # self, emails: List = [], link: str = None) -> [Message]:

        # Here I do not use list to send bulk mails.
        confirmation_email_data.refresh(email=emails[0], link=link)
        ed = confirmation_email_data.email_data
        tracemalloc.start()
        # print('\n fml>MailMailing, emails ->', emails,
        #       '\n  body_html', ed.get('body_html')
        #       )
        msg = Message(
            # recipients=['sa6702@gmail.com'],
            # subject='Test message subject',
            # body='Test message '
            recipients=emails,
            subject=ed['subject'],
            body=ed['body_html'],
        )
        await super().send_message(msg)
        # with super().record_messages() as outbox:
        #     super().send(msg)
        # return outbox
        # return jsonify(
        #     status_code=200,
        #     content={"message": "email has been sent"}
        # )


fml = MailMailing()
