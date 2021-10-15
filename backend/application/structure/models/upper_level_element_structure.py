from typing import Dict, Union, List

from application.global_init_data import global_constants

from ..errors.custom_exceptions import (
    UpperLevelElementWrongKey,
    UpperLevelElementWrongValue,
    UpperLevelElementIncorrectQntAction
    # StructureUpperLevelWrongKeys
)


class UpperLevelElement():
    '''
    That respresents upper level element such as:
    {
        "type": "vblock",
        "subtype": "txt",
        "qnt": 6,
        "name": "vblock00",
    }
    '''
    block_valid_keys = ['_type', '_subtype', '_qnt', '_name']
    simple_valid_keys = [
        item for item in block_valid_keys
        if item not in ['_subtype', '_qnt']]

    block_element_values = [
        item for item in global_constants.get_UPPER_LEVEL_TYPES_PKS
        if item not in ['header', 'footer']]
    simple_element_values = [
        item for item in global_constants.get_UPPER_LEVEL_TYPES_PKS
        if item not in ['hblock', 'vblock']]

    subtype_values = global_constants.get_UPPER_LEVEL_SUBTYPES_PKS

    def __init__(self, args: Dict = {
            '_type': global_constants.get_UPPER_LEVEL_TYPES_PKS[0],
            '_name': 'defaule name'}
    ) -> 'UpperLevelElement':
        '''Set class keys with values'''
        for k, v in args.items():
            setattr(self, f'_{k}', v)
        '''Check all supplied keys are valid,
        otherwise raise wrong key error.'''
        for k in self.__dict__.keys():
            if k not in UpperLevelElement.block_valid_keys:
                raise UpperLevelElementWrongKey(k, 400)

        '''Check supplied type and subtype values are withing
        possible range, otherwise raise wrong value error.'''
        '''type'''
        if self._type not in [*UpperLevelElement.block_element_values,
                              *UpperLevelElement.simple_element_values]:
            raise UpperLevelElementWrongValue(
                self.__dict__.get('_type'), 400)
        '''subtypes'''
        _subtype = self.__dict__.get('_subtype')
        # print('\nstructure, models, view_page_structure:',
        #       '\n UpperLevelElement',
        #       '\n  _subtype ->', _subtype)
        if (_subtype is not None) and (
                _subtype not in UpperLevelElement.subtype_values):
            raise UpperLevelElementWrongValue(
                self.__dict__.get('_subtype'), 400)

    def __repr__(self) -> Dict:
        return str(self.__dict__)

    @classmethod
    def check_args(cls, type: str = '', args: Dict = {}) -> bool:
        '''
        The method check the following:
            1. keys spelling and values for simple and block
                types respectively.

        '''
        # print('\nupper_level_element_structure',
        #       '\n check_attrs',
        #       '\n  type ->', type,
        #       '\n  args ->', args
        #       )
        if type in cls.block_element_values:
            for k, v in args.items():
                if f'_{k}' not in cls.block_valid_keys:
                    raise UpperLevelElementWrongKey(k, 400)
                if k == 'subtype':
                    if v not in cls.subtype_values:
                        raise UpperLevelElementWrongValue(v, 400)
                if k == 'qnt':
                    if v > 100:
                        raise UpperLevelElementWrongValue(v, 400)
        elif type in cls.simple_element_values:
            for k, v in args.items():
                if f'_{k}' not in cls.simple_valid_keys:
                    raise UpperLevelElementWrongKey(k, 400)
        else:
            raise UpperLevelElementWrongValue(type, 400)
        return True

    @property
    def type(self) -> str:
        # print('\n', self.__type)
        return self._type

    @type.setter
    def type(self, value: str = '') -> None:
        '''If value simple upper level element -> remove subtype
        and qnt, otherwise if subtype and qnt does not extis
        insert default ones.'''
        setattr(self, '_name', value)
        if value in UpperLevelElement.block_element_values:
            if not hasattr(self, '_subtype'):
                setattr(self, '_subtype',
                        UpperLevelElement.subtype_values[0])
            if not hasattr(self, '_qnt'):
                setattr(self, '_qnt', 1)
            # print('\nupper_level_element_structure',
            #       '\n type.setter, block element',
            #       '\n  qnt ->', self.qnt)
        elif value in UpperLevelElement.simple_element_values:
            if hasattr(self, '_subtype'):
                delattr(self, '_subtype')
            if hasattr(self, '_qnt'):
                delattr(self, '_qnt')
        else:
            raise UpperLevelElementWrongValue(
                value, 400)
        self._type = value

    @property
    def subtype(self) -> Union[str, None]:
        if hasattr(self, '_subtype'):
            return self._subtype
        return None

    @subtype.setter
    def subtype(self, value: str) -> None:
        self._subtype = value

    @property
    def qnt(self) -> Union[int, None]:
        if hasattr(self, '_qnt'):
            return self._qnt
        return None

    @qnt.setter
    def qnt(self, value: str) -> None:
        self._qnt = value

    @property
    def name(self) -> str:
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        self._name = value

    def setter(self, args: Dict = {}) -> None:
        '''
        The method actions:
        1. Check whether type attribute available in args,
            otherwise set _type with self type.
        2. Check keys values and combinations are valid.
        3. If type awailable from args and defferent from self
            type set new type.
        4. Assign all other attributes using setters.
        '''
        # _type = args.get('type', self.type)
        UpperLevelElement.check_args(args.get('type', self.type), args)
        if (args.get('type') is not None)\
                and (not (args.get('type') == self.type)):
            self.type = args.pop('type')
        for k, v in args.items():
            # print('key ->', k, '\tvalue ->', v)
            if k == 'name':
                self.name = v
            if k == 'subtype':
                self.subtype = v
            if k == 'qnt':
                self.qnt = v

    def getter(self, args: List = []) -> Union[Dict, None]:
        print('upper_level_element_structure:\n getter',
              '\n  args ->', args)
        '''check key validity'''
        if self._type in UpperLevelElement.block_element_values:
            _valid_keys = UpperLevelElement.block_valid_keys
        elif self._type in UpperLevelElement.simple_element_values:
            _valid_keys = UpperLevelElement.simple_valid_keys
        for arg in args:
            if f'_{arg}' not in _valid_keys:
                raise UpperLevelElementWrongKey(arg, 400)
        result = {}
        for arg in args:
            result[arg] = self.__dict__.get(f'_{arg}')
        return result

    def get_all(self) -> Dict:
        result = {}
        for key in self.__dict__.keys():
            result[key[1:]] = self.__dict__.get(key)
        return result

    def insert_element(self) -> None:
        if not hasattr(self, '_qnt'):
            raise UpperLevelElementIncorrectQntAction(
                f'Element type {self.type} has no qnt attribute.', 400)
        if (self.qnt + 1) > 100:
            raise UpperLevelElementIncorrectQntAction(
                f'Attribute qnt is already - {self.qnt}.', 400)
        self.qnt += 1

    def remove_element(self):
        if not hasattr(self, '_qnt'):
            raise UpperLevelElementIncorrectQntAction(
                f'Element type {self.type} has no qnt attribute.', 400)
        if (self.qnt - 1) < 1:
            raise UpperLevelElementIncorrectQntAction(
                f'Attribute qnt is already - {self.qnt}.', 400)
        self.qnt -= 1
