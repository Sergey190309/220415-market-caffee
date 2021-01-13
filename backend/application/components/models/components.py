from typing import Dict, Union
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
        {},)
    identity = dbs_global.Column(dbs_global.String(64))
    kind_id = dbs_global.Column(
        dbs_global.String(64),
        dbs_global.ForeignKey('component_kinds.id_kind'),
        nullable=False)
    locale_id = dbs_global.Column(
        dbs_global.String(16),
        dbs_global.ForeignKey('locales_global.id'),
        nullable=False)
    title = dbs_global.Column(
        dbs_global.String(64), nullable=False, default='Something')
    # for popup or hover help in site:
    content = dbs_global.Column(dbs_global.UnicodeText)
    details = dbs_global.Column(dbs_global.BigInteger, default=0)

    locale = dbs_global.relationship(
        'LocaleGlobalModel', backref='componentmodel')
    kind = dbs_global.relationship(
        'ComponentKindsModel', backref='componentmodel')
    # 'LocaleModelGlobal', backref='componentmodel', lazy="dynamic")

    @classmethod
    def find_by_identity_kind_locale(
            cls, searching_criterions: Dict = None) -> 'ComponentModel':
        if searching_criterions is None:
            return 'Provide searching criterion!'
        return cls.query.filter_by(
            identity=searching_criterions['identity'],
            kind_id=searching_criterions['kind_id'],
            locale_id=searching_criterions['locale_id']).first()

    def update(self, update_values: Dict = None) -> Union[None, Dict]:
        if update_values is None:
            return
        for key in update_values.keys():
            setattr(self, key, update_values[key])
        return self.save_to_db()

    def save_to_db(self) -> Union[None, Dict]:
        try:
            dbs_global.session.add(self)
            dbs_global.session.commit()
        except Exception as error:
            return {
                'message': 'components.models.ComponentModel.save_to_db Error\n',
                'error': error}

    def delete_fm_db(self) -> Union[None, Dict]:
        try:
            dbs_global.session.delete(self)
            dbs_global.session.commit()
        except Exception as error:
            return {
                'message': 'components.models.ComponentModel.save_to_db Error\n',
                'error': error}
