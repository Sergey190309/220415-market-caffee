'''
Set initial Flask-BabelPlus values.
'''
from flask_babelplus import Babel
from application.default_config import LOCALE, TIMEZONE


def set_selectors(fbp):

    @fbp.localeselector
    # @babel.localeselector
    def get_locale():
        return LOCALE

    @fbp.timezoneselector
    def get_timezone():
        return TIMEZONE


class BabelInit(Babel):
    def __init__(self):
        super().__init__()

        set_selectors(self)


fbp = BabelInit()
