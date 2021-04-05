from typing import Dict, Union
from datetime import datetime
from sqlalchemy.exc import IntegrityError

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
    updated = dbs_global.Column(
        dbs_global.DateTime)
    user_id = dbs_global.Column(
        dbs_global.Integer,
        nullable=False,
        default=0)
    title = dbs_global.Column(
        dbs_global.String(64), default="That's title")
        # dbs_global.String(64), nullable=False, default="That's title")
    # content on site:
    content = dbs_global.Column(dbs_global.UnicodeText)

    locale = dbs_global.relationship(
        'LocaleGlobalModel', backref='contentmodel')
    view = dbs_global.relationship(
        'ViewModel', backref='contentmodel')

    @classmethod
    def find(cls, searching_criterion: Dict = {}) -> 'ContentModel':
        # print(searching_criterion)
        if searching_criterion is None:
            searching_criterion = {}
        return cls.query.filter_by(**searching_criterion).all()

    @classmethod
    def find_by_identity_view_locale(
            cls, identity: str = '',
            view_id: str = '', locale_id: str = '') -> 'ContentModel':
        return cls.query.filter_by(
            identity=identity, view_id=view_id,
            locale_id=locale_id).first()

    def update(self, update_values: Dict = None) -> Union[None, str]:
        # print(update_values)
        if update_values is None:
            return
        for key in update_values.keys():
            # print(key)
            setattr(self, key, update_values[key])
        self.updated = datetime.now()
        return self.save_to_db()

    def save_to_db(self) -> Union[None, str]:
        try:
            dbs_global.session.add(self)
            dbs_global.session.commit()
        except IntegrityError as error:
            dbs_global.session.rollback()
            return (
                "contents.models.ContentModel.save_to_db IntegrityError:\n"
                f"{error.orig}")
        except Exception as error:
            print('contents.models.ContentModel.save_to_db Error\n', error)

    def delete_fm_db(self) -> None:
        try:
            dbs_global.session.delete(self)
            dbs_global.session.commit()
        except Exception as error:
            print('contents.models.ContentModel.delete_fm_db error\n', error)
