from flask import request
from flask_restful import Resource
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global

from ..schemas.components import component_schema


class Components(Resource):
    @classmethod
    def post(cls):
        # _json = request.get_json()
        _component = component_schema.load(
            request.get_json(), session=dbs_global.session)
        # print('Component.post', _json)
        # print(component_schema.dump(_component))
        _component.save_to_db()
        return {
            'message': str(_(
                "The component has saved successfully. Details are in payload.")),
            'payload': component_schema.dump(_component)
        }, 200

    @classmethod
    def get(cls):
        return {
            'message': str(_("Hi there!, It's get method."))
        }, 200
