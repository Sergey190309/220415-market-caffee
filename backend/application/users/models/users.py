from typing import Dict
from datetime import datetime
from requests import Response
from flask import request, url_for
from flask_jwt_extended import create_access_token, create_refresh_token
# from flask_mail import Message

from application.mailing.modules.fml import fml
# from application.globals import confirmation_email_data

from ..modules.dbs_users import dbs_users
from ..modules.fbc_users import fbc_users
from .confirmations import ConfirmationModel


class UserModel(dbs_users.Model):
    '''
    The class contains info about active users.
    If role_id is none - user has not been confirmed.
    '''
    __tablename__ = 'users'

    # All fields but password and role can be uudated either by user or admin
    id = dbs_users.Column(dbs_users.Integer, primary_key=True)
    created = dbs_users.Column(
        dbs_users.DateTime, nullable=False, default=datetime.now())
    updated = dbs_users.Column(dbs_users.DateTime)
    accessed = dbs_users.Column(dbs_users.DateTime)
    user_name = dbs_users.Column(dbs_users.String(80))
    email = dbs_users.Column(dbs_users.String(80), unique=True)
    # User can update password only!
    password_hash = dbs_users.Column(dbs_users.String(128))
    role_id = dbs_users.Column(  # Admin can update role only!
        # If the column does not exists - user has not been confirmed.
        dbs_users.String(24),
        dbs_users.ForeignKey('roles.id'))
    first_name = dbs_users.Column(dbs_users.String(32))
    last_name = dbs_users.Column(dbs_users.String(32))
    locale_id = dbs_users.Column(
        dbs_users.String(16),
        dbs_users.ForeignKey('locales.id'),
        nullable=False,
        default='en')
    time_zone = dbs_users.Column(dbs_users.SmallInteger, nullable=False, default=3)
    remarks = dbs_users.Column(dbs_users.UnicodeText)

    # avatar = fields.ImageField(null=True)

    role = dbs_users.relationship('RoleModel', backref='usermodel')
    locale = dbs_users.relationship('LocaleModel', backref='usermodel')
    confirmation = dbs_users.relationship(
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
            dbs_users.desc(ConfirmationModel.expire_at)).first()

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

    def update(self, update_values: Dict) -> bool:
        # print('Update -', self.id)
        # print('Update -', update_values)
        self.updated = datetime.now()
        for key in update_values.keys():
            # print(key, '\t', update_values[key])
            setattr(self, key, update_values[key])
        self.save_to_db()
        return True

    def save_to_db(self) -> None:
        try:
            dbs_users.session.add(self)
            dbs_users.session.commit()
        except Exception as err:
            print('users.models.UserModel.save_to_db error\n', err)

    def delete_fm_db(self, kill_first: bool = False) -> None:
        def kill():
            try:
                dbs_users.session.delete(self)
                dbs_users.session.commit()
            except Exception as err:
                print('users.models.UserModel.delete_fm_db error\n', err)

        if not kill_first:
            if self.id != 1:
                kill()
            else:
                print('Not allowed to delete user with id = 1')
        else:
            kill()
