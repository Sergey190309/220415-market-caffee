from ..modules.fma_users import fma_users

# print('users.schemas.roles')
from ..models.locales import LocaleModel

# from ..models.locales_global import LocaleGlobalModel

# from ..models.locales import LocaleModel


class LocaleSchema(fma_users.SQLAlchemyAutoSchema):
    class Meta:
        model = LocaleModel
        # dump_only = False

        # load_instance = True
