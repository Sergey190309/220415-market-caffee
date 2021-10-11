from typing import Dict, Union

# Global variables here:


class GlobalConstants():
    '''
    The class contains constants that are accessible for all application.
    Currently those are:
    '''
    _LOCALES = [
        {'id': 'en', 'description': 'General english.'},
        {'id': 'ru', 'description': 'Общий русский.'},
    ]
    _UPPER_LEVEL_TYPES = [
        {
            'type': 'header',
            'description': ('Element consist of title and content. Normally shows '
                            'in the top of a page.')
        },
        {
            'type': 'footer',
            'description': ('Element consist of title and content. Normally shows '
                            'at the end of a page.')
        },
        {
            'type': 'vblock',
            'description': ('Element consist of couple (stated with qnt value) sub '
                            'elements, those elements sit one above other '
                            'vertically. Sub elements could be any sub types but '
                            'each upper level element can contain same sub type '
                            'elements.')
        },
        {
            'type': 'hblock',
            'description': ('Element consist of couple (stated with qnt value) sub '
                            'elements, those elements sit alongside each other '
                            'horizontally. Sub elements could be any sub types but '
                            'each upper level element can contain same sub type '
                            'elements.')
        },
    ]
    _VIEWS = [
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
    _UPPER_LEVEL_SUBTYPES = [
        {
            'subtype': 'txt',
            'description': ('Sub element consists of title and content. It could '
                            'be represented by view paragraph front end component.')
        },
        {
            'subtype': 'pix',
            'description': ('Sub element consists of title, content and picture. '
                            'It could be represented by view picture front end '
                            'component.')
        },
    ]

    @classmethod
    @property
    def get_VIEWS(cls):
        return cls._VIEWS

    @classmethod
    @property
    def get_VIEWS_PKS(cls):
        return [item.get('view_id') for item in cls._VIEWS]

    @classmethod
    @property
    def get_LOCALES(cls):
        return cls._LOCALES

    @classmethod
    @property
    def get_PKS(cls):
        return [item['id'] for item in cls._LOCALES]

    @classmethod
    @property
    def get_UPPER_LEVEL_TYPES(cls):
        return cls._UPPER_LEVEL_TYPES

    @classmethod
    @property
    def get_UPPER_LEVEL_TYPES_PKS(cls):
        return [item.get('type') for item in cls._UPPER_LEVEL_TYPES]

    @classmethod
    @property
    def get_UPPER_LEVEL_SUBTYPES(cls):
        return cls._UPPER_LEVEL_SUBTYPES

    @classmethod
    @property
    def get_UPPER_LEVEL_SUBTYPES_PKS(cls):
        return [item.get('type') for item in cls._UPPER_LEVEL_SUBTYPES]


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
        # print('global_init_data, set_dlovals, set_values ->', set_values)
        for item in set_values:
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
