import pytest

from typing import Dict
from random import choice  # randint

from application.users.models import UserModel
from application.users.schemas.users import UserSchema
from application.global_init_data import global_constants
from application.contents.local_init_data_contents import contents_constants
from application.components.local_init_data_components import components_constants
from application.users.local_init_data_users import users_constants


@pytest.fixture(scope='session')
def user_schema():
    return UserSchema()


@pytest.fixture
def access_token():
    def _method(user):
        # print('\n\naccess_token fixture')
        return user.get_tokens()['access_token']
    return _method


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


@pytest.fixture(scope='module')
def random_email(random_words):
    def _method(arg=None):
        domens = ('com', 'ru', 'uk', 'ua', 'org', 'mil', 'su', 'cn')
        return random_words() + '@' + random_words() + '.' + choice(domens)
    return _method


@pytest.fixture(scope='module')
def user_instance(random_text, random_email, valid_item, user_schema):
    '''
    It generates instance without saving.
    All elements are arguments if not:
    user_name - random text 1 (language dependend),
    email - random email,
    password - 'qwer',
    role_id - default value,
    first_name - random text 1 (language dependend),
    last_name - random text 1 (language dependend),
    locale_id - default value,
    remarks - random text 12 (language dependend)
    '''
    def _method(values: Dict = {}) -> 'UserModel':
        if values is None or not isinstance(values, Dict):
            return 'Provide values in dictinary type'
        _json = {}
        keys = values.keys()

        if 'locale_id' in keys:
            _json['locale_id'] = values['locale_id']
        else:
            _json['locale_id'] = valid_item('locale')

        if 'user_name' in keys:
            _json['user_name'] = values['user_name']
        else:
            _json['user_name'] = random_text(lang=_json['locale_id'])

        if 'email' in keys:
            _json['email'] = values['email']
        else:
            _json['email'] = random_email()

        if 'password' in keys:
            _json['password'] = values['password']
        else:
            _json['password'] = 'qwer'

        if 'role_id' in keys:
            _json['role_id'] = values['role_id']
        else:
            _json['role_id'] = valid_item('role')

        if 'first_name' in keys:
            _json['first_name'] = values['first_name']
        else:
            _json['first_name'] = random_text(lang=_json['locale_id'])

        if 'last_name' in keys:
            _json['last_name'] = values['last_name']
        else:
            _json['last_name'] = random_text(lang=_json['locale_id'])

        if 'locale_id' in keys:
            _json['locale_id'] = values['locale_id']
        else:
            _json['locale_id'] = valid_item('locale')

        if 'remarks' in keys:
            _json['remarks'] = values['remarks']
        else:
            _json['remarks'] = random_text(lang=_json['locale_id'], qnt=12)

        return user_schema.load(_json)
    return _method
