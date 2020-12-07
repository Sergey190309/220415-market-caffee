from datetime import datetime

from ..modules.dbs import dbs


class UserModel(dbs.Model):
    '''
    The class contains info about active users.
    If role_id is none - user has not been confirmed.
    '''
    __tablename__ = 'users'

    id = dbs.Column(dbs.Integer, primary_key=True)
    creation = dbs.Column(dbs.DateTime, default=datetime.now())
    update = dbs.Column(dbs.DateTime, default=datetime.now())
    user_name = dbs.Column(dbs.String(80))
    email = dbs.Column(dbs.String(80), nullable=False, unique=True)
    password_hash = dbs.Column(dbs.String(128))
    role_id = dbs.Column(
        dbs.String(24),
        dbs.ForeignKey('roles.id'),
        nullable=False,
        default=1
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
