from traceback import print_exc
from typing import Dict
from flask_restful import Resource
from flask import make_response, render_template
from flask_babelplus import lazy_gettext as _

from application.errors.custom_exceptions import NotExistsError

from ..local_init_data_users import users_constants
# from application.globals import global_constants

from ..models.users import UserModel
from ..models.confirmations import ConfirmationModel


class Confirmation(Resource):
    '''
    Check whether confirmaion expired, already confirmed otherwice
    confirm user and set him role user.
     Returns the confirmation html page.
    '''
    @classmethod
    def get(cls, confirmation_id: str):
        _confirmation = ConfirmationModel.find_by_id(confirmation_id)
        if not _confirmation:
            return {
                'message': str(_(
                    "Requested confirmation has not been found."))}, 404
        if _confirmation.is_expired:
            return {'message': str(_(
                "Requested confirmation already expired."))}, 400
            return
        _user = UserModel.find_by_id(_confirmation.user_id)
        if _user.role_id is not None:
            return {'message': str(_(
                "User has some status already."))}, 400
        # print('Role -', global_constants.get_ROLES[0]['id'])
        if _user.update({
                'role_id': users_constants.get_ROLES[0]['id']}) is None:
            _confirmation.delete_fm_db()
        headers = {'Content-Type': 'text/html'}
        greetings = _('Hi there!')
        contains = str(_(
            'You registration has been confirmed through %(email)s.',
            email=_user.email))
        return make_response(render_template(
            'confirmation_page.html',
            greetings=greetings,
            contains=contains), 200, headers)


class ConfirmationByUser(Resource):
    @classmethod
    def post(cls, user_id: int):
        '''
        This endpoint resend the confirmation email with a new
        confirmation model. It will force the current confirmation
        model to expire so that there is only one valid link at once.
        '''
        _user = UserModel.find_by_id(user_id)
        if _user is None:
            return {
                'message': str(_(
                    "User with user_id '%(user_id)s' has not been found.",
                    user_id=user_id))}, 404
        if _user.is_valid:
            return {
                'message': str(_(
                    "User with id '%(user_id)s' have "
                    "status '%(role_id)s' already.",
                    user_id=_user.id, role_id=_user.role_id))}, 400
        try:
            _confirmation = _user.most_recent_confirmation
            if _confirmation:
                _confirmation.delete_fm_db()
            _new_confirmation = ConfirmationModel(_user.id)
            _new_confirmation.save_to_db()
            _user.send_confirmation_request()
            return {
                'message': str(_(
                    "Email has been sent to '%(email)s'. "
                    "Please check your mail box. "
                    "Also pay attention to spam directory.",
                    email=_user.email))}, 200
        except Exception as err:
            print_exc()
            return {
                'message': str(_(
                    "While sending confirmation email something went "
                    "wrong. Error - %(err)s", err=err))}, 500

    # @classmethod
    # def get(cls):
    #     '''
    #     This endpoint is used for testing and viewing Confirmation
    #     models and should be available for admins only.
    #     '''
    #     pass


class UserConfirm(Resource):
    @classmethod
    # @jwt_required
    def get(cls, user_id: int) -> Dict:
        '''
        User manual confirmation.
        It's tecnical method. Not to be used in normal activity.
        With email confirmation sould be confirmed by email
        otherwice user will not granted any role.
        '''
        _user = UserModel.find_by_id(user_id)
        if _user is None:
            raise NotExistsError(
                user_id, 'users.resources.UserHandle.put')
        else:
            if _user.role_id is not None:
                return {
                    'message': str(_(
                        "User with id '%(user_id)s' have status "
                        "'%(role_id)s' already.",
                        user_id=_user.id, role_id=_user.role_id)),
                }, 400

        _user.update({'role_id': 'user'})
        headers = {'Content-Type': 'text/html'}
        greetings = _('Hi there!')
        contains = str(_(
            'You registration has been confirmed through %(email)s.',
            email=_user.email))
        return make_response(render_template(
            'confirmation_page.html',
            greetings=greetings,
            contains=contains
        ), 200, headers)
        # return redirect("http://localhost:3000/", code=302)
        # redirect if we have a separate web app
        # return {
        #     'message': str(_(
        #         "User with id '%(user_id)s' successfully confirmed. "
        #         "Details are in payload.",
        #         user_id=user_id)),
        #     'payload': user_schema.dump(UserModel.find_by_id(user_id))
        # }, 200
