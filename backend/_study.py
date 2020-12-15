import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


message = Mail(
    from_email='noreply201211@gmail.com',
    to_emails='sa6702@gmail.com',
    subject='Test subject',
    html_content='<strong>Test content</strong>'
)
try:
    sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    resp = sg.send(message)
    print(resp.status_code)
    print(resp.body)
    print(resp.headers)

except Exception as err:
    print(err.message)
