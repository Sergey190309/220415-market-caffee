from typing import List

from ..modules.dbs import dbs


class RoleModel(dbs.Model):  # parent
    '''
    The model contains allowed user's roles.
    '''

    __tablename__ = 'roles'

    id = dbs.Column(dbs.String(24), primary_key=True)
    remarks = dbs.Column(dbs.UnicodeText())

    user = dbs.relationship('UserModel', backref='rolemodel', lazy="dynamic")
    # user = db.relationship('UserModel', backref='rolemodel')

    # @classmethod
    # def find_by_name(cls, name: str) -> 'RoleModel':
    #     return cls.query.filter_by(name=name).first()

    # @classmethod
    # def find_by_id(cls, role_id: int) -> 'RoleModel':
    #     return cls.query.filter_by(id=role_id).first()

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
