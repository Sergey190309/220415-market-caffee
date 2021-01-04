# from typing import Dict
# from datetime import datetime

from application.modules.dbs_global import dbs_global
from application.models.locales_global import LocaleGlobalModel  # noqa: 401
# from ..models import ComponentKindsModel


class ComponentModel(dbs_global.Model):
    '''
    The model for front-end components.
    '''
    __tablename__ = 'components'
    __table_args__ = (
        dbs_global.PrimaryKeyConstraint(
            'identity', 'kind_id', 'locale_id'),
        {},
    )
    identity = dbs_global.Column(dbs_global.String(64))
    kind_id = dbs_global.Column(
        dbs_global.String(64),
        dbs_global.ForeignKey('component_kinds.id_kind'),
        nullable=False,
        default='button')
    locale_id = dbs_global.Column(
        dbs_global.String(16),
        dbs_global.ForeignKey('locales_global.id'),
        nullable=False,
        default='en')
    title = dbs_global.Column(
        dbs_global.String(64), nullable=False, default='Something')
    content = dbs_global.Column(dbs_global.UnicodeText)
    details = dbs_global.Column(dbs_global.BigInteger)

    locale = dbs_global.relationship(
        'LocaleGlobalModel', backref='componentmodel')
    kind = dbs_global.relationship(
        'ComponentKindsModel', backref='componentmodel')
    # 'LocaleModelGlobal', backref='componentmodel', lazy="dynamic")

    @classmethod
    def find_by_identity_kind_locale(
            cls,
            identity: str = None,
            kind_id: str = None,
            locale_id: str = None) -> 'ComponentModel':
        # print('identity -', identity)
        # print('kind_id -', kind_id)
        # print('locale_id -', locale_id)
        return cls.query.filter_by(
            identity=identity,
            kind_id=kind_id,
            locale_id=locale_id).first()

    def save_to_db(self) -> None:
        try:
            dbs_global.session.add(self)
            dbs_global.session.commit()
        except Exception as err:
            print('components.models.ComponentModel.save_to_db error\n', err)

    def delete_fm_db(self) -> None:
        try:
            dbs_global.session.delete(self)
            dbs_global.session.commit()
        except Exception as err:
            print('components.models.ComponentModel.delete_fm_db error\n', err)
