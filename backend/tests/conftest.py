import pytest

from random import choice

from application import create_app

from application.users.models.users import UserModel
from application.users.schemas.users import UserSchema
from application.users.models.confirmations import ConfirmationModel
from application.components.models import ComponentModel
from application.components.models.component_kinds import ComponentKindsModel
from application.components.schemas.components import ComponentTestSchema


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


@pytest.fixture
def source_text_lat(scope='session'):
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
        'has now been found in more than 20 countries.').replace('.', '').\
        replace(',', '').replace('"', '').replace("'", "").replace("-", "").\
        lower().split(' ')


@pytest.fixture
def source_text_cyr(scope='session'):
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
        'материалов российских средств массовой информации"').replace('.', '').\
        replace(',', '').replace('"', '').replace("'", "").replace("-", "").\
        lower().split(' ')


@pytest.fixture
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


@pytest.fixture
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


@pytest.fixture
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


@pytest.fixture
def user_schema(scope='session'):
    return UserSchema()


@pytest.fixture
def component_test_schema(scope='session'):
    return ComponentTestSchema()


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
            locale_id=_locale_id,
            title=_title,
            content=_content)
        # component.save_to_db()
        return component
    return _method


@pytest.fixture
def component_kind_instance(random_text):
    '''
    It jenerate instance without saving.
    id_kind - argument, description - random set of 10 words.
    '''
    _description = random_text(lang='en', qnt=10)

    def _method(id_kind: str = 'button'):
        component_kind = ComponentKindsModel(
            id_kind=id_kind, description=_description)
        return component_kind
    return _method
