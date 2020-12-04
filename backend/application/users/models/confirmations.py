from application.modules.dbs import dbs


class ConfirmationModel(dbs.Model):
    '''
    Used for user confirmations only.
    '''
    __tablename__ = 'confirmations'

    id = dbs.Column(dbs.String(50), primary_key=True)
    expire_at = dbs.Column(dbs.Integer, nullable=False)
    confirmed = dbs.Column(dbs.Boolean, nullable=False, default=False)
    user_id = dbs.Column(dbs.Integer, dbs.ForeignKey('users.id'), nullable=False)

    user = dbs.relationship('UserModel')
