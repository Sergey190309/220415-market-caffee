from flask import request
from typing import Dict
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from flask_babelplus import lazy_gettext as _

from application.modules.fbp import fbp
from ..local_init_data_home import sessions


class TechAuth(Resource):
    # @classmethod
    # def post(cls):
    #     fbp.set_lng(request.headers.get('Accept-Language'))
    #     _id_json = request.get_json(silent=True)
    #     # print('\ntec_auth post, request _id_json ->', _id_json)
    #     if _id_json is None or not isinstance(_id_json, Dict):
    #         return {
    #             'message': str(_(
    #                 'Something went wrong, there is not valid JSON in the request.'))
    #         }, 400
    #     if 'tech_id' not in _id_json.keys():
    #         return {
    #             'message': str(_(
    #                 'Something went wrong, there is not proper key in the JSON.'))
    #         }, 400
    #     _tech_token = create_access_token(
    # _id_json.get('tech_id'), expires_delta=False)
    #     sessions.setter(_id_json.get('tech_id'))
    #     return {
    #         'message': str(_("TechAuth reporing! Tech token is in payload.")),
    #         'payload': _tech_token
    #     }, 200

    @classmethod
    def get(cls):
        fbp.set_lng(request.headers.get('Accept-Language'))

        _id_json = {'tech_id': request.args.get('tech_id')}
        # _id_json = request.get_json(silent=True)
        print('\ntech_auth get, request _id_json ->', _id_json)
        if _id_json.get('tech_id') is None:
            return {
                'message': str(_(
                    'Something went wrong, there is not valid JSON in the request.'))
            }, 400
        if 'tech_id' not in _id_json.keys():
            return {
                'message': str(_(
                    'Something went wrong, there is not proper key in the JSON.'))
            }, 400
        _tech_token = create_access_token(_id_json.get('tech_id'), expires_delta=False)
        sessions.setter(_id_json.get('tech_id'))
        return {
            'message': str(_("TechAuth reporing! Tech token is in payload.")),
            'payload': _tech_token
        }, 200
