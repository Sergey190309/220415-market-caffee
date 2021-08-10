from flask_restful import Api

from ..resources.images import ImagesHandling


class ApiImages(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(ImagesHandling, '/')


api_images = ApiImages()
