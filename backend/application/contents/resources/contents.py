# from typing import Dict
# from flask import request
from flask_restful import Resource
# from flask_babelplus import lazy_gettext as _

# from application.modules.dbs_global import dbs_global


class Contents(Resource):

    @classmethod
    def post(cls):
        '''
        Create content instance and save to db.
        '''
        pass

    @classmethod
    def get(cls):
        '''
        Get instance from db.
        '''
        pass

    @classmethod
    def put(cls):
        '''
        Update instance and save to db.
        '''
        pass

    @classmethod
    def delete(cls):
        '''
        Delete instance from db.
        '''
        pass
