from typing import Dict, Union
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from flask_babelplus import lazy_gettext as _

from application.modules.dbs_global import dbs_global
from application.models.locales_global import LocaleGlobalModel  # noqa: 401
from application.models.views_global import ViewGlobalModel  # noqa: 401

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
    # no = dbs_global.Column(dbs_global.Integer)
    # that's just position in output groupes, used in paragraphs
    # (vertical groups) and controls (horisontal groupes)
    identity = dbs_global.Column(dbs_global.String(64))
    view_id = dbs_global.Column(
        dbs_global.String(64),
        dbs_global.ForeignKey('views_global.view_id'),
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
    content = dbs_global.Column(dbs_global.UnicodeText, default="That's title")

    locale = dbs_global.relationship(
        'LocaleGlobalModel', backref='contentmodel')
    view = dbs_global.relationship(
        'ViewGlobalModel', backref='contentmodel')

    @classmethod
    def elem_ids(cls, direction: str = '', block_id: str = '') -> list:
        '''
        The method generate list of record ids by block id.
        Used to add or delete element to / from blocks.
        Depending direction 'inc' - increse or 'dec' -decrease
        element's quontity by 1.
        '''
        _qnt = int(block_id.split('_')[-1])
        if direction == 'inc':
            _qnt += 1
        elif direction == 'dec':
            _qnt -= 1
        _record_body = '_'.join(block_id.split('_')[0:-1])
        # print('\nContents, model, block_id ->', block_id)
        return ['_'.join([_record_body, str(index).zfill(3)]) for index in range(_qnt)]

    @classmethod
    def find(cls, searching_criterion: Dict = {}) -> ['ContentModel']:
        # print(searching_criterion)
        return cls.query.filter_by(**searching_criterion).all()

    @classmethod
    def find_by_identity_view_locale(
            cls,
            identity: str = '',
            view_id: str = '',
            locale_id: str = '') -> 'ContentModel':
        return cls.query.filter_by(
            identity=identity, view_id=view_id,
            locale_id=locale_id).first()

    @classmethod
    def add_element_to_block(
            cls,
            block_id: str = '',
            block_index: int = 0,
            view_id: str = '',
            locale_id: str = '',
            user_id: int = 0) -> Union[None, str]:
        '''
        Generate list of ids, check they exists,
        change list according arrived info, check last element
        is not exists
        move element after block_index by one
        '''
        _updated_record_ids = cls.elem_ids('inc', block_id)
        '''If record with added record id exitst, delete it.'''
        _criterian = {
            'identity': _updated_record_ids[-1],
            'view_id': view_id,
            'locale_id': locale_id
        }
        if cls.is_exist_cls(_criterian):
            _redundant_record = cls.find_by_identity_view_locale(**_criterian)
            _redundant_record.delete_fm_db()
            return {
                'message': str(_(
                    "Redundant record has been found and deleted, try "
                    "to insert element once more."))
            }
        # print()
        _active_index = len(_updated_record_ids) - 1
        _criterian = {**_criterian, 'identity': _updated_record_ids[_active_index - 1]}
        _record_s = cls.find_by_identity_view_locale(**_criterian)
        _record_t = cls(
            identity=_updated_record_ids[_active_index],
            view_id=_record_s.view_id,
            locale_id=_record_s.locale_id,
            user_id=user_id,
            title=_record_s.title,
            content=_record_s.content
        )
        _record_t.save_to_db()
        _active_index -= 1
        while _active_index > block_index:
            _criterian = {**_criterian,
                          'identity': _updated_record_ids[_active_index - 1]}
            _record_s = cls.find_by_identity_view_locale(**_criterian)
            _criterian = {**_criterian,
                          'identity': _updated_record_ids[_active_index]}
            _active_record = cls.find_by_identity_view_locale(**_criterian)
            update_result = _active_record.update({
                'user_id': user_id,
                'title': _record_s.title,
                'content': _record_s.content
            })
            # print('Contents, model, add_element_to_block. _criterian ->', _criterian)
            _active_index -= 1
        _criterian = {**_criterian,
                      'identity': _updated_record_ids[block_index]}
        _active_record = cls.find_by_identity_view_locale(**_criterian)
        update_result = _active_record.update({
            'user_id': user_id,
            'title': '',
            'content': ''
        })
        return update_result

    @classmethod
    def is_exist_cls(cls, ids: dict = {}) -> bool:
        return ContentModel.find_by_identity_view_locale(
            identity=ids.get('identity'), view_id=ids.get('view_id'),
            locale_id=ids.get('locale_id')) is not None

    def is_exist(self) -> bool:
        return ContentModel.find_by_identity_view_locale(
            identity=self.identity, view_id=self.view_id,
            locale_id=self.locale_id) is not None

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
