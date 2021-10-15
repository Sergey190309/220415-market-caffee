from flask import jsonify

from .custom_exceptions import (
    UpperLevelElementWrongKey,
    UpperLevelElementWrongValue,
    UpperLevelElementWrongConfiguration,
    UpperLevelElementIncorrectQntAction,
    UpperLevelStructureWrongKeys,
    UpperLevelStructureWrongIndex,
    UpperLevelStructureRemoveLastElement
)


def register_error_handler(module):

    @module.errorhandler(UpperLevelElementWrongKey)
    def handle_UpperLevelElementWrongKey(error):
        print(UpperLevelElementWrongKey)
        return jsonify(str(error)), 400

    @module.errorhandler(UpperLevelElementWrongValue)
    def handle_UpperLevelElementWrongValue(error):
        print(UpperLevelElementWrongValue)
        return jsonify(str(error)), 400

    @module.errorhandler(UpperLevelElementWrongConfiguration)
    def handle_UpperLevelElementWrongConfiguration(error):
        print(UpperLevelElementWrongConfiguration)
        return jsonify(str(error)), 400

    @module.errorhandler(UpperLevelElementIncorrectQntAction)
    def handle_UpperLevelElementIncorrectQntAction(error):
        print(UpperLevelElementIncorrectQntAction)
        return jsonify(str(error)), 400

    @module.errorhandler(UpperLevelStructureWrongKeys)
    def handle_UpperLevelStructureWrongKeys(error):
        print(UpperLevelStructureWrongKeys)
        return jsonify(str(error)), 400

    @module.errorhandler(UpperLevelStructureWrongIndex)
    def handle_UpperLevelStructureWrongIndex(error):
        print(UpperLevelStructureWrongIndex)
        return jsonify(str(error)), 400

    @module.errorhandler(UpperLevelStructureRemoveLastElement)
    def handle_UpperLevelStructureRemoveLastElement(error):
        print(UpperLevelStructureRemoveLastElement)
        return jsonify(str(error)), 400
