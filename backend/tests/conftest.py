import pytest
# from flask import current_app
from typing import Dict
from random import randint, choice, randrange
from string import ascii_lowercase
from datetime import datetime

from random_words import RandomWords, RandomEmails
from transliterate import translit, get_available_language_codes

from application import create_app
from application.modules.dbs_global import dbs_global

from application.models.views_global import ViewGlobalModel
from application.models.locales_global import LocaleGlobalModel

# from application.contents.models.views import ViewModel
from application.schemas.views_global import ViewGlobalSchema
from application.schemas.locales_global import (
    LocaleGlobalSchema, LocaleGlobalGetSchema)
# from application.contents.schemas.views import ViewGetSchema, ViewSchema
from application.contents.models.contents import ContentModel
from application.contents.schemas.contents import (
    ContentGetSchema, ContentSchema)
from application.structure.models.structure import StructureModel
from application.structure.schemas.structure import (
    StructureSchema, StructureGetSchema)
from application.users.models.users import UserModel
from application.users.schemas.users import UserSchema, UserGetSchema

from application.global_init_data import global_constants
# from application.contents.local_init_data_contents import (
#     contents_constants)
from application.users.local_init_data_users import users_constants
from application.home.local_init_data_home import Sessions

from application.contents.models.content_elements_block import (
    ContentElementsBlock)
from application.contents.models.content_elements_simple import (
    ContentElementsSimple)

rv = RandomWords()
rm = RandomEmails()
# from application.components.schemas.component_kinds import (
#     ComponentKindGetSchema, ComponentKindSchema)


@pytest.fixture
def element():
    def _method(id: int = 0):
        return{
            'title': f'Title value No {str(id).zfill(3)}',
            'content': f'Content value No {str(id).zfill(3)}'
        }
    return _method


@pytest.fixture
def elements_dict(element):
    def _method(size: int = 0):
        _elements = []
        [_elements.append(element(i)) for i in range(size)]
        return _elements
    return _method


@pytest.fixture
def create_test_content(element, elements_dict) -> Dict:
    '''
    The fixture create contants and structure classes and save them to
        db, return names and other details for testing.
    '''
    def _method(locale: str = '', size_00: int = 0, user_id: int = 0,
                clean: bool = True):
        '''clean up content tables if required'''
        if clean:
            [_structure.delete_fm_db()
             for _structure in StructureModel.find()]
            [_content.delete_fm_db() for _content in ContentModel.find()]

        '''choose testing constants'''
        _view_id = choice(global_constants.get_VIEWS_PKS)
        if locale == '':
            _locale_id = choice(global_constants.get_PKS)
        else:
            _locale_id = locale
        _upper_index_00 = randrange(100)
        _upper_index_01 = randrange(100)
        while _upper_index_01 == _upper_index_00:
            _upper_index_01 = randrange(100)
        _upper_index_02 = randrange(100)
        while _upper_index_02 == _upper_index_00\
                or _upper_index_02 == _upper_index_01:
            _upper_index_02 = randrange(100)
        _upper_index_03 = randrange(100)
        while _upper_index_03 == _upper_index_00\
                or _upper_index_03 == _upper_index_01\
                or _upper_index_03 == _upper_index_02:
            _upper_index_03 = randrange(100)

        if size_00 == 0:
            _size_00 = randrange(3, 7)
        else:
            _size_00 = size_00
        _size_01 = randrange(2, 5)
        _type_00 = choice(ContentElementsBlock._types)
        _type_01 = choice([item for item in ContentElementsBlock._types
                           if item != _type_00])
        _type_02 = choice(ContentElementsSimple._types)
        _type_03 = choice([item for item in ContentElementsSimple._types
                           if item != _type_02])
        _subtype_00 = choice(ContentElementsBlock._subtypes)
        _subtype_01 = choice(
            [item for item in ContentElementsBlock._subtypes
             if item != _subtype_00])
        _name_00 = f'name of {_type_00}'
        _name_01 = f'name of {_type_01}'
        _name_02 = f'name of {_type_02}'
        _name_03 = f'name of {_type_03}'

        _elements_dict_00 = elements_dict(_size_00)
        _elements_dict_01 = elements_dict(_size_01)
        _element_00 = element(0)
        _element_01 = element(1)

        _block_instance_00 = ContentElementsBlock(
            upper_index=_upper_index_00,
            type=_type_00, subtype=_subtype_00,
            name=_name_00, elements=_elements_dict_00)
        _block_instance_00.save_to_db_content(
            view_id=_view_id, locale_id=_locale_id, user_id=user_id,
            save_structure=True)
        _block_instance_01 = ContentElementsBlock(
            upper_index=_upper_index_01,
            type=_type_01, subtype=_subtype_01,
            name=_name_01, elements=_elements_dict_01)
        _block_instance_01.save_to_db_content(
            view_id=_view_id, locale_id=_locale_id, user_id=user_id,
            save_structure=True)
        _simple_instance_00 = ContentElementsSimple(
            upper_index=_upper_index_02, type=_type_02,
            name=_name_02, element=_element_00)
        _simple_instance_00.save_to_db_content(
            view_id=_view_id, locale_id=_locale_id, user_id=user_id,
            save_structure=True)
        _simple_instance_01 = ContentElementsSimple(
            upper_index=_upper_index_03, type=_type_03,
            name=_name_03, element=_element_01)
        _simple_instance_01.save_to_db_content(
            view_id=_view_id, locale_id=_locale_id, user_id=user_id,
            save_structure=True)

        _structure_block_00 = _block_instance_00.serialize_to_structure
        _structure_block_01 = _block_instance_01.serialize_to_structure
        _structure_simple_00 = _simple_instance_00.serialize_to_structure
        _structure_simple_01 = _simple_instance_01.serialize_to_structure
        # print('\ntest_api_contents_handling:\n create_test_content',
        #       '\n  _structure_simple_00 ->', _structure_simple_00,
        #       '\n  _structure_simple_01 ->', _structure_simple_01,
        #       )
        return {
            'view_id': _view_id,
            'locale_id': _locale_id,
            'block_00': {
                'upper_index': _upper_index_00,
                'type': _type_00,
                'subtype': _subtype_00,
                'name': _name_00,
                'qnt': _structure_block_00.get(
                    str(_upper_index_00).zfill(2)).get('qnt'),
                'structure': _structure_block_00
            },
            'block_01': {
                'upper_index': _upper_index_01,
                'type': _type_01,
                'subtype': _subtype_01,
                'name': _name_01,
                'qnt': _structure_block_01.get(
                    str(_upper_index_01).zfill(2)).get('qnt'),
                'structure': _structure_block_01
            },
            'simple_00': {
                'upper_index': _upper_index_02,
                'type': _type_02,
                'name': _name_02,
                'structure': _structure_simple_00
            },
            'simple_01': {
                'upper_index': _upper_index_03,
                'type': _type_03,
                'name': _name_03,
                'structure': _structure_simple_01
            }
        }
    return _method


@pytest.fixture(scope='session')
def root_url():
    return 'http://127.0.0.1:5000'


@pytest.fixture(scope='session')
def app():
    app = create_app('testing_config.py')
    # to avoid delay when before_first_request started.
    dbs_global.create_all(app=app)
    # Testing only.
    # print('\ntest.conftest, app ->')
    # dbs_global.init_app(app)
    return app


@pytest.fixture
def sessions():
    return Sessions()


@pytest.fixture(scope='session')
def content_schema():
    return ContentSchema()


@pytest.fixture(scope='session')
def content_get_schema():
    return ContentGetSchema()


@pytest.fixture(scope='session')
def structure_schema():
    return StructureSchema()


@pytest.fixture(scope='session')
def structure_get_schema():
    return StructureGetSchema()


@pytest.fixture(scope='session')
def locale_global_schema():
    return LocaleGlobalSchema()


@pytest.fixture(scope='session')
def locale_global_get_schema():
    return LocaleGlobalGetSchema()


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
        if item_kind is None or item_kind not in [
                'locale', 'kind', 'view', 'role']:
            return {
                'message':
                    "You should provide item_kind you want. "
                    "It sould be 'id' for locale_id, 'id_kind' or "
                    "'view_id'."}
        if item_kind == 'locale':
            _active_constant = global_constants.get_LOCALES
            key = 'id'
        elif item_kind == 'view':
            _active_constant = global_constants.get_VIEWS
            key = 'view_id'
        # elif item_kind == 'kind':
        #     _active_constant = components_constants.get_KINDS
        #     key = 'id_kind'
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
        # if item_kind == 'kind_id':
        #     _active_pks = components_constants.get_PKS
        if item_kind == 'locale_id':
            _active_pks = global_constants.get_PKS
        elif item_kind == 'view_id':
            _active_pks = global_constants.get_VIEWS_PKS
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
    def _method(
            lng: str = 'en', qnt: int = 1,
            underscore: bool = False) -> str:
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


@pytest.fixture(scope='session')
def user_schema():
    return UserSchema()


@pytest.fixture(scope='session')
def user_get_schema():
    return UserGetSchema()


@pytest.fixture(scope='session')
def view_global_schema():
    return ViewGlobalSchema()


# @pytest.fixture(scope='session')
# def view_get_schema():
#     return ViewGlobalGetSchema()


@pytest.fixture(scope='module')
def view_instance(random_text, view_global_schema):
    '''
    View model instance without saving.
    id_kind - argument or random text of 3 word to avoid repeating keys,
    description - argument or random set of 12 words.
    '''
    def _method(values: Dict = {}) -> 'ViewGlobalModel':
        _values_json = {
            'view_id': values.get(
                'view_id', random_text(qnt=3, underscore=True)),
            'description': values.get('description', random_text(qnt=12))
        }
        return view_global_schema.load(
            _values_json, session=dbs_global.session)
    return _method


@pytest.fixture()
def saved_view_instance(client, view_instance) -> ViewGlobalModel:
    '''
    This fixture test save action.
    '''
    def _method(values: Dict = {}) -> ViewGlobalModel:
        _view_instance = view_instance(values=values)
        _view_instance.save_to_db()
        # print('\nbefore yield')
        yield _view_instance
        # print('after yield')
        if _view_instance.is_exist():
            _view_instance.delete_fm_db()
        yield
        # yield 'Success'
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


@pytest.fixture()
def view_id():
    return global_constants.get_VIEWS_PKS[0]


@pytest.fixture()
def view_ids():
    return global_constants.get_VIEWS_PKS[0]


@pytest.fixture()
def attributes():
    return {
        '00':
            {
                'type': 'header',
                'name': 'header',
            },
        '01':
            {
                'type': 'vblock',
                'name': 'vblock00',
                'subtype': 'txt',
                "qnt": 4,
            },
        '02':
            {
                'type': 'hblock',
                'name': 'hblock00',
                'subtype': 'pix',
                "qnt": 3
            },
        '03':
            {
                'type': 'vblock',
                'name': 'vblock01',
                'subtype': 'pix',
                "qnt": 2
            },
        '04':
            {
                'type': 'footer',
                'name': 'footer',
            },
    }


@pytest.fixture(scope='module')
def structure_instance(random_text):
    '''
    structure model instance without saving.
    view_id - valid view
    '''
    def _method(values: Dict = {}):

        _values = {
            'view_id': values.get(
                'view_id', global_constants.get_VIEWS[0].get('view_id')),
            'locale_id': values.get(
                'locale_id', global_constants.get_LOCALES[0].get('id')),
            'created': values.get('created', datetime.now()),
            'user_id': values.get('user_id', randint(1, 128)),
            'attributes': values.get('attributes', {})
        }
        return StructureModel(**_values)
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
        lng = values.get(
            'locale_id', global_constants.get_LOCALES[0]['id'])
        _values = {
            'identity': values.get(
                'identity', random_text(qnt=2, underscore=True)),
            'view_id':
                values.get(
                    'view_id',
                    global_constants.get_VIEWS[0].get('view_id')),
            'locale_id': lng,
            'user_id': values.get('user_id', randint(1, 128)),
            'title': values.get('title', random_text(lng=lng, qnt=3)),
            'content': values.get('content', random_text(lng=lng, qnt=5)),
        }
        return ContentModel(**_values)
    return _method


@pytest.fixture()
def locale_instance(random_text, locale_global_schema):
    def _method(values: Dict = {}) -> LocaleGlobalModel:
        _values = {
            'id': values.get(
                'id', ''.join(choice(ascii_lowercase) for x in range(2))),
            'remarks': values.get('remarks', random_text(qnt=5))
        }
        _locale = locale_global_schema.load(
            _values, session=dbs_global.session)
        return _locale
    return _method


@pytest.fixture()
def saved_locale_instance(client, locale_instance):
    def _method(values: Dict = {}):
        _locale_instance = locale_instance(values=values)
        _locale_instance.save_to_db()
        yield _locale_instance
        # print('second')
        if _locale_instance.is_exist:
            _locale_instance.delete_fm_db()
        yield
    return _method


@pytest.fixture(scope='module')
def random_email(random_text):
    def _method(arg=None):
        return rm.randomMail()
    return _method
