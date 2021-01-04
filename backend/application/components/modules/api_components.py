from flask_restful import Api

from ..resources.components import Components
from ..resources.component_kinds import ComponentKinds


class ApiComponents(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(Components, '')
        self.add_resource(ComponentKinds, '/kinds')


api_components = ApiComponents()
