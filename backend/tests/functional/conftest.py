import pytest

from typing import Dict

from application.global_init_data import global_constants
from application.contents.local_init_data_contents import contents_constants
from application.components.local_init_data_components import components_constants
from application.users.local_init_data_users import users_constants


@pytest.fixture(scope='session')
def other_valid_item():
    def _method(item_kind: str = None, prev_item: str = None):
        # print(item_kind)
        # print(prev_item)
        if item_kind is None or prev_item is None or\
                item_kind not in ['kind_id', 'locale_id', 'view_id']:
            return {
                'message':
                    "You should provide item_kind you want. "
                    "It sould be 'kind_id', 'locale_id' or 'view_id'."}
        if item_kind == 'kind_id':
            _active_pks = components_constants.get_PKS
        elif item_kind == 'locale_id':
            _active_pks = global_constants.get_PKS
        elif item_kind == 'view_id':
            _active_pks = contents_constants.get_PKS
        # print('\nother_valid_item, _active_pks ->', _active_pks)
        _active_pks = [item for item in _active_pks if item != prev_item]
        # print(_active_pks)
        # print(_active_pks[0])
        return _active_pks[0]
    return _method


@pytest.fixture(params=[item['id'] for item in global_constants.get_LOCALES])
def allowed_language(request):
    return request.param


@pytest.fixture(scope='session')
def valid_item():
    '''
    The fixture return valid item from constants.
    It's first element from list according item argument.
    Dectinary key depends from contants it's there primary keys.
    locale - locale,
    kind - component kind,
    view - content's view,
    role - user's role.
    '''
    def _method(item_kind: str = None):
        if item_kind is None or item_kind not in ['locale', 'kind', 'view', 'role']:
            return {
                'message':
                    "You should provide item_kind you want. "
                    "It sould be 'id' for locale_id, 'id_kind' or 'id_view'."}
        if item_kind == 'locale':
            _active_constant = global_constants.get_LOCALES
            key = 'id'
        elif item_kind == 'view':
            _active_constant = contents_constants.get_VIEWS
            key = 'id_view'
        elif item_kind == 'kind':
            _active_constant = components_constants.get_KINDS
            key = 'id_kind'
        elif item_kind == 'role':
            _active_constant = users_constants.get_ROLES
            key = 'id'
        else:
            _active_constant = None
            key = None

        if _active_constant is None:
            return {
                'message':
                    "Somthing went wrong."}
        return _active_constant[0][key]
    return _method
