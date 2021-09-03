from typing import Dict
# from pprint import pformat as pf
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_babelplus import lazy_gettext as _

from application.modules.fbp import fbp
from application.users.models import UserModel
from application.structure.models.structure import StructureModel
from application.structure.schemas.structure import structure_get_schema


class ContentsHandling(Resource):
    block_index: str = '',
    block_type: str = '',
    block_subtype: str = '',
    block_items_qnt: int = 0

    @classmethod
    def not_found(cls,
                  identity: str = '',
                  view_id: str = '',
                  locale_id: str = '',
                  ) -> Dict:
        pass

    @classmethod
    def no_access(cls) -> Dict:
        return {
            'message': str(_(
                "Sorry, access to views' information is allowed to admin only."
            ))
        }, 401

    @classmethod
    def error_message(cls, error_info: str = '', status: int = 0) -> Dict:
        # print('contents, resources, contents_handling, error_info ->', error_info)
        return {
            'message': str(_(
                "Something went wrong. Info in payload.")),
            'payload': error_info
        }, status

    @classmethod
    def request_json_handling(
        cls,
        incoming_json: dict = {},
    ) -> Dict:
        '''block_id handling'''
        _block_identity = incoming_json.get('block_id')
        # print('\nrequest_json_handling, incoming_json ->', incoming_json)
        if _block_identity is None:
            return {
                'message': str(_(
                    "Request does not containts required "
                    "'%(argument)s', something wrong on front-end.",
                    argument='block_id'))}, 400
        _block_identity_splitted = _block_identity.split('_')
        cls.block_index = _block_identity_splitted[0]
        cls.block_type = _block_identity_splitted[1]
        cls.block_subtype = _block_identity_splitted[2]
        cls.block_items_qnt = int(_block_identity_splitted[3])
        '''index handling'''
        _block_index = incoming_json.get('block_index')
        if _block_index is None:
            return {
                'message': str(_(
                    "Request does not containts required "
                    "'%(argument)s', something wrong on front-end. ",
                    argument='block_index'))}, 400
        if _block_index < 0 or _block_index > cls.block_items_qnt:
            return {
                'message': str(_(
                    "Block index is out of range, either below 0 "
                    "or above block items quontity. Something "
                    "wrong on front-end."))}, 400

    @classmethod
    @jwt_required()
    def put(cls) -> Dict:
        '''
        Used for inserting new empty elements into the block.
        Change view structure.
        '''
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        _user_id = get_jwt_identity()
        if not UserModel.find_by_id(_user_id).is_admin:
            # if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return cls.no_access()
        _requested_json = request.get_json()
        # print('content, resources, put, _requested_json ->', _requested_json)
        _aux_info = cls.request_json_handling(_requested_json)
        if _aux_info is not None:
            return _aux_info
        '''Find appropriage record in structure to correct'''
        _view_id = _requested_json.get('view_id')
        _criterion = {'view_id': _view_id,
                      'locale_id': _lng}
        _tested_criterion = structure_get_schema.load(_criterion)
        _structure = StructureModel.find_by_ids(_tested_criterion)
        _structure.change_element_qnt('inc', cls.block_index, _user_id)
        print('\ncontents, resources, contents_handling, _structure ->',
              structure_get_schema.dump(_structure))
        return {
            'message': str(_(
                "The content quontity and db structure for view "
                "'%(view_id)s' in block '%(block_index)s' and locale "
                "'%(locale_id)s' has been "
                "successfully updated.",
                view_id=_view_id,
                block_index=cls.block_index,
                locale_id=_lng))}, 200
