import pytest

from typing import Dict

from random import randint
# from random import choice, randint
from application.modules.dbs_global import dbs_global

# from application.components.schemas.components import
# (ComponentGetSchema, ComponentSchema)


# from application.global_init_data import global_constants


# @pytest.fixture(scope='session')
# def component_schema():
#     return ComponentSchema()


# @pytest.fixture(scope='session')
# def component_get_schema():
#     return ComponentGetSchema()


@pytest.fixture(scope='module')
def component_instance(
        random_text, random_text_underscore,
        valid_item, component_schema):
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
            _json['kind_id'] = valid_item('kind')

        if 'locale_id' in keys:
            _json['locale_id'] = values['locale_id']
        else:
            # _json['locale_id'] = valid_component_kind
            _json['locale_id'] = valid_item('locale')

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
