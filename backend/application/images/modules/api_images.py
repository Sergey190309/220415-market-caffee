from flask_restful import Api

from ..resources.images import ImageUpload


class ApiImages(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(ImageUpload, '/upload')


api_images = ApiImages()
