from typing import Dict

from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_babelplus import lazy_gettext as _

from application.modules.fbp import fbp
from application.users.models import UserModel
from ..models.views import ViewModel
from ..schemas.views import view_schema


class ViewList(Resource):
    '''
    The resource give list of available view in the system.
    User should be admin.
    '''
    @classmethod
    @jwt_required
    def get(cls) -> Dict:
        '''
        Just list of users. Admin rights are required.
        '''
        # print('\nViewList, get, Accept-Language ->',
        #       request.headers.get('Accept-Language'))
        fbp.set_lng(request.headers.get('Accept-Language'))

        if UserModel.find_by_id(get_jwt_identity()).is_admin:
            payload = [
                view_schema.dump(_view) for _view in ViewModel.find()
            ]
            count = len(payload)
            return {
                'message': str(_(
                    "There are %(count)s views in our database as follows:",
                    count=count)),
                'payload': payload
            }, 200
        else:
            return {
                'message': str(_(
                    "Sorry, access to views' information is allowed to admin only."
                ))
            }, 401
