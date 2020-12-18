import os
from typing import Dict
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content


class SendGrid():
    def __init__(self):
        pass

    @classmethod
    def send_confirmation_email(
            cls,
            email_to: str,
            link: str,
            email_data: Dict) -> Dict:
        print('application.mailing.SendGrid.send_confirmation_email')
        print(email_to)
        print(link)
        print(email_data['email_fm'])
        print(email_data['subject'])
        print(email_data['body_text'])

        sg = SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
        from_email = Email(email_data['email_fm'])
        # Change to your verified sender
        to_email = To(email_to)  # Change to your recipient
        subject = email_data['subject']
        content = Content("text/plain", email_data['body_text'])
        mail = Mail(from_email, to_email, subject, content)

        # Get a JSON-ready representation of the Mail object
        mail_json = mail.get()

        # Send an HTTP POST request to /mail/send

        try:
            pass
            # response = sg.client.mail.send.post(request_body=mail_json)
            # print(response.status_code)
            # print(response.body)
            # print(response.headers)
        except Exception as err:
            print(err.message)
