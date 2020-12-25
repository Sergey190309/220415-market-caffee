from ..modules.fma_users import fma_users

# print('users.schemas.roles')
from ..models.roles import RoleModel


class RoleSchema(fma_users.SQLAlchemyAutoSchema):
    class Meta:
        model = RoleModel
        # dump_only = False

        load_instance = True
