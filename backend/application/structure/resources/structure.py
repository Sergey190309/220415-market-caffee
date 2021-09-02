from typing import Dict
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global
from application.modules.fbp import fbp
from application.home.local_init_data_home import sessions
from application.users.models import UserModel
from ..shemas.structure import structure_schema, structure_get_schema
from ..models.structure import StructureModel


class StructureList(Resource):

    @classmethod
    @jwt_required()
    def get(cls) -> Dict:
        '''
        List of structure loaded once upon inititaion. tech_token is reauired.
        '''
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        if not sessions.is_valid(get_jwt_identity()):
            return {
                'message': str(_(
                    "Something went wrong. Check tech_token and sessions set up."))
            }, 500
        payload = [structure_schema.dump(_structure)
                   for _structure in StructureModel.find({'locale_id': _lng})]
        count = len(payload)
        return {
            'message': str(_(
                "There are %(count)s structures in our database as follows:",
                count=count)),
            'payload': payload
        }, 200


class Structure(Resource):
    @classmethod
    def already_exists(cls, view_id: str = '', locale_id: str = '') -> Dict:
        return {
            'message': str(_(
                "A structure with identity '%(view_id)s' "
                "and locale '%(locale_id)s' already exists.",
                view_id=view_id, locale_id=locale_id)),
        }, 400

    @classmethod
    def not_found(cls, view_id: str = '', locale_id: str = '') -> Dict:
        return {
            'message': str(_(
                "A structure with identity '%(view_id)s' "
                "and locale '%(locale_id)s' not found.",
                view_id=view_id, locale_id=locale_id)),
        }, 404

    @classmethod
    def error_message(cls, error_info: str) -> Dict:
        return {
            'message': str(_(
                "Something went wrong. Info in payload.")),
            'payload': error_info
        }, 500

    @classmethod
    def no_access(cls) -> Dict:
        """
        The method inform user on lack of previlages.
        """
        return {
            'message': str(_(
                "Sorry, access to structure information is allowed to admin only."
            ))
        }, 401

    @classmethod
    @jwt_required()
    def post(cls) -> Dict:
        '''
        Create structure instance and save to db.
        '''
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return cls.no_access()
        _request_json = request.get_json()
        # print('\nstructure resources, post, _lng ->', _lng)
        _search_json = {
            'view_id': _request_json.get('view_id'),
            'locale_id': _lng
        }
        _structure = structure_schema.load(
            {**_request_json, 'locale_id': _lng}, session=dbs_global.session)
        _structure_fm_db = StructureModel.find_by_ids(_search_json)
        if _structure_fm_db is not None:
            return cls.already_exists(**_search_json)
        error_info = _structure.save_to_db()
        if error_info is not None:
            return cls.error_message(error_info)
        return {
            'message': str(_(
                "The structure has been saved successfully. "
                "Details are in payload.")),
            'payload': structure_schema.dump(_structure)
        }, 201
        # return {'message': 'Hi there!'}

    @classmethod
    @jwt_required()
    def get(cls) -> Dict:
        '''
        Get instance from db.
        '''
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        if not sessions.is_valid(get_jwt_identity()):
            return {
                'message': str(_(
                    "Something went wrong. Sorry we'll reverting."))
            }, 500

        _requested_dict = {
            'view_id': request.args.get('view_id'),
            'locale_id': _lng
        }
        _search_json = structure_get_schema.load(_requested_dict)
        # print('\ncls, resources, _search_json ->', _search_json)
        _structure = StructureModel.find_by_ids(_search_json)
        if _structure is None:
            return cls.not_found(**_search_json)
        return {
            'message': str(_(
                "The structure has been found. "
                "Details are in payload.")),
            'payload': structure_schema.dump(_structure)
        }, 200

    @classmethod
    @jwt_required()
    def put(cls) -> Dict:
        '''
        Update instance and save to db.
        '''
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return cls.no_access()
        _update_json = structure_get_schema.load(
            {**request.get_json(), 'locale_id': _lng})
        _search_json = {
            'view_id': _update_json.pop('view_id'),
            'locale_id': _update_json.pop('locale_id')
        }
        _structure = StructureModel.find_by_ids(_search_json)
        # print('\nstructure, resources, put, _update_json ->', _update_json)
        if _structure is None:
            return cls.not_found(**_search_json)
        _structure.update(_update_json)
        return {
            'message': str(_(
                "The structure has been found and successfully updated. "
                "Details are in payload.")),
            'payload': structure_schema.dump(_structure)
        }, 200

    @classmethod
    @jwt_required()
    def delete(cls):
        '''
        Delete instance from db.
        '''
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        # print('cls, resources, view_id ->', request.args['view_id'])
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return cls.no_access()
        fbp.set_lng(request.headers.get('Accept-Language'))
        _requested_dict = {
            'view_id': request.args.get('view_id'),
            'locale_id': _lng
        }
        # testing fields
        _delete_json = structure_get_schema.load(_requested_dict)
        _structure = StructureModel.find_by_ids(_delete_json)
        if _structure is None:
            return cls.not_found(**_delete_json)
        _structure.delete_fm_db()
        return {
            'message': str(_(
                "The structure for view '%(view_id)s' locale "
                "'%(locale_id)s' has been found and "
                "successfully deleted.",
                view_id=_delete_json.get('view_id'),
                locale_id=_delete_json.get('locale_id')))}, 200
