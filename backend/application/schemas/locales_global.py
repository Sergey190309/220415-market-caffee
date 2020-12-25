
from ..modules.fma_global import fma_global

from ..models.locales_global import LocaleModelGlobal


class LocaleSchema(fma_global.SQLAlchemyAutoSchema):
    class Meta:
        model = LocaleModelGlobal
        # dump_only = False

        # load_instance = True
