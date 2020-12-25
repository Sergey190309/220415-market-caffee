from flask_restful import Api

from ..resources.components import Components


class ApiComponents(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(Components, '')


api_components = ApiComponents()
