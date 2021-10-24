from typing import Dict, Union, List
from flask_babelplus import lazy_gettext as _
from ..errors.custom_exceptions import (
    WrongTypeError,
    WrongElementTypeError,
    WrongIndexError
)

from .types import ContentValues  # , StactureValues
from .content_elements import ContentElements
from .content_element import ContentElement


class ContentElementBlock(ContentElements):
    '''
    The class represent information that could be shown as block of
        content  element on view page.
    Both initiation and setting class element are possible with class
        instances and with elements to generate class instance.
    '''
    '''Allowed types and subtypes elements:'''

    _types = ['vblock', 'hblock']
    _subtypes = ['txt', 'pix']

    def __init__(
            self, upper_index: int = 0,
            type: str = '', subtype: str = '', name: str = '',
            elements: List[(Union[Dict, ContentElement])] = []):
        super().__init__(
            upper_index=upper_index,
            type=type,
            types=ContentElementBlock._types,
            name=name)
        # print('\ncontent_elements_block"\n init',
        #       '\n  type ->', type,
        #       '\n  subtype ->', subtype,
        #       '\n  name ->', name,
        #       '\n  elements ->', elements,
        #       )
        self.subtype: str = subtype
        self.elements = elements

    def check_index(self, index: int = 0, ext: bool = False) -> bool:
        '''Raise error if index out of range. ext - check index in
            case of new element insertion.'''
        _length = len(self.elements)
        if ext:
            _ext = 1
        else:
            _ext = 0
        if index >= 0 and index < _length + _ext:
            return True
        else:
            raise WrongIndexError(
                str(_("Length of element array is %(length)s but you try "
                      "to operate with index '%(index)s'.",
                      length=_length,
                      index=index)), 400)

    @classmethod
    def wrong_element_type(cls, type: any) -> None:
        '''Just raise error to avoid DRY.'''
        raise WrongElementTypeError(
            str(_("Elements should be '['dict', 'ContentElement']', but "
                  "at least one of the elements has type '%(type)s'.",
                  type=type)), 400)

    @property
    def subtype(self) -> str:
        return self._subtype

    @subtype.setter
    def subtype(self, value: str = '') -> None:
        if ContentElementBlock._subtypes:
            if value not in ContentElementBlock._subtypes:
                raise WrongTypeError(
                    str(_(
                        "Block element type shoud be withing "
                        "'%(subtypes)s', but provided subtype is "
                        "'%(subtype)s'.",
                        subtypes=ContentElementBlock._subtypes,
                        subtype=value)), 400)
        self._subtype = value

    @property
    def elements(self) -> List[ContentElement]:
        '''Retung list of clsss ContentElement instancess.'''
        return self._elements

    @elements.setter
    def elements(self, value: List[Union[Dict, ContentElement]]) -> None:
        self._elements = []
        for item in value:
            if isinstance(item, Dict):
                self._elements.append(ContentElement(item))
            elif isinstance(item, ContentElement):
                self._elements.append(item)
            else:
                ContentElementBlock.wrong_element_type(type(item))

    def get_element(self, index: int = 0) -> ContentElement:
        self.check_index(index)
        return self.elements[index]

    def set_element(
            self, index: int = 0,
            value: Union[Dict, ContentElement] = {}) -> None:
        self.check_index(index)
        if isinstance(value, dict):
            self._elements[index] = ContentElement(value)
        elif isinstance(value, ContentElement):
            self._elements[index] = value
        else:
            ContentElementBlock.wrong_element_type(type(value))

    def insert(
            self, index: int = 0,
            value: Union[Dict, ContentElement] = {}) -> None:
        self.check_index(index, ext=True)
        if isinstance(value, dict):
            self._elements.insert(index, ContentElement(value))
        elif isinstance(value, ContentElement):
            self._elements.insert(index, value)
        else:
            ContentElementBlock.wrong_element_type(type(value))

    def remove(self, index: int = 0) -> ContentElement:
        self.check_index(index)
        return self._elements.pop(index)

    def serialize_to_content(
            self, index: int = 0) -> ContentValues:
        '''
        The method should return info than would be stored in db
            table content:
        {
            identity: '01_vblock_txt_001',
            element: {
                title: 'Title value',
                content: 'Content value'
            }
        }
        '''
        self.upper_index
        return {
            'identity': '_'.join([
                str(self.upper_index).zfill(2),
                self.type, self.subtype,
                str(index).zfill(3)
            ]),
            'wrong': self.get_element(index).value
            # 'element': self.get_element(index).value
        }

    @property
    # def serialize_to_structure(self) -> Dict[Dict[str, str, str, str]]:
    def serialize_to_structure(self) -> Dict:
        '''
        The method should return info than would be stored in structure
            db table:
        {
            "01": {
                "qnt": 3,
                "name": "vblock00",
                "type": "vblock",
                "subtype": "txt"}
        }
        '''
        result = {
            str(self._upper_index).zfill(2): {
                'qnt': len(self.elements),
                'name': self.name,
                'type': self.type,
                'subtype': self.subtype
            }
        }
        return result
