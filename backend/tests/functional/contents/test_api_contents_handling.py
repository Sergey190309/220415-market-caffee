import pytest
# from typing import Dict
from json import dumps
from random import randrange
# from pprint import pprint as pp
from flask import url_for

# from application.modules.dbs_global import dbs_global
# from application.global_init_data import global_constants
# from application.structure.models import StructureModel
# from application.contents.models import ContentModel
# from application.contents.schemas.contents import content_schema
# from application.structure.modules.dbs_init_structure import (
#     fill_structure)
# from application.contents.models.content_elements_block import (
#     ContentElementsBlock)


# @pytest.fixture
# def element():
#     def _method(id: int = 0):
#         return{
#             'title': f'Title value No {str(id).zfill(3)}',
#             'content': f'Content value No {str(id).zfill(3)}'
#         }
#     return _method


# @pytest.fixture
# def elements_dict(element):
#     def _method(size: int = 0):
#         _elements = []
#         [_elements.append(element(i)) for i in range(size)]
#         return _elements
#     return _method


# @pytest.fixture
# def create_test_content(elements_dict) -> Dict:
#     '''
#     The fixture create classes and save them to db, return names and
#         other details for testing.
#     '''
#     def _method(locale: str = ''):
#         '''clean up content tables'''
#         [_structure.delete_fm_db() for _structure in StructureModel.find()]
#         [_content.delete_fm_db() for _content in ContentModel.find()]
#         '''choose testing constants'''
#         _view_id = choice(global_constants.get_VIEWS_PKS)
#         _locale_id = locale
#         _upper_index_00 = randrange(100)
#         _upper_index_01 = randrange(100)
#         while _upper_index_01 == _upper_index_00:
#             _upper_index_01 = randrange(100)
#         _size_00 = 6
#         # _size_00 = randrange(3, 7)
#         _size_01 = randrange(2, 5)
#         _type_00 = choice(ContentElementsBlock._types)
#         _type_01 = choice([item for item in ContentElementsBlock._types
#                            if item != _type_00])
#         _subtype_00 = choice(ContentElementsBlock._subtypes)
#         _subtype_01 = choice([item for item in ContentElementsBlock._subtypes
#                               if item != _subtype_00])
#         _name_00 = f'name of {_type_00}'
#         _name_01 = f'name of {_type_01}'

#         _elements_dict_00 = elements_dict(_size_00)
#         _elements_dict_01 = elements_dict(_size_01)

#         _block_instance_00 = ContentElementsBlock(
#             upper_index=_upper_index_00, type=_type_00, subtype=_subtype_00,
#             name=_name_00, elements=_elements_dict_00)
#         _block_instance_00.save_to_db(view_id=_view_id, locale_id=_locale_id)
#         _block_instance_01 = ContentElementsBlock(
#             upper_index=_upper_index_01, type=_type_01, subtype=_subtype_01,
#             name=_name_01, elements=_elements_dict_01)
#         _block_instance_01.save_to_db(view_id=_view_id, locale_id=_locale_id)

#         _structure_00 = _block_instance_00.serialize_to_structure
#         _structure_01 = _block_instance_01.serialize_to_structure
#         # print('\ntest_api_contents_handling:\n create_test_content',
#         #       '\n  _structure_00 ->', _structure_00,
#         #       '\n  _structure_01 ->', _structure_01,
#         #       )
#         return {
#             'view_id': _view_id,
#             'locale_is': _locale_id,
#             'block_00': {
#                 'upper_index': _upper_index_00,
#                 'type': _type_00,
#                 'subtype': _subtype_00,
#                 'qnt': _structure_00.get(
#                     str(_upper_index_00).zfill(2)).get('qnt')
#             },
#             'block_01': {
#                 'upper_index': _upper_index_01,
#                 'type': _type_01,
#                 'subtype': _subtype_01,
#                 'qnt': _structure_01.get(
#                     str(_upper_index_01).zfill(2)).get('qnt')
#             }
#         }
#     return _method


# @pytest.mark.active
@pytest.mark.parametrize(
    'lng, test_word, test_word_01, test_word_02, test_word_03',
    [
        ('en', 'Request does not contain',
         'Sorry, access', 'Something went wrong', 'structure'),
        ('ru', 'Запрос не содержит',
         'Извиняйте, доступ', 'Что-то пошло не так', 'структура'),
    ]
)
def test_ContentsHandling_put(
    client,
    create_test_content,
    # structure_get_schema,
    user_instance, access_token,
    # attributes,
    lng, test_word, test_word_01, test_word_02, test_word_03
):
    '''clean up old values and create new ones in structure and contents
        tables'''
    block_details = create_test_content(locale=lng)
    '''setting contants'''
    _block_00 = block_details.get('block_00')
    _view_id = block_details.get('view_id')
    _identity = '_'.join([str(_block_00.get('upper_index')).zfill(2),
                          _block_00.get('type'),
                          _block_00.get('subtype')])
    _item_index = randrange(_block_00.get('qnt'))
    _qnt = _block_00.get('qnt')

    '''success'''
    '''Create user and admin'''
    _user = user_instance({'role_id': 'user'})
    _user.save_to_db()
    _admin = user_instance({'role_id': 'admin'})
    _admin.save_to_db()
    '''Create tokens'''
    _admin_access_token = access_token(_admin)
    _user_access_token = access_token(_user)
    _admin_headers = {
        'Authorization': f'Bearer {_admin_access_token}',
        'Content-Type': 'application/json',
        'Accept-Language': lng}
    _user_headers = {
        'Authorization': f'Bearer {_user_access_token}',
        'Content-Type': 'application/json',
        'Accept-Language': lng}
    _json = {
        'view_id': _view_id,
        'identity': _identity,
        'item_index': _item_index
    }
    '''Success'''
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json, headers=_admin_headers)
    assert _resp.status_code == 200
    assert _resp.json.get('message').find(test_word_03) != -1
    # print('\ntest_api_contents_handling:\n test_ContentsHandling_put',
    #       '\n  status ->', _resp.status_code,
    #       '\n  json ->', _resp.json)

    '''Failures'''
    '''No tokens'''
    _no_token_header = {
        k: v for (k, v) in _admin_headers.items() if k != 'Authorization'}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json, headers=_no_token_header)
    assert _resp.status_code == 401
    assert _resp.json.get('error') == 'authorization_required'
    assert _resp.json.get('description').find(test_word) != -1

    '''Non admin'''
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json, headers=_user_headers)
    assert _resp.status_code == 401
    assert _resp.json.get('message').find(test_word_01) != -1

    '''No block identity'''
    _json_no_id = {k: v for (k, v) in _json.items() if k != 'identity'}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_no_id, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.find(
        'invalid literal for int() with base 10') != -1

    '''wrong item index'''
    '''no item index'''
    _json_wrong_index = {k: v for (k, v) in _json.items() if k != 'item_index'}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_02) != -1

    '''Negative item index'''
    _json_wrong_index = {**_json, 'item_index': -1}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_02) != -1

    '''Block index above item element quontity'''
    _json_wrong_index = {**_json, 'item_index': _qnt + 2}
    _resp = client.put(url_for('contents_bp.contentshandling'),
                       json=_json_wrong_index, headers=_admin_headers)
    assert _resp.status_code == 400
    assert _resp.json.get('message').find(test_word_02) != -1

    '''clean up users tables'''
    if _user is not None:
        _user.delete_fm_db()
    if _admin is not None:
        _admin.delete_fm_db()
    # # '''clean up structure tables'''
    # # [_structure.delete_fm_db() for _structure in StructureModel.find()]


@pytest.mark.active
@pytest.mark.parametrize(
    'lng, test_word, test_word_01, test_word_02, test_word_03',
    [
        ('en',
            'Request does not contain', 'Sorry, access',
            'Something wrong', 'structure'),
        # ('ru',
        #     'Запрос не содержит', 'Извиняйте, доступ',
        #     'Что-то не так', 'структура'),
    ]
)
def test_ContentsHandling_patch(
    client,
    create_test_content,
    user_instance, access_token,
    lng, test_word, test_word_01, test_word_02, test_word_03
):
    '''clean up old values and create new ones in structure and contents
        tables'''
    block_details = create_test_content(lng)

    '''setting contants'''
    _block_00 = block_details.get('block_00')
    _view_id = block_details.get('view_id')
    _identity = '_'.join([str(_block_00.get('upper_index')).zfill(2),
                          _block_00.get('type'),
                          _block_00.get('subtype')])
    _item_index = randrange(_block_00.get('qnt'))
    _qnt = _block_00.get('qnt')

    '''Create user and admin'''
    _user = user_instance({'role_id': 'user'})
    _user.save_to_db()
    _admin = user_instance({'role_id': 'admin'})
    _admin.save_to_db()

    '''Create tokens'''
    _admin_access_token = access_token(_admin)
    _user_access_token = access_token(_user)
    _admin_headers = {
        'Authorization': f'Bearer {_admin_access_token}',
        'Content-Type': 'application/json',
        'Accept-Language': lng}
    _user_headers = {
        'Authorization': f'Bearer {_user_access_token}',
        'Content-Type': 'application/json',
        'Accept-Language': lng}
    _json = {
        'view_id': _view_id,
        'identity': _identity,
        'item_index': _item_index
    }

    '''Success'''
    _resp = client.patch(url_for('contents_bp.contentshandling'),
                         json=_json, headers=_admin_headers)
    print('\ntest_api_contents_handling:\ntest_ContentsHandling_delete',
          '\n  block_details ->', dumps(block_details, indent=4),
          '\n  _resp ->', _resp.status_code,
          '\n  _resp ->', _resp.json,
          )
    # '''Update structure'''
    # _updating_structure = StructureModel.find_by_ids({**_criterions, 'locale_id': lng})
    # _updating_structure.update({'attributes': attributes})
    # '''Create user and admin'''
    # _user = user_instance({'role_id': 'user'})
    # _user.save_to_db()
    # _admin = user_instance({'role_id': 'admin'})
    # _admin.save_to_db()
    # '''Create tokens'''
    # _admin_access_token = access_token(_admin)
    # # _user_access_token = access_token(_user)
    # _admin_headers = {
    #     'Authorization': f'Bearer {_admin_access_token}',
    #     'Content-Type': 'application/json',
    #     'Accept-Language': lng}
    # _user_headers = {
    #     'Authorization': f'Bearer {_user_access_token}',
    #     'Content-Type': 'application/json',
    #     'Accept-Language': lng}
    # _json = {
    #     **_criterions,
    #     'item_index': _item_index,
    #     'block_id': _block_id
    # }
    # '''Success'''
    # # # print('\ntest, api, contents, handling, \nview_id ->\t', _view_id,
    # # #       '\nlocale_id ->\t', lng)
    # _resp = client.patch(url_for('contents_bp.contentshandling'),
    #                      json=_json, headers=_admin_headers)
    # # assert _resp.status_code == 200
    # # assert _resp.json.get('message').find(test_word_03) != -1
    # print('\ntest, api, contents_handling,\n'
    #       '_resp.status_code ->', _resp.status_code)
    # print('test, api, contents_handling,\n'
    #       '_resp.json ->', _resp.json)

    # '''Failures'''
    # '''No tokens'''
    # _no_token_header = {
    #     k: v for (k, v) in _admin_headers.items() if k != 'Authorization'}
    # _resp = client.patch(url_for('contents_bp.contentshandling'),
    #                      json=_json, headers=_no_token_header)
    # assert _resp.status_code == 401
    # assert _resp.json.get('error') == 'authorization_required'
    # assert _resp.json.get('description').find(test_word) != -1

    # '''Non admin'''
    # _resp = client.patch(url_for('contents_bp.contentshandling'),
    #                      json=_json, headers=_user_headers)
    # assert _resp.status_code == 401
    # assert _resp.json.get('message').find(test_word_01) != -1

    # '''No block identity'''
    # _json_no_id = {k: v for (k, v) in _json.items() if k != 'block_id'}
    # _resp = client.put(url_for('contents_bp.contentshandling'),
    #                    json=_json_no_id, headers=_admin_headers)
    # assert _resp.status_code == 400
    # assert _resp.json.get('message').find(test_word) != -1

    # '''wrong item index'''
    # '''no item index'''
    # _json_wrong_index = {k: v for (k, v) in _json.items() if k != 'item_index'}
    # _resp = client.put(url_for('contents_bp.contentshandling'),
    #                    json=_json_wrong_index, headers=_admin_headers)
    # assert _resp.status_code == 400
    # assert _resp.json.get('message').find(test_word) != -1

    # '''Negative item index'''
    # _json_wrong_index = {**_json, 'item_index': -1}
    # _resp = client.put(url_for('contents_bp.contentshandling'),
    #                    json=_json_wrong_index, headers=_admin_headers)
    # assert _resp.status_code == 400
    # assert _resp.json.get('message').find(test_word_02) != -1

    # '''Block index above item element quontity'''
    # _json_wrong_index = {**_json, 'item_index': _qnt + 1}
    # _resp = client.put(url_for('contents_bp.contentshandling'),
    #                    json=_json_wrong_index, headers=_admin_headers)
    # assert _resp.status_code == 400
    # assert _resp.json.get('message').find(test_word_02) != -1

    # '''clean up users tables'''
    # if _user is not None:
    #     _user.delete_fm_db()
    # if _admin is not None:
    #     _admin.delete_fm_db()
    # '''clean up structure tables'''
    # [_structure.delete_fm_db() for _structure in StructureModel.find()]
