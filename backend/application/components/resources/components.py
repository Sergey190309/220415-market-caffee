from flask import request
from flask_restful import Resource
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global

from ..models.components import ComponentModel
from ..schemas.components import component_schema


class Components(Resource):
    @classmethod
    def post(cls):
        '''
        '''
        # session= added to fix troubles with error on testing with pytest
        # from terminal.
        _component = component_schema.load(
            request.get_json(), session=dbs_global.session)
        # print(_component)
        # print(_component.identity)
        # print(_component.locale_id)
        _component_fm_db = ComponentModel.find_by_identity_locale(
            identity=_component.identity, locale_id=_component.locale_id)
        if _component_fm_db is not None:
            return {
                'message': str(_(
                    "The component with identity '%(identity)s' and locale "
                    "'%(locale_id)s' already exists.",
                    identity=_component.identity,
                    locale_id=_component.locale_id)),
            }, 400
        _component.save_to_db()
        return {
            'message': str(_(
                "The component has saved successfully. Details are in payload.")),
            'payload': component_schema.dump(_component)
        }, 200

    @classmethod
    def get(cls):
        _component = ComponentModel.find_by_identity_locale()
        return {
            'message': str(_("Hi there!, It's get method."))
        }, 200
