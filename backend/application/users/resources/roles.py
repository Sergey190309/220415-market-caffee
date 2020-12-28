from typing import Tuple
from flask import request
from flask_restful import Resource

from application.modules.dbs_global import dbs_global
# from ..modules.dbs_users import dbs_users

from ..models.roles import RoleModel

from ..schemas.roles import RoleSchema

role_schema = RoleSchema()


class Role(Resource):
    # @with_appcontext
    @classmethod
    def get(cls) -> Tuple:
        _json = request.get_json()
        print('users.resources.role _json -', _json)
        _role = RoleModel.find_by_id(_json['id'])
        print('users.resources.role _json -', _role)
        if _role:
            payload = role_schema.dump(_role)
            return {
                'message': 'already exists',
                'payload': payload
            }
        else:
            _role = role_schema.load(_json, session=dbs_global.session)
            _role.save_to_db()
            payload = role_schema.dump(_role)
            return {
                'message': 'created',
                'payload': payload
            }
