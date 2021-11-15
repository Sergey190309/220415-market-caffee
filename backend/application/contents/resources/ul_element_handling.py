from typing import Dict
# from flask import request
from flask_restful import Resource
from flask_jwt_extended import (jwt_required,
                                # get_jwt_identity
                                )
from flask_babelplus import lazy_gettext as _

# from application.modules.fbp import fbp
# from application.users.models import UserModel


class UpperLevelHandling(Resource):
    '''
    Class to handle uppre level elements on the page.
    Actions:
        insert
        remove
        move
    '''

    @classmethod
    def not_found(cls, identity: str = '', view_id: str = '',
                  locale_id: str = '') -> Dict:
        return {
            'message': str(_(
                "While trying to retrieve content for identity - "
                "'%(identity)s', page view - '%(view_id)s', locale "
                "- '%(locale_id)s' found nothing. Something went "
                "wrong.",
                identity=identity,
                view_id=view_id,
                locale_id=locale_id))
        }, 404

    @classmethod
    def success(cls, identity: str = '', view_id: str = '',
                locale_id: str = '') -> Dict:
        return {
            'message': str(_(
                "The content quontity and db structure for view "
                "'%(view_id)s' in block '%(identity)s' and locale "
                "'%(locale_id)s' has been "
                "successfully updated.",
                identity=identity,
                view_id=view_id,
                locale_id=locale_id))
        }, 200

    @classmethod
    def no_access(cls) -> Dict:
        return {
            'message': str(_(
                "Sorry, access to views' information is allowed to admin "
                "only."
            ))
        }, 401

    @classmethod
    @jwt_required()
    def post(cls) -> Dict:
        pass

    @classmethod
    @jwt_required()
    def put(cls) -> Dict:
        pass

    @classmethod
    @jwt_required()
    def patch(cls) -> Dict:
        pass
