import pytest
# from json import dumps

from application.contents.models.page_view import PageView


@pytest.fixture
def content_normilized(create_test_content):
    '''
    Load page instance from db, then same it back to have upper level
        indexes start from 00 and be serial.
    '''
    def _method(lng: str = ''):
        _page_details = create_test_content(locale=lng)
        _ids = {
            'view_id': _page_details.get('view_id'),
            'locale_id': _page_details.get('locale_id')
        }
        _page = PageView.load_fm_db(ids=_ids)
        # _page.save_to_db()
        print('\test_api_UpperLevelHandling:\n test_ContentsHandling_put')
        for element in _page.elements:
            print('  _page ->', element.upper_index)
        for i, element in enumerate(_page.elements):
            element.delete_fm_db(**_ids)
            element.ul_index(index=i)
            # element.save_to_db(**_ids)
        print()
        for element in _page.elements:
            print('  _page ->', element.upper_index)

        return
    return _method


# @pytest.mark.active
@pytest.mark.parametrize(
    ('lng, test_word'),
    [
        ('en', 'Request does not contain',),
        # ('ru', 'Запрос не содержит',),
    ]
)
def test_UpperLevelHandling_post(
    client,
    create_test_content, content_normilized,
    user_instance, access_token,
    lng, test_word
):
    '''clean up old values and create new ones in structure and contents
        tables'''
    # _page_details = create_test_content(locale=lng)
    # _element_keys = {k: v for (k, v) in _page_details.items()
    #                  if k not in ['view_id', 'locale_id']}.keys()
    # _content_normalized = content_normilized(lng=lng)
    print('\ntest_api_UpperLevelHandling:\n test_ContentsHandling_put',
          #   '\n  block_details ->', dumps(_page_details, indent=4),
          #   '\n  _element_keys ->', _element_keys,
          #   '\n  _content_normalized ->', _content_normalized
          )

    '''testing contstants'''
    # _view_id = _page_details.get('view_id')

    '''Create user and admin'''
    _user = user_instance({'role_id': 'user'})
    _user.save_to_db()
    _admin = user_instance({'role_id': 'admin'})
    _admin.save_to_db()

    '''Create tokens'''
    # _admin_access_token = access_token(_admin)
    # _user_access_token = access_token(_user)
    # _admin_headers = {
    #     'Authorization': f'Bearer {_admin_access_token}',
    #     'Content-Type': 'application/json',
    #     'Accept-Language': lng}
    # _user_headers = {
    #     'Authorization': f'Bearer {_user_access_token}',
    #     'Content-Type': 'application/json',
    #     'Accept-Language': lng}
    # _json = {
    #     'view_id': _view_id,
    #     'identity': _identity,
    #     'item_index': _item_index
    # }
