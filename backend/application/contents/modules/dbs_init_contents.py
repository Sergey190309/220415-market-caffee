'''
The file contains procedures should initiate tables in the blueprint on start up.
'''
# from application.modules.dbs_global import dbs_global

# from ..local_init_data_contents import contents_constants

# from ..models.views import ViewModel
from application.models.views_global import ViewGlobalModel
from application.global_init_data import global_constants


def dbs_init_contents():
    pass
    # fill_views()


def fill_views():
    for _view in global_constants.get_VIEWS:
        _existing_view = ViewGlobalModel.find_by_id(_view.get('view_id'))
        if _existing_view is None:
            try:
                _view = ViewGlobalModel(
                    view_id=_view.get('view_id'), description=_view.get('description'))
                _view.save_to_db()
            except Exception as err:
                print(
                    'application.contents.modules.dbs_init_contents on '
                    'fill_views.\nSome error:\n', err)

    # print('dbs_init_components')
