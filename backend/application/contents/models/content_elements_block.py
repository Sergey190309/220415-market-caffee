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

from application.structure.models.structure import StructureModel
from application.structure.schemas.structure import (
    structure_schema)


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
        if len(elements) == 0:
            elements.append(ContentElement())
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
    def load_fm_db(cls, identity: str = '', view_id: str = '',
                   locale_id: str = '', load_name: bool = False
                   ) -> Union[None, 'ContentElementsBlock']:
        '''here identity consisn of upper_index, type, subtype -
            01_type_subtype'''
        '''
        The method creates ContentElementsBlock instance based on info
            from db content table. Name is got from structure table.
            In case of structure table record for this page does not
            exist name would be empty.
        I do not check loaded elements validity due to productivity.
        '''
        _splitted_identity = identity.split('_')
        _elements = ContentModel.find_identity_like(
            searching_criterions={
                'view_id': view_id, 'locale_id': locale_id},
            identity_like=f'{identity}%')
        if len(_elements) == 0:
            return None
        instance = ContentElementsBlock(
            upper_index=int(_splitted_identity[0]),
            type=_splitted_identity[1],
            subtype=_splitted_identity[2],
            elements=[
                element.serialize() for element in _elements
            ])
        if load_name:
            _structure_instance = StructureModel.find_by_ids(
                ids={'view_id': view_id, 'locale_id': locale_id})
            if _structure_instance is not None:
                instance.name = _structure_instance.attributes.get(
                    str(instance.upper_index).zfill(2)).get('name')
        return instance

    def save_to_db_content(
            self,
            view_id: str = '',
            locale_id: str = '',
            user_id: int = 0,
            save_structure: bool = False) -> Union[None, str]:
        '''
        The method update or create new records in contents tables.
        Remove excess records if any.
        If new content table record created correct structure if required
            by save_structure argument.
        '''

        '''clean up existing records with same key <- upper_index'''
        _instances = ContentModel.find_identity_like(
            searching_criterions={
                'view_id': view_id, 'locale_id': locale_id},
            identity_like=f'{str(self.upper_index).zfill(2)}%'
        )
        # print('\nContentElementBlock:\n save_to_db_content'
        #       '\n  _instances ->', _instances)
        for instance in _instances:
            instance.delete_fm_db()

        _id_prefix = '_'.join(
            [str(self.upper_index).zfill(2), self.type, self.subtype])
        for i, element in enumerate(self.elements):
            _identity = '_'.join([_id_prefix, str(i).zfill(3)])
            # print('  _identity ->', _identity)
            _instance = content_schema.load({
                'identity': _identity,
                'view_id': view_id,
                'locale_id': locale_id,
                'user_id': user_id,
                **element.value
            }, session=dbs_global.session)
            _instance.save_to_db()
        if save_structure:
            self.save_to_db_structure(
                view_id=view_id, locale_id=locale_id, user_id=user_id)

    def save_to_db_structure(
            self,
            view_id: str = '',
            locale_id: str = '',
            user_id: int = 0) -> Union[None, str]:
        '''get existing structure record'''
        _structure_instance = StructureModel.find_by_ids(ids={
            'view_id': view_id,
            'locale_id': locale_id
        })
        '''no such structure records'''
        if _structure_instance is None:
            _structure_instance = structure_schema.load({
                'view_id': view_id,
                'locale_id': locale_id,
                'user_id': user_id,
                'attributes': self.serialize_to_structure
            }, session=dbs_global.session)
            return _structure_instance.save_to_db()
        else:
            _structure_attributes = {**_structure_instance.attributes}
        # print('\nContentElementBlock:\n save_to_db',
        #       '\n  _structure_attributes', _structure_attributes,)
        key = str(self.upper_index).zfill(2)
        _structure_attributes[
            key] = self.serialize_to_structure.get(key)
        return _structure_instance.update(
            {'attributes': _structure_attributes, 'user_id': user_id})
        # _structure_json = structure_get_schema.dump(_structure_instance)

    def delete_fm_db(self, view_id: str = '',
                     locale_id: str = '') -> Union[None, str]:
        '''
        The method delete correspon record from content table.
        Correct structure table.
        '''
        '''handle content table'''
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
        '''handle structure table'''
        '''get respective structure record'''
        # _structure_instance = StructureModel.find_by_ids({
        #     'view_id': view_id, 'locale_id': locale_id})
        # if _structure_instance is not None:
        #     _structure_instance.remove_element_cls()
        # print('\ncontent_elements_block:\ndelete_fm_db',
        #       '\n  _block_structure_instance ->',
        #       _structure_instance.attributes)
