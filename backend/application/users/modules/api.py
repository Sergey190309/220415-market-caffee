from flask_restful import Api

from ..resources.users import User


class ApiUsers(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(User, '')


api = ApiUsers()
