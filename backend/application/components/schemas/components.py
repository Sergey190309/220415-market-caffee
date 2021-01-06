# from marshmallow import fields, pre_load
# from flask_babelplus import lazy_gettext as _

from ..modules.fma_components import fma_components

# Below schemas used for correctness nested parts. Error not used is normal.
# This error is kind of marshmallow feature error.
from application.schemas.locales_global import LocaleGlobalSchema  # noqa: 401
from .component_kinds import ComponentKindSchema  # noqa: 401

from ..models.components import ComponentModel


class ComponentSchema(fma_components.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema used for reguliar component creation and for 'information' dump.
    '''
    locale = fma_components.Nested('LocaleGlobalSchema', many=False)
    kind = fma_components.Nested('ComponentKindSchema', many=False)

    class Meta:
        model = ComponentModel
        # load_only = ('role_id', 'locale_id',)
        # exclude = ('password_hash',)
        # load_only = ('locale_id',)
        # dump_only = ("id",)

        include_fk = True
        load_instance = True


component_schema = ComponentSchema()


class ComponentGetSchema(fma_components.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema used for searching criterion on get method.
    '''
    # locale = fma_components.Nested('LocaleGlobalSchema', many=False)

    class Meta:
        model = ComponentModel
        # load_only = ('role_id', 'locale_id',)
        # exclude = ('title', 'content',)
        # load_only = ('locale_id',)
        # dump_only = ("id",)

        include_fk = True
        # load_instance = True


component_get_schema = ComponentGetSchema()


class ComponentTestSchema(fma_components.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema for tests.
    '''
    # locale = fma_components.Nested('LocaleGlobalSchema', many=False)
    # kind = fma_components.Nested('ComponentKindSchema', many=False)

    class Meta:
        model = ComponentModel
        # load_only = ('role_id', 'locale_id',)
        # exclude = ('password_hash',)
        # load_only = ('locale_id',)
        # dump_only = ("id",)

        include_fk = True
        # load_instance = True


component_test_schema = ComponentTestSchema()
