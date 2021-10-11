from flask_restful import Api

from ..resources.structure import Structure, StructureList
from ..resources.structure_handling import StructureHandling


class ApiStructure(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(Structure, '')
        self.add_resource(StructureList, '/list')
        self.add_resource(StructureHandling, '/handling')


api_structure = ApiStructure()
