'''
The file contains procedures should initiate tables in the blueprint on start up.
See contents
'''
from application.global_init_data import global_constants
from ..models import StructureModel
# from application.modules.dbs_global import dbs_global

# from ..local_init_data_contents import contents_constants

# from ..models.views import ViewModel
# from ..models.component_kinds import ComponentKindsModel


def dbs_init_structure():
    fill_structure()  # Fill structure with default values based on default global views


def fill_structure():
    # pass
    for _view in global_constants.get_VIEWS:
        _existing_structure = StructureModel.find_by_id(_view.get('view_id'))
        # _existing_view = ViewModel.find_by_id(_view['view_id'])
        if _existing_structure is None:
            try:
                _view = StructureModel(view_id=_view.get('view_id'))
                # id_view=_view['id_view'], description=_view['description'])
                _view.save_to_db()
            except Exception as err:
                print(
                    'application.contents.modules.dbs_init_contents on '
                    'fill_views.\nSome error:\n', err)

    print('dbs_init_structure')
