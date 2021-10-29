from typing import TypedDict


class Element(TypedDict):
    title: str
    content: str


class ContentValues(TypedDict):
    '''
    The class represents values that needed to update content table:
    {
        identity: '01_vblock_txt_001',
        element: {
            title: 'Title value',
            content: 'Content value'
        }
    }
    '''
    identity: str
    element: Element


class StactureValues(TypedDict):

    '''
    The class represents values that needed to update structure table:
    {
        "01": {
            "qnt": 3,
            "name": "vblock00",
            "type": "vblock",
            "subtype": "txt"}
    }
    '''
    pass
