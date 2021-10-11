from typing import Dict

from application.global_init_data import global_constants


class UpperLevelElement():
    '''
    That respresents upper level element such as:
    {
        "qnt": 6,
        "name": "vblock00",
        "type": "vblock",
        "subtype": "txt"
    }
    '''
    valid_keys = ['type', 'subtype', 'qnt', 'name']

    def __init__(self, args: Dict = {}) -> 'UpperLevelElement':
        # for k in args.keys():
        #     if k not in self.valid_keys:
        #         return 'wrong key'
        self.type = args.get(
            'type', global_constants.get_UPPER_LEVEL_TYPES_PKS[0])
        self.subtype = args.get(
            global_constants.get_UPPER_LEVEL_SUBTYPES_PKS[0])
        self.qnt = args.get('qnt', 1)
        self.name = args.get('name', 'spare field')


class ViewPageStructure:
    '''
    Class represents view page structure such as:
    {
        "00": {"name": "header", "type": "header"},
        "01": {"qnt": 6, "name": "vblock00", "type": "vblock", "subtype": "txt"},
        "02": {"qnt": 2, "name": "hblock00", "type": "hblock", "subtype": "pix"},
        "03": {"qnt": 2, "name": "vblock01", "type": "vblock", "subtype": "pix"},
        "04": {"name": "footer", "type": "footer"}
    }
    '''

    def __init__(self, args: Dict = {}) -> 'ViewPageStructure':
        for k, v in args.items():
            setattr(self, k, v)
        # setattr(self, name, value)
