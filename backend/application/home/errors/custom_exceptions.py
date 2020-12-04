
class WrongTimezone(ValueError):
    def __init__(
        self,
        message='Wrong time zone, it should be from -12 till +12',
        error='wrong time zone error'
    ):
        super().__init__(message)
        self.error = error
        print(error, message)
