from typing import Dict
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global
from application.modules.fbp import fbp
# from application.global_init_data import global_variables
from application.users.models import UserModel
from application.home.local_init_data_home import sessions
from ..models.contents import ContentModel
from ..schemas.contents import (
    content_schema,
    content_get_schema
)


class Content(Resource):
    @classmethod
    def already_exists(
            cls, identity: str = '',
            view_id: str = '', locale_id: str = '') -> Dict:
        return {
            'message': str(_(
                "A contents with identity '%(identity)s', view '%(view_id)s' and "
                "locale '%(locale_id)s' already exists.",
                identity=identity,
                view_id=view_id,
                locale_id=locale_id)),
        }, 400

    @classmethod
    def not_found(
            cls, identity: str = '',
            view_id: str = '', locale_id: str = '') -> Dict:
        return {
            'message': str(_(
                "A contents with identity '%(identity)s', view '%(view_id)s' and "
                "locale '%(locale_id)s' not found.",
                identity=identity,
                view_id=view_id,
                locale_id=locale_id)),
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
        return {
            'message': str(_(
                "Sorry, access to views' information is allowed to admin only."
            ))
        }, 401

    @classmethod
    @jwt_required()
    def post(cls) -> Dict:
        '''
        Create content instance and save to db.
        '''
        _lng = request.headers.get('Accept-Language')
        _user_id = get_jwt_identity()
        # print('\ncontents, resources, post, lng ->', _lng)
        fbp.set_lng(_lng)
        if not UserModel.find_by_id(_user_id).is_admin:
            return cls.no_access()
        _request_json = {**request.get_json(), 'locale_id': _lng, 'user_id': _user_id}
        _content = content_schema.load(_request_json, session=dbs_global.session)
        _content_fm_db = ContentModel.find_by_identity_view_locale(
            identity=_content.identity,
            view_id=_content.view_id,
            locale_id=_content.locale_id)
        if _content_fm_db is not None:
            return cls.already_exists(
                identity=_content.identity,
                view_id=_content.view_id,
                locale_id=_content.locale_id)
        error_info = _content.save_to_db()
        if error_info is not None:
            return cls.error_message(error_info)
        return {
            'message': str(_(
                "The content has been saved successfully. "
                "Details are in payload.")),
            'payload': content_get_schema.dump(_content)
            # 'payload': content_schema.dump(_content)
        }, 201

    @classmethod
    @jwt_required()
    def get(cls) -> Dict:
        '''
        Get instance from db.
        '''

        # print('cls, resources, _requested_dict ->', _requested_dict)
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        if not sessions.is_valid(get_jwt_identity()):
            return {
                'message': str(_(
                    "Something went wrong. Check tech_token and sessions set up."))
            }, 500
        _requested_dict = {
            'view_id': request.args.get('view_id'),
            'identity': request.args.get('identity'),
            'locale_id': _lng,
        }
        _search_json = content_get_schema.load(_requested_dict)
        _content = ContentModel.find_by_identity_view_locale(**_search_json)
        if _content is None:
            return cls.not_found(**_search_json)
        return {
            'message': str(_(
                "The content has been found. "
                "Details are in payload.")),
            'payload': content_schema.dump(_content)
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
        _update_json = content_get_schema.load(request.get_json())
        _content = ContentModel.find_by_identity_view_locale(
            identity=_update_json.get('identity'),
            view_id=_update_json.get('view_id'),
            locale_id=_update_json.get('locale_id'))
        if _content is None:
            return cls.not_found(
                identity=_update_json.get('identity'),
                view_id=_update_json.get('view_id'),
                locale_id=_update_json.get('locale_id'))
        _content.update(_update_json)
        return {
            'message': str(_(
                "The content has been found and successfully updated. "
                "Details are in payload.")),
            'payload': content_schema.dump(_content)
        }, 200

    @classmethod
    @jwt_required()
    def delete(cls):
        '''
        Delete instance from db.
        '''
        # print('cls, resources, view_id ->', request.args['view_id'])
        _lng = request.headers.get('Accept-Language')
        fbp.set_lng(_lng)
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return cls.no_access()
        _requested_dict = {
            'view_id': request.args.get('view_id'),
            'identity': request.args.get('identity'),
            'locale_id': _lng,
            # 'locale_id': request.headers.get('Accept-Language')
        }
        # testing fields
        _delete_json = content_get_schema.load(_requested_dict)
        _content = ContentModel.find_by_identity_view_locale(**_delete_json)
        if _content is None:
            return cls.not_found(
                identity=_delete_json.get('identity'),
                view_id=_delete_json.get('view_id'),
                locale_id=_delete_json.get('locale_id'))

        _content.delete_fm_db()
        return {
            'message': str(_(
                "The content on view '%(view_id)s' with locale '%(locale_id)s' and "
                "identity '%(identity)s' has been found and successfully deleted.",
                identity=_delete_json.get('identity'),
                view_id=_delete_json.get('view_id'),
                locale_id=_delete_json.get('locale_id')))}, 200
