# from typing import List

from ..modules.dbs import dbs


class LocaleModel(dbs.Model):
    '''
    The model contains locales needed for site.
    '''
    __tablename__ = 'locales'

    id = dbs.Column(dbs.String(16), primary_key=True)
    remarks = dbs.Column(dbs.UnicodeText())

    user = dbs.relationship('UserModel', backref='localemodel', lazy="dynamic")

    @classmethod
    def find_by_id(cls, id: str) -> 'LocaleModel':
        return cls.query.filter_by(id=id).first()

    def save_to_db(self) -> None:
        dbs.session.add(self)
        dbs.session.commit()

    def delete_fm_db(self) -> None:
        dbs.session.delete(self)
        dbs.session.commit()
