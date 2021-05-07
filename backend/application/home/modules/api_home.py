from flask_restful import Api

from ..resources.index import Index, Localization
from ..resources.tec_auth import TechAuth

# from application.home.resources.index import Index, Localization


class ApiHome(Api):
    def __init__(self):
        super().__init__()
        # print('home.modules.api.py.__init__')
        self.add_resource(Index, '/index')
        self.add_resource(Localization, '/localization')
        self.add_resource(TechAuth, '/tech/auth')


api_home = ApiHome()
