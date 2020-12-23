from flask_restful import Api

from ..resources.users import User
from ..resources.roles import Role
from ..resources.userhandle import UserHandle
from ..resources.userlogin import UserLogin
from ..resources.userlist import UserList
from ..resources.userconfirm import UserConfirm


class ApiUsers(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(User, '')
        self.add_resource(Role, '/roles')
        self.add_resource(UserHandle, '/handle/<int:user_id>')
        self.add_resource(UserLogin, '/login')
        self.add_resource(UserList, '/list')
        self.add_resource(UserConfirm, '/confirm/<int:user_id>')


api = ApiUsers()
