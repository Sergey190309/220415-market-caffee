from typing import Dict
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global
from application.modules.fbp import fbp
# from application.global_init_data import global_variables
from application.users.models import UserModel
from ..models.contents import ContentModel
from ..schemas.contents import (
    content_schema,
    content_get_schema
)


class Contents(Resource):
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
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return Contents.no_access()
        fbp.set_lng(request.headers.get('Accept-Language'))
        _request_json = request.get_json()
        # print('\nContent post, request.get_json ->', _request_json)
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
            'payload': content_schema.dump(_content)
        }, 201

    @classmethod
    @jwt_required()
    def get(cls) -> Dict:
        '''
        Get instance from db.
        '''
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return Contents.no_access()
        fbp.set_lng(request.headers.get('Accept-Language'))
        _requested_dict = {
            'view_id': request.args['view_id'],
            'identity': request.args['identity'],
            'locale_id': request.headers.get('Accept-Language')
        }
        # print('contents, resources, _requested_dict ->', _requested_dict)
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
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return Contents.no_access()
        _update_json = content_get_schema.load(request.get_json())
        _content = ContentModel.find_by_identity_view_locale(
            identity=_update_json['identity'],
            view_id=_update_json['view_id'],
            locale_id=_update_json['locale_id'])
        if _content is None:
            return cls.not_found(
                identity=_update_json['identity'],
                view_id=_update_json['view_id'],
                locale_id=_update_json['locale_id'])
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
        # print('contents, resources, view_id ->', request.args['view_id'])
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return Contents.no_access()
        fbp.set_lng(request.headers.get('Accept-Language'))
        _requested_dict = {
            'view_id': request.args['view_id'],
            'identity': request.args['identity'],
            'locale_id': request.headers.get('Accept-Language')
        }
        _delete_json = content_get_schema.load(_requested_dict)
        _content = ContentModel.find_by_identity_view_locale(**_delete_json)
        if _content is None:
            return cls.not_found(
                identity=_delete_json['identity'],
                view_id=_delete_json['view_id'],
                locale_id=_delete_json['locale_id'])

        _content.delete_fm_db()
        return {
            'message': str(_(
                "The content on view '%(view_id)s' with locale '%(locale_id)s' and "
                "identity '%(identity)s' has been found and successfully deleted.",
                identity=_delete_json['identity'],
                view_id=_delete_json['view_id'],
                locale_id=_delete_json['locale_id']))}, 200
