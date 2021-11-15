from typing import List, Union
from ..errors.custom_exceptions import (
    WrongIndexError, WrongTypeError, WrongDirection)

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

    def ul_index(self, direction: str = '', index: int = -1) -> int:
        '''
        Depending on direction increase or decrease index by 1.
        If no index provided use internal one.
        If no direction provided internal index assiged with argument.
        direction: Union['inc', 'dec']
        The method returns new upper level index.
        '''
        if index == -1:
            index = self.upper_index
        if direction == '':
            self.upper_index = index
        elif direction == 'inc':
            self.upper_index = index + 1
        elif direction == 'dec':
            self.upper_index = index - 1
        else:
            raise WrongDirection(
                str(_("Index change direction may be either 'inc' as "
                      "increase or 'dec' as decrease, but "
                      "'%(direction)s' has been provided.",
                      direction=direction)), 400)
        return self.upper_index

    def save_to_db(self) -> Union[None, str]:
        pass

    def delete_to_db(self) -> Union[None, str]:
        pass
