from flask_restful import Api

from ..resources.contents import Contents
from ..resources.views import Views


class ApiContents(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(Contents, '')
        self.add_resource(Views, '/views')


api_contents = ApiContents()
