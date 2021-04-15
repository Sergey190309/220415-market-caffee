sample = {
    'locale_id': 'ru',
    'view': {
        'id_view': 'test_one',
        'description': 'Those views for testing purpose only'},
    'title': 'или сми федеральное',
    'updated': None,
    'locale': {
        'id': 'ru', 'remarks': 'Общий русский.'},
    'content': 'и религии российским два для',
    'identity': 'turbine_i',
    'created': '2021-04-13T16:11:52',
    'view_id': 'test_one',
    'user_id': 23
}

output = {
    key: value for (key, value) in sample.items() if key in ['view', 'identity']}
output = {

}

print('\noutput ->', output)
