from flask import jsonify

from sqlalchemy.exc import OperationalError, InvalidRequestError, ProgrammingError
# from pymysql import err
from marshmallow.exceptions import ValidationError
from babel.core import UnknownLocaleError

from .custom_exceptions import NotExistsError


def register_error_handler(module):
    # python
    @module.errorhandler(ValueError)
    # @module.app_errorhandler(ValueError)
    def handle_ValueError(error):
        print(error)
        return jsonify(str(error)), 400

    @module.errorhandler(AttributeError)
    # @module.app_errorhandler(ValueError)
    def handle_AttributeError(error):
        print(error)
        return jsonify(str(error)), 400

    # SQLAlchemy
    @module.errorhandler(InvalidRequestError)
    # @module.app_errorhandler(InvalidRequestError)
    def handle_InvalidRequestError(error):
        print(error)
        return jsonify(str(error)), 500

    @module.errorhandler(OperationalError)
    # @module.app_errorhandler(OperationalError)
    def handle_OperationalError(error):
        print(error)
        return jsonify(str(error)), 500

    @module.errorhandler(ProgrammingError)
    # @module.app_errorhandler(ProgrammingError)
    def handle_ProgrammingError(error):
        print(error)
        return jsonify(str(error)), 500

    # @module.app_errorhandler(err.ProgrammingError)
    # def handle_errProgrammingError(error):
    #     print(error)
    #     return jsonify(str(error)), 500

    # marshmallow
    @module.errorhandler(ValidationError)
    # @module.app_errorhandler(ValidationError)
    def handle_marshmallow(error):
        print(error)
        return jsonify(str(error)), 400

    # custom
    @module.errorhandler(NotExistsError)
    # @module.app_errorhandler(NotExistsError)
    def handle_NotExistsError(error):
        print(error)
        return jsonify(str(error)), 400

    # babel
    @module.errorhandler(UnknownLocaleError)
    # @module.app_errorhandler(UnknownLocaleError)
    def handle_UnknownLocaleError(error):
        print(error)
        return {'message': str(error)}, 400
