from flask import jsonify

from .custom_exceptions import (
    RecordNotFoundError,
    WrongElementKeyError,
    WrongElementTypeError,
    WrongIndexError,
    WrongTypeError,
    WrongValueError,
    WrongViewNameError,
    WrongLocaleError
)


def register_error_handler(module):

    @module.errorhandler(RecordNotFoundError)
    def handle_RecordNotFoundError(error):
        print(RecordNotFoundError)
        return jsonify(str(error)), 400

    @module.errorhandler(WrongElementKeyError)
    def handle_WrongElementKeyError(error):
        print(WrongElementKeyError)
        return jsonify(str(error)), 400

    @module.errorhandler(WrongElementTypeError)
    def handle_WrongElementTypeError(error):
        print(WrongElementTypeError)
        return jsonify(str(error)), 400

    @module.errorhandler(WrongIndexError)
    def handle_WrongIndexError(error):
        print(WrongIndexError)
        return jsonify(str(error)), 400

    @module.errorhandler(WrongTypeError)
    def handle_WrongTypeError(error):
        print(WrongTypeError)
        return jsonify(str(error)), 400

    @module.errorhandler(WrongValueError)
    def handle_WrongValueError(error):
        print(WrongValueError)
        return jsonify(str(error)), 400

    @module.errorhandler(WrongViewNameError)
    def handle_WrongViewNameError(error):
        print(WrongViewNameError)
        return jsonify(str(error)), 400

    @module.errorhandler(WrongLocaleError)
    def handle_WrongLocaleError(error):
        print(WrongLocaleError)
        return jsonify(str(error)), 400

