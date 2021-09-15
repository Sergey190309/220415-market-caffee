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
    pass
    # fill_structure()  # Fill structure with default values
    # based on default global views


def fill_structure():
    for _view in global_constants.get_VIEWS_PKS:
        for _locale in global_constants.get_PKS:
            _existing_structure = StructureModel.find_by_ids(
                {'view_id': _view, 'locale_id': _locale})
            # _existing_view = ViewModel.find_by_id(_view['view_id'])
            if _existing_structure is None:
                try:
                    _structure = StructureModel(view_id=_view, locale_id=_locale)
                    # id_view=_view['id_view'], description=_view['description'])
                    _structure.save_to_db()
                except Exception as err:
                    print(
                        'application.contents.modules.dbs_init_contents on '
                        'fill_views.\nSome error:\n', err)

    # print('dbs_init_structure')
