import pytest

from typing import Dict

from random import choice, randint

from application import create_app

from sqlalchemy import create_engine

from application.modules.dbs_global import dbs_global

from application.users.models.users import UserModel
from application.users.schemas.users import UserSchema, UserGetSchema
from application.users.models.confirmations import ConfirmationModel

# from application.components.models import ComponentModel
from application.components.models.component_kinds import ComponentKindsModel
from application.components.schemas.components import (
    ComponentGetSchema, ComponentSchema)
from application.components.schemas.component_kinds import (
    ComponentKindGetSchema, ComponentKindSchema)

from application.contents.models.views import ViewModel
from application.contents.schemas.views import ViewGetSchema, ViewSchema

from application.contents.models.contents import ContentModel
from application.contents.schemas.contents import ContentGetSchema, ContentSchema

from application.testing_config import SQLALCHEMY_DATABASE_URI
from application.contents.local_init_data_contents import contents_constants
from application.components.local_init_data_components import components_constants
from application.global_init_data import global_constants


@pytest.fixture(scope='session')
def valid_item():
    '''
    The fixture return valid item from constants.
    It's first element from list according item argument.
    Dectinary key depends from contants it's there primary keys.
    id - locale,
    id_kind - component kind,
    id_view - content's view.
    '''
    def _method(item_kind: str = None):
        if item_kind is None or item_kind not in ['id', 'id_kind', 'id_view']:
            return {
                'message':
                    "You should provide item_kind you want. "
                    "It sould be 'id' for locale_id, 'id_kind' or 'id_view'."}
        if item_kind == 'id':
            _active_constant = global_constants.get_LOCALES
        elif item_kind == 'id_view':
            _active_constant = contents_constants.get_VIEWS
        elif item_kind == 'id_kind':
            _active_constant = components_constants.get_KINDS
        else:
            _active_constant = None
        if _active_constant is None:
            return {
                'message':
                    "Somthing went wrong."}
        return _active_constant[0][item_kind]
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
        _active_pks = [item for item in _active_pks if item != prev_item]
        # print(_active_pks)
        # print(_active_pks[0])
        return _active_pks[0]
    return _method


@pytest.fixture(params=['en'])
# @pytest.fixture(params=[item['id'] for item in global_constants.get_LOCALES])
def allowed_language(request):
    return request.param


@pytest.fixture(params=['button'])
# @pytest.fixture(params=[item['id_kind'] for item in components_constants.get_KINDS])
def allowed_component_kind(request):
    return request.param


@pytest.fixture(scope='session')
def root_url():
    return 'http://127.0.0.1:5000'


@pytest.fixture(scope='session')
def url_users(root_url):
    '''
    Generate url for this file tests.
    '''
    return root_url + '/home/index'


@pytest.fixture(scope='session', autouse=True)
def test_client(root_url):
    # print('\nclient')
    app = create_app('testing_config.py')

    with app.test_client() as test_client:
        with app.app_context():
            test_client.get(root_url)  # to initiate dbs
            yield test_client


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


@pytest.fixture(scope='module')
def random_words(source_text_lat, source_text_cyr):
    '''
    Source for words. Latin or cyrilic depening from argument.
    '''
    def _method(lang: str = 'en'):
        # print(lang)
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
    def _method(lang: str = 'en', qnt: int = 1):
        result = ''
        for index in range(0, qnt):
            result += random_words(lang) + ' '
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
        result = ''
        for index in range(0, qnt):
            result += random_words(lang) + '_'
        return result[0: -1]
    return _method


@pytest.fixture(scope='module')
def random_email(random_words):
    def _method(arg=None):
        domens = ('com', 'ru', 'uk', 'ua', 'org', 'mil', 'su', 'cn')
        return random_words() + '@' + random_words() + '.' + choice(domens)
    return _method


@pytest.fixture(scope='module')
def user_create_json(random_email):
    def _method(arg=None):
        return {
            # 'user_name': 'user_name',
            'email': random_email(),
            'password': 'qwer'
        }
    return _method


@pytest.fixture(scope='session')
def user_schema():
    return UserSchema()


@pytest.fixture(scope='session')
def user_get_schema():
    return UserGetSchema()


@pytest.fixture(scope='session')
def component_get_schema():
    return ComponentGetSchema()


@pytest.fixture(scope='session')
def component_schema():
    return ComponentSchema()


@pytest.fixture(scope='session')
def component_kinds_get_schema():
    return ComponentKindGetSchema()


@pytest.fixture(scope='session')
def component_kinds_schema():
    return ComponentKindSchema()


@pytest.fixture(scope='session')
def view_get_schema():
    return ViewGetSchema()


@pytest.fixture(scope='session')
def view_schema():
    return ViewSchema()


@pytest.fixture(scope='session')
def content_get_schema():
    return ContentGetSchema()


@pytest.fixture(scope='session')
def content_schema():
    return ContentSchema()


@pytest.fixture
def created_user(
        random_email,
        test_client,
        user_schema,
        user_create_json):
    def _method(role_id=None, email=None):
        _user_create_json = user_create_json().copy()  # avoid dictionary changing
        _user_create_json['role_id'] = role_id
        if email is not None:
            _user_create_json['email'] = email
        else:
            _user_create_json['email'] = random_email()
        _user = user_schema.load(_user_create_json)
        _user.save_to_db()
        _confirmation = ConfirmationModel(_user.id)
        _confirmation.save_to_db()
        # Get user from db:
        user = UserModel.find_by_id(_user.id)
        # print(user_schema.dump(user)['role'])

        return user
        # yield user
    yield _method
    # print('created_user')
    # user.delete_fm_db()


@pytest.fixture
def access_token():
    def _method(user):
        # print('\n\naccess_token fixture')
        return user.get_tokens()['access_token']
    return _method


@pytest.fixture
def _app_folder():
    '''
    Used as an addendum to generate SQLite file path.
    '''
    return 'application/'


@pytest.fixture
def _engine(_app_folder):
    '''
    Generation of SQLite file path.
    '''
    return create_engine(SQLALCHEMY_DATABASE_URI)


@pytest.fixture(scope='module')
def component_kind_instance(random_text):
    '''
    It generates instance without saving.
    id_kind - argument, description - random set of 10 words.
    '''
    def _method(id_kind: str = None):
        if id_kind is None:
            id_kind = random_text(qnt=2)
        _description = random_text(qnt=10)
        return ComponentKindsModel(
            id_kind=id_kind, description=_description)
    return _method


@pytest.fixture(scope='module')
def component_instance(
        random_text, random_text_underscore,
        valid_item,
        component_schema):
    '''
    It generates instance without saving.
    identity - argument or random set of 2 words with underscore,
    kind_id, locale_id - argument or from constants,
    title - argument or random set of 2 words with underscore,
    content - argument or random set of 12 words,
    details - argument or random integer up to 2^10 = 1024
    '''
    def _method(values: Dict = {}):
        if values is None or not isinstance(values, Dict):
            return 'Provide values in dictinary type'
        _json = {}
        keys = values.keys()
        if 'identity' in keys:
            _json['identity'] = values['identity']
        else:
            _json['identity'] = random_text_underscore(qnt=2)

        if 'kind_id' in keys:
            _json['kind_id'] = values['kind_id']
        else:
            # _json['kind_id'] = valid_component_kind
            _json['kind_id'] = valid_item('id_kind')

        if 'locale_id' in keys:
            _json['locale_id'] = values['locale_id']
        else:
            # _json['locale_id'] = valid_component_kind
            _json['locale_id'] = valid_item('id')

        if 'title' in keys:
            _json['title'] = values['title']
        else:
            _json['title'] = random_text_underscore(lang=_json['locale_id'], qnt=2)

        if 'content' in keys:
            _json['content'] = values['content']
        else:
            _json['content'] = random_text(lang=_json['locale_id'], qnt=12)

        if 'details' in keys:
            _json['details'] = values['details']
        else:
            _json['details'] = randint(1, 1024)

        return component_schema.load(_json, session=dbs_global.session)
    return _method


@pytest.fixture(scope='module')
def view_instance(random_text, view_schema):
    '''
    View model instance without saving.
    id_kind - argument or random text of 1 word,
    description - argument or random set of 12 words.
    '''
    def _method(values: Dict = {}) -> 'ViewModel':
        if values is None or not isinstance(values, Dict):
            return 'Provide values in dictinary type'
        _json = {}
        keys = values.keys()
        if 'id_view' in keys:
            _json['id_view'] = values['id_view']
        else:
            _json['id_view'] = random_text()
        if 'description' in keys:
            _json['description'] = values['description']
        else:
            _json['description'] = random_text(qnt=12)
        return view_schema.load(_json, session=dbs_global.session)
    return _method


@pytest.fixture(scope='module')
def content_instance(random_text):
    '''
    Content model instance without saving.
    identity, view_id, locale_id - arguments, title - random set of 3 words.
    content - random set of 5 words
    '''
    def _method(**content_ids):
        if 'identity' in content_ids.keys():
            _identity = content_ids['identity']
        else:
            _identity = random_text(qnt=2)[0: -1]

        if 'view_id' in content_ids.keys():
            _view_id = content_ids['view_id']
        else:
            _view_id = contents_constants.get_VIEWS[0]['id_view']

        if 'locale_id' in content_ids.keys():
            _locale_id = content_ids['locale_id']
        else:
            _locale_id = global_constants.get_LOCALES[0]['id']

        _title = random_text(_locale_id, 3)
        _content = random_text(_locale_id, 5)
        _user_id = 0
        return ContentModel(
            identity=_identity,
            view_id=_view_id,
            locale_id=_locale_id,
            user_id=_user_id,
            title=_title,
            content=_content)
    return _method


@pytest.fixture
def user_instance():
    pass
