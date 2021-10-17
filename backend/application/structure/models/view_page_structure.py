from typing import Dict, Union

from flask_babelplus import lazy_gettext as _

from ..errors.custom_exceptions import (
    UpperLevelStructureWrongKeys,
    UpperLevelStructureWrongIndex,
    UpperLevelStructureRemoveLastElement
)

from application.global_init_data import global_constants

from .upper_level_element_structure import UpperLevelElement


class ViewPageStructure:
    '''
    Class represents view page structure such as:
    {
        "00": {"name": "header", "type": "header"},
        "01": {"qnt": 6, "name": "vblock00", "type": "vblock", "subtype": "txt"},
        "02": {"qnt": 2, "name": "hblock00", "type": "hblock", "subtype": "pix"},
        "03": {"qnt": 2, "name": "vblock01", "type": "vblock", "subtype": "pix"},
        "04": {"name": "footer", "type": "footer"}
    }
    '''

    def __init__(self, args: Dict = {}):
        '''Check all keys are 2 char digit 00, 01, 02 etc'''
        _keys = args.keys()
        # print(_keys)
        for index, _key in enumerate(_keys):
            if str(index).zfill(2) != _key:
                raise UpperLevelStructureWrongKeys(_key, 400)
                # print('index ->', index, '\tkey ->', _key)
        for k, v in args.items():
            if isinstance(v, Dict):
                v = UpperLevelElement(v)
            setattr(self, k, v)
        # setattr(self, name, value)

    def __repr__(self):
        return str(self.__dict__)

    def len(self):
        return len(self.__dict__)

    def check_index(self, index: int = 0, ext: bool = False):
        '''
        Check whether index vithing existing elementsself.
        ext set true for making possible check indexes
            when one element extenction is needed.
        '''
        _limit = self.len()
        if ext:
            _limit += 1
        if index < 0 or index >= _limit:
            raise UpperLevelStructureWrongIndex(
                str(_(
                    'Index %(index)s has been out of range.',
                    index=index
                )), 400)

    def get_element(self, index: int = 0) -> 'UpperLevelElement':
        self.check_index(index)
        return self.__dict__.get(str(index).zfill(2))

    def set_element(
        self, index: int = 0,
        elem: Union[UpperLevelElement, Dict] = UpperLevelElement(
            {'type': global_constants.get_UPPER_LEVEL_TYPES_PKS[0]}),
        ext: bool = False
    ) -> None:
        '''
        It could be change only existing element (without changing length
        of the page structure).
        Element (elem) could be either UpperLevelElement instance or dictionary.
        '''
        self.check_index(index, ext)
        '''check whether elem UpperLevelElement class instance or
        dictionary create class instance'''
        if isinstance(elem, Dict):
            elem = UpperLevelElement(elem)
        '''set element'''
        setattr(self, str(index).zfill(2), elem)

    def insert_element(self, index: int = 0, args: dict = {}) -> None:
        '''
        The method add element into view page structure basing on
        provided values. Type is compulsory only.
        Other values has defaults.
        '''
        # print('view_page_structure:\n insert_element',
        #       '\n  index ->', index,
        #       '\n  args ->', args)
        '''check index value, it coulde one more then existing elements'''
        self.check_index(index, ext=True)
        '''change key above index to have consecutive indexes'''
        for i in range(len(self.__dict__), index, -1):
            self.set_element(i, self.get_element(i - 1), ext=True)
        '''insert respective  upper level element'''
        self.set_element(index, args, ext=True)

    def remove_element(self, index: int = 0) -> 'UpperLevelElement':
        '''check structure consist of more then one element'''
        if self.len() <= 1:
            raise UpperLevelStructureRemoveLastElement(
                'not allowed!', 400)
        '''check indes is valid'''
        self.check_index(index)
        '''get element with the index'''
        removed_element = self.get_element(index)
        '''change elements' key (shift elements)'''
        for i in range(index, len(self.__dict__) - 1):
            self.set_element(i, self.get_element(i + 1))
        '''delete excess element'''
        delattr(self, str(len(self.__dict__) - 1).zfill(2))
        return removed_element

    def serialize(self) -> Dict:
        result = {}
        for k, v in self.__dict__.items():
            result[k] = {k[1:]: v for (k, v) in v.__dict__.items()}

        return result
