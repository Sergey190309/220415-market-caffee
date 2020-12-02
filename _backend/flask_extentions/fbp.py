'''
Set initial Flask-BabelPlus values.
'''
from flask_babelplus import Babel


def set_selectors(fbp):

    @fbp.localeselector
    # @babel.localeselector
    def get_locale():
        return 'ru'

    @fbp.timezoneselector
    def get_timezone():
        return 'ETC/GMT-3'


class BabelInit(Babel):
    def __init__(self):
        super().__init__()

        set_selectors(self)


fbp = BabelInit()
