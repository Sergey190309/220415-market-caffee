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
from ..models.contents import ContentModel


class ContentsHandling(Resource):
    block_id: str = ''  # 01_vblock_txt_4
    block_index: int = '',  # index block on a page
    block_type: str = '',  # either vblock or hblock
    block_subtype: str = '',  # either txt or pix
    block_items_qnt: int = 0,
    item_index: int = 0

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
        _item_index = incoming_json.get('item_index')
        if _item_index is None:
            return {
                'message': str(_(
                    "Request does not containts required "
                    "'%(argument)s', something wrong on front-end.",
                    argument='item_index'))}, 400
        cls.item_index = _item_index
        # print('item_index ------------------------>', )
        _block_identity = incoming_json.get('block_id')
        if _block_identity is None:
            return {
                'message': str(_(
                    "Request does not containts required "
                    "'%(argument)s', something wrong on front-end.",
                    argument='block_id'))}, 400
        # print('\nrequest_json_handling, incoming_json ->', incoming_json)
        cls.block_id = _block_identity
        _block_identity_splitted = _block_identity.split('_')
        cls.block_index = _block_identity_splitted[0]
        cls.block_type = _block_identity_splitted[1]
        cls.block_subtype = _block_identity_splitted[2]
        cls.block_items_qnt = int(_block_identity_splitted[3])
        '''index handling'''
        _item_index = incoming_json.get('item_index')
        if _item_index is None:
            return {
                'message': str(_(
                    "Request does not containts required "
                    "'%(argument)s', something wrong on front-end. ",
                    argument='item_index'))}, 400
        if _item_index < 0 or _item_index > cls.block_items_qnt:
            return {
                'message': str(_(
                    "Block index is out of range, either below 0 "
                    "or above block items quontity. Something "
                    "wrong on front-end."))}, 400

    @classmethod
    @jwt_required()
    def put(cls) -> Dict:
        '''
        Used for inserting new empty elements into a block.
        Change view structure.
        Create new record and move all elements information
        (title and contents) accordenly.
        Arguments:
        body:
        {
            "view_id": "landing",
            "item_index": 1,  - low level index
            "block_id": "01_vblock_txt_4"  - (upper level index)_
                (block type)_(block subtype)_(low level element qnt)
        }
        header:
        'Accept-Language' - locale
        '''
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        _user_id = get_jwt_identity()
        if not UserModel.find_by_id(_user_id).is_admin:
            return cls.no_access()
        _requested_json = request.get_json()
        _aux_info = cls.request_json_handling(_requested_json)
        if _aux_info is not None:
            return _aux_info
        '''Find appropriage record in structure to correct'''
        _view_id = _requested_json.get('view_id')
        _criterion = {'view_id': _view_id,
                      'locale_id': _lng}
        # print('\nresources, content_handling, '
        #       '\n _lng ->', _lng)
        _tested_criterion = structure_get_schema.load(_criterion)
        _structure = StructureModel.find_by_ids(_tested_criterion)
        _change_element_qnt_result = _structure.change_element_qnt(
            'inc', int(cls.block_index), _user_id)
        if not isinstance(_change_element_qnt_result, int):
            return {
                'message': str(_(
                    "While trying update view structure '%(view_id)s', "
                    "locale '%(locale_id)s' the following message has "
                    "come: '%(result)s'. That's not good, check it out.",
                    view_id=_criterion.get('view_id'),
                    locale_id=_criterion.get('locale_id'),
                    result=_change_element_qnt_result))
            }, 500
        '''Add one record to db contents with approapriate locale.'''
        cls.block_id = '_'.join(
            [cls.block_index,
             cls.block_type,
             cls.block_subtype,
             str(_change_element_qnt_result).zfill(3)])
        result = ContentModel.add_element_to_block(
            block_id=cls.block_id,
            item_index=cls.item_index,
            view_id=_view_id,
            locale_id=_lng,
            user_id=_user_id
        )
        # print('\ncontents, resources, contents_handling, result ->', result)
        if result is not None:
            return {
                'message': str(_(
                    "While trying to add element into block with index "
                    "'%(block_index)s' on view '%(view_id)s' with "
                    "locale '%(locale_id)s' the folliwng message has "
                    "come: '%(result)s'. That's not good, check it out.",
                    view_id=_view_id,
                    block_index=cls.block_index,
                    locale_id=_lng,
                    result=result
                ))
            }, 500
        return {
            'message': str(_(
                "The content quontity and db structure for view "
                "'%(view_id)s' in block '%(block_index)s' and locale "
                "'%(locale_id)s' has been "
                "successfully updated.",
                view_id=_view_id,
                block_index=cls.block_index,
                locale_id=_lng))
        }, 200

    @classmethod
    @jwt_required()
    def patch(cls) -> Dict:
        '''
        Used for delete any element in a block.
        Change view structure.
        Move all elements information (title and contents) accordenly.
        '''
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        _user_id = get_jwt_identity()
        if not UserModel.find_by_id(_user_id).is_admin:
            return cls.no_access()
        _requested_json = request.get_json()
        _aux_info = cls.request_json_handling(_requested_json)
        if _aux_info is not None:
            return _aux_info
        '''Find appropriage record in structure to correct'''
        _view_id = _requested_json.get('view_id')
        _criterion = {'view_id': _view_id,
                      'locale_id': _lng}
        _tested_criterion = structure_get_schema.load(_criterion)
        _structure = StructureModel.find_by_ids(_tested_criterion)
        _structure.change_element_qnt('dec', int(cls.block_index), _user_id)
        '''Remove one record from db contents with approapriate locale.'''
        result = ContentModel.remove_element_fm_block(
            block_id=cls.block_id,
            item_index=cls.item_index,
            view_id=_view_id,
            locale_id=_lng,
            user_id=_user_id
        )
        # print('\ncontents, resources, contents_handling, result ->', result)
        if result is not None:
            return {
                'message': str(_(
                    "While trying to remove element from block with "
                    "index '%(block_index)s' on view '%(view_id)s' "
                    "with locale '%(locale_id)s' the folliwng message "
                    "has come: '%(result)s'. That's not good, check "
                    "it out.",
                    view_id=_view_id,
                    block_index=cls.block_index,
                    locale_id=_lng,
                    result=result
                ))
            }, 500
        return {
            'message': str(_(
                "The content quontity and db structure for view "
                "'%(view_id)s' in block '%(block_index)s' and locale "
                "'%(locale_id)s' has been "
                "successfully updated.",
                view_id=_view_id,
                block_index=cls.block_index,
                locale_id=_lng))
        }, 200
