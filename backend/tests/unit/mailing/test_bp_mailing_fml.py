# import pytest
from flask import current_app

# from application.globals import confirmation_email_data
from application.mailing.modules.fml import fml


# @pytest.mark.active
def test_mailing_fml_send(test_client, random_email):
    _email = random_email()
    _link = 'test_link'
    outbox = fml.send([_email], _link)

    assert len(outbox) == 1
    _default_sender = list(current_app.config['MAIL_DEFAULT_SENDER'])
    assert _default_sender[0] == outbox[0].sender.split(' ')[0]
    assert _default_sender[1] == outbox[0].sender.split(' ')[1][1:-1]
    # print()
    assert _email == outbox[0].recipients[0]
    assert _link in outbox[0].html
    # print(outbox[0].html)
