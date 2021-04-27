from typing import Dict
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global
from application.modules.fbp import fbp
from application.users.models import UserModel
from ..models.structure import StructureModel


class Structure(Resource):
    @classmethod
    def already_exists(cls, view_id: str = '') -> Dict:
        pass

    @classmethod
    def not_found(cls, view_id: str = '') -> Dict:
        pass

    @classmethod
    def error_message(cls, error_info: str) -> Dict:
        return {
            'message': str(_(
                "Something went wrong. Info in payload.")),
            'payload': error_info
        }, 500

    @classmethod
    def no_access(cls) -> Dict:
        return {
            'message': str(_(
                "Sorry, access to structure information is allowed to admin only."
            ))
        }, 401

    @classmethod
    @jwt_required()
    def post(cls) -> Dict:
        '''
        Create view structure instance and save to db.
        '''
        pass

    @classmethod
    @jwt_required()
    def get(cls) -> Dict:
        '''
        Get instance from db.
        '''
        pass

    @classmethod
    @jwt_required()
    def put(cls) -> Dict:
        '''
        Update instance and save to db.
        '''
        pass

    @classmethod
    @jwt_required()
    def delete(cls):
        '''
        Delete instance from db.
        '''
        pass

