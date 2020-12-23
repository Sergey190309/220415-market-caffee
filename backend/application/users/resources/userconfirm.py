from typing import Dict
from flask_restful import Resource
from flask import make_response, render_template
from flask_babelplus import lazy_gettext as _

from application.errors.custom_exception import NotExistsError

from ..models.users import UserModel


class Confirmaion(Resource):
    '''
    returns the confirmation page
    '''
    @classmethod
    def get(cls, confirmaion_id: str):
        pass


class ConfirmaionByUser(Resource):
    @classmethod
    def post(cls):
        '''
        This endpoint resend the confirmation email with a new confirmation
        model. It will force the current confirmation model to expire so that
        there is only one valid link at once.
        '''
        pass

    @classmethod
    def get(cls):
        '''
        This endpoint is used for testing and viewing Confirmation models
        and should be available for admins only.
        '''
        pass


class UserConfirm(Resource):
    @classmethod
    # @jwt_required
    def get(cls, user_id: int) -> Dict:
        '''
        User manual confirmation.
        It's tecnical method. Not to be used in normal activity.
        With email confirmation sould be confirmed by email
        otherwice create user with appropriate role.
        '''
        _user = UserModel.find_by_id(user_id)
        if _user is None:
            raise NotExistsError(user_id, 'users.resources.UserHandle.put')
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
        # return redirect("http://localhost:3000/", code=302)  # redirect if we have a separate web app
        # return {
        #     'message': str(_(
        #         "User with id '%(user_id)s' successfully confirmed. "
        #         "Details are in payload.",
        #         user_id=user_id)),
        #     'payload': user_schema.dump(UserModel.find_by_id(user_id))
        # }, 200
