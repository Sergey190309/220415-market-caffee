from typing import Dict

from flask_babelplus import lazy_gettext as _

from ..errors.custom_exceptions import WrongElementKeyError
from .types import ContentValues


class ContentElement():
    '''
    The class represents minimum content with title and content only.
    '''
    _keys = ['title', 'content']

    def __init__(self, value: Dict = {'title': '', 'content': ''}):
        if ContentElement.check_keys(value):
            self._value = {**value}

    @classmethod
    def check_keys(cls, value: Dict = {}) -> bool:
        for key in value.keys():
            if key not in cls._keys:
                raise WrongElementKeyError(
                    str(_("Content element value key should be either "
                          "'title' or 'content', but one of them is "
                          "'%(key)s'.",
                          key=key)), 400)
        # print('\ncontent_element:\n check_keys',
        #       '\n  value ->', value)
        return True

    @property
    def value(self) -> Dict:
        return self._value

    @value.setter
    def value(self, value: Dict = {}) -> None:
        if ContentElement.check_keys(value):
            self._value = {**self._value, **value}

    def serialize_to_content(
            self, index: int = 0) -> ContentValues:
        '''
        The method would be overrided in children, used to prepare data
            to save to content db table. Representation should be as
            below for block upper level element.
        {
            identity: '01_vblock_txt_001',
            element: {
                title: 'Title value',
                content: 'Content value'
            }
        }
        '''
        pass

    @property
    def serialize_to_structure(self) -> Dict:
        '''
        The method would be overrided in children, used to prepare data
            to save to structure db table. Representation should be as
            below for block upper level element.
        {
            "01": {
                "qnt": 3,
                "name": "vblock00",
                "type": "vblock",
                "subtype": "txt"}
        }
        '''
        pass
