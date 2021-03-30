from flask import jsonify

from sqlalchemy.exc import OperationalError, InvalidRequestError
from marshmallow.exceptions import ValidationError
from babel.core import UnknownLocaleError

from .custom_exception import NotExistsError


def register_error_handler(module):

    @module.app_errorhandler(InvalidRequestError)
    def handle_InvalidRequestError(err):
        print(err)
        return jsonify(str(err)), 500

    @module.app_errorhandler(OperationalError)
    def handle_OperationalError(err):
        print(err)
        return jsonify(str(err)), 500

    @module.app_errorhandler(ValidationError)
    def handle_marshmallow(err):
        print(err)
        return jsonify(str(err)), 400

    @module.app_errorhandler(NotExistsError)
    def handle_NotExistsError(err):
        print(err)
        return jsonify(str(err)), 400

    @module.app_errorhandler(UnknownLocaleError)
    def handle_UnknownLocaleError(err):
        print(err)
        # return jsonify(str(err)), 400
        return {'message': str(err)}, 400
