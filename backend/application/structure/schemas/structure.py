from ..modules.fma_structure import fma_structure

from application.schemas.locales_global import LocaleGlobalSchema  # noqa: 401
from application.schemas.views_global import ViewGlobalSchema  # noqa 401

from ..models.structure import StructureModel


class StructureSchema(fma_structure.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema used for reguliar structure operations.
    '''
    locale = fma_structure.Nested('LocaleGlobalSchema', many=False)
    view = fma_structure.Nested('ViewGlobalSchema', many=False)

    class Meta:
        model = StructureModel
        # dump_only = ('created', 'updated')
        # exclude = ('created',)

        include_fk = True
        load_instance = True


structure_schema = StructureSchema()


class StructureGetSchema(fma_structure.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema used for 'information' dump.
    '''
    # view = fma_structure.Nested('ViewGlobalSchema', many=False)

    class Meta:
        model = StructureModel
        # exclude = ('created', 'updated',)

        include_fk = True
        # load_instance = True


structure_get_schema = StructureGetSchema()
