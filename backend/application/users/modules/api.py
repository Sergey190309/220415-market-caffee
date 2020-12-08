from flask_restful import Api

from ..resources.users import User
from ..resources.roles import Role


class ApiUsers(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(User, '')
        self.add_resource(Role, '/roles')


api = ApiUsers()
