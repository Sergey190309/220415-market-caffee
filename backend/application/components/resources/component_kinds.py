from typing import Dict
from flask import request
from flask_restful import Resource
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global

from ..models.component_kinds import ComponentKindsModel
from ..schemas.component_kinds import component_kind_schema, component_kind_get_schema
# from ..schemas.components import component_schema, component_get_schema


class ComponentKinds(Resource):

    @classmethod
    def already_exists(cls, id_kind: str) -> Dict:
        return {
            'message': str(_(
                "The component kind with id_kind '%(id_kind)s' already exists.",
                id_kind=id_kind)),
        }, 400

    @classmethod
    def not_found(cls, id_kind: str) -> Dict:
        return {
            'message': str(_(
                "The component kind with identity '%(id_kind)s' "
                "has not been found.",
                id_kind=id_kind)),
        }, 404

    @classmethod
    def post(cls):
        '''
        Create new instance.
        '''
        # session= added to fix troubles with error on testing with pytest
        # from terminal.
        _component_kind = component_kind_schema.load(
            request.get_json(), session=dbs_global.session)
        _component_fm_db = ComponentKindsModel.find_by_id(
            id_kind=_component_kind.id_kind)
        if _component_fm_db is not None:
            return cls.already_exists(_component_kind.id_kind)
        _component_kind.save_to_db()
        return {
            'message': str(_(
                "The component kind has been saved successfully. "
                "Details are in payload.")),
            'payload': component_kind_schema.dump(_component_kind)
        }, 201

    @classmethod
    def get(cls):
        '''
        Get instance by id_kind.
        '''
        _search_criterion = component_kind_get_schema.load(
            request.get_json(), session=dbs_global.session)
        _component_kinds = ComponentKindsModel.find_by_id(
            id_kind=_search_criterion['id_kind'])
        if _component_kinds is None:
            return cls.not_found(_search_criterion['id_kind'])
        return {
            'message': str(_("Found, see payload.")),
            'payload': component_kind_schema.dump(_component_kinds)
        }, 200

    @classmethod
    def put(cls):
        '''
        Update instance with new description.
        '''
        # Checke whether instance exist.
        _update_json = component_kind_get_schema.load(
            # request.get_json())
            request.get_json(), session=dbs_global.session)
        print('Put update json -', _update_json)
        _component_kind = ComponentKindsModel.find_by_id(
            id_kind=_update_json['id_kind'])
        if _component_kind is None:
            return cls.not_found(_update_json['id_kind'])
        _component_kind.update(_update_json)
        return {
            'message': str(_(
                "The component kind with id '%(id_kind)s' has been updated "
                "successfully. Details are in payload.",
                id_kind=_update_json['id_kind'])),
            'payload': component_kind_schema.dump(_component_kind)
        }, 200

    @classmethod
    def delete(cls):
        '''
        Delete instance by id_kind.
        '''
        _delete_json = component_kind_get_schema.load(
            request.get_json(), session=dbs_global.session)
        # Checke whether instance exist.
        _component_kind = ComponentKindsModel.find_by_id(
            id_kind=_delete_json['id_kind'])
        if _component_kind is None:
            return cls.not_found(_delete_json['id_kind'])
        _component_kind.delete_fm_db()
        return {
            'message': str(_(
                "The component kind with id '%(id_kind)s' has been deleted.",
                id_kind=_delete_json['id_kind'])),
        }, 200
