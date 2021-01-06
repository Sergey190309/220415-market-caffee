from ..modules.fma_components import fma_components

from ..models.component_kinds import ComponentKindsModel


class ComponentKindSchema(fma_components.SQLAlchemyAutoSchema):  # noqa
    '''
    That's normal schema for operations within code.
    '''
    # confirmation = ma.Nested('ConfirmationSchema', many=True)
    # locale = fma_components.Nested('LocaleGlobalSchema', many=False)

    class Meta:
        model = ComponentKindsModel
        # load_only = ('role_id', 'locale_id',)
        # exclude = ('password_hash',)
        # load_only = ('locale_id',)
        # dump_only = ("id",)

        # include_fk = True
        load_instance = True


component_kind_schema = ComponentKindSchema()


class ComponentKindGetSchema(fma_components.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema for getting.
    No load instance.
    '''
    # confirmation = ma.Nested('ConfirmationSchema', many=True)
    # locale = fma_components.Nested('LocaleGlobalSchema', many=False)

    class Meta:
        model = ComponentKindsModel
        # load_only = ('role_id', 'locale_id',)
        # exclude = ('password_hash',)
        # load_only = ('locale_id',)
        # dump_only = ("id",)

        # include_fk = True
        # load_instance = True


component_kind_get_schema = ComponentKindGetSchema()


class ComponentKindTestSchema(fma_components.SQLAlchemyAutoSchema):  # noqa
    '''
    The schema for tests.
    '''
    # confirmation = ma.Nested('ConfirmationSchema', many=True)
    # locale = fma_components.Nested('LocaleGlobalSchema', many=False)

    class Meta:
        model = ComponentKindsModel
        # load_only = ('role_id', 'locale_id',)
        # exclude = ('password_hash',)
        # load_only = ('locale_id',)
        # dump_only = ("id",)

        # include_fk = True
        # load_instance = True


component_kind_test_schema = ComponentKindTestSchema()
