# from typing import List

from application.modules.dbs_global import dbs_global
# from ..modules.dbs_users import dbs_users


class LocaleModel(dbs_global.Model):
    '''
    The model contains locales needed for site.
    '''
    __tablename__ = 'locales'

    id = dbs_global.Column(dbs_global.String(16), primary_key=True)
    remarks = dbs_global.Column(dbs_global.UnicodeText())

    user = dbs_global.relationship('UserModel', backref='localemodel', lazy="dynamic")

    @classmethod
    def find_by_id(cls, id: str) -> 'LocaleModel':
        return cls.query.filter_by(id=id).first()

    def save_to_db(self) -> None:
        dbs_global.session.add(self)
        dbs_global.session.commit()

    def delete_fm_db(self) -> None:
        dbs_global.session.delete(self)
        dbs_global.session.commit()
