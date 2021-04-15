from typing import Dict
from flask import request
from flask_restful import Resource
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global

from ..models.views import ViewModel
from ..schemas.views import view_schema, view_get_schema


class Views(Resource):

    @classmethod
    def already_exists(cls, id_view: str = None) -> Dict:
        return {
            'message': str(_(
                "A view with identity '%(id_view)s' already exists.",
                id_view=id_view)),
        }, 400

    @classmethod
    def not_found(cls, id_view: str = None) -> Dict:
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
            return cls.already_exists({'id_view': _view.id_view})
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
        # print('\nviews, get request arg ->', request.args.get('id_view'))

        _search_json = view_get_schema.load(
            {'id_view': request.args.get('id_view')})
        _view = ViewModel.find_by_id(id_view=_search_json['id_view'])
        if _view is None:
            return cls.not_found(**_search_json)
        return {
            'message': str(_("Found, see payload.")),
            'payload': view_schema.dump(_view)
        }, 200

    @classmethod
    def put(cls):
        '''
        Update instance and save to db.
        '''
        _update_json = view_get_schema.load(request.get_json())
        _view = ViewModel.find_by_id(id_view=_update_json['id_view'])
        if _view is None:
            return cls.not_found(**_update_json)
        _view.update(_update_json)
        return {
            'message': str(_(
                "The view with id '%(id_view)s' has been updated "
                "successfully. Details are in payload.",
                id_view=_update_json['id_view'])),
            'payload': view_schema.dump(_view)
        }, 200

    @classmethod
    def delete(cls):
        '''
        Delete instance from db.
        '''
        _requested_dict = view_get_schema.load(
            {'id_view': request.args.get('id_view')})
        _delete_json = view_get_schema.load(_requested_dict)
        _view = ViewModel.find_by_id(id_view=_delete_json['id_view'])
        if _view is None:
            return cls.not_found(**_delete_json)
        _view.delete_fm_db()
        return {
            'message': str(_(
                "The view with id '%(id_view)s' has been deleted "
                "successfully.",
                id_view=_delete_json['id_view']))
        }, 200
