from marshmallow import Schema, fields
from werkzeug.datastructures import FileStorage
from flask_babelplus import lazy_gettext as _


class FileStorageField(fields.Field):
    default_error_messages = {
        'invalid': str(_('Not a valid image!'))
    }

    def _deserialize(self, value, attr, data, **kwargs) -> FileStorage:
        super()._deserialize(value, attr, data, **kwargs)
        if value is None:
            return None
        if not isinstance(value, FileStorage):
            self.fail('invalid')  # Raises ValidationError
        return value


class ImageSchema(Schema):
    """
    It's gonna to be user for deserialisation only. In - FileStorage, analizing wether it's
    valid then proceed.
    """
    image = FileStorageField(required=True)
