from typing import Dict

# from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_babelplus import lazy_gettext as _

from ..models.users import UserModel
from ..schemas.users import UserUpdateSchema, UserSchema

user_schema = UserSchema()
user_update_schema = UserUpdateSchema()


class UserList(Resource):

    @classmethod
    @jwt_required
    def get(cls) -> Dict:
        '''
        Just list of users. Admin rights are required.
        '''
        if UserModel.find_by_id(get_jwt_identity()).is_admin:
            payload = [
                user_schema.dump(_user) for _user in UserModel.find()
            ]
            count = len(payload)
            return {
                'message': str(_(
                    "There are %(count)s users in our database as follows:",
                    count=count)),
                'payload': payload
            }, 200
        else:
            return {
                'message': str(_(
                    "Sorry, access to user's information is allowed to admin only."
                ))
            }, 401
