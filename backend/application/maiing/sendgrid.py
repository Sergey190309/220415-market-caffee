import os
from typing import List, Dict
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content


class SendGrid():
    @classmethod
    def send_confirmation_email(
            cls, email: List[str], subject: str, text: str, link: str) -> Dict:
        print('application.mailing.SendGrid.send_confirmation_email')
