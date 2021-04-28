
from application.modules.fma_global import fma_global
# from ..modules.fma_contents import fma_contents

from application.models.views_global import ViewGlobalModel
# from ..models.views import ViewModel


class ViewGlobalSchema(fma_global.SQLAlchemyAutoSchema):  # noqa
    '''
    That's normal schema for operations within code.
    '''
    class Meta:
        model = ViewGlobalModel
        # load_only = ('role_id', 'locale_id',)
        # exclude = ('password_hash',)
        # load_only = ('locale_id',)
        # dump_only = ("id",)

        # include_fk = True
        load_instance = True


view_global_schema = ViewGlobalSchema()

class ViewGlobalGetSchema(fma_global.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema for getting. Mostly to json testing.
    No load instance.
    '''
    # confirmation = ma.Nested('ConfirmationSchema', many=True)
    # locale = fma_components.Nested('LocaleGlobalSchema', many=False)

    class Meta:
        model = ViewGlobalModel
        # load_only = ('role_id', 'locale_id',)
        # exclude = ('password_hash',)
        # load_only = ('locale_id',)
        # dump_only = ("id",)

        # include_fk = True
        # load_instance = True


view_global_get_schema = ViewGlobalGetSchema()
