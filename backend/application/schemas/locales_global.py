
from ..modules.fma_global import fma_global

from ..models.locales_global import LocaleGlobalModel


class LocaleGlobalSchema(fma_global.SQLAlchemyAutoSchema):
    class Meta:
        model = LocaleGlobalModel
        # dump_only = False

        # load_instance = True
