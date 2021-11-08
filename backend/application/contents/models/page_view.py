from typing import List, Union, Dict, Callable
# from .content_elements import ContentElements
from flask_babelplus import lazy_gettext as _
from application.global_init_data import global_constants
from ..errors.custom_exceptions import (
    WrongViewNameError, WrongLocaleError, WrongTypeError, WrongIndexError,
    WrongValueError)
from .content_elements_simple import ContentElementsSimple
from .content_elements_block import ContentElementsBlock


def ul_element_serializer(ul_element: Union[
        ContentElementsSimple, ContentElementsBlock] = None) -> Dict:
    # print('\npage_view:\n ul_element_serializer',
    #       '\n  ul_element ->', type(ul_element))
    if isinstance(ul_element, ContentElementsSimple):
        return serialize_simple_ul_element(ul_element)
    elif isinstance(ul_element, ContentElementsBlock):
        return serialize_block_ul_element(ul_element)
    else:
        raise WrongTypeError(
            str(_("You try to operate upper level element type - "
                "'%(type)s', it's wrong.",
                  type=type(ul_element))), 400)


def serialize_simple_ul_element(
        ul_element: ContentElementsSimple) -> Dict:
    return [{
        **ul_element.serialize_to_content
        # 'identity': ul_element.serialize_to_content.get('identity'),
        # **ul_element.serialize_to_content.get('element')
    }]


def serialize_block_ul_element(
        ul_element: ContentElementsBlock) -> Dict:
    return [
        {
            **item
            # 'identity': item.get('identity'),
            # **item.get('element')
        }
        for item in ul_element.serialize_to_content
    ]


def ul_element_extractor(ul_element: Union[
        ContentElementsSimple, ContentElementsBlock] = None) -> Dict:
    # print('\n page_view:\n ul_element_extractor',
    #       '\n  ul_element ->', ul_element)
    def extract_common_items():
        return {
            'index': ul_element.upper_index,
            'type': ul_element.type,
            'name': ul_element.name,
        }
    if isinstance(ul_element, ContentElementsSimple):
        return {
            **extract_common_items(),
            **extract_simple_ul_element(ul_element)
        }
    elif isinstance(ul_element, ContentElementsBlock):
        return {
            **extract_common_items(),
            **extract_block_ul_element(ul_element)
        }
    else:
        raise WrongTypeError(
            str(_("You try to operate upper level element type - "
                "'%(type)s', it's wrong.",
                  type=type(ul_element))), 400)


def extract_simple_ul_element(ul_element: ContentElementsSimple) -> Dict:
    return {
        'element': ul_element.element.value
    }


def extract_block_ul_element(ul_element: ContentElementsBlock) -> Dict:
    # _elements = [item.value for item in ul_element.elements]
    return {
        'subtype': ul_element.subtype,
        'elements': [item.value for item in ul_element.elements]
    }


def ul_element_creator(
        index: int = 0, element_type: str = '',
        subtype: str = '', name: str = '',
        element_value: Union[Dict, List] = {}) -> Callable:
    # print('\npage_view:\n choose_ul_element_creator',
    #       '\n  index ->', index)
    if element_type in ContentElementsSimple._types:
        return create_simple_ul_element(
            index=index,
            element_type=element_type,
            name=name,
            element_value=element_value
        )
    elif element_type in ContentElementsBlock._types:
        return create_block_ul_element(
            index=index,
            element_type=element_type,
            subtype=subtype,
            name=name,
            element_values=element_value
        )
    else:
        if not isinstance(element_type, str):
            raise WrongTypeError(
                str(_("You try to operate upper level element type - "
                      "'%(type)s', it's wrong.",
                      type=type(element_type))), 400)
        else:
            raise WrongValueError(
                str(_("You try to use '%(type)s' as upper level element "
                      "type. It's wrong.",
                      type=element_type)), 400)


def create_simple_ul_element(
        index: int = 0, element_type: str = '', name: str = '',
        element_value: Dict = {}) -> ContentElementsSimple:
    if not isinstance(element_value, Dict):
        raise WrongTypeError(
            str(_("You're trying to create upper level element "
                  "instance having wrong argument type - "
                  "'%(type)s'.",
                  type=type(element_value))), 400)
    return ContentElementsSimple(
        upper_index=index,
        type=element_type,
        name=name,
        element=element_value
    )


def create_block_ul_element(
        index: int = 0, element_type: str = '',
        subtype: str = '', name: str = '',
        element_values: List = []) -> ContentElementsBlock:
    if not isinstance(element_values, List):
        raise WrongTypeError(
            str(_("You're trying to create upper level element "
                  "instance having wrong argument type - "
                  "'%(type)s'.",
                  type=type(element_values))), 400)
    return ContentElementsBlock(
        upper_index=index,
        type=element_type,
        subtype=subtype,
        name=name,
        elements=element_values
    )


class PageView():
    '''
    The class represents whole page as a list of Content Elements, both
        block and simple.
    '''
    '''allowed values'''
    _view_names = global_constants.get_VIEWS_PKS
    _locales = global_constants.get_PKS

    def __init__(
            self,
            view_name: str = '', locale: str = '',
            elements: List = []):
        self.view_name = view_name
        self.locale = locale
        self._elements = []
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

    @property
    def view_name(self) -> str:
        return self._view_name

    @view_name.setter
    def view_name(self, value: str = '') -> None:
        if value not in PageView._view_names:
            raise WrongViewNameError(
                str(_("Page view should be withing '%(view_names)s' but "
                      "'%(page_view)s' has been delivered.",
                      view_names=PageView._view_names,
                      page_view=value)), 400)
        self._view_name = value

    @property
    def locale(self) -> str:
        return self._locale

    @locale.setter
    def locale(self, value: str = '') -> None:
        if value not in PageView._locales:
            raise WrongLocaleError(
                str(_("Locale should be within '%(locales)s' but "
                      "'%(locale)s' has been delivered.",
                      locales=PageView._locales,
                      locale=value)), 400)
        self._locale = value

    @property
    def elements(self) -> List:
        return self._elements

    @elements.setter
    def elements(self, value: List[Union[
            ContentElementsSimple, ContentElementsBlock]] = []) -> None:
        for ul_element in value:
            if isinstance(ul_element, ContentElementsSimple)\
                    or isinstance(ul_element, ContentElementsBlock):
                self._elements.append(ul_element)
            else:
                raise WrongTypeError(
                    str(_("Type of upper level element should be within "
                          "'%(types)s' but '%(type)s' has been "
                          "delivered.",
                          types='[ContentElementsSimple, ContentElementsBlock]',
                          type=type(ul_element))), 400)
        self._elements = value

    def get_element_vals(self, index: int = 0) -> Dict:
        self.check_index(index)
        # _ul_element = self.elements[index]
        # print('\npage_view:\n get_element_dict',
        #       '\n  _ul_element ->', _ul_element)
        return ul_element_extractor(self.elements[index])

    def set_element_vals(
            self, index: int = 0, element_type: str = '',
            subtype: str = '', name: str = '',
            element_value: Union[Dict, List] = {}) -> None:
        self.check_index(index)
        '''get upper level element to check type and use values'''
        _ul_element = self.elements[index]
        if element_type == '':
            element_type = _ul_element.type
        if subtype == ''\
                and isinstance(_ul_element, ContentElementsBlock):
            subtype = _ul_element.subtype
        if name == '':
            name = _ul_element.name
        args = {
            'index': index,
            'element_type': element_type,
            'subtype': subtype,
            'name': name,
            'element_value': element_value
        }
        '''replace upper level element'''
        self.elements[index] = ul_element_creator(**args)

    def insert_vals(
            self, index: int = 0, element_type: str = '',
            subtype: str = '', name: str = '',
            element_value: Union[Dict, List] = {}) -> None:
        self.check_index(index, ext=True)
        kwargs = {
            'index': index,
            'element_type': element_type,
            'subtype': subtype,
            'name': name,
            'element_value': element_value
        }
        # _new_element = ul_element_creator(**kwargs)
        self.elements.insert(index, ul_element_creator(**kwargs))

    def remove_vals(self, index: int = 0) -> Dict:
        self.check_index(index)
        # element = self.elements.pop(index)
        return ul_element_extractor(self.elements.pop(index))

    @property
    def serialize_to_content(self) -> List:
        '''
        The method return list of elements that correspond to records in
            content table for whole page.
        keys [identity, view_id, locale_id, title, content]
        '''
        _result = []
        _common_elements = {
            'view_id': self.view_name, 'locale_id': self.locale}
        for element in self.elements:
            _result = [*_result, *ul_element_serializer(element)]
        return [{**_common_elements, **item} for item in _result]

    @property
    def serialize_to_structure(self) -> Dict:
        '''
        The method return list of elements that correspond to records in
            structure table for whole page.
        keys [view_id, locale_id, attributes]
        '''
        _attributes = {}
        for element in self.elements:
            _attributes = {
                **_attributes, **element.serialize_to_structure}
        return {**{'view_id': self.view_name, 'locale_id': self.locale},
                'attributes': _attributes}