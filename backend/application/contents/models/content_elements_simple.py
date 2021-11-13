from typing import Dict, Union

from flask_babelplus import lazy_gettext as _
from application.modules.dbs_global import dbs_global

from ..errors.custom_exceptions import (
    WrongElementTypeError, RecordNotFoundError
)

from .types import ContentValues
from .content_elements import ContentElements
from .content_element import ContentElement
from .contents import ContentModel
from ..schemas.contents import content_schema
from application.structure.models.structure import StructureModel
from application.structure.schemas.structure import structure_schema


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
            title: 'Title value',
            content: 'Content value'
        }
        '''
        # self.upper_index
        return {
            'identity': '_'.join([
                str(self.upper_index).zfill(2),
                self.type
            ]),
            'title': self.element.value.get('title'),
            'content': self.element.value.get('content')
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

    @classmethod
    def load_fm_db(
            cls, identity: str = '',
            view_id: str = '',
            locale_id: str = '') -> 'ContentElementsSimple':
        '''
        The method creates ContentElementsSimple instance based on info
            from db content table. The method should be called by
            PageView instance.
        I do not check loaded elements validity due to productivity.
        '''
        content_model = ContentModel.find_by_identity_view_locale(
            identity=identity, view_id=view_id, locale_id=locale_id)
        _info = content_model.identity.split('_')
        _value = {
            'title': content_model.title,
            'content': content_model.content
        }
        return ContentElementsSimple(
            upper_index=int(_info[0]), type=_info[1], element=_value)

    def save_to_db(self, view_id: str = '',
                   locale_id: str = '',
                   user_id: int = 0) -> Union[None, str]:
        '''
        The method update or create new record in contents tables. If new
            content table record created correct structure table.
        '''
        _identity = '_'.join([str(self.upper_index).zfill(2), self.type])
        '''check whether record exists'''
        _available_record = ContentModel.find_by_identity_view_locale(
            identity=_identity, view_id=view_id, locale_id=locale_id)
        if _available_record is None:
            '''if not create ContentModel instance and save it'''
            _element_to_db = content_schema.load({
                **self.serialize_to_content,
                'view_id': view_id, 'locale_id': locale_id,
                'user_id': user_id,
            }, session=dbs_global.session)
            _element_to_db.save_to_db()
        else:
            '''otherwise update existing record'''
            _updating_values = self.serialize_to_content
            _available_record.update({
                'title': _updating_values.get('title'),
                'content': _updating_values.get('content')})
        '''structure table operations'''
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
        key = str(self.upper_index).zfill(2)
        _structure_attributes[key] = self.serialize_to_structure.get(key)
        # print('\nContentElementsSimple:\n save_to_db',
        #       '\n  _structure_instance ->', _structure_instance)
        return _structure_instance.update(
            {'attributes': _structure_attributes, 'user_id': user_id})

    def delete_fm_db(self, view_id: str = '',
                     locale_id: str = '') -> Union[None, str]:
        '''
        The method delete correspon record from content table.
        '''
        _identity = '_'.join([str(self.upper_index).zfill(2), self.type])
        _available_record = ContentModel.find_by_identity_view_locale(
            identity=_identity, view_id=view_id, locale_id=locale_id)
        if _available_record is None:
            raise RecordNotFoundError(
                str(_("Record with identity '%(identity)s', view id "
                      "'%(view_id)s' and locale id '%(locale_id)s' has "
                      "not been found.",
                      identity=_identity,
                      view_id=view_id,
                      locale_id=locale_id)), 404)
        return _available_record.delete_fm_db()
        # print('\n ContentElementsSimple:\n save_to_db',
        #       '\n  _available_record ->', _available_record)
