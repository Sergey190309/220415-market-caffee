# from typing import List

from ..modules.dbs_users import dbs_users


class LocaleModel(dbs_users.Model):
    '''
    The model contains locales needed for site.
    '''
    __tablename__ = 'locales'

    id = dbs_users.Column(dbs_users.String(16), primary_key=True)
    remarks = dbs_users.Column(dbs_users.UnicodeText())

    user = dbs_users.relationship('UserModel', backref='localemodel', lazy="dynamic")

    @classmethod
    def find_by_id(cls, id: str) -> 'LocaleModel':
        return cls.query.filter_by(id=id).first()

    def save_to_db(self) -> None:
        dbs_users.session.add(self)
        dbs_users.session.commit()

    def delete_fm_db(self) -> None:
        dbs_users.session.delete(self)
        dbs_users.session.commit()
