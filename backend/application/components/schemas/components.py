# from marshmallow import fields, pre_load
# from flask_babelplus import lazy_gettext as _

from ..modules.fma_components import fma_components

from ..models.components import ComponentModel

# Below schemas used for correctness nested parts. Error not used is normal.
# This error is kind of marshmallow feature error.
from application.schemas.locales_global import LocaleGlobalSchema


class ComponentSchema(fma_components.SQLAlchemyAutoSchema):
    '''
    The schema user for reguliar user creation and for 'information' dump.
    '''
    # confirmation = ma.Nested('ConfirmationSchema', many=True)
    locale = fma_components.Nested('LocaleGlobalSchema', many=False)

    class Meta:
        model = ComponentModel
        # load_only = ('role_id', 'locale_id',)
        # exclude = ('password_hash',)
        # load_only = ('role_id', 'locale_id', 'password',)
        # dump_only = ("id",)

        include_fk = True
        load_instance = True


component_schema = ComponentSchema
