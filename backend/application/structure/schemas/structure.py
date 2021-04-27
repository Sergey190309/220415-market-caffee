from ..modules.fma_structure import fma_structure

# from ..models.structure import StructureModel


class StructureSchema(fma_structure.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema used for reguliar content creation and for 'information' dump.
    '''
    pass


structure_schema = StructureSchema()
