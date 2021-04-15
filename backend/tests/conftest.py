import pytest

# from typing import Dict

from application import create_app

from random import choice
# from random import choice, randint


@pytest.fixture(scope='session')
def root_url():
    return 'http://127.0.0.1:5000'


@pytest.fixture
def app():
    app = create_app('testing_config.py')
    return app


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
        # print('\nrandom_text, qnt ->', qnt)
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
        # print('\nrandom_text_underscore, qnt ->', qnt)
        result = ''
        for index in range(0, qnt):
            result += random_words(lang) + '_'
        return result[0: -1]
    return _method
