from typing import Dict

from ..modules.dbs_global import dbs_global
# from ..components.models.components import ComponentModel


class LocaleGlobalModel(dbs_global.Model):
    '''
    The model contains locales needed for whole site.
    '''
    __tablename__ = 'locales_global'

    id = dbs_global.Column(dbs_global.String(16), primary_key=True)
    remarks = dbs_global.Column(dbs_global.UnicodeText())

    # component = dbs_global.relationship(
    #     'ComponentModel', backref='localeglobalmodel', lazy="dynamic")

    @classmethod
    def find(cls, searching_criterions: Dict = {}) -> ['LocaleGlobalModel']:
        return cls.query.filter_by(**searching_criterions).all()

    @classmethod
    def find_by_id(cls, id: str = '') -> 'LocaleGlobalModel':
        return cls.query.filter_by(id=id).first()

    @property
    def is_exist(self):
        return LocaleGlobalModel.find_by_id(self.id) is not None

    def save_to_db(self) -> None:
        try:
            dbs_global.session.add(self)
            dbs_global.session.commit()
        except Exception as err:
            print('modules.models.Locale_global_model.save_to_db error\n', err)

    def delete_fm_db(self) -> None:
        try:
            dbs_global.session.delete(self)
            dbs_global.session.commit()
        except Exception as err:
            print('modules.models.Locale_global_model.delete_fm_db error\n', err)
