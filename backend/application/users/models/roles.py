# from typing import List
from ..modules.dbs_users import dbs_users


class RoleModel(dbs_users.Model):  # parent
    '''
    The model contains allowed user's roles.
    '''
    __tablename__ = 'roles'

    id = dbs_users.Column(dbs_users.String(24), primary_key=True)
    remarks = dbs_users.Column(dbs_users.UnicodeText())

    user = dbs_users.relationship('UserModel', backref='rolemodel', lazy="dynamic")

    @classmethod
    def find_by_id(cls, role_id: str) -> 'RoleModel':
        return cls.query.filter_by(id=role_id).first()

    def save_to_db(self) -> None:
        try:
            dbs_users.session.add(self)
            dbs_users.session.commit()
        except Exception as err:
            print('users.models.RoleModel.save_to_db error\n', err)

    def delete_fm_db(self) -> None:
        try:
            dbs_users.session.delete(self)
            dbs_users.session.commit()
        except Exception as err:
            print('users.models.RoleModel.delete_fm_db error\n', err)

    # @classmethod
    # def find_all(cls) -> List['RoleModel']:
    #     return cls.query.all()

    # @classmethod
    # def CheckRole(cls, role_id: int) -> bool:
    #     # Return True if role_id withing allowed values and False otherwise.
    #     _ids = []
    #     for _role in cls.find_all():
    #         _ids.append(_role.id)
    #     # print('RoleModel.CheckRole role_id -', role_id, '_ids -', _ids)
    #     # print('type -', type(int(role_id)))
    #     if int(role_id) in _ids:
    #         return True
    #     else:
    #         return False
