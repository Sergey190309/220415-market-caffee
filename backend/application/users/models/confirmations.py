from uuid import uuid4
from time import time

from ..modules.dbs_users import dbs_users
from application.globals import global_constants


class ConfirmationModel(dbs_users.Model):
    '''
    Used for user confirmations only.
    '''
    __tablename__ = 'confirmations'

    id = dbs_users.Column(dbs_users.String(50), primary_key=True)
    expire_at = dbs_users.Column(dbs_users.Integer, nullable=False)
    user_id = dbs_users.Column(
        dbs_users.Integer, dbs_users.ForeignKey('users.id'), nullable=False)
    confirmed = dbs_users.Column(dbs_users.Boolean, nullable=False, default=False)

    user = dbs_users.relationship(
        'UserModel',
        backref='confirmationmodel'
        # lazy='dynamic'
        # cascade='all, delete-orphan'
    )

    def __init__(self, user_id: int, **kwargs):
        super().__init__(**kwargs)
        # print(
        #     'users.models.ConfirmationModel.__init__ -',
        #     int(global_constants.get_CONFIRMATION_EXPIRATION_DELTA()))
        self.user_id = user_id
        self.id = uuid4().hex
        self.expire_at = \
            int(time()) + \
            global_constants.get_CONFIRMATION_EXPIRATION_DELTA
        self.confirmed = False

    @classmethod
    def find_by_id(cls, id: str) -> 'ConfirmationModel':
        return cls.query.get(id)

    @classmethod
    def find_by_user_id(cls, user_id: int) -> 'ConfirmationModel':
        return cls.query.filter_by(user_id=user_id).first()

    @classmethod
    def find_first(cls) -> 'ConfirmationModel':
        return cls.query.first()

    @property
    def is_expired(self) -> bool:
        return time() > self.expire_at

    @property
    def is_confirmed(self) -> bool:
        return self.confirmed

    def force_to_expire(self) -> None:  # forcing current confirmation to expire
        if not self.is_expired:
            self.expire_at = int(time())
            self.save_to_db()

    def save_to_db(self) -> None:
        dbs_users.session.add(self)
        dbs_users.session.commit()

    def delete_fm_db(self) -> None:
        dbs_users.session.delete(self)
        dbs_users.session.commit()
