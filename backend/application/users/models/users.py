from typing import Dict, Union
from datetime import datetime
from requests import Response
from flask import request, url_for
from flask_jwt_extended import create_access_token, create_refresh_token
from sqlalchemy.exc import IntegrityError

from application.mailing.modules.fml import fml
# from application.globals import confirmation_email_data

from application.modules.dbs_global import dbs_global
from application.models.locales_global import LocaleGlobalModel  # noqa: 401
# from ..modules.dbs_users import dbs_users
from ..modules.fbc_users import fbc_users
from .confirmations import ConfirmationModel


class UserModel(dbs_global.Model):
    '''
    The class contains info about active users.
    If role_id is none - user has not been confirmed.
    '''
    __tablename__ = 'users'

    # All fields but password and role can be uudated either by user or admin
    id = dbs_global.Column(dbs_global.Integer, primary_key=True)
    created = dbs_global.Column(
        dbs_global.DateTime, nullable=False, default=datetime.now())
    updated = dbs_global.Column(dbs_global.DateTime)
    accessed = dbs_global.Column(dbs_global.DateTime)
    user_name = dbs_global.Column(dbs_global.String(80))
    email = dbs_global.Column(dbs_global.String(80), unique=True)
    # User can update password only!
    password_hash = dbs_global.Column(dbs_global.String(128))
    role_id = dbs_global.Column(  # Admin can update role only!
        # If the column does not exists - user has not been confirmed.
        dbs_global.String(24),
        dbs_global.ForeignKey('roles.id'))
    first_name = dbs_global.Column(dbs_global.String(32))
    last_name = dbs_global.Column(dbs_global.String(32))
    locale_id = dbs_global.Column(
        dbs_global.String(16),
        dbs_global.ForeignKey('locales_global.id'),
        nullable=False,
        default='en')
    time_zone = dbs_global.Column(dbs_global.SmallInteger, nullable=False, default=3)
    remarks = dbs_global.Column(dbs_global.UnicodeText)

    # avatar = fields.ImageField(null=True)

    locale = dbs_global.relationship('LocaleGlobalModel', backref='usermodel')
    role = dbs_global.relationship('RoleModel', backref='usermodel')
    confirmation = dbs_global.relationship(
        'ConfirmationModel',
        backref='usermodel',
        lazy='dynamic',
        cascade='all, delete-orphan')

    def set_accessed(self):
        # print("users.models.UserModel.set_accessed datetime -", datetime.now())
        self.accessed = datetime.now()
        self.save_to_db()

    @property
    def most_recent_confirmation(self):
        return self.confirmation.order_by(
            dbs_global.desc(ConfirmationModel.expire_at)).first()

    def send_confirmation_request(self) -> Response:
        confirmation = self.most_recent_confirmation
        # confirmation_id = ConfirmationModel.find_by_user_id(self.id)
        # print('send_confirmation_request confirmation_id -', confirmation.id)
        _link = request.url_root[:-1] +\
            url_for('users_bp.confirmation', confirmation_id=confirmation.id)
        # print('send_confirmation_request _link -', _link)
        # self.email = 'sa6702@gmail.com'
        fml.send(
            emails=[self.email],
            link=_link)

    def is_own_id(self, id: int) -> bool:
        return self.id == id

    def is_own_email(self, email: int) -> bool:
        return self.email == email

    @property
    def is_valid(self) -> bool:
        return self.role_id is not None

    @property
    def is_admin(self) -> bool:
        return self.role_id == 'admin'

    @property
    def is_power(self) -> bool:
        return self.role_id == 'power_user'

    def get_fresh_token(self) -> str:
        return create_access_token(self.id, fresh=False)

    def get_tokens(self) -> Dict:
        return {
            'access_token': create_access_token(self.id, fresh=True),
            'refresh_token': create_refresh_token(self.id)
        }

    @classmethod
    def find_last(cls) -> 'UserModel':
        return cls.query.order_by(cls.id.desc()).first()
        # return cls.query.all.order_by(id.desc()).first()

    @classmethod
    def find_by_id(cls, id: int) -> 'UserModel':
        return cls.query.get(id)
        # return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_email(cls, email: str) -> 'UserModel':
        return cls.query.filter_by(email=email).first()

    def check_password(self, plain_password: str) -> bool:
        # print('UserModel.check_password plain_password -', plain_password)
        result = fbc_users.check_password_hash(self.password_hash, plain_password)
        if result:
            self.accessed = datetime.now()
        return result

    def update_password(self, plain_password: str) -> bool:
        '''
        The update included secure update.
        '''
        self.password_hash = fbc_users.generate_password_hash(plain_password)
        self.save_to_db()
        return True

    def update(self, update_values: Dict = None) -> Union[None, str]:
        # print('Update -', self.id)
        # print('Update -', update_values)
        if update_values is None:
            return update_values
        self.updated = datetime.now()
        for key in update_values.keys():
            # print(key, '\t', update_values[key])
            setattr(self, key, update_values[key])
        return self.save_to_db()

    def save_to_db(self) -> Union[None, str]:
        print(self.locale_id)
        print(self.role_id)
        try:
            dbs_global.session.add(self)
            dbs_global.session.commit()
        except IntegrityError as error:
            dbs_global.session.rollback()
            # print(error)
            return (
                "cusers.models.UserModel.save_to_db IntegrityError:\n"
                f"{error.orig}")
        except Exception as error:
            print('users.models.UserModel.save_to_db Error\n', error)

    def delete_fm_db(self, kill_first: bool = False) -> None:
        def kill():
            try:
                dbs_global.session.delete(self)
                dbs_global.session.commit()
            except Exception as error:
                print('users.models.UserModel.delete_fm_db error\n', error)

        if not kill_first:
            if self.id != 1:
                kill()
            else:
                print('Not allowed to delete user with id = 1')
        else:
            kill()
