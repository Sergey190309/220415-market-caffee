from typing import Dict, Union

# Global variables here:


class GlobalConstants():
    '''
    The class contains constants that are accessible from all application.
    Currently those are:
    '''
    def __init__(self):
        self._LOCALES = [
            {'id': 'ru', 'remarks': 'Общий русский.'},
            {'id': 'en', 'remarks': 'General english.'}]

    @property
    def get_LOCALES(self):
        return self._LOCALES

    @property
    def get_PKS(self):
        return [item['id'] for item in self._LOCALES]
 

global_constants = GlobalConstants()


class GlobalVariables():
    '''
    The class contains variables that are accessible from all application.
    Currently those with default values are:
    'locale': 'en',
    'time_zone': 'ETC/GMT-3'

    '''
    def __init__(self, values: Dict = {
        # 'locale': 'ru',
        'locale': 'en',
        'time_zone': 'ETC/GMT-3'
    }):

        self.app_globals = values

    def set_globals(self, set_values: Dict):
        for item in set_values:
            # print(item)
            self.app_globals[item] = set_values[item]

    def get_global_by_name(self, get_what: str) -> Union[str, None]:
        # print('get_globals self.app_globals -', self.app_globals)
        if get_what in self.app_globals.keys():
            return self.app_globals[get_what]
        return None

    def get_globals(self) -> Dict:
        return self.app_globals
