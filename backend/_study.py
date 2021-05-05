dict00 = {
    '00':
        {
            'type': 'header',
            'name': 'header',
        },
    '01':
        {
            'type': 'vblock',
            'name': 'vblock00',
            'subtype': 'txt',
            "qnt": 3,
        },
    '02':
        {
            'type': 'hblock',
            'name': 'hblock00',
            'subtype': 'pix',
            "qnt": 2
        },
    '03':
        {
            'type': 'vblock',
            'name': 'vblock01',
            'subtype': 'pix',
            "qnt": 2
        },
    '04':
        {
            'type': 'footer',
            'name': 'footer',
        },
}

dict01 = {
    '05':
        {
            'test_key': 'test_value'
        }
}

dict02 = {**dict00, **{
    '05':
        {
            'test_key': 'test_value'
        }
}}

# print('dict00 ->', dict00)
for item in dict02.items():
    print('item ->', item)
