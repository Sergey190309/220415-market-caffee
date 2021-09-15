# import json
from typing import Dict, Union, List
from datetime import datetime
from sqlalchemy.dialects import mysql
from sqlalchemy.ext.mutable import MutableDict

from application.modules.dbs_global import dbs_global
from application.models.locales_global import LocaleGlobalModel  # noqa: 401
from application.models.views_global import ViewGlobalModel  # noqa: 401


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
    user_id = dbs_global.Column(dbs_global.Integer, nullable=False, default=0)
    attributes = dbs_global.Column(MutableDict.as_mutable(
        mysql.JSON), nullable=False, default={})

    locale = dbs_global.relationship('LocaleGlobalModel', backref='structuremodel')
    view = dbs_global.relationship('ViewGlobalModel', backref='structuremodel')

    @classmethod
    def find(cls, searching_criterions: Dict = {}) -> List['StructureModel']:
        return cls.query.filter_by(**searching_criterions).all()

    @classmethod
    def find_by_ids(cls, ids: Dict = {}) -> Union['StructureModel', None]:
        # _result = cls.query.filter_by(view_id=view_id).first()
        return cls.query.filter_by(**ids).first()
        # return _result

    @property
    def is_exist(self):
        return StructureModel.find_by_ids({
            'view_id': self.view_id,
            'locale_id': self.locale_id
        }) is not None

    def change_element_qnt(
        self,
        direction: str = '',  # inc or dec
        block_index: str = '', user_id: int = 0
    ) -> Union[int, str]:
        _source_attributes = dict(self.attributes)
        if direction == 'inc':
            _new_qnt = _source_attributes.get(block_index).get('qnt') + 1
        elif direction == 'dec':
            _new_qnt = _source_attributes.get(block_index).get('qnt') - 1
        else:
            _new_qnt = _source_attributes.get(block_index).get('qnt')
        _target_attributes = {
            **_source_attributes,
            block_index: {
                **_source_attributes.get(block_index), 'qnt': _new_qnt
            }
        }
        update_result = self.update(
            {'attributes': _target_attributes, 'user_id': user_id})
        if update_result is None:
            return _new_qnt
        else:
            return self.update({'attributes': _target_attributes, 'user_id': user_id})

    def update(self, update_values: Dict = {}) -> Union[None, str]:
        # print(update_values)
        if update_values is None:
            return None
        for key in update_values.keys():
            # print(key)
            setattr(self, key, update_values[key])
            # self.attributes = update_values.get(key).copy()
        self.updated = datetime.now()
        return self.save_to_db()

    def save_to_db(self) -> Union[str, None]:
        try:
            dbs_global.session.add(self)
            dbs_global.session.commit()
        except InterruptedError as error:
            dbs_global.session.rollback()
            # return (
            #     "\nstructure.models.StructureModel.save_to_db IntegrityError:\n"
            #     f"{error.orig}")
            return str(error)
        except Exception as error:
            dbs_global.session.rollback()
            # print('\nstructure.models.StructureModel.save_to_db Error\n', error)
            return str(error)

    def delete_fm_db(self) -> None:
        try:
            dbs_global.session.delete(self)
            dbs_global.session.commit()
        except Exception as error:
            # print('structure.models.StructureModel.save_to_db Error\n', error)
            return str(error)
