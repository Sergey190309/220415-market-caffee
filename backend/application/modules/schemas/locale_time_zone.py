from marshmallow import Schema, fields

from flask_babelplus import lazy_gettext as _


class LocaleField(fields.Field):
    default_error_messages = {
        'invalid': str(_('Not a vaid locale.'))
    }

    def _deserialize(self, value, attr, data, **kwargs) -> str:
        '''
        Run if class_use_this_field execute load method.
        class_use_this_field.load
        '''
        if value is None:
            return None
        if not isinstance(value, str):
            return self.fail('invalid')  # Raises Validation error
        return value


class TimezoneField(fields.Field):
    default_error_messages = {
        'invalid': str(_('Not a vaid time zone.'))
    }

    def _deserialize(self, value, attr, data, **kwargs) -> str:
        if value is None:
            return None
        if (value >= -12) and (value <= 12) and float((value * 2)).is_integer():
            return 'ETC/GMT' + f'{-value:+}'
        return self.fail('invalid')  # Raises Validation error


class LocaleTimezoneSchema(Schema):
    '''
    The schema for validation only.
    '''
    locale = LocaleField()
    time_zone = TimezoneField()
