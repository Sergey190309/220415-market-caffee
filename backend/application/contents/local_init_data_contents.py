
class ContentsConstants():
    '''
    The class contains constants that are accessible by all elements
    from components blueprint.
    '''
    def __init__(self):
        # That's initial data for component kinds table:
        self._VIEWS = [
            {'id_view': 'main', 'description': 'That is main view.'},
            {'id_view': 'hello', 'description': 'That is hello page.'},
            {'id_view': 'goodbay', 'description': 'That is good bay page.'}]

    @property
    def get_VIEWS(self):
        return self._VIEWS


contents_constants = ContentsConstants()
