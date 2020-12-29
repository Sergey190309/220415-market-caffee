import pytest

from application.components.schemas.components import component_schema
from application.components.models import ComponentModel


@pytest.fixture
def component_instance(random_words):
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


@pytest.mark.active
def test_component_save_finds_delete(test_client, component_instance):
    _component_en = component_instance('en')
    print(_component_en)
    print(component_schema.dump(_component_en))
    _component_en.save_to_db()
    print(component_schema.dump(_component_en))
    # print(_component)
