# from typing import List

from ..modules.dbs_global import dbs_global
# from ..components.models.components import ComponentModel


class LocaleGlobalModel(dbs_global.Model):
    '''
    The model contains locales needed for site.
    '''
    __tablename__ = 'locales_global'

    id = dbs_global.Column(dbs_global.String(16), primary_key=True)
    remarks = dbs_global.Column(dbs_global.UnicodeText())

    # component = dbs_global.relationship(
    #     'ComponentModel', backref='localeglobalmodel', lazy="dynamic")

    @classmethod
    def find_by_id(cls, id: str) -> 'LocaleGlobalModel':
        return cls.query.filter_by(id=id).first()

    def save_to_db(self) -> None:
        dbs_global.session.add(self)
        dbs_global.session.commit()

    def delete_fm_db(self) -> None:
        dbs_global.session.delete(self)
        dbs_global.session.commit()
