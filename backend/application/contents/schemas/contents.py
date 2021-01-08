from ..modules.fma_contents import fma_contents

# Below schemas used for correctness nested parts. Error not used is normal.
# This error is kind of marshmallow feature error.
from application.schemas.locales_global import LocaleGlobalSchema  # noqa: 401
from .views import ViewSchema  # noqa:401

from ..models.contents import ContentModel


class ContentSchema(fma_contents.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema used for reguliar content creation and for 'information' dump.
    '''
    locale = fma_contents.Nested('LocaleGlobalSchema', many=False)
    view = fma_contents.Nested('ViewSchema', many=False)

    class Meta:
        model = ContentModel
        # load_only = ('role_id', 'locale_id',)
        # exclude = ('password_hash',)
        # dump_only = ("id",)

        include_fk = True
        load_instance = True


content_schema = ContentSchema()


class ContentGetSchema(fma_contents.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema used for searching criterion on get method and other auxiliary
    purposes.
    No load instance and nested schemas.
    '''
    # locale = fma_contents.Nested('LocaleGlobalSchema', many=False)

    class Meta:
        model = ContentModel
        # load_only = ('role_id', 'locale_id',)
        exclude = ('created', 'updated',)
        # load_only = ('locale_id',)
        # dump_only = ("id",)

        include_fk = True
        # load_instance = True


content_get_schema = ContentGetSchema()
