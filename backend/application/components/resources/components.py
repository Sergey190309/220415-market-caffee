from typing import Dict
from flask import request
from flask_restful import Resource
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global

from ..models.components import ComponentModel
from ..schemas.components import component_schema, component_get_schema


class Components(Resource):

    @classmethod
    def already_exists(cls, searching_criterions: Dict = None) -> Dict:
        if searching_criterions is None or not isinstance(searching_criterions, Dict):
            return 'Something wrong with searching criterions!'
        return {
            'message': str(_(
                "The component kind of '%(kind_id)s' with identity '%(identity)s' "
                "and locale '%(locale_id)s' already exists.",
                identity=searching_criterions['identity'],
                kind_id=searching_criterions['kind_id'],
                locale_id=searching_criterions['locale_id']))}, 400

    @classmethod
    def not_found(cls, searching_criterions: Dict = None) -> Dict:
        if searching_criterions is None or not isinstance(searching_criterions, Dict):
            return 'Something wrong with searching criterions!'
        return {
            'message': str(_(
                "The component kind of '%(kind_id)s' with identity '%(identity)s' "
                "and locale '%(locale_id)s' not found.",
                identity=searching_criterions['identity'],
                kind_id=searching_criterions['kind_id'],
                locale_id=searching_criterions['locale_id']))}, 404

    @classmethod
    def post(cls):
        '''
        Create component instance and save to db.
        '''
        # session= added to fix troubles with error on testing with pytest
        # from terminal.
        _component_json = request.get_json()
        _component = component_schema.load(
            _component_json, session=dbs_global.session)
        _searching_criterions = {
            key: value for (key, value) in _component_json.items()
            if key in ['identity', 'kind_id', 'locale_id']}
        _component_fm_db = ComponentModel.find_by_identity_kind_locale(
            _searching_criterions)
        if _component_fm_db is not None:
            return cls.already_exists(_searching_criterions)
        _component.save_to_db()
        return {
            'message': str(_(
                "The component has been saved successfully. "
                "Details are in payload.")),
            'payload': component_schema.dump(_component)
        }, 201

    @classmethod
    def get(cls):
        _search_json = component_get_schema.load(
            request.get_json(), session=dbs_global.session)
        # print(_search_json)
        _component = ComponentModel.find_by_identity_kind_locale(_search_json)
        if _component is None:
            return cls.not_found(_search_json)
        return {
            'message': str(_("Found, see payload.")),
            'payload': component_schema.dump(_component)
        }, 200

    @classmethod
    def put(cls):
        # Check keys instance exist.
        _update_json = component_get_schema.load(request.get_json())
        _search_json = {
            key: value for (key, value) in _update_json.items()
            if key in ['identity', 'kind_id', 'locale_id']}
        # Get appropriate component model from db:
        _component = ComponentModel.find_by_identity_kind_locale(_search_json)
        if _component is None:
            return cls.not_found(_search_json)
        _component.update(_update_json)
        return {
            'message': str(_(
                "The component kind of '%(kind_id)s' with identity '%(identity)s' "
                "and locale '%(locale_id)s' updated successfully. "
                "Details are in payload.",
                identity=_search_json['identity'],
                kind_id=_search_json['kind_id'],
                locale_id=_search_json['locale_id'])),
            'payload': component_schema.dump(_component)
        }, 200

    @classmethod
    def delete(cls):
        # Check keys instance exist.
        _delete_json = {
            key: value for (key, value)
            in component_get_schema.load(request.get_json()).items()
            if key in ['identity', 'kind_id', 'locale_id']}

        # print(_delete_json)
        # Get appropriate component model from db:
        _component = ComponentModel.find_by_identity_kind_locale(_delete_json)
        if _component is None:
            return cls.not_found(_delete_json)
        _component.delete_fm_db()
        return {
            'message': str(_(
                "The component kind of '%(kind_id)s' with identity '%(identity)s' "
                "and locale '%(locale_id)s' deleted successfully.",
                identity=_delete_json['identity'],
                kind_id=_delete_json['kind_id'],
                locale_id=_delete_json['locale_id']))
        }, 200
