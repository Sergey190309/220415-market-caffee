from typing import Dict
from json import dumps
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_babelplus import lazy_gettext as _

from application.modules.fbp import fbp
from application.users.models import UserModel
# from application.structure.models.structure import StructureModel
# from application.structure.schemas.structure import structure_get_schema
# from ..models.contents import ContentModel
from ..models.content_elements_block import ContentElementsBlock
from ..errors.custom_exceptions import WrongIndexError


class ContentsHandling(Resource):
    _kwargs = ['identity', 'item_index', 'view_id', 'locale_id'].sort()
    block_id: str = ''  # 01_vblock_txt_4
    block_index: int = '',  # index block on a page
    block_type: str = '',  # either vblock or hblock
    block_subtype: str = '',  # either txt or pix
    block_items_qnt: int = 0,
    item_index: int = 0

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
    @jwt_required()
    def put(cls) -> Dict:
        '''
        Used for inserting new empty elements into a block.
        It works with blocks only.
        Change view structure.
        Create new record and move all elements information
        (title and contents) accordenly.
        Arguments:
        body:
        {
            "view_id": "landing",
            "identity": "01_vblock_txt"  - (upper level index)_
                (block type)_(block subtype)_(low level element qnt)
            "item_index": 1, - low level index, ie serial number of item
                in block
            --------------------------------------------------------
            I use identity instead of block index to avoid additinaly
                getting information from db for the sake of productivity.
        }
        header:
        'Accept-Language' - locale
        '''
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        _user_id = get_jwt_identity()
        if not UserModel.find_by_id(_user_id).is_admin:
            return cls.no_access()
        # _requested_json = request.get_json()
        '''join values into one variable'''
        _kwargs = {**request.get_json(), 'locale_id': _lng}
        try:
            '''get index out of variable that one is not needed in
                load_fm_db'''
            _item_index = _kwargs.pop('item_index')
            '''create upper level block element instance'''
            _block_instance = ContentElementsBlock.load_fm_db(**_kwargs)
            if _block_instance is None:
                '''report if block element instance is not available'''
                return cls.not_found(**_kwargs)
            '''handle the instance'''
            _block_instance.insert(_item_index)
            _identity = _kwargs.pop('identity')
            result = _block_instance.save_to_db(**_kwargs)
            if result is not None:
                return cls.error_message(error_info=result, status=500)
            else:
                '''report success'''
                return cls.success(**{**_kwargs, 'identity': _identity})
        except (WrongIndexError, KeyError) as e:
            '''report some wrong argument errors'''
            return cls.error_message(error_info=str(e), status=400)
        except Exception as e:
            # return cls.error_message(error_info=str(e), status=400)
            raise e

    @classmethod
    @jwt_required()
    def patch(cls) -> Dict:
        '''
        Used for delete any element in a upper level block.
        Change structure withing specific block.
        Move all elements information (title and contents) accordenly.
        Arguments are {
            "view_id": "landing",
            "identity": "01_vblock_txt"  - (upper level index)_
                (block type)_(block subtype)_(low level element qnt)
            "item_index": 1, - low level index, ie serial number of item
                in block
        }
        '''
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        _user_id = get_jwt_identity()
        if not UserModel.find_by_id(_user_id).is_admin:
            return cls.no_access()
        _kwargs = {**request.get_json(), 'locale_id': _lng}
        try:
            _item_index = _kwargs.pop('item_index')
            _block_instance = ContentElementsBlock.load_fm_db(**_kwargs)
            if _block_instance is None:
                '''report if block element instance is not available'''
                return cls.not_found(**_kwargs)
            '''handle the instance'''
            _block_instance.remove(_item_index)
            _identity = _kwargs.pop('identity')
            result = _block_instance.save_to_db(**_kwargs)
            # print('\nContentsHandling\n patch',
            #       '\n  _kwargs ->', dumps(_kwargs, indent=4),
            #       '\n  _block_instance ->', _block_instance,
            #       )
            if result is not None:
                return cls.error_message(error_info=result, status=500)
            else:
                '''report success'''
                return cls.success(**{**_kwargs, 'identity': _identity})
        except WrongIndexError as e:
            '''report some wrong argument errors'''
            return cls.error_message(error_info=str(e), status=400)
            raise e
        # if _aux_info is not None:
        #     return _aux_info
        # '''Find appropriage record in structure to correct'''
        # _view_id = _requested_json.get('view_id')
        # _criterion = {'view_id': _view_id,
        #               'locale_id': _lng}
        # _tested_criterion = structure_get_schema.load(_criterion)
        # _structure = StructureModel.find_by_ids(_tested_criterion)
        # _structure.change_element_qnt('dec', int(cls.block_index), _user_id)
        # '''Remove one record from db contents with approapriate locale.'''
        # result = ContentModel.remove_element_fm_block(
        #     block_id=cls.block_id,
        #     item_index=cls.item_index,
        #     view_id=_view_id,
        #     locale_id=_lng,
        #     user_id=_user_id
        # )

        # if result is not None:
        #     return {
        #         'message': str(_(
        #             "While trying to remove element from block with "
        #             "index '%(block_index)s' on view '%(view_id)s' "
        #             "with locale '%(locale_id)s' the folliwng message "
        #             "has come: '%(result)s'. That's not good, check "
        #             "it out.",
        #             view_id=_view_id,
        #             block_index=cls.block_index,
        #             locale_id=_lng,
        #             result=result
        #         ))
        #     }, 500
        # return {
        #     'message': str(_(
        #         "The content quontity and db structure for view "
        #         "'%(view_id)s' in block '%(block_index)s' and locale "
        #         "'%(locale_id)s' has been "
        #         "successfully updated.",
        #         view_id=_view_id,
        #         block_index=cls.block_index,
        #         locale_id=_lng))
        # }, 200
