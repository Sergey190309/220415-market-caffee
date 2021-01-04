from flask import request
from flask_restful import Resource
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global

from ..models.component_kinds import ComponentKindsModel
from ..schemas.component_kinds import component_kind_schema
# from ..schemas.components import component_schema, component_get_schema


class ComponentKinds(Resource):
    @classmethod
    def post(cls):
        # session= added to fix troubles with error on testing with pytest
        # from terminal.
        _component_kind = component_kind_schema.load(
            request.get_json(), session=dbs_global.session)
        # print(_component_kind)
        _component_fm_db = ComponentKindsModel.find_by_id(
            id_kind=_component_kind.id_kind)
        if _component_fm_db is not None:
            return {
                'message': str(_(
                    "The component kind with id_kind '%(id_kind)s' already exists.",
                    id_kind=_component_kind.id_kind)),
            }, 400
        '''
        '''
        _component_kind.save_to_db()
        return {
            'message': str(_(
                "The component kind has been saved successfully. "
                "Details are in payload.")),
            'payload': component_kind_schema.dump(_component_kind)
        }, 200

    @classmethod
    def get(cls):
        pass
        '''
        _search_criterion = component_get_schema.load(
            request.get_json(), session=dbs_global.session)
        _component = ComponentModel.find_by_identity_kind_locale(
            identity=_search_criterion.identity,
            kind_id=_search_criterion.kind_id,
            locale_id=_search_criterion.locale_id)
        if _component is None:
            return {
                'message': str(_(
                    "The component with identity '%(identity)s' and locale "
                    "'%(locale_id)s' have not been found.",
                    identity=_search_criterion.identity,
                    locale_id=_search_criterion.locale_id)),
            }, 404

        return {
            'message': str(_("Found, see payload.")),
            'payload': component_schema.dump(_component)
        }, 200
        '''
