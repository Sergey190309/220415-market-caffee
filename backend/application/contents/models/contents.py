from typing import Dict
from datetime import datetime
from application.modules.dbs_global import dbs_global
from application.models.locales_global import LocaleGlobalModel  # noqa: 401
# from ..models import ViewModel  # noqa: 401


class ContentModel(dbs_global.Model):
    '''
    The model for front end contents.
    '''
    __tablename__ = 'contents'
    __table_args__ = (
        dbs_global.PrimaryKeyConstraint(
            'identity', 'view_id', 'locale_id'),
        {},)
    identity = dbs_global.Column(dbs_global.String(64))
    view_id = dbs_global.Column(
        dbs_global.String(64),
        dbs_global.ForeignKey('views.id_view'),
        nullable=False)
    locale_id = dbs_global.Column(
        dbs_global.String(16),
        dbs_global.ForeignKey('locales_global.id'),
        nullable=False)
    created = dbs_global.Column(
        dbs_global.DateTime, nullable=False, default=datetime.now())
    updated = dbs_global.Column(dbs_global.DateTime)
    user_id = dbs_global.Column(
        dbs_global.Integer,
        nullable=False,
        default=0)
    title = dbs_global.Column(
        dbs_global.String(64), nullable=False, default="That's title")
    # content on site:
    content = dbs_global.Column(dbs_global.UnicodeText)

    locale = dbs_global.relationship(
        'LocaleGlobalModel', backref='contentmodel')
    view = dbs_global.relationship(
        'ViewModel', backref='contentmodel')

    @classmethod
    def find_by_identity_view_locale(
            cls,
            identity: str = None,
            view_id: str = None,
            locale_id: str = None) -> 'ContentModel':
        pass

    def update(self, update_values: Dict = None) -> None:
        if update_values is None:
            return
        for key in update_values.keys():
            setattr(self, key, update_values[key])
        self.save_to_db()

    def save_to_db(self) -> None:
        try:
            dbs_global.session.add(self)
            dbs_global.session.commit()
        except Exception as err:
            print('contents.models.ContentModel.save_to_db error\n', err)

    def delete_fm_db(self) -> None:
        try:
            dbs_global.session.delete(self)
            dbs_global.session.commit()
        except Exception as err:
            print('contents.models.ContentModel.delete_fm_db error\n', err)
