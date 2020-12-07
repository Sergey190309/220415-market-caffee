'''
Set initial Flask-BabelPlus values.
'''
from typing import Dict

from flask_babelplus import Babel
from application.globals import GlobalVariables


def set_selectors(fbp: 'BabelBackend') -> str:

    @fbp.localeselector
    def select_locale():
        # print('application.modules.fbp.set_selectors LOCALE -', app_locale)

        return fbp.global_variables.get_global_by_name('locale')
        # return app_locale

    @fbp.timezoneselector
    def select_timezone():
        return fbp.global_variables.get_global_by_name('time_zone')


class BabelBackend(Babel):
    def __init__(self):
        super().__init__()
        self.global_variables = GlobalVariables({
            'locale': 'en',
            'time_zone': 'ETC/GMT-3'
        })

        set_selectors(self)

    def set_locales(self, payload: Dict) -> Dict:
        # print('application.modules.fbp.set_selectors -', payload)
        self.global_variables.set_globals(payload)
        return self.global_variables.get_globals()


fbp = BabelBackend()
