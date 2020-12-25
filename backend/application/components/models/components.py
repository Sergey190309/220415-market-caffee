# from typing import Dict
# from datetime import datetime


# from ..modules.dbs_components import dbs_components
from application.modules.dbs_global import dbs_global
from application.models.locales_global import LocaleGlobalModel


class ComponentModel(dbs_global.Model):
    '''
    The model for front-end components.
    '''
    __tablename__ = 'components'
    # __table_args__ = (
    #     dbs_global.PrimaryKeyConstraint('identity', 'locale_id'),
    #     {},
    # )
    identity = dbs_global.Column(dbs_global.String(64), primary_key=True)
    locale_id = dbs_global.Column(
        dbs_global.String(16),
        dbs_global.ForeignKey('locales_global.id'),
        default='en')
    title = dbs_global.Column(
        dbs_global.String(64), nullable=False, default='Something')
    content = dbs_global.Column(dbs_global.UnicodeText)

    locale = dbs_global.relationship(
    'LocaleModelGlobal', backref='componentmodel')
    # 'LocaleModelGlobal', backref='componentmodel', lazy="dynamic")

    @classmethod
    def find_by_itentity(cls, identity: str, locale: str = 'en') -> 'ComponentModel':
        return cls.query.filter_by(identity=identity).filter_by(locale=locale).first()

    def save_to_db(self) -> None:
        try:
            dbs_components.session.add(self)
            dbs_components.session.commit()
        except Exception as err:
            print('users.models.UserModel.save_to_db error\n', err)

    def delete_fm_db(self) -> None:
        try:
            dbs_components.session.delete(self)
            dbs_components.session.commit()
        except Exception as err:
            print('users.models.UserModel.delete_fm_db error\n', err)
