from typing import Dict
from datetime import datetime
from flask_jwt_extended import create_access_token, create_refresh_token

from ..modules.dbs import dbs
from ..modules.fbc import fbc


class UserModel(dbs.Model):
    '''
    The class contains info about active users.
    If role_id is none - user has not been confirmed.
    '''
    __tablename__ = 'users'

    # All fields but password and role can be uudated either by user or admin
    id = dbs.Column(dbs.Integer, primary_key=True)
    creation = dbs.Column(dbs.DateTime, nullable=False, default=datetime.now())
    update = dbs.Column(dbs.DateTime, nullable=False, default=datetime.now())
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
    def find_by_id(cls, id: int) -> 'UserModel':
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_email(cls, email: str) -> 'UserModel':
        return cls.query.filter_by(email=email).first()

    def check_password(self, plain_password: str) -> bool:
        return fbc.check_password_hash(self.password_hash, plain_password)

    def update_password(self, plain_password: str) -> bool:
        '''
        The update included secure update.
        '''
        self.password_hash = fbc.generate_password_hash(plain_password)
        self.save_to_db()
        return True

    def update(self, update_values: dict) -> bool:
        for key in update_values.keys():
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
