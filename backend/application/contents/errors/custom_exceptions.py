from flask_babelplus import lazy_gettext as _


class ContentErrors(Exception):
    '''
    That's base class for each error in structure module.
    '''

    def __init__(self, message, error):
        super().__init__(message)
        # self.args = args


class WrongElementKeyError(ContentErrors):
    '''
    The exception is raising when ContentElement has wrong keys.
    They coudl be in ['title', 'content']
    '''

    def __init__(self, message, error):
        super().__init__(message, error)
        self.error = error
        print(str(_(
            'Wrong upper level element key: %(message)s',
            message=message)))
        print(error)


class WrongElementTypeError(ContentErrors):
    '''
    The exception is raising type is unapplacable for specific class
        instance.
    '''

    def __init__(self, message, error):
        super().__init__(message, error)
        self.error = error
        print(str(_(
            '1st level element has a wong type: %(message)s',
            message=message)))
        print(error)


class WrongIndexError(ContentErrors):
    '''
    The exception is raising index either below 0 or above 99.
    '''

    def __init__(self, message, error):
        super().__init__(message, error)
        self.error = error
        print(str(_(
            'Index provided has been out of range: %(message)s',
            message=message)))
        print(error)


class WrongTypeError(ContentErrors):
    '''
    The exception is raising type is unapplacable for specific class
        instance.
    '''

    def __init__(self, message, error):
        super().__init__(message, error)
        self.error = error
        print(str(_(
            '1st level element type is wrong: %(message)s',
            message=message)))
        print(error)
