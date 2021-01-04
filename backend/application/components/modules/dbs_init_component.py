'''
The file contains procedures should initiate tables in the blueprint on start up.
'''
# from application.modules.dbs_global import dbs_global

from ..local_init_data_components import components_constants

from ..models.component_kinds import ComponentKindsModel


def dbs_init_component():
    fill_kinds()


def fill_kinds():
    for _kind in components_constants.get_KINDS:
        _existing_kind = ComponentKindsModel.find_by_id(_kind['id_kind'])
        if _existing_kind is None:
            try:
                _kind = ComponentKindsModel(
                    id_kind=_kind['id_kind'], description=_kind['description'])
                _kind.save_to_db()
            except Exception as err:
                print(
                    'application.components.modules.dbs_init_compnents on '
                    'fill_kinds.\nSome error:\n', err)

    # print('dbs_init_components')
