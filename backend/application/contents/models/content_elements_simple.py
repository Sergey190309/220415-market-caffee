from typing import Dict, Union

from flask_babelplus import lazy_gettext as _

from ..errors.custom_exceptions import (
    # WrongTypeError,
    WrongElementTypeError
)

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
    _type_elements = ['header', 'footer']

    def __init__(
            self, type: str = '', name: str = '',
            element: Union[Dict, ContentElement] = {}):
        super().__init__(
            type=type,
            types=ContentElementsSimple._type_elements,
            name=name
        )
        # self.type = type
        # self.name = name
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
                _element = {**self.serialize, **element}
            else:
                _element = element  # instance initiation
            self._element = ContentElement(_element)
        else:
            raise WrongElementTypeError(
                str(_("Element type should be either 'Dict' or "
                      "'ContentElement', but it's '%(type)s'.",
                      type=type(element))), 400)

    @property
    def serialize(self) -> Dict:
        '''
        The method return not class instance by respective dict.
        '''
        return self._element.value
