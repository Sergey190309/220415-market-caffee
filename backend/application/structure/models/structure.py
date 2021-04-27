from datetime import datetime
import json
from typing import Optional, Dict

from application.modules.dbs_global import dbs_global
from sqlalchemy.dialects import mysql
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.hybrid import hybrid_property


class StructureModel(dbs_global.Model):
    '''
    The model for front end structure
    '''
    __tablename__ = 'structure'

    view_id = dbs_global.Column(dbs_global.String(64), primary_key=True)
    created = dbs_global.Column(dbs_global.DateTime, nullable=False, default=datetime.now())
    updated = dbs_global.Column(dbs_global.DateTime)
    user_id = dbs_global.Column(dbs_global.Integer, nullable=False, default=0)
    _attributes = dbs_global.Column('attributes', mysql.MEDIUMTEXT)

    @hybrid_property
    def attributes(self) -> Dict:
        '''
        Hybrid property for reading view attributes JSON dict.
        It always returns a dict
        '''
        if self._attributes is None:
            # null value from db side, return an empty dict
            return {}

        try:
            return json.load(self._attributes)
        except Exception:
            # parse failed, return an empty dict
            return {}

    @classmethod
    def find_by_id(cls, view_id: str = '') -> Optional('StructureModel'):
        return cls.query.filter_by(view_id=view_id).first()

    def save_to_db(self) -> Optional(str):
        try:
            dbs_global.session.add(self)
            dbs_global.session.commit()
        except InterruptedError as error:
            dbs_global.session.rollback()
            return (
                "structure.models.StructureModel.save_to_db IntegrityError:\n"
                f"{error.orig}")
        except Exception as error:
            print('structure.models.StructureModel.save_to_db Error\n', error)

    def delete_fm_db(self) -> None:
        try:
            dbs_global.session.delete(self)
            dbs_global.session.commit()
        except Exception as error:
            print('structure.models.StructureModel.save_to_db Error\n', error)
