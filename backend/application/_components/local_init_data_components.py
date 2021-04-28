class ComponentsConstants():
    '''
    The class contains constants that are accessible by all elements
    from components blueprint.
    '''
    def __init__(self):
        # That's initial data for component kinds table:
        self._KINDS = [
            {
                'id_kind': 'button',
                'description':
                    'That is common button that can be detailed in component class.'},
            {
                'id_kind': 'filter',
                'description':
                    'That is common kind of filter.'
            }

        ]

    @property
    def get_KINDS(self):
        return self._KINDS

    @property
    def get_PKS(self):
        _pks = [sum['id_kind'] for sum in self._KINDS]
        return _pks


components_constants = ComponentsConstants()
