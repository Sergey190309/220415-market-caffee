import pytest
# from flask import current_app
from typing import Dict
from random import randint

from random_words import RandomWords, RandomEmails
from transliterate import translit, get_available_language_codes

from application import create_app
from application.modules.dbs_global import dbs_global

# from random import choice
# from random import choice, randint

from application.components.models.component_kinds import ComponentKindsModel
from application.contents.models.views import ViewModel
from application.contents.schemas.views import ViewGetSchema, ViewSchema
from application.contents.models.contents import ContentModel
from application.contents.schemas.contents import ContentGetSchema, ContentSchema
from application.users.models.users import UserModel
from application.users.schemas.users import UserSchema, UserGetSchema

from application.global_init_data import global_constants
from application.contents.local_init_data_contents import contents_constants
from application.components.local_init_data_components import components_constants
from application.users.local_init_data_users import users_constants


rv = RandomWords()
rm = RandomEmails()
# from application.components.schemas.component_kinds import (
#     ComponentKindGetSchema, ComponentKindSchema)


@pytest.fixture(scope='session')
def root_url():
    return 'http://127.0.0.1:5000'


@pytest.fixture
def app():
    app = create_app('testing_config.py')
    # print('\ntest.conftest, app ->')
    # dbs_global.init_app(app)
    return app


@pytest.fixture(scope='session')
def content_schema():
    return ContentSchema()


@pytest.fixture(scope='session')
def content_get_schema():
    return ContentGetSchema()


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


@pytest.fixture(scope='module')
def random_text():
    '''
    Source of text.
    Latin or cyrrilic from argument.
    Quontity of worlds - argument.
    '''
    def _method(lng: str = 'en', qnt: int = 1, underscore: bool = False) -> str:
        row_words = rv.random_words(count=qnt)
        char = ' '
        if underscore:
            char = '_'
        result = char.join(row_words)
        if lng == 'en':
            return result
        elif lng in get_available_language_codes():
            return translit(result, lng)
        else:
            return 'wrong lng'
    return _method


@pytest.fixture(scope='module')
def component_kind_instance(random_text):
    '''
    It generates instance without saving.
    id_kind - argument, description - random set of 10 words.
    '''
    def _method(id_kind: str = None):
        # with current_app.app_context():
        #     current_app.app_context.push()
        if id_kind is None:
            id_kind = random_text(qnt=2)
        _description = random_text(qnt=10)
        return ComponentKindsModel(
            id_kind=id_kind, description=_description)
    return _method


@pytest.fixture(scope='session')
def user_schema():
    return UserSchema()


@pytest.fixture(scope='session')
def user_get_schema():
    return UserGetSchema()


@pytest.fixture(scope='session')
def view_schema():
    return ViewSchema()


@pytest.fixture(scope='session')
def view_get_schema():
    return ViewGetSchema()


@pytest.fixture(scope='module')
def view_instance(random_text, view_schema):
    '''
    View model instance without saving.
    id_kind - argument or random text of 3 word to avoid repeating keys,
    description - argument or random set of 12 words.
    '''
    def _method(values: Dict = {}) -> 'ViewModel':
        _values_json = {
            'id_view': values.get('id_view', random_text(qnt=3, underscore=True)),
            'description': values.get('description', random_text(qnt=12))
        }
        return view_schema.load(_values_json, session=dbs_global.session)
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
        lng = values.get('locale_id', valid_item('locale'))
        _values_json = {
            'locale_id': lng,
            'user_name': values.get('user_name', random_text(lng=lng)),
            'email': values.get('email', random_email()),
            'password': values.get('password', 'qwer'),
            'role_id': values.get('role_id', valid_item('role')),
            'first_name': values.get('first_name', random_text(lng=lng)),
            'last_name': values.get('last_name', random_text(lng=lng)),
            'remarks': values.get('remarks', random_text(lng=lng, qnt=12))
        }
        return user_schema.load(_values_json)
    return _method


@pytest.fixture(scope='module')
def content_instance(random_text):
    '''
    Content model instance without saving.
    identity, view_id, locale_id - arguments,
    title - random set of 3 words.
    content - random set of 5 words
    '''
    def _method(values: Dict = {}):
        # keys = content_ids.keys()
        lng = values.get('locale_id', global_constants.get_LOCALES[0]['id'])
        _values = {
            'identity': values.get('identity', random_text(qnt=2, underscore=True)),
            'view_id': values.get('view_id', contents_constants.get_VIEWS[0]['id_view']),
            'locale_id': lng,
            'user_id': values.get('user_id', randint(1, 128)),
            'title': values.get('title', random_text(lng=lng, qnt=3)),
            'content': values.get('content', random_text(lng=lng, qnt=5)),
        }
        return ContentModel(**_values)
    return _method


@pytest.fixture(scope='module')
def random_email(random_text):
    def _method(arg=None):
        return rm.randomMail()
    return _method
