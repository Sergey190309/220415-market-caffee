class NotExistsError(Exception):
    '''
    Raise when try to access element that does not exists.
    Attributes:
    reference - anithing used as reference
    message - explanation of the error
    '''
    def __init__(self, reference, message):
        self.reference = reference
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return (
            f'Reference {self.reference} does not work. '
            f'Some explanation: {self.message}.')
