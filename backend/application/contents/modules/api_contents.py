from flask_restful import Api

from ..resources.contents import Content
# from ..resources.views import Views, View
# from ..resources.viewlist import ViewList


class ApiContents(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(Content, '')
        # self.add_resource(View, '/view')
        # self.add_resource(Views, '/views')
        # just one get with wiew list
        # self.add_resource(ViewList, '/views/list')


api_contents = ApiContents()
