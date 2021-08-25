from typing import Dict

from flask import request
from flask_restful import Resource
from flask_jwt_extended import (
    get_jwt,
    # get_jti,
    # get_raw_jwt,
    get_jwt_identity,
    jwt_required,
    # jwt_refresh_token_required
)
from flask_babelplus import lazy_gettext as _
# from ..modules.fbc import fbc

from application.modules.fbp import fbp
from ..models.users import UserModel
from ..modules.blacklist import BLACKLIST


class UserLogin(Resource):
    @classmethod
    def post(cls) -> Dict:
        '''
        LogIn
        '''
        # print(request.headers.get('Accept-Language'))
        fbp.set_lng(request.headers.get('Accept-Language'))
        _json = request.get_json()
        _user = UserModel.find_by_email(_json['email'])
        # print('UserLogin.post', _json)
        if _user is None:
            return {
                'message': str(_(
                    "User with email '%(email)s' has not been found.",
                    email=_json['email'])),
            }, 404
        else:
            if not _user.check_password(_json.get('password')):
                return {
                    'message': str(_(
                        "Wrong password for user with email '%(email)s'.",
                        email=_json['email'])),
                }, 400
                # print('UserLogin.post user.role_id -', _user.role_id)
            else:
                if not _user.is_valid:
                    return {
                        'message': str(_(
                            "It seems you have not confirm your account. "
                            "Check email stated - '%(email)s'.",
                            email=_json['email'])),
                    }, 400
        _user.set_accessed()
        _user_info = _user.get_tokens()
        return {
            'message': str(_(
                # "Hi! You are welcome.")),
                "Hi '%(user_name)s'! You are welcome.",
                user_name=_user_info['user_name'])),
            'payload': _user_info
        }, 200

    @classmethod
    @jwt_required()
    def delete(cls) -> Dict:
        '''
        LogOut
        '''
        fbp.set_lng(request.headers.get('Accept-Language'))
        jti = get_jwt()['jti']  # jti is "JWT ID", a unique identifier for a JWT.
        # get_raw_jwt()['jti']
        BLACKLIST.add(jti)
        return {"message": str(_("Successfully logged out."))}, 200

    @classmethod
    @jwt_required(refresh=True)
    def put(cls):
        '''
        Token refresh
        '''
        fbp.set_lng(request.headers.get('Accept-Language'))
        _user = UserModel.find_by_id(get_jwt_identity())
        _json = request.get_json()
        print('users, resources, userlogin, put, _user ->', _user)
        print('users, resources, userlogin, put, _json ->', _json)
        if _user is None:
            return {
                'message': str(_(
                    'Something wrong with token refreshing. Try to log in again.')),
            }, 500
        if not _user.check_password(_json.get('password')):
            return {
                'message': str(_('Wrong password.')),
            }, 401
        return {
            'message': str(_('Token successfully refreshed.')),
            'payload': {
                'access_token': _user.get_fresh_token()
            }
        }, 200
