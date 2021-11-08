from typing import Dict, Union, List
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global
from ..errors.custom_exceptions import (
    # WrongTypeError,
    WrongElementTypeError,
    WrongIndexError,
    WrongValueError
)

# from .types import ContentValues  # , StactureValues
from .content_elements import ContentElements
from .content_element import ContentElement
from .contents import ContentModel
from ..schemas.contents import content_schema


class ContentElementsBlock(ContentElements):
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
            self, upper_index: int = 0, type: str = '',
            subtype: str = '', name: str = '',
            elements: List[(Union[Dict, ContentElement])] = []):
        super().__init__(
            upper_index=upper_index,
            type=type,
            types=ContentElementsBlock._types,
            name=name)
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
        if ContentElementsBlock._subtypes:
            if value not in ContentElementsBlock._subtypes:
                raise WrongValueError(
                    str(_(
                        "Block element subtype shoud be within "
                        "'%(subtypes)s', but provided subtype is "
                        "'%(subtype)s'.",
                        subtypes=ContentElementsBlock._subtypes,
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
                ContentElementsBlock.wrong_element_type(type(item))

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
            ContentElementsBlock.wrong_element_type(type(value))

    def insert(
            self, index: int = 0,
            value: Union[Dict, ContentElement] = {}) -> None:
        self.check_index(index, ext=True)
        if isinstance(value, dict):
            self._elements.insert(index, ContentElement(value))
        elif isinstance(value, ContentElement):
            self._elements.insert(index, value)
        else:
            ContentElementsBlock.wrong_element_type(type(value))

    def remove(self, index: int = 0) -> ContentElement:
        self.check_index(index)
        return self._elements.pop(index)

    def serialize_to_content_element(
            self, index: int = 0) -> Dict:
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
        # self.upper_index
        return {
            'identity': '_'.join([
                str(self.upper_index).zfill(2),
                self.type, self.subtype,
                str(index).zfill(3)
            ]),
            'element': self.get_element(index).value
        }

    @property
    def serialize_to_content(self) -> List[Dict]:
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
        # self.upper_index
        _result = []
        for i, element in enumerate(self.elements):
            _result.append({
                'identity': '_'.join([
                    str(self.upper_index).zfill(2),
                    self.type, self.subtype,
                    str(i).zfill(3)
                ]),
                **element.value
            })
        return _result

    @property
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

    @classmethod
    def load_fm_db(
            cls, identity: str = '', view_id: str = '',
            locale_id: str = '') -> Union[None, 'ContentElementsBlock']:
        '''here identity consisn of upper_index, type, subtype -
            01_type_subtype'''
        '''
        The method creates ContentElementsBlock instance based on info
            from db content table. The method should be called by
            PageView instance.
        I do not check loaded elements validity due to productivity.
        '''
        _splitted_identity = identity.split('_')
        _instance = ContentElementsBlock(
            upper_index=int(_splitted_identity[0]),
            type=_splitted_identity[1],
            subtype=_splitted_identity[2],
            elements=[
                element.serialize() for element in
                ContentModel.find_identity_like(
                    searching_criterions={
                        'view_id': view_id, 'locale_id': locale_id},
                    identity_like=f'{identity}%'
                )]
        )
        if len(_instance.elements) == 0:
            return None
        else:
            return _instance

    def save_to_db(self, view_id: str = '',
                   locale_id: str = '',
                   user_id: int = 0) -> Union[None, str]:
        '''
        The method update or create new records in contents tables.
        Remove excess records if any.
        If new content table record created correct structure table???
        '''

        # print('\nContentElementBlock:\n save_to_db',)
        _id_prefix = '_'.join(
            [str(self.upper_index).zfill(2), self.type, self.subtype])
        _max_index = 0
        for i, element in enumerate(self.elements):
            _identity = '_'.join([_id_prefix, str(i).zfill(3)])
            _instance = ContentModel.find_by_identity_view_locale(
                identity=_identity, view_id=view_id, locale_id=locale_id)
            if _instance is None:
                '''if record does not exist create instance and save
                    to db'''
                _instance = content_schema.load({
                    'identity': _identity,
                    'view_id': view_id,
                    'locale_id': locale_id,
                    'user_id': user_id,
                    **element.value
                }, session=dbs_global.session)
                '''if record exists correct one'''
                _instance.save_to_db()
            else:
                _instance.update({**element.value, 'user_id': user_id})
            _max_index = i + 1
        '''clean up exceeding records'''
        _identity = '_'.join([_id_prefix, str(_max_index).zfill(3)])
        _instance = ContentModel.find_by_identity_view_locale(
            identity=_identity, view_id=view_id, locale_id=locale_id)
        while _instance is not None:
            _instance.delete_fm_db()
            _max_index += 1
            _identity = '_'.join([_id_prefix, str(_max_index).zfill(3)])
            _instance = ContentModel.find_by_identity_view_locale(
                identity=_identity, view_id=view_id, locale_id=locale_id)

    def delete_fm_db(self, view_id: str = '',
                     locale_id: str = '') -> Union[None, str]:
        '''
        The method delete correspon record from content table.
        '''
        _id_prefix = '_'.join(
            [str(self.upper_index).zfill(2), self.type, self.subtype])
        _index = 0
        _identity = '_'.join([_id_prefix, str(_index).zfill(3)])
        _instance = ContentModel.find_by_identity_view_locale(
            identity=_identity, view_id=view_id, locale_id=locale_id)
        while _instance is not None:
            _instance.delete_fm_db()
            _index += 1
            _identity = '_'.join([_id_prefix, str(_index).zfill(3)])
            _instance = ContentModel.find_by_identity_view_locale(
                identity=_identity, view_id=view_id, locale_id=locale_id)