from typing import Dict
from flask import request
from flask_restful import Resource
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global
from ..models.contents import ContentModel
from ..schemas.contents import (
    content_schema,
    content_get_schema
)


class Contents(Resource):
    @classmethod
    def already_exists(cls, pks_json: Dict) -> Dict:
        return {
            'message': str(_(
                "A contents with identity '%(identity)s', view '%(view_id)s' and "
                "locale '%(locale_id)s' already exists.",
                identity=pks_json['identity'],
                view_id=pks_json['view_id'],
                locale_id=pks_json['locale_id'])),
        }, 400

    @classmethod
    def not_found(cls, pks_json: Dict) -> Dict:
        return {
            'message': str(_(
                "A contents with identity '%(identity)s', view '%(view_id)s' and "
                "locale '%(locale_id)s' not found.",
                identity=pks_json['identity'],
                view_id=pks_json['view_id'],
                locale_id=pks_json['locale_id'])),
        }, 404

    @classmethod
    def error_message(cls, error_info: str) -> Dict:
        return {
            'message': str(_(
                "Something went wrong. Info in payload.")),
            'payload': error_info
        }, 500

    @classmethod
    def post(cls) -> Dict:
        '''
        Create content instance and save to db.
        '''
        _request_json = request.get_json()
        # print('post, request.get_json -', _request_json)
        _content = content_schema.load(_request_json, session=dbs_global.session)
        _content_fm_db = ContentModel.find_by_identity_view_locale(
            identity=_content.identity,
            view_id=_content.view_id,
            locale_id=_content.locale_id)
        if _content_fm_db is not None:
            return cls.already_exists(_request_json)
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
    def get(cls) -> Dict:
        '''
        Get instance from db.
        '''
        _search_json = content_get_schema.load(request.get_json())
        _content = ContentModel.find_by_identity_view_locale(**_search_json)
        if _content is None:
            return cls.not_found(_search_json)
        return {
            'message': str(_(
                "The content has been found. "
                "Details are in payload.")),
            'payload': content_schema.dump(_content)
        }, 200

    @classmethod
    def put(cls) -> Dict:
        '''
        Update instance and save to db.
        '''
        _update_json = content_get_schema.load(request.get_json())
        _content = ContentModel.find_by_identity_view_locale(**_update_json)
        if _content is None:
            return cls.not_found(_update_json)
        _content.update(_update_json)
        return {
            'message': str(_(
                "The content has been found and successfully updated. "
                "Details are in payload.")),
            'payload': content_schema.dump(_content)
        }, 200

    @classmethod
    def delete(cls):
        '''
        Delete instance from db.
        '''
        _delete_json = content_get_schema.load(request.get_json())
        _content = ContentModel.find_by_identity_view_locale(**_delete_json)
        if _content is None:
            return cls.not_found(_delete_json)
        _content.delete_fm_db()
        return {
            'message': str(_(
                "The content on view '%(view_id)s' with locale '%(locale_id)s' and "
                "identity '%(identity)s' has been found and successfully deleted.",
                identity=_delete_json['identity'],
                view_id=_delete_json['view_id'],
                locale_id=_delete_json['locale_id']))}, 200
