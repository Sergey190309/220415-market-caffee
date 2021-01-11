import pytest

from random import choice

from application import create_app

from sqlalchemy import create_engine

from application.users.models.users import UserModel
from application.users.schemas.users import UserSchema, UserGetSchema
from application.users.models.confirmations import ConfirmationModel

from application.components.models import ComponentModel
from application.components.models.component_kinds import ComponentKindsModel
from application.components.schemas.components import ComponentTestSchema
from application.components.schemas.component_kinds import ComponentKindGetSchema

from application.contents.models.views import ViewModel
from application.contents.schemas.views import ViewGetSchema

from application.contents.models.contents import ContentModel
from application.contents.schemas.contents import ContentGetSchema, ContentSchema

from application.testing_config import SQLALCHEMY_DATABASE_URI
from application.contents.local_init_data_contents import contents_constants
from application.global_init_data import global_constants


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
        return result
    return _method


@pytest.fixture(scope='module')
def random_email(random_words):
    def _method(arg=None):
        domens = ('com', 'ru', 'uk', 'ua', 'org', 'mil', 'su', 'cn')
        return random_words() + '@' + random_words() + '.' + choice(domens)
    return _method


@pytest.fixture()
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
def component_test_schema():
    return ComponentTestSchema()


@pytest.fixture(scope='session')
def component_kinds_get_schema():
    return ComponentKindGetSchema()


@pytest.fixture(scope='session')
def view_get_schema():
    return ViewGetSchema()


@pytest.fixture(scope='session')
def content_get_schema():
    return ContentGetSchema()


@pytest.fixture(scope='session')
def content_schema():
    return ContentSchema()


@pytest.fixture
def created_user(
        test_client,
        user_schema,
        user_create_json):
    def _method(role_id=None, email=None):
        _user_create_json = user_create_json().copy()  # avoid dictionary changing
        _user_create_json['role_id'] = role_id
        if email is not None:
            _user_create_json['email'] = email
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
def component_instance(random_words):
    '''
    The fixture create random component instance without saving to db.
    '''
    def _method(lang: str = 'en'):
        # print(lang)
        _identity = ''
        for i in range(0, 3):
            _identity += random_words('en') + '_'

        _locale_id = lang
        _title = ''
        for i in range(0, 2):
            _title += random_words(lang) + ' '
        _content = ''
        for i in range(0, 10):
            _content += random_words(lang) + ' '
        # _json['locale_id'] = lang
        component = ComponentModel(
            identity=_identity[0: -1],
            kind_id='button',
            locale_id=_locale_id,
            title=_title[0: -1],
            content=_content)
        # component.save_to_db()
        return component
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
    # URI_cuts = SQLALCHEMY_DATABASE_URI.split('///')
    # URI = URI_cuts[0] + '///' + _app_folder + URI_cuts[1]
    return create_engine(SQLALCHEMY_DATABASE_URI)
    # return create_engine(URI)
    # return create_engine(URI, echo=True)


@pytest.fixture(scope='module')
def description(random_text):
    def _method(lang: str = 'en', qnt: int = 1):
        return random_text(lang=lang, qnt=qnt)[0: -1]
    return _method


@pytest.fixture
def component_kind_instance(description):
    '''
    It generates instance without saving.
    id_kind - argument, description - random set of 10 words.
    '''
    def _method(id_kind: str = 'button'):
        return ComponentKindsModel(
            id_kind=id_kind, description=description(lang='en', qnt=10))
    return _method


@pytest.fixture(scope='module')
def view_instance(description):
    '''
    View model instance without saving.
    id_kind - argument, description - random set of 12 words.
    '''
    def _method(id_view: str = 'main'):
        return ViewModel(
            id_view=id_view, description=description(lang='en', qnt=12))
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

        _title = random_text(_locale_id, 3)[0: -1]
        _content = random_text(_locale_id, 5)[0: -1]
        _user_id = 0
        return ContentModel(
            identity=_identity,
            view_id=_view_id,
            locale_id=_locale_id,
            user_id=_user_id,
            title=_title,
            content=_content)
    return _method
