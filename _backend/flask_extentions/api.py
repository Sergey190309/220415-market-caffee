'''
The module create class derived from Api to set up all endpoints.
'''
from flask_restful import Api

from resources.home import Index


class ApiInit(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(Index, '/test')


api = ApiInit()
