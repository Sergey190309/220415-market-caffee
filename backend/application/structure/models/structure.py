# import json
from typing import Dict, Union, List
from datetime import datetime
from sqlalchemy.dialects import mysql
from sqlalchemy.ext.mutable import MutableDict

from application.modules.dbs_global import dbs_global
from application.models.locales_global import LocaleGlobalModel  # noqa: 401
from application.models.views_global import ViewGlobalModel  # noqa: 401

from .view_page_structure import ViewPageStructure


class StructureModel(dbs_global.Model):
    '''
    The model for front end structure
    '''
    __tablename__ = 'structure'
    __table_args__ = (
        dbs_global.PrimaryKeyConstraint('view_id', 'locale_id'), {},)
    view_id = dbs_global.Column(
        dbs_global.String(64),
        dbs_global.ForeignKey('views_global.view_id'),
        nullable=False)
    locale_id = dbs_global.Column(
        dbs_global.String(16),
        dbs_global.ForeignKey('locales_global.id'),
        nullable=False)
    # default='en')
    created = dbs_global.Column(
        dbs_global.DateTime, nullable=False, default=datetime.now())
    updated = dbs_global.Column(dbs_global.DateTime)
    user_id = dbs_global.Column(
        dbs_global.Integer, nullable=False, default=0)
    attributes = dbs_global.Column(MutableDict.as_mutable(
        mysql.JSON), nullable=False, default={})

    locale = dbs_global.relationship(
        'LocaleGlobalModel', backref='structuremodel')
    view = dbs_global.relationship(
        'ViewGlobalModel', backref='structuremodel')

    @classmethod
    def find_by_ids(cls, ids: Dict = {}) -> Union['StructureModel', None]:
        '''ids - PKs (view_id, locale_id)'''
        return cls.query.filter_by(**ids).first()

    @classmethod
    def find(cls,
             searching_criterions: Dict = {}) -> List['StructureModel']:
        return cls.query.filter_by(**searching_criterions).all()

    def get_element(self, upper_index: int = 0) -> Union[Dict, None]:
        return self.attributes.get(str(upper_index).zfill(2))

    @classmethod
    def get_element_cls(
            cls, ids: Dict = {},
            upper_index: int = 0) -> Union[Dict, None]:
        '''ids - PKs (view_id, locale_id)'''
        _instance = cls.find_by_ids(ids)
        return _instance.get_element(str(upper_index).zfill(2))
        # return cls.find_by_ids(ids).attributes.get(element_key)

    # @classmethod
    # def remove_element_cls(
    #         cls, ids: Dict = {},
    #         upper_index: int = 0) -> Union[Dict, None]:
    #     '''ids - PKs (view_id, locale_id)'''
    #     _instance = cls.find_by_ids(ids)
    #     return _instance.get_element(str(upper_index).zfill(2))
    #     # return cls.find_by_ids(ids).attributes.get(element_key)

    # @classmethod
    def insert_element(
            self, index: int = 0,
            args: Dict = {},
            user_id: int = {}) -> Union[None, str]:
        '''
        The method change (increase by 1) all elements with bigger
        indexes, insert new dummy element.
        Compalsory arguments : index;
        Optional arguments (opt_args) are: others (on 211015 they are
            type, subtype, qnt, name). They have default values in
            classes.
        '''
        pass
        # '''check args are valid''' not sure it's nesessary
        # _view_page_structure = ViewPageStructure(dict(self.attributes))

        # print('\nstructure, model\n insert_upper_level_element',
        #       '\n  type(_view_page_structure) ->',
        #       type(_view_page_structure),
        #       '\n  _view_page_structure ->', _view_page_structure
        #       )
        # if ards.get('view_id') not in :
        #     pass
        '''change records with indexes more then new element index'''
        '''insert new element'''

    @property
    def is_exist(self) -> bool:
        return StructureModel.find_by_ids({
            'view_id': self.view_id,
            'locale_id': self.locale_id
        }) is not None

    def change_element_qnt(
        self,
        direction: str = '',  # inc or dec
        block_index: int = 0, user_id: int = 0
    ) -> Union[int, str]:
        _view_page_structure = ViewPageStructure(dict(self.attributes))
        _upper_level_element = _view_page_structure.get_element(
            block_index)
        # _upper_level_element = _view_page_structure.get_element(
        #     int(block_index))
        if direction == 'inc':
            _upper_level_element.insert_element()
        if direction == 'dec':
            _upper_level_element.remove_element()
        # print('\nmodels, structure:\n change_element_qnt',
        #       '\n  _view_page_structure ->',
        #       _view_page_structure.serialize())
        update_result = self.update({
            'attributes': _view_page_structure.serialize(),
            'user_id': user_id})
        if update_result is None:
            return _upper_level_element.qnt
        else:
            return update_result

    def update(self, update_values: Dict = {}) -> Union[None, str]:
        # print('\nmodel, structure:\n update',
        #       '\n  update_values ->', update_values)
        if update_values is None:
            return None
        for key in update_values.keys():
            setattr(self, key, update_values[key])
        self.updated = datetime.now()
        return self.save_to_db()

    def save_to_db(self) -> Union[str, None]:
        try:
            dbs_global.session.add(self)
            dbs_global.session.commit()
        except InterruptedError as error:
            dbs_global.session.rollback()
            return (
                "\nstructure.models.StructureModel.save_to_db "
                f"IntegrityError:\n{error.orig}")
            return str(error)
        except Exception as error:
            dbs_global.session.rollback()
            # print(
            #     '\nstructure.models.StructureModel.save_to_db Error\n',
            #     error)
            return str(error)

    def delete_fm_db(self) -> Union[str, None]:
        try:
            dbs_global.session.delete(self)
            dbs_global.session.commit()
        except Exception as error:
            # print('structure.models.StructureModel.save_to_db Error\n',
            #       error)
            return str(error)
