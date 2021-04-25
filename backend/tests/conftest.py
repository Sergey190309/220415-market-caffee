import pytest
# from flask import current_app
from typing import Dict
from random import randint

from application import create_app
from application.modules.dbs_global import dbs_global

from random import choice
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
def source_text_lat():
    return (
        'Pakistan has become the latest country to report cases of the new '
        'coronavirus variant first detected in the UK. Health authorities in Sindh '
        'province said that three people in the southern port city of Karachi had '
        'tested positive for the new strain. All three had recently returned from '
        'the UK, the authorities said, adding that contact tracing was under '
        'way. Pakistan was among dozens of countries to introduce travel '
        'restrictions after the new variant was first identified last week - but '
        'exceptions were made for Pakistani nationals in the UK on visitor or '
        'temporary visas who provided negative tests before travel. The new strain '
        'has now been found in more than 20 countries.'
        'He added that it was possible that the plane broke apart when it hit water, '
        'based on debris found so far. "It possibly ruptured when it hit waters '
        'because if it had exploded mid-air, the debris would be distributed more '
        'widely," said Nurcahyo Utomo.'
        'Investigators are already analysing items which they believe to be a wheel '
        'and part of the planes fuselage. A turbine from one of its engines is also '
        'among the debris that has been recovered.').replace('.', '').\
        replace(',', '').replace('"', '').replace("'", "").replace("-", "").\
        replace('  ', ' ').lower().split(' ')


@pytest.fixture(scope='session')
def source_text_cyr():
    return (
        'Ранее Федеральное собрание РФ одобрило закон, направленный на борьбу с '
        'цензурой со стороны зарубежных интернет-платформ по отношению к российским '
        'СМИ. Теперь Роскомнадзор сможет блокировать полностью или частично '
        'интернет-ресурсы, ограничивающие значимую информацию на территории РФ по '
        'признакам национальности, языка, происхождения, имущественного и '
        'должностного положения, профессии, места жительства и работы, отношения к '
        'религии и (или) в связи с введением иностранными государствами '
        'политических или экономических санкций в отношении РФ или россиян. Отдельно '
        'отмечается, что блокировка может последовать за "дискриминацию в отношении '
        'материалов российских средств массовой информации"'
        'Исправить ситуацию поможет новый искусственный фермент. Он останавливает '
        'распространение дефектного альфа-синуклеина и может стать основой для '
        'терапии болезни Паркинсона. Искусственные ферменты, наноразмерные '
        'комбинации платины и меди, названные биметаллическими наносплавами PtCu, '
        'были созданы из-за их сильных антиоксидантных свойств. Реактивные формы '
        'кислорода способствуют распространению неправильно свернутого '
        'альфа-синуклеина, что приводит к усугублению симптомов болезни. При '
        'попадании в мозг нанозимы поглощают эти формы кислорода. Нанозимы имитируют '
        'каталазу и супероксиддисмутазу, два фермента, расщепляющие реактивные формы '
        'кислорода.').replace('.', '').\
        replace(',', '').replace('"', '').replace("'", "").replace("-", "").\
        replace('  ', ' ').lower().split(' ')


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
def random_words(source_text_lat, source_text_cyr):
    '''
    Source for words. Latin or cyrilic depening from argument.
    '''
    def _method(lang: str = 'en'):
        # print('test.conftest, random_worlds, lang ->', lang)
        if lang == 'en':
            word = choice(source_text_lat)
        elif lang == 'ru':
            word = choice(source_text_cyr)
        else:
            word = 'Fick off!'
        return word
    return _method


@pytest.fixture(scope='module')
def random_text(random_words):
    '''
    Source of text.
    Latin or cyrrilic from argument.
    Quontity of worlds - argument.
    '''
    def _method(lng: str = 'en', qnt: int = 1):
        # print('\nrandom_text, qnt ->', qnt)
        result = ''
        for index in range(0, qnt):
            result += random_words(lng) + ' '
        return result[0: -1]
    return _method


@pytest.fixture(scope='module')
def random_text_underscore(random_words):
    '''
    Source of text.
    Latin or cyrrilic from argument.
    Quontity of worlds - argument.
    '''
    def _method(lang: str = 'en', qnt: int = 1):
        # print('\nrandom_text_underscore, qnt ->', qnt)
        result = ''
        for index in range(0, qnt):
            result += random_words(lang) + '_'
        return result[0: -1]
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
def view_instance(random_text_underscore, random_text, view_schema):
    '''
    View model instance without saving.
    id_kind - argument or random text of 3 word to avoid repeating keys,
    description - argument or random set of 12 words.
    '''
    def _method(values: Dict = {}) -> 'ViewModel':
        if values is None or not isinstance(values, Dict):
            return 'Provide values in dictinary type'
        _values_json = {}
        _values_json['id_view'] = values.get('id_view', random_text_underscore(qnt=3))
        _values_json['description'] = values.get('description', random_text(qnt=12))
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
        if values is None or not isinstance(values, Dict):
            return 'Provide values in dictinary type'
        _values_json = {}
        # keys = values.keys()
        _values_json['locale_id'] = values.get('locale_id', valid_item('locale'))
        _values_json['user_name'] = values.get(
            'user_name', random_text(lng=_values_json['locale_id']))
        _values_json['email'] = values.get('email', random_email())
        _values_json['password'] = values.get('password', 'qwer')
        _values_json['role_id'] = values.get('role_id', valid_item('role'))
        _values_json['first_name'] = values.get(
            'first_name', random_text(lng=_values_json['locale_id']))
        _values_json['last_name'] = values.get(
            'last_name', random_text(lng=_values_json['locale_id']))
        _values_json['remarks'] = values.get(
            'remarks', random_text(lng=_values_json['locale_id'], qnt=12))
        return user_schema.load(_values_json)
    return _method


@pytest.fixture(scope='module')
def content_instance(random_text, random_text_underscore):
    '''
    Content model instance without saving.
    identity, view_id, locale_id - arguments,
    title - random set of 3 words.
    content - random set of 5 words
    '''
    def _method(content_ids: Dict = {}):
        # keys = content_ids.keys()
        _identity = content_ids.get('identity', random_text_underscore(qnt=2)[0: -1])
        _view_id = content_ids.get('view_id', contents_constants.get_VIEWS[0]['id_view'])
        _locale_id = content_ids.get('locale_id', global_constants.get_LOCALES[0]['id'])
        _user_id = content_ids.get('user_id', randint(1, 128))
        _title = content_ids.get('title', random_text(_locale_id, 3))
        _content = content_ids.get('content', random_text(_locale_id, 5))
        return ContentModel(
            identity=_identity,
            view_id=_view_id,
            locale_id=_locale_id,
            user_id=_user_id,
            title=_title,
            content=_content)
    return _method


@pytest.fixture(scope='module')
def random_email(random_words):
    def _method(arg=None):
        domens = ('com', 'ru', 'uk', 'ua', 'org', 'mil', 'su', 'cn')
        return random_words() + '@' + random_words() + '.' + choice(domens)
    return _method
