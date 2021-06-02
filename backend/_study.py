source = [
    {'updated': None, 'attributes': {}, 'user_id': 0, 'view_id': 'admin', 'created': '2021-06-01T11:50:04'},
    {'updated': None, 'attributes': {'00': {'name': 'header', 'type': 'header'}, '01': {'qnt': 3, 'name': 'vblock00', 'type': 'vblock', 'subtype': 'txt'}, '02': {'qnt': 2, 'name': 'hblock00', 'type': 'hblock', 'subtype': 'pix'}, '03': {'qnt': 2, 'name': 'vblock01', 'type': 'vblock', 'subtype': 'pix'}, '04': {'name': 'footer', 'type': 'footer'}}, 'user_id': 83, 'view_id': 'landing', 'created': '2021-06-01T12:13:54'},
    {'updated': None, 'attributes': {}, 'user_id': 0, 'view_id': 'pictures', 'created': '2021-06-01T11:50:04'},
    {'updated': None, 'attributes': {}, 'user_id': 0, 'view_id': 'price_list', 'created': '2021-06-01T11:50:04'},
    {'updated': None, 'attributes': {}, 'user_id': 0, 'view_id': 'private', 'created': '2021-06-01T11:50:04'}
]

result = [structure.get('view_id') for structure in source]

print(result)
