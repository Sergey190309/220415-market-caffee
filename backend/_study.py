locales = [
    {'id': 'en', 'remarks': 'General english.'},
    {'id': 'ru', 'remarks': 'Общий русский.'},
]
views = [
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


def output(view, lng):
    print(view, '\t', lng)

# result = [{'en':'lng'}]


# output('view', 'lng')

[output(view.get('view_id'), lng.get('id')) for view in views for lng in locales]
