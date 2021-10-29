from flask import jsonify

from .custom_exceptions import (
    WrongValueKeyError
)


def register_error_handler(module):

    @module.errorhandler(WrongValueKeyError)
    def handle_WrongValueKeyError(error):
        print(WrongValueKeyError)
        return jsonify(str(error)), 400
