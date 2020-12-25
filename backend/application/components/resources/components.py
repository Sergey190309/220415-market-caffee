from flask_restful import Resource
from flask_babelplus import lazy_gettext as _


class Components(Resource):
    @classmethod
    def get(cls):
        return {
            'message': str(_("Hi there!"))
        }, 200
