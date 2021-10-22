from typing import Dict

from flask_babelplus import lazy_gettext as _

from ..errors.custom_exceptions import WrongElementKeyError


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
