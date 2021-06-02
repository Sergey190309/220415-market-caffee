from flask_restful import Api

from ..resources.structure import Structure, StructureList


class ApiStructure(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(Structure, '')
        self.add_resource(StructureList, '/list')


api_structure = ApiStructure()
