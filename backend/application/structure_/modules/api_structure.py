from flask_restful import Api

# from ..resources.structure import Structure


class ApiStructure(Api):
    def __init__(self):
        super().__init__()


api_structure = ApiStructure()
