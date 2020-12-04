from typing import List


from application.modules.dbs import dbs


class LocaleModel(dbs.Model):
    '''
    The model contains locales needed for site.
    '''
    __tablename__ = 'locales'

    id = dbs.Column(dbs.String(16), primary_key=True)
    remarks = dbs.Column(dbs.UnicodeText())

    @classmethod
    def find_by_name(cls, name: str) -> 'LocaleModel':
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_all(cls) -> List['LocaleModel']:
        return cls.query.all()
