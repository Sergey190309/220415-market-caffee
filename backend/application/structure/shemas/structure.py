from ..modules.fma_structure import fma_structure

from application.schemas.views_global import ViewGlobalSchema  # noqa 401

from ..models.structure import StructureModel


class StructureSchema(fma_structure.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema used for reguliar structure operations.
    '''
    # view = fma_structure.Nested('ViewGlobalSchema', many=False)

    class Meta:
        model = StructureModel

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

        include_fk = True
        # load_instance = True


structure_get_schema = StructureGetSchema()
