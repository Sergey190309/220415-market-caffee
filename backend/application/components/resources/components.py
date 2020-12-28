from flask_restful import Resource
from flask_babelplus import lazy_gettext as _


class Components(Resource):
    @classmethod
    def get(cls):
        return {
            'message': str(_("Hi there!, It's get method."))
        }, 200

    @classmethod
    def post(cls):
        return {
            'message': str(_("Hi there!, It's post method."))
        }, 200
