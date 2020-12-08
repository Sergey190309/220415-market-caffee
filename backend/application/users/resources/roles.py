from typing import Tuple
from flask import request
# , current_app
# from flask.cli import with_appcontext
from flask_restful import Resource

from ..modules.dbs import dbs

from ..models.roles import RoleModel

# print(current_app.app_context())
# with current_app.app_context():
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

            # with current_app.app_context():
            # _role = role_schema.load(_json)
            _role = role_schema.load(_json, session=dbs.session)
            _role.save_to_db()
            payload = role_schema.dump(_role)
            return {
                'message': 'created',
                'payload': payload
            }
