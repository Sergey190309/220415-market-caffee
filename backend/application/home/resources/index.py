'''
It's home page and change locale and time zone.
'''
from datetime import datetime
from flask import request, make_response, render_template
from flask_restful import Resource
from flask_babelplus import format_datetime, format_currency, lazy_gettext as _

from application.modules.fbp import fbp
from application.schemas.locale_time_zone import LocaleTimezoneSchema
# from application.global_init_data import GlobalVariables

locale_timezone_schema = LocaleTimezoneSchema()


class Localization(Resource):
    '''
    Used for changing locale and time sone according to information in json.
    '''
    @classmethod
    def post(cls):
        # Guess it's testing only
        _locale_timezone = locale_timezone_schema.load(request.get_json())
        payload = fbp.set_locales(_locale_timezone)
        return {
            'message': str(_('Global variables are as in payload.')),
            'payload': payload
        }, 200


class Index(Resource):
    '''
    Initial test for application work-ability.
    '''
    @classmethod
    def post(cls):
        test_json = request.get_json()

        fbp.set_lng(request.headers.get('Accept-Language'))

        if test_json['what'] == 'date':
            payload = str(
                _('Date now is ') + format_datetime(datetime.now(), "dd LLL Y")
            )
            message = str(_('You asked about date'))
        elif test_json['what'] == 'time':
            payload = str(
                _('Time is ') + format_datetime(datetime.now(), 'HH:mm:ss Z')
            )
            message = str(_('You asked about time'))
        else:
            message = str(_(
                'Not clear what do you want. '
                'I know date and time only. Please specify.'))
            payload = None
        output = {
            "message": message,
            "payload": payload
        }
        return output

    @classmethod
    def get(cls):
        # greetings = 'Hi there!'
        greetings = _('Hi there!')
        # message = 'I plan to do something from this project.'
        message = _('I plan to do something from this project.')

        # date = 'Date now is ' + str(datetime.now())
        date = _('Date now is ') + format_datetime(datetime.now(), "dd LLL Y")
        # time = 'Time is ' + datetime.now()
        time = _('Time is ') + format_datetime(datetime.now(), 'HH:mm:ss Z')
        amount = format_currency(2256.22, 'RUR')
        return make_response(render_template(
            'index.html',
            greetings=greetings,
            message=message,
            date=date,
            time=time,
            amount=amount
        ))
