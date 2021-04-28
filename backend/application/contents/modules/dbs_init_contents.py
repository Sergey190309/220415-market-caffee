'''
The file contains procedures should initiate tables in the blueprint on start up.
'''
# from application.modules.dbs_global import dbs_global

from ..local_init_data_contents import contents_constants

# from ..models.views import ViewModel
from application.models.views_global import ViewGlobalModel


def dbs_init_contents():
    fill_views()


def fill_views():
    for _view in contents_constants.get_VIEWS:
        _existing_view = ViewGlobalModel.find_by_id(_view['id_view'])
        if _existing_view is None:
            try:
                _view = ViewGlobalModel(
                    id_view=_view['id_view'], description=_view['description'])
                _view.save_to_db()
            except Exception as err:
                print(
                    'application.contents.modules.dbs_init_contents on '
                    'fill_views.\nSome error:\n', err)

    # print('dbs_init_components')
