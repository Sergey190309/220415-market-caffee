from typing import Dict
from flask import request
from flask_restful import Resource
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global
from ..models.contents import ContentModel
from ..schemas.contents import (
    content_schema,
    # content_get_schema
)


class Contents(Resource):
    @classmethod
    def already_exists(
            cls, identity: str = None,
            view_id: str = None,
            locale_id: str = None) -> Dict:
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
            cls, identity: str = None,
            view_id: str = None,
            locale_id: str = None) -> Dict:
        return {
            'message': str(_(
                "A contents with identity '%(identity)s', view '%(view_id)s' and "
                "locale '%(locale_id)s' not found.",
                identity=identity,
                view_id=view_id,
                locale_id=locale_id)),
        }, 404

    @classmethod
    def post(cls):
        '''
        Create content instance and save to db.
        '''
        # print('post, request.get_json -', request.get_json())
        _content = content_schema.load(request.get_json(), session=dbs_global.session)
        _content_fm_db = ContentModel.find_by_identity_view_locale(
            identity=_content.identity,
            view_id=_content.view_id,
            locale_id=_content.locale_id)
        if _content_fm_db is not None:
            return cls.already_exists(
                identity=_content.identity,
                view_id=_content.view_id,
                locale_id=_content.locale_id)
        _content.save_to_db()
        # print('post, _content model -', _content.title)
        # print('post, _content_fm_db -', _content_fm_db)
        return {
            'message': str(_(
                "The content has been saved successfully. "
                "Details are in payload.")),
            'payload': content_schema.dump(_content)
        }, 201

    @classmethod
    def get(cls):
        '''
        Get instance from db.
        '''
        pass

    @classmethod
    def put(cls):
        '''
        Update instance and save to db.
        '''
        pass

    @classmethod
    def delete(cls):
        '''
        Delete instance from db.
        '''
        pass
