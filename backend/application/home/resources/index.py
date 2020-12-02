'''
It's test home page.
'''
from datetime import datetime
from flask import request, make_response, render_template
from flask_restful import Resource
# from flask_babelplus import format_datetime, format_currency, lazy_gettext as _


class Index(Resource):
    '''
    Initial test for application work-ability.
    '''
    @classmethod
    def post(cls):
        test_json = request.get_json()
        print(test_json['what'])

        if test_json['what'] == 'date':
            payload = str(
                'Date now is ' + str(datetime.now())
                # _('Date now is ') + format_datetime(datetime.now(), "dd LLL Y")
            )
            message = 'You asked about date'
            # message = str(_('You asked about date'))
        elif test_json['what'] == 'time':
            payload = str(
                'Time is ' + str(datetime.now())
                # _('Time is ') + format_datetime(datetime.now(), 'hh:mm:ss Z')
            )
            message = 'You asked about time'
        else:
            message = (
                # message = str(_(
                'Not clear what do you want. '
                'I know date and time only. Please specify.')
            # 'I know date and time only. Please specify.'))
            payload = None
        output = {
            "message": message,
            "payload": payload
        }
        return output

    @classmethod
    def get(cls):
        greetings = 'Hi there!'
        # greetings = _('Hi there!')
        message = 'I plan to do something from this project.'
        # message = _('I plan to do something from this project.')

        date = 'Date now is ' + str(datetime.now())
        # date = _('Date now is ') + format_datetime(datetime.now(), "dd LLL Y")
        # time = 'Time is ' + datetime.now()
        # time = _('Time is ') + format_datetime(datetime.now(), 'HH:mm:ss Z')
        # amount = format_currency(2256.22, 'RUR')
        return make_response(render_template(
            'index.html',
            greetings=greetings,
            message=message,
            date=date,
            # time=time,
            # amount=amount
        ))
