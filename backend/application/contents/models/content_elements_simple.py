from typing import Dict, Union

from flask_babelplus import lazy_gettext as _

from ..errors.custom_exceptions import (
    # WrongTypeError,
    WrongElementTypeError
)

from .types import ContentValues
from .content_elements import ContentElements
from .content_element import ContentElement


class ContentElementsSimple(ContentElements):
    '''
    The class represent information that could be shown as single
        content element on view page.
    Both initiation and setting class element are possible with class
        instances and with elements to generate class instance.
    '''
    '''Allowed type elements:'''
    # _type_elements = []
    _types = ['header', 'footer']

    def __init__(
            self, upper_index: int = 0,
            type: str = '', name: str = '',
            element: Union[Dict, ContentElement] = {}):
        super().__init__(
            upper_index=upper_index,
            type=type,
            types=ContentElementsSimple._types,
            name=name
        )
        self.element = element

    @property
    def element(self) -> ContentElement:
        return self._element

    @element.setter
    def element(self, element: Union[Dict, ContentElement] = {}):
        # print('\ncontent_elements_simple:\n element.setter',
        #       '\n  element ->', element)
        if isinstance(element, ContentElement):
            self._element = element
        elif isinstance(element, Dict):
            if hasattr(self, '_element'):  # the instance already exists
                _element = {**self.element.value, **element}
            else:
                _element = element  # instance initiation
            self._element = ContentElement(_element)
        else:
            raise WrongElementTypeError(
                str(_("Element type should be either 'Dict' or "
                      "'ContentElement', but it's '%(type)s'.",
                      type=type(element))), 400)

    @property
    def serialize_to_content(self) -> ContentValues:
        '''
        The method should return info than would be stored in db
            table content:
        {
            identity: '01_header',
            element: {
                title: 'Title value',
                content: 'Content value'
            }
        }
        '''
        # self.upper_index
        return {
            'identity': '_'.join([
                str(self.upper_index).zfill(2),
                self.type
            ]),
            'element': self.element.value
        }

    @property
    def serialize_to_structure(self) -> Dict:
        '''
        The method should return info than would be stored in structure
            db table:
        {
            "06": {
                "name": "header name",
                "type": "header",
            }
        }
        '''
        result = {
            str(self._upper_index).zfill(2): {
                'name': self.name,
                'type': self.type
            }
        }
        return result
