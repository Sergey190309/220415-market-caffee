from typing import Dict, Union

# Global variables here:


class GlobalConstants():
    '''
    The class contains constants that are accessible for all application.
    Currently those are:
    '''

    def __init__(self):
        self._LOCALES = [
            {'id': 'en', 'remarks': 'General english.'},
            {'id': 'ru', 'remarks': 'Общий русский.'},
        ]
        self._VIEWS = [
            {
                'view_id': 'landing',
                'description':
                    'That is root view where customers come from searching engines.'
            },
            {
                'view_id': 'price_list',
                'description':
                    'The view with price to our services.'
            },
            {
                'view_id': 'pictures',
                'description': 'Some pictures with our kind interiors.'
            },
            {
                'view_id': 'private',
                'description': 'View that available to logged users only.'
            },
            {
                'view_id': 'admin',
                'description': 'Views that available to logged admins only.'
            },
        ]

    @property
    def get_VIEWS(self):
        return self._VIEWS

    @property
    def get_VIEWS_PKS(self):
        return [item.get('view_id') for item in self._VIEWS]

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

    def set_globals(self, set_values: Dict) -> None:
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

    # def get_lng(self) -> str:
    #     return self.app_globals.get('locale')

# global_variables = GlobalVariables()
