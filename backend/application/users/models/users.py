from typing import Dict
from datetime import datetime
from flask import request, url_for
from flask_jwt_extended import create_access_token, create_refresh_token

from application.mailing.sendgrid import SendGrid

from application.globals import confirmation_email_data
from ..modules.dbs import dbs
from ..modules.fbc import fbc
from .confirmations import ConfirmationModel


class UserModel(dbs.Model):
    '''
    The class contains info about active users.
    If role_id is none - user has not been confirmed.
    '''
    __tablename__ = 'users'

    # All fields but password and role can be uudated either by user or admin
    id = dbs.Column(dbs.Integer, primary_key=True)
    created = dbs.Column(dbs.DateTime, nullable=False, default=datetime.now())
    updated = dbs.Column(dbs.DateTime)
    accessed = dbs.Column(dbs.DateTime)
    user_name = dbs.Column(dbs.String(80))
    email = dbs.Column(dbs.String(80), unique=True)
    password_hash = dbs.Column(dbs.String(128))  # User can update password only!
    role_id = dbs.Column(  # Admin can update role only!
        # If the column does not exists - user has not been confirmed.
        dbs.String(24),
        dbs.ForeignKey('roles.id'),
    )
    first_name = dbs.Column(dbs.String(32))
    last_name = dbs.Column(dbs.String(32))
    locale_id = dbs.Column(
        dbs.String(16),
        dbs.ForeignKey('locales.id'),
        nullable=False,
        default='en'
    )
    time_zone = dbs.Column(dbs.SmallInteger, nullable=False, default=3)
    remarks = dbs.Column(dbs.UnicodeText)

    # avatar = fields.ImageField(null=True)

    role = dbs.relationship('RoleModel', backref='usermodel')
    locale = dbs.relationship('LocaleModel', backref='usermodel')
    confirmation = dbs.relationship(
        'ConfirmationModel',
        backref='usermodel',
        lazy='dynamic',
        cascade='all, delete-orphan'
    )

    def set_accessed(self):
        # print("users.models.UserModel.set_accessed datetime -", datetime.now())
        self.accessed = datetime.now()
        self.save_to_db()

    @property
    def most_recent_confirmation(self):
        return self.confirmation.order_by(
            dbs.db.desc(ConfirmationModel.expire_at)).first()

    def send_confirmation_request(self):
        _link = 'link'
        print('users.models.UserModel.send_confirmation_request url_root -', request.url_root[:-1])
        # print('users.models.UserModel.send_confirmation_request url_for -', url_for('users_bp.userhandle', confirmation_id=self.most_recent_confirmation.id))
        # _link = request.url_root[:-1] + url_for(
        #     'confirmation', confirmation_id=self.most_recent_confirmation.id)
        confirmation_email_data.refresh()

        SendGrid.send_confirmation_email(
            self.email,
            _link,
            confirmation_email_data.email_data)

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
        return fbc.check_password_hash(self.password_hash, plain_password)

    def update_password(self, plain_password: str) -> bool:
        '''
        The update included secure update.
        '''
        self.password_hash = fbc.generate_password_hash(plain_password)
        self.save_to_db()
        return True

    def update(self, update_values: dict) -> bool:
        # print(self.id)
        self.updated = datetime.now()
        for key in update_values.keys():
            # print(key, '\t', update_values[key])
            setattr(self, key, update_values[key])
        self.save_to_db()
        return True

    def save_to_db(self) -> None:
        try:
            dbs.session.add(self)
            dbs.session.commit()
        except Exception as err:
            print('users.models.UserModel.save_to_db error\n', err)

    def delete_fm_db(self, kill_first: bool = False) -> None:
        def kill():
            try:
                dbs.session.delete(self)
                dbs.session.commit()
            except Exception as err:
                print('users.models.UserModel.delete_fm_db error\n', err)

        if not kill_first:
            if self.id != 1:
                kill()
            else:
                print('Not allowed to delete user with id = 1')
        else:
            kill()
