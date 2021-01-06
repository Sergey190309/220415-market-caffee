from typing import Dict
from flask import request
from flask_restful import Resource
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global

from ..models.views import ViewModel
from ..schemas.views import view_schema


class Views(Resource):

    @classmethod
    def already_exists(cls, id_view: str) -> Dict:
        return {
            'message': str(_(
                "A view with identity '%(id_view)s' already exists.",
                id_view=id_view)),
        }, 400

    @classmethod
    def not_found(cls, id_view: str) -> Dict:
        return {
            'message': str(_(
                "A view with identity '%(id_view)s' "
                "has not been found.",
                id_view=id_view)),
        }, 404

    @classmethod
    def post(cls):
        '''
        Create content instance and save to db.
        '''
        _view = view_schema.load(request.get_json(), session=dbs_global.session)
        _view_fm_db = ViewModel.find_by_id(id_view=_view.id_view)
        if _view_fm_db is not None:
            return cls.already_exists(_view.id_view)
        _view.save_to_db()
        return {
            'message': str(_(
                "The view has been saved successfully. "
                "Details are in payload.")),
            'payload': view_schema.dump(_view)
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
