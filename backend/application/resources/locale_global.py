from typing import Dict
from flask import request
from flask_restful import Resource
from flask_babelplus import lazy_gettext as _
from flask_jwt_extended import jwt_required, get_jwt_identity

# from application.modules.dbs_global import dbs_global
from application.modules.fbp import fbp
# from application.users.models import UserModel

from application.models.locales_global import LocaleGlobalModel
from application.schemas.locales_global import locale_global_schema
from application.home.local_init_data_home import sessions


def no_access() -> Dict:
    return {
        'message': str(_(
            "Sorry, access to locales' information is allowed to admin"
            " only."
        ))
    }, 401


class LocalesGlobal(Resource):
    @classmethod
    @jwt_required()
    def get(cls) -> Dict:
        '''
        The resource give list of available locales in the system based
        on back-end info.
        Request should contains tech_token with valid session id.
        '''
        fbp.set_lng(request.headers.get('Accept-Language'))
        if not sessions.is_valid(get_jwt_identity()):
            return {
                'message': str(_(
                    "Something went wrong. Check tech_token and sessions"
                    " set up."))
            }, 500
        payload = [
            locale_global_schema.dump(
                _view) for _view in LocaleGlobalModel.find()
        ]
        count = len(payload)
        return {
            'message': str(_(
                "There are %(count)s locales in our database as follows:",
                count=count)),
            'payload': payload
        }, 200


class LocaleGlobal(Resource):
    pass
