from flask_babelplus import lazy_gettext as _


class StructureErrors(Exception):
    '''
    That's base class for each error in structure module.
    '''

    def __init__(self, message, error):
        super().__init__(message)
        # self.args = args


class UpperLevelElementWrongKey(StructureErrors):
    '''
    The exception is raising in view_page_structure when
    UpperLevelElement has wrong key.
    Wrong keys - keys other then
    valid_keys = ['type', 'subtype', 'qnt', 'name']
    '''

    def __init__(self, message, error):
        super().__init__(message, error)
        self.error = error
        print(str(_(
            'Wrong upper level element key: %(message)s',
            message=message)))
        print(error)


class UpperLevelElementWrongValue(StructureErrors):
    '''
    The exception is raising in view_page_structure when
    UpperLevelElement has wrong value.
    Wrong value - value that is not in tables:
    type not in global_constants.get_UPPER_LEVEL_TYPES_PKS
    subtype not in global_constants.get_UPPER_LEVEL_SUBTYPES_PKS
    '''

    def __init__(self, message, error):
        super().__init__(message, error)
        self.errors = error
        print(str(_(
            'Wrong upper level element value: %(message)s',
            message=message)))
        print(error)


class UpperLevelElementWrongConfiguration(StructureErrors):
    '''
    Exception raising when upper level forced to upeate with
    wrong element configuration. For example subtype in case of
    simple element type (header, footer).
    '''

    def __init__(self, message, error):
        super().__init__(message, error)
        self.errors = error
        print(str(_(
            'Wrong upper level element configurations: ',
            '%(message)s',
            message=message)))
        print(error)


class UpperLevelElementIncorrectQntAction(StructureErrors):
    '''
    Any action with upper level elements that are not allow:
    1. Increase or decrease qnt in simple elements.
    2. Increase qnt above 99.
    3. Decrease qnt below 1.
    '''
    def __init__(self, message, error):
        super().__init__(message, error)
        self.errors = error
        print(str(_(
            'Something went wrong with qnt operations: %(message)s',
            message=message)))
        print(error)


class UpperLevelStructureWrongKeys(StructureErrors):
    '''
    Exception raising when upper level element's keys are not
    2 char string reprecent sequential integers from '00'.
    '''
    def __init__(self, message, error):
        super().__init__(message, error)
        self.errors = error
        print(str(_(
            'Wrong upper level element key: %(message)s',
            message=message)))
        print(error)


class UpperLevelStructureWrongIndex(StructureErrors):
    '''
    Exception raising when upper level element's index out of range.
    '''
    def __init__(self, message, error):
        super().__init__(message, error)
        self.errors = error
        print(str(_(
            'You use invalid index: %(message)s',
            message=message)))
        print(error)


class UpperLevelStructureRemoveLastElement(StructureErrors):
    '''
    It raised on attempt to remove last element in the structure
    '''
    def __init__(self, message, error):
        super().__init__(message, error)
        self.errors = error
        print(str(_(
            'You tried to remove last element from page view structure: %(message)s',
            message=message)))
        print(error)
