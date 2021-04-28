from ..modules.fma_contents import fma_contents

from ..models.views import ViewModel


class ViewSchema(fma_contents.SQLAlchemyAutoSchema):  # noqa
    '''
    That's normal schema for operations within code.
    '''
    class Meta:
        model = ViewModel
        # load_only = ('role_id', 'locale_id',)
        # exclude = ('password_hash',)
        # load_only = ('locale_id',)
        # dump_only = ("id",)

        # include_fk = True
        load_instance = True


view_schema = ViewSchema()

class ViewGetSchema(fma_contents.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema for getting. Mostly to json testing.
    No load instance.
    '''
    # confirmation = ma.Nested('ConfirmationSchema', many=True)
    # locale = fma_components.Nested('LocaleGlobalSchema', many=False)

    class Meta:
        model = ViewModel
        # load_only = ('role_id', 'locale_id',)
        # exclude = ('password_hash',)
        # load_only = ('locale_id',)
        # dump_only = ("id",)

        # include_fk = True
        # load_instance = True


view_get_schema = ViewGetSchema()
