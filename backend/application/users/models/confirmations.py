from uuid import uuid4
from time import time

from application.modules.dbs_global import dbs_global
# from ..modules.dbs_users import dbs_users
# from application.global_init_data import global_constants
from ..local_init_data_users import users_constants
# from application.globals import global_constants


class ConfirmationModel(dbs_global.Model):
    '''
    Used for user confirmations only.
    '''
    __tablename__ = 'confirmations'

    id = dbs_global.Column(dbs_global.String(50), primary_key=True)
    expire_at = dbs_global.Column(dbs_global.Integer, nullable=False)
    user_id = dbs_global.Column(
        dbs_global.Integer, dbs_global.ForeignKey('users.id'), nullable=False)
    confirmed = dbs_global.Column(dbs_global.Boolean, nullable=False, default=False)

    user = dbs_global.relationship(
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
            users_constants.get_CONFIRMATION_EXPIRATION_DELTA
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
        dbs_global.session.add(self)
        dbs_global.session.commit()

    def delete_fm_db(self) -> None:
        dbs_global.session.delete(self)
        dbs_global.session.commit()
