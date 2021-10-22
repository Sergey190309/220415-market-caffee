from typing import List
from ..errors.custom_exceptions import WrongIndexError, WrongTypeError

from flask_babelplus import lazy_gettext as _

# from .content_element import ContentElement


class ContentElements():
    _type_values = []

    def __init__(
        self,
        upper_index: int = 0,
        type: str = '',
        types: List = [],
        name: str = ''
    ):
        ContentElements._type_values = types
        # print('\ncontent_elements:\n init',
        #       '\n  upper_index ->', upper_index)
        self.upper_index = upper_index
        self.type = type
        self.name = name

    @property
    def upper_index(self) -> int:
        return self._upper_index

    @upper_index.setter
    def upper_index(self, value: int = 0):
        if value < 0 or value > 99:
            raise WrongIndexError(
                str(_("Index has been '%(index)s', it's wrong.",
                      index=value)), 400)
        self._upper_index = value

    @property
    def type(self) -> str:
        return self._type

    @type.setter
    def type(self, value: str = '') -> None:
        if ContentElements._type_values:
            if value not in ContentElements._type_values:
                raise WrongTypeError(
                    str(_(
                        "Upper level element could be '%(types)s', but "
                        "provided type is '%(type)s'.",
                        types=ContentElements._type_values,
                        type=value)), 400)
        self._type = value

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value: str = ''):
        if isinstance(value, str):
            self._name = value
        else:
            self._name = ''
