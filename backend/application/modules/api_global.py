from flask_restful import Api

from ..resources.views_global import ViewsGlobal, ViewGlobal
from ..resources.locale_global import LocalesGlobal, LocaleGlobal
# from ..resources.contents import Contents
# from ..resources.views import Views, View
# from ..resources.viewlist import ViewList


class ApiGlobal(Api):
    def __init__(self):
        super().__init__()

        self.add_resource(ViewsGlobal, '/global/views')
        self.add_resource(ViewGlobal, '/global/view')
        self.add_resource(LocalesGlobal, '/global/locales')
        self.add_resource(LocaleGlobal, '/global/locale')
        # self.add_resource(Views, '/views')
        # just one get with wiew list
        # self.add_resource(ViewList, '/views/list')


api_global = ApiGlobal()
