from ..modules.fma import fma

# print('users.schemas.roles')
from ..models.roles import RoleModel


class RoleSchema(fma.SQLAlchemyAutoSchema):
    class Meta:
        model = RoleModel
        # dump_only = False

        load_instance = True
    # id = fma.auto_field(dump_only=False)
    # remarks = fma.auto_field()
