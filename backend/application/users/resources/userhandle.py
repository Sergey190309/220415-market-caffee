from typing import Dict

from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_babelplus import lazy_gettext as _

from application.modules.fbp import fbp

from ..schemas.users import UserSchema, UserUpdateSchema
from ..models.users import UserModel

user_schema = UserSchema()
user_update_schema = UserUpdateSchema()


class UserHandle(Resource):

    @classmethod
    @jwt_required()
    def post(cls, user_id: int) -> Dict:
        '''
        The procedure updates user identified by id in url.
        Items that has proper keys in request JSON will be updated.
        Even user_name, email and password.
        Admin only is allowed to change role. Also he's able to kill user.
        User only is allowed to change own detatils but role.
        '''
        fbp.set_lng(request.headers.get('Accept-Language'))

        # That's dictionary with key-values to update an instance.
        _json = request.get_json()
        _keys = _json.keys()

        # Below is for validation only.
        user_update_schema.load(_json)

        _logged_id = get_jwt_identity()  # Logged user id

        _updated_user_before = UserModel.find_by_id(user_id)  # instance
        # for update
        if _updated_user_before is None:
            return {
                'message': str(_(
                    "User you plan to update (with id = '%(user_id)s') not found.",
                    user_id=user_id))
            }, 404
        if _logged_id == user_id:
            if 'password' in _keys:
                _updated_user_before.update_password(_json.pop('password'))
            if 'role_id' in _keys and not (UserModel.find_by_id(_logged_id).is_admin):
                return {
                    'message': str(_(
                        "Admin's privileges are needed to update "
                        "users' rights."))
                }, 401
        else:
            if UserModel.find_by_id(_logged_id).is_admin:
                if not (('role_id' in _keys) and (len(_keys) == 1)):
                    return {
                        'message': str(_(
                            "Admin is allowed to change role or kill user only."))
                    }, 401
            else:
                return {
                    'message': str(_(
                        "Users are not allowed to change own role, admins are."))
                }, 401

        _updated_user_before.update(_json)  # Sent data to model to update
        # instance.
        _updated_user = UserModel.find_by_id(user_id)  # Get updated
        # instance for report.

        return {
            'message': str(_(
                "User with id '%(user_id)s' updated as in payload.",
                user_id=user_id)),
            'payload': user_schema.dump(_updated_user)
        }

    @classmethod
    @jwt_required()
    def get(cls, user_id: int) -> Dict:
        '''
        Get all user details by id in url. User can access to own info only.
        Other users are accessable by admin only.
        if not (own or admin):
            not allowed
        else:
            if not exists:
                does not exist
        show
        '''
        fbp.set_lng(request.headers.get('Accept-Language'))

        _logged_user = UserModel.find_by_id(get_jwt_identity())
        _user = UserModel.find_by_id(user_id)
        if not(user_id == get_jwt_identity() or _logged_user.is_admin):
            return {
                'message': str(_(
                    "Access to user details is allowed to owners or admins only.")),
            }, 401
        else:
            if not _user:
                return {
                    'message': str(_(
                        "User with user_id '%(user_id)s' has not been found.",
                        user_id=user_id)),
                }, 404
        return {
            'message': str(_(
                "User with id '%(user_id)s' found, details are "
                "in payload.", user_id=user_id)),
            'payload': user_schema.dump(_user)
        }, 200

    @classmethod
    @jwt_required()
    def delete(cls, user_id: int) -> None:
        pass
        '''
        Delete user by id in url
        '''
        fbp.set_lng(request.headers.get('Accept-Language'))

        # print('UserHandle, delete get_jwt_identity() ->', get_jwt_identity())
        _logged_user = UserModel.find_by_id(get_jwt_identity())
        # print('UserHandle, delete logged user ->', _logged_user)
        _user = UserModel.find_by_id(user_id)
        if not((user_id == get_jwt_identity()) or _logged_user.is_admin):
            return {
                'message': str(_(
                    "Owners are allowed to kill their own acconts only.")),
            }, 401
        else:
            if not _user:
                return {
                    'message': str(_(
                        "User with user_id '%(user_id)s' has not been found.",
                        user_id=user_id)),
                }, 404

        _user.delete_fm_db()
        return {
            'message': str(_(
                "User with id '%(user_id)s' found, and deleted.",
                user_id=user_id))
        }, 200
