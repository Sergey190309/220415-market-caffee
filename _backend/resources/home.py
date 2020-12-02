'''
It's test index page.
'''
from datetime import datetime
from flask import request, make_response, render_template
from flask_restful import Resource
from flask_babelplus import format_datetime, format_currency, lazy_gettext as _


class Index(Resource):
    '''
    Initial test for application work-ability.
    '''
    @classmethod
    def post(cls):
        _json = request.get_json()
        print('home.index.post _json -', _json)

    @classmethod
    def get(cls):
        greetings = _('Hi there!')
        message = _('I plan to do something from this project.')

        date = _('Date now is ') + format_datetime(datetime.now(), "dd LLL Y")
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
