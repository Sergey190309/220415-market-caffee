'''
Set initial Flask-BabelPlus values.
'''
from typing import Dict

from flask_babelplus import Babel

from application.global_init_data import GlobalVariables, global_constants


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
            # 'locale': 'en',
            'locale': 'ru',
            'time_zone': 'ETC/GMT-3'
        })

        set_selectors(self)

    def set_locales(self, payload: Dict) -> Dict:
        self.global_variables.set_globals(payload)
        return self.global_variables.get_globals()

    def set_lng(self, lng: str) -> None:
        # print('application.modules.fbp.set_lng, lng ->', lng)
        if lng not in global_constants.get_PKS:
            lng = global_constants.get_LOCALES[0].get('id')
        if lng != self.global_variables.app_globals['locale']:
            self.set_locales({'locale': lng})

    def get_lng(self) -> str:
        return self.global_variables.app_globals['locale']


fbp = BabelBackend()
