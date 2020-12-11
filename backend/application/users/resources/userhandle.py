from typing import Dict

from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from flask_babelplus import lazy_gettext as _

from ..schemas.users import UserSchema, UserUpdateSchema
from ..models.users import UserModel

user_schema = UserSchema()
user_update_schema = UserUpdateSchema()


class UserHandle(Resource):

    @classmethod
    def have_no_right(cls, user_id: int, logged_user_id: int) -> bool:
        _logged_user = UserModel.find_by_id(logged_user_id)
        if not _logged_user:
            raise AttributeError
        else:
            return not (_logged_user.is_admin or user_id == logged_user_id)

    @classmethod
    @jwt_required
    def post(cls, user_id: int) -> Dict:
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
                'message': str(_("User you plan to update not found."))
            }, 404

        if ('password' in _keys):
            # Update password separately due to necessity to hash it in base.
            _updated_user_before.update_password(_json.pop('password'))

        # Update logic:
        # Admin may update everyone but passwords.
        # Any users can update themselves including passwords.
        # Logic below reject not allowed activity.
        if UserModel.find_by_id(_logged_id).is_admin:
            if ('password' in _keys):
                if not (_logged_id == user_id):
                    return {
                        'message': str(_(
                            "Password allowed to be changed by account "
                            "user only."))
                    }, 401
        else:
            if not (_logged_id == user_id):
                return {
                    'message': str(_(
                        "Administrative privileges are needed to update "
                        "other users' accounts."))
                }, 401
            else:
                if ('role_id' in _keys):
                    return {
                        'message': str(_(
                            "Administrative privileges are needed to update "
                            "users' rights."))
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
    @jwt_required
    def get(cls, user_id: int) -> Dict:
        '''
        Get all user details by id in url. User can access to own info only.
        Other users are accessable by admin only.
        '''
        if cls.have_no_right(get_jwt_identity(), user_id):
            return {
                'message': str(_(
                    "Access to user details is allowed to owners or admins onlys.")),
            }, 401

        _user = UserModel.find_by_id(get_jwt_identity())

        if _user:
            return {
                'message': str(_(
                    "User with id '%(user_id)s' found, details are "
                    "in payload.", user_id=user_id)),
                'payload': user_schema.dump(_user)
            }, 200
        else:
            return {
                'message': str(_(
                    "User with user_id '%(user_id)s' has not been found.",
                    user_id=user_id)),
            }, 404

    @classmethod
    def delete(cls, user_id: int) -> None:
        pass
        '''
        Delete user by id in url
        '''
        if cls.have_no_right(get_jwt_identity(), user_id):
            return {
                'message': str(_(
                    "Owners or admins are allowed to kill their accownts.")),
            }, 401
        _user = UserModel.find_by_id(user_id)
        if _user:
            _user.delete_fm_db()
            return {
                'message': str(_(
                    "User with id '%(user_id)s' found, and deleted.",
                    user_id=user_id))
            }, 200
        else:
            return {
                'message': str(_(
                    "User with user_id '%(user_id)s' has not been found.",
                    user_id=user_id)),
            }, 404
