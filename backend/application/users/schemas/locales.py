from ..modules.fma import fma

# print('users.schemas.roles')
from ..models.locales import LocaleModel


class LocaleSchema(fma.SQLAlchemyAutoSchema):
    class Meta:
        model = LocaleModel
        # dump_only = False

        load_instance = True
