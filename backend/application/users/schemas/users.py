from marshmallow import fields, pre_load
# from flask_babelplus import lazy_gettext as _

from ..modules.fma_users import fma_users
from ..modules.fbc_users import fbc_users

from ..models.users import UserModel

# Below schemas used for correctness nested parts.
# Error not used is normal.
# This error is on Kind of marshmallow error.
from ..schemas.roles import RoleSchema  # noqa: 401
from application.schemas.locales_global import LocaleGlobalSchema  # noqa: 401


class UserGetSchema(fma_users.SQLAlchemyAutoSchema):  # noqa
    '''
    Schema for user update based on json data (plain password).
    Actually used for testing info for update
    Not possible to update ID
    '''
    class Meta:
        model = UserModel
        exclude = ('password_hash',)
        dump_only = ("id",)

        include_fk = True
        # load_instance = True

    # password = fields.String(attribute='password_hash')


user_get_schema = UserGetSchema()


class UserUpdateSchema(fma_users.SQLAlchemyAutoSchema):  # noqa
    '''
    Schema for user update based on json data (plain password).
    Actually used for testing info for update
    Not possible to update ID
    '''
    class Meta:
        model = UserModel
        exclude = ('password_hash',)
        dump_only = ("id",)

        include_fk = True
        # load_instance = True

    password = fields.String(attribute='password_hash')


class AdminCreateSchema(fma_users.SQLAlchemyAutoSchema):  # noqa
    '''
    Schema for user creation based on json data (plain password) as well
    as creation user with dedicated ID.
    In other words 'not safe creation'
    Actually it's used for admin creation only.
    '''
    class Meta:
        model = UserModel
        exclude = ('password_hash',)

        include_fk = True
        load_instance = True

    email = fields.String(attribute='email', required=True)
    password = fields.String(attribute='password_hash', required=True)

    @pre_load
    def hash_password(self, in_data, **kwargs):
        in_data['password'] = fbc_users.generate_password_hash(
            in_data['password'])
        return in_data


class UserSchema(fma_users.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema user for reguliar user creation and for 'information' dump.
    '''
    role = fma_users.Nested('RoleSchema', many=False)
    locale = fma_users.Nested('LocaleGlobalSchema', many=False)

    class Meta:
        model = UserModel
        # load_only = ('role_id', 'locale_id',)
        exclude = ('password_hash',)
        load_only = ('role_id', 'locale_id', 'password',)
        dump_only = ("id",)

        include_fk = True
        load_instance = True

    email = fields.String(attribute='email', required=True)
    password = fields.String(attribute='password_hash', required=True)

    @pre_load
    def hash_password(self, in_data, **kwargs):
        in_data['password'] = fbc_users.generate_password_hash(
            in_data.get('password'))
        return in_data


user_schema = UserSchema()
