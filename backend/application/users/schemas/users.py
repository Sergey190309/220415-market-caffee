from auxiliary.modules.ma import ma

# from models.user import UserModel, UserUpdateModel
# This error is on. Kind of marshmallow trick.
# from schemas.role import RoleSchema
# This error is on. Kind of marshmallow trick.
# from schemas.locale import LocaleSchema
# This error is on. Kind of marshmallow trick.
# from schemas.confirmation import ConfirmationSchema


# This error is on. Kind of marshmallow error.
# class UserLoginSchema(ma.SQLAlchemyAutoSchema):
#     class Meta:
#         model = UserModel
#         fields = ['email', 'password']

#         load_instance = True


# This error is on. Kind of marshmallow error.
# class UserUpdateSchema(ma.SQLAlchemyAutoSchema):
#     class Meta:
#         model = UserUpdateModel
        # load_only = ("password",)
        # dump_only = ("id",)

        # load_instance = True


# This error is on. Kind of marshmallow error.
class UserSchema(ma.SQLAlchemyAutoSchema):  # child
    confirmation = ma.Nested('ConfirmationSchema', many=True)
    role = ma.Nested('RoleSchema', many=False, exclude=('id',))
    locale = ma.Nested('LocaleSchema', many=False)

    class Meta:
        model = UserModel
        load_only = ("password",)
        # dump_only = ("id",)

        include_fk = True
        load_instance = True
