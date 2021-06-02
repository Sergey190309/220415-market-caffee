from typing import Dict, Union, List
from datetime import datetime
# import json
from sqlalchemy.dialects import mysql
from sqlalchemy.ext.mutable import MutableDict
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.ext.hybrid import hybrid_property

from application.modules.dbs_global import dbs_global
from application.models.views_global import ViewGlobalModel  # noqa: 401


class StructureModel(dbs_global.Model):
    '''
    The model for front end structure
    '''
    __tablename__ = 'structure'

    view_id = dbs_global.Column(dbs_global.String(64),
                                dbs_global.ForeignKey('views_global.view_id'),
                                primary_key=True)
    created = dbs_global.Column(
        dbs_global.DateTime, nullable=False, default=datetime.now())
    updated = dbs_global.Column(dbs_global.DateTime)
    user_id = dbs_global.Column(dbs_global.Integer, nullable=False, default=0)
    attributes = dbs_global.Column(MutableDict.as_mutable(
        mysql.JSON), nullable=False, default={})

    view = dbs_global.relationship('ViewGlobalModel', backref='structuremodel')

    # 'attributes', mysql.MEDIUMTEXT)

    # view = dbs_global.relationship(
    #     'ViewGlobalModel', backref='structuremodel')

    # @hybrid_property
    # def attributes(self) -> Dict:
    #     '''
    #     Hybrid property for reading view attributes JSON dict.
    #     It always returns a dict
    #     '''
    #     if self._attributes is None:
    #         # null value from db side, return an empty dict
    #         return {}

    #     try:
    #         return json.load(self._attributes)
    #     except Exception:
    #         # parse failed, return an empty dict
    #         return {}

    @classmethod
    def find(cls, searching_criterions: Dict = {}) -> List['StructureModel']:
        return cls.query.filter_by(**searching_criterions).all()

    @classmethod
    def find_by_id(cls, view_id: str = '') -> Union['StructureModel', None]:
        # _result = cls.query.filter_by(view_id=view_id).first()
        return cls.query.filter_by(view_id=view_id).first()
        # return _result

    @property
    def is_exist(self):
        return StructureModel.find_by_id(self.view_id) is not None

    def update(self, update_values: Dict = None) -> Union[None, str]:
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
