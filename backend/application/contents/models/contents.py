from typing import Dict, Union, List
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
        dbs_global.String(64), default='dummy')
    # dbs_global.String(64), nullable=False, default="That's title")
    # content on site:
    content = dbs_global.Column(dbs_global.UnicodeText, default='dummy')

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
        return ['_'.join([_record_body, str(index).zfill(3)])
                for index in range(_qnt)]

    @classmethod
    def find(cls, searching_criterions: Dict = {}) -> ['ContentModel']:
        # print(searching_criterions)
        '''
        Find list of records that strictly meet searching_criterions.
        '''
        return cls.query.filter_by(**searching_criterions).all()

    @classmethod
    def find_by_identity_view_locale(
            cls,
            identity: str = '',
            view_id: str = '',
            locale_id: str = '') -> 'ContentModel':
        '''
        Find first record that meet strict primary keys.
        Actually it's for handling unique items.
        '''
        return cls.query.filter_by(
            identity=identity, view_id=view_id,
            locale_id=locale_id).first()

    @classmethod
    def find_identity_like(
            cls, searching_criterions: Dict = {},
            identity_like: str = '') -> List['ContentModel']:
        '''
        The method needed for running like queries for identity field.
        searching_criterions - full field's name. Like locale_id, etc.
        identity_like - string used as argument for like().
            Example 02_hblock_txt
        '''
        return cls.query.filter_by(
            **searching_criterions).filter(
                cls.identity.like(identity_like)).all()

    @classmethod
    def add_element_to_block(
            cls,
            block_id: str = '',  # 01_vblock_txt_5
            # block_id already increased by 1 while updating structure
            # table
            item_index: int = 0,
            view_id: str = '',  # landing
            locale_id: str = '',  # en
            user_id: int = 0) -> Union[None, str]:
        '''
        Generate list of ids, check they exists,
        change list according arrived info, check last element
        is not exists
        move element after item_index by one
        '''
        # print('\nContentModel:\nadd_element_to_block, '
        #       '\n block_id ->', block_id,
        #       '\n item_index ->', item_index,
        #       '\n view_id ->', view_id,
        #       '\n locale_id ->', locale_id,
        #       '\n user_id ->', user_id,
        #       )
        _updated_record_ids = cls.elem_ids('', block_id)  # Do not
        # increase the value couse incoming block_id already increased
        # in structure model update.
        # print(' _updated_record_ids ->', _updated_record_ids)
        # '''If record with added record id exitst, delete it.'''
        _criterian = {
            'identity': _updated_record_ids[-1],
            'view_id': view_id,
            'locale_id': locale_id
        }
        if cls.is_exist_cls(_criterian):
            _redundant_record = cls.find_by_identity_view_locale(
                **_criterian)
            _redundant_record.delete_fm_db()
            return {
                'message': str(_(
                    "Redundant record has been found and deleted, try "
                    "to insert element once more."))
            }

        '''Normal record insertion.'''
        '''Creation new exeeding record'''
        '''_record_s - source record; _record_t - target record'''
        _active_index = len(_updated_record_ids) - 1
        _criterian = {**_criterian,
                      'identity': _updated_record_ids[_active_index - 1]}
        _record_s = cls.find_by_identity_view_locale(**_criterian)
        if _record_s is None:
            _record_s = ContentModel(
                identity=_criterian.get('identity'),
                view_id=_criterian.get('view_id'),
                locale_id=_criterian.get('locale_id'),
                user_id=_criterian.get('user_id'),
            )
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
        # print('\nContents, model, add_element_to_block:\n'
        #       '_record_s ->', _record_t)

        '''Coping (shifting) old values to new records next to
        old ones.'''
        while _active_index >= 0:
            _criterian = {**_criterian,
                          'identity':
                          _updated_record_ids[_active_index - 1]}
            _record_s = cls.find_by_identity_view_locale(**_criterian)
            if _record_s is None:
                _record_s = ContentModel(
                    identity=_criterian.get('identity'),
                    view_id=_criterian.get('view_id'),
                    locale_id=_criterian.get('locale_id'),
                    user_id=_criterian.get('user_id'),
                )
                _record_s.save_to_db()
            if _active_index > item_index:
                _criterian = {**_criterian,
                              'identity':
                              _updated_record_ids[_active_index]}
                _active_record = cls.find_by_identity_view_locale(
                    **_criterian)
                update_result = _active_record.update({
                    'user_id': user_id,
                    'title': _record_s.title,
                    'content': _record_s.content
                })
            _active_index -= 1
        '''Clear title and content in inserted record.'''
        _criterian = {**_criterian,
                      'identity': _updated_record_ids[item_index]}
        _active_record = cls.find_by_identity_view_locale(**_criterian)
        update_result = _active_record.update({
            'user_id': user_id,
            'title': 'dummy',
            'content': 'dummy'
        })
        return update_result

    def serialize(self) -> Dict:
        '''
        Serialize the instance to values of ContentElement.
        '''
        return {
            'title': self.title,
            'content': self.content
        }

    @classmethod
    def remove_element_fm_block(
            cls,
            block_id: str = '',  # 01_vblock_txt_4
            item_index: int = 0,
            view_id: str = '',  # landing
            locale_id: str = '',  # en
            user_id: int = 0) -> Union[None, str]:
        '''
        Generate list of ids, check they exists,
        change list according arrived info, check last element
        is not exists
        move element after item_index by one
        '''
        # print('\nContents, model, remove_element_fm_block, '
        #       '\nblock_id ->', block_id,
        #       '\nitem_index ->', item_index,
        #       '\nview_id ->', view_id,
        #       '\nlocale_id ->', locale_id,
        #       '\nuser_id ->', user_id,
        #       )
        _updated_record_ids = cls.elem_ids('dec', block_id)
        _last_record_id = cls.elem_ids('', block_id)[-1]
        # print('\ncontents, models\n'
        #       '_updated_record_ids ->', _updated_record_ids,
        #       '\n_last_record_id ->', _last_record_id,)
        '''Normal record insertion.'''
        _active_index = 0
        # _active_index = item_index
        _criterian = {
            'view_id': view_id,
            'locale_id': locale_id
        }
        while _active_index < len(_updated_record_ids):
            _criterian = {**_criterian,
                          'identity': _updated_record_ids[_active_index]}
            _record_t = cls.find_by_identity_view_locale(**_criterian)
            if _active_index < len(_updated_record_ids) - 1:
                _criterian = {
                    **_criterian,
                    'identity': _updated_record_ids[_active_index + 1]}
            else:
                _criterian = {**_criterian,
                              'identity': _last_record_id}
            _record_s = cls.find_by_identity_view_locale(**_criterian)
            if _record_s is None:
                _record_s = ContentModel(
                    identity=_criterian.get('identity'),
                    view_id=_criterian.get('view_id'),
                    locale_id=_criterian.get('locale_id'),
                    user_id=_criterian.get('user_id'),
                )
                _record_s.save_to_db()
            if _active_index >= item_index:
                result = _record_t.update({
                    'user_id': user_id,
                    'title': _record_s.title,
                    'content': _record_s.content
                })
            # print('\nContents, model, remove_element_fm_block, '
            #       '\n _record_t ->', _record_t
            #       )
            _active_index += 1
        _criterian = {**_criterian, 'identity': _last_record_id}
        _record_s = cls.find_by_identity_view_locale(**_criterian)
        result = _record_s.delete_fm_db()
        return result

    @classmethod
    def is_exist_cls(cls, ids: dict = {}) -> bool:
        return ContentModel.find_by_identity_view_locale(
            identity=ids.get('identity'), view_id=ids.get('view_id'),
            locale_id=ids.get('locale_id')) is not None

    def is_exist(self) -> bool:
        return ContentModel.find_by_identity_view_locale(
            identity=self.identity, view_id=self.view_id,
            locale_id=self.locale_id) is not None

    # def update(self, update_values: Dict = None) -> Union[None, str]:
    def update(self, update_values: Dict = {}) -> Union[None, str]:
        # print(update_values)
        # if update_values is None:
        #     return
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
                "contents.models.ContentModel.save_to_db IntegrityError:"
                f"\n{error.orig}")
        except Exception as error:
            print('contents.models.ContentModel.save_to_db Error\n',
                  error)

    def delete_fm_db(self) -> Union[None, str]:
        try:
            dbs_global.session.delete(self)
            dbs_global.session.commit()
        except Exception as error:
            print('contents.models.ContentModel.delete_fm_db error\n',
                  error)
