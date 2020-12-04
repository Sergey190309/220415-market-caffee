from flask import jsonify

from marshmallow.exceptions import ValidationError
# from .custom_exceptions import WrongTimezone


def register_error_handler(module):

    @module.errorhandler(ValidationError)
    def handle_marshmallow(err):
        print(ValidationError)
        return jsonify(str(err)), 400

    # @module.errorhandler(WrongTimezone)
    # def handle_wrong_timezone(err):
    #     print(WrongTimezone)
    #     return jsonify(str(err)), 400
