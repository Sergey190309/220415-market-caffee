from typing import Dict
# from flask import request
from flask_restful import Resource
from flask_jwt_extended import (
    jwt_required,
    # get_jwt_identity
)
from flask_babelplus import lazy_gettext as _

# from application.modules.fbp import fbp
# from application.users.models import UserModel


class StructureHandling(Resource):
    @classmethod
    # def no_access(cls):
    def no_access(cls) -> Dict:
        """
        The method inform user on lack of previlages.
        """
        return {
            'message': str(_(
                "Sorry, operations with structure are allowed to admin only."
            ))
        }, 401

    @classmethod
    @jwt_required()
    def put(cls):
        '''
        Used to update structure while adding new upper
        level element
        '''
        pass
        # _lng = request.headers.get('Accept-Language')
        # fbp.set_lng(_lng)
        # if not UserModel.find_by_id(get_jwt_identity()).is_admin:
        #     return cls.no_access()

        # print('\nresources, StructureHandling:',
        #       '\n  _lng ->', _lng)

    @classmethod
    @jwt_required()
    def patch(cls):
        '''
        Used to update structure while removing some upper
        level element
        '''
        pass
