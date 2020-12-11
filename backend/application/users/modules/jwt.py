from flask_jwt_extended import JWTManager

from ..errors.register import set_loaders


class JWTManagerUsers(JWTManager):
    def __init__(self):
        super().__init__()
        set_loaders(self)


jwt = JWTManagerUsers()
