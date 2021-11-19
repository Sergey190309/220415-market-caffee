from typing import Dict
# from json import dumps
from flask import request
from flask_restful import Resource
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from flask_babelplus import lazy_gettext as _

from application.modules.fbp import fbp
from application.users.models import UserModel
from ..models.page_view import PageView
from ..models.content_elements_block import ContentElementsBlock
from ..errors.custom_exceptions import (
    WrongIndexError, WrongElementTypeError, WrongValueError)


class UpperLevelHandling(Resource):
    '''
    Class to handle uppre level elements on the page.
    Actions:
        move - post
        insert - put
        remove - patch
    '''
    '''list of kwargs dictionary keys for testing validity'''
    _kwargs = ['identity', 'direction', 'view_id', 'locale_id']

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
                "The content and structure tables for page "
                "'%(view_id)s' conserning block '%(identity)s' "
                "and locale '%(locale_id)s' has been successfully "
                "updated.",
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
    def error_message(cls, error_info: str = '', status: int = 0) -> Dict:
        return {
            'message': str(_(
                "Something went wrong. Info in payload.")),
            'payload': error_info
        }, status

    @classmethod
    @jwt_required()
    def post(cls) -> Dict:
        '''
        The method moves upper level element up or down.
        json
            "view_id": "landing",
            "identity": "01_vblock_txt",
            "direction": "up"
        header
            Accept-Language: locale
        '''
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        _user_id = get_jwt_identity()
        if not UserModel.find_by_id(_user_id).is_admin:
            return cls.no_access()
        '''join values into one variable'''
        _kwargs = {**request.get_json(), 'locale_id': _lng}
        # print('\nUpperLevelHandling:\n post'
        #       '\n  _kwargs ->', list(_kwargs.keys()).sort(),
        #       '\n  attributes ->', UpperLevelHandling._kwargs.sort())
        try:
            _identity = _kwargs.pop('identity')
            _index = int(_identity.split('_')[0])
            _direction = _kwargs.pop('direction')

            _page_instance = PageView.load_fm_db(ids=_kwargs)
            if _page_instance is None:
                return cls.not_found(**_kwargs, identity=_identity)
            _page_instance.move_element(
                index=_index, direction=_direction)
            result = _page_instance.save_to_db(user_id=_user_id)
            if result is None:
                '''report success'''
                return cls.success(**{**_kwargs, 'identity': _identity})
            else:
                return cls.error_message(error_info=result, status=500)
            # [print(element) for element in _page_instance.elements]
        except (WrongIndexError, KeyError) as e:
            '''report some wrong argument errors'''
            return cls.error_message(error_info=str(e), status=400)
        except Exception as e:
            # return cls.error_message(error_info=str(e), status=400)
            raise e

    @classmethod
    @jwt_required()
    def put(cls) -> Dict:
        '''
        Insert upper level element. It's dummy element, in case of block
            with one element inside.
        json
            "view_id": "landing",
            "identity": "01_vblock_txt",
        header
            Accept-Language: locale
        '''
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        _user_id = get_jwt_identity()
        if not UserModel.find_by_id(_user_id).is_admin:
            return cls.no_access()
        '''join values into one variable'''
        _kwargs = {**request.get_json(), 'locale_id': _lng}
        try:
            _identity = _kwargs.pop('identity')
            _splited_identity = _identity.split('_')
            _index = int(_splited_identity[0])
            _type = _splited_identity[1]
            if _type in ContentElementsBlock._types:
                _subtype = _splited_identity[2]
            else:
                _subtype = ''
            _page_instance = PageView.load_fm_db(ids=_kwargs)
            if _page_instance is None:
                return cls.not_found(**_kwargs, identity=_identity)
            _page_instance.insert_vals(
                index=_index, element_type=_type, subtype=_subtype,
                name=f'name of {_type}, {_subtype}')
            result = _page_instance.save_to_db(user_id=_user_id)
            if result is None:
                '''report success'''
                return cls.success(**{**_kwargs, 'identity': _identity})
            else:
                return cls.error_message(error_info=result, status=500)
        except (WrongIndexError, WrongElementTypeError,
                WrongValueError, KeyError) as e:
            '''report some wrong argument errors'''
            return cls.error_message(error_info=str(e), status=400)
        except Exception as e:
            raise e

    @classmethod
    @jwt_required()
    def patch(cls) -> Dict:
        '''
        Delete upper level element.
        json
            "view_id": "landing",
            "identity": "01",
        header
            Accept-Language: locale
        '''
        pass
