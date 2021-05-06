from typing import Dict
from flask import request
from flask_restful import Resource
from flask_babelplus import lazy_gettext as _
from flask_jwt_extended import jwt_required, get_jwt_identity

from application.modules.dbs_global import dbs_global
from application.modules.fbp import fbp
from application.users.models import UserModel

# from ..models.views import ViewGlobalModel
from application.models.views_global import ViewGlobalModel
# from ..schemas.views import view_schema, view_get_schema
from application.schemas.views_global import view_global_get_schema, view_global_schema


def no_access() -> Dict:
    return {
        'message': str(_(
            "Sorry, access to views' information is allowed to admin only."
        ))
    }, 401


class ViewsGlobal(Resource):
    @classmethod
    @jwt_required()
    def get(cls) -> ['ViewGlobalModel']:
        '''
        The resource give list of available view in the system.
        User should be admin.
        '''
        # print('\nViewList, get jtw_identity ->')
        # _jtw_identity = 'Fuck!'
        # _jtw_identity = get_jwt_identity()
        # print('\nViewList, get jtw_identity ->', _jtw_identity)
        fbp.set_lng(request.headers.get('Accept-Language'))

        if UserModel.find_by_id(get_jwt_identity()).is_admin:
            payload = [
                view_global_get_schema.dump(_view) for _view in ViewGlobalModel.find()
            ]
            count = len(payload)
            return {
                'message': str(_(
                    "There are %(count)s views in our database as follows:",
                    count=count)),
                'payload': payload
            }, 200
        else:
            return no_access()
        # return {
        #     'message': 'shit happens'
        # }


class ViewGlobal(Resource):

    @classmethod
    def already_exists(cls, view_id: str = None) -> Dict:
        return {
            'message': str(_(
                "A view with identity '%(view_id)s' already exists.",
                view_id=view_id.get('view_id'))),
        }, 400

    @classmethod
    def not_found(cls, view_id: str = None) -> Dict:
        return {
            'message': str(_(
                "A view with identity '%(view_id)s' "
                "has not been found.",
                view_id=view_id)),
        }, 404

    @classmethod
    @jwt_required()
    def post(cls):
        '''
        Create content instance and save to db.
        '''
        # print('post')
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return no_access()
        fbp.set_lng(request.headers.get('Accept-Language'))
        _view = view_global_schema.load(request.get_json(), session=dbs_global.session)
        _view_fm_db = ViewGlobalModel.find_by_id(view_id=_view.view_id)
        if _view_fm_db is not None:
            return cls.already_exists({'view_id': _view.view_id})
        _view.save_to_db()
        return {
            'message': str(_(
                "The view has been saved successfully. "
                "Details are in payload.")),
            'payload': view_global_get_schema.dump(_view)
        }, 201

    @classmethod
    @jwt_required()
    def get(cls):
        '''
        Get instance from db.
        '''
        # print('\nviews, get request arg ->', request.args.get('view_id'))

        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return no_access()
        _search_json = view_global_get_schema.load(
            {'view_id': request.args.get('view_id')})
        _view = ViewGlobalModel.find_by_id(view_id=_search_json.get('view_id'))
        if _view is None:
            return cls.not_found(**_search_json)
        return {
            'message': str(_("Found, see payload.")),
            'payload': view_global_get_schema.dump(_view)
        }, 200

    @classmethod
    @jwt_required()
    def put(cls):
        '''
        Update instance and save to db.
        '''
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return no_access()
        # print('\ncontents, resources, view, update_json ->', request.get_json())
        _update_json = view_global_get_schema.load(request.get_json())
        # print('\ncontents, resources, view, update_json ->', _update_json)
        _view = ViewGlobalModel.find_by_id(view_id=_update_json['view_id'])
        if _view is None:
            return cls.not_found(_update_json.get('view_id'))
        _view.update(_update_json)
        return {
            'message': str(_(
                "The view with id '%(view_id)s' has been updated "
                "successfully. Details are in payload.",
                view_id=_update_json['view_id'])),
            'payload': view_global_get_schema.dump(_view)
        }, 200

    @classmethod
    @jwt_required()
    def delete(cls):
        '''
        Delete instance from db.
        '''
        if not UserModel.find_by_id(get_jwt_identity()).is_admin:
            return no_access()
        fbp.set_lng(request.headers.get('Accept-Language'))
        _requested_dict = {'view_id': request.args.get('view_id')}
        # testing fields
        _delete_json = view_global_get_schema.load(_requested_dict)
        _view = ViewGlobalModel.find_by_id(view_id=_delete_json.get('view_id'))
        if _view is None:
            return cls.not_found(**_delete_json)
        _view.delete_fm_db()
        return {
            'message': str(_(
                "The view with id '%(view_id)s' has been deleted "
                "successfully.",
                view_id=_delete_json['view_id']))
        }, 200
