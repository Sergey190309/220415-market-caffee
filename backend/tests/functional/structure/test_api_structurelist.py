import pytest
# import random
from typing import Dict, List
from uuid import uuid4
from flask import url_for
from flask_jwt_extended import create_access_token

# from application.global_init_data import global_constants
from application.home.local_init_data_home import sessions
from application.structure.models.structure import StructureModel
# from application.structure.modules.dbs_init_structure import dbs_init_structure
from application.structure.modules.dbs_init_structure import fill_structure


# @pytest.mark.active
def test_structure_list_no_token(
    client,
):
    lng = 'en'
    headers = {'Content-Type': 'application/json',
               'Accept-Language': lng}
    _resp = client.get(url_for('structure_bp.structurelist'), headers=headers)
    # print('\ntest_structure_list_success, _resp ->', _resp.status_code)
    # print('test_structure_list_success, _resp ->', _resp.json)
    assert _resp.status_code == 401
    assert isinstance(_resp.json, Dict)
    assert 'description' in _resp.json.keys()
    assert 'error' in _resp.json.keys()
    assert _resp.json.get('error').find('authorization_required') != -1


# @pytest.mark.active
@pytest.mark.parametrize(
    'lng, test_word', [
        ('en', 'Something went wrong'),
        ('ru', 'Что-то пошло не так'),
        ('sljsdjaglsj', 'Something went wrong'),
    ]
)
def test_structure_list_wrong_token(
    client,
    # access_token,
    lng, test_word,
):
    sessions.setter(str(uuid4()))
    _tech_token = create_access_token(uuid4(), expires_delta=False)
    headers = {'Authorization': f"Bearer {_tech_token}",
               'Content-Type': 'application/json',
               'Accept-Language': lng}
    _resp = client.get(url_for('structure_bp.structurelist'), headers=headers)
    # print('\ntest_structure_list_success, _resp ->', _resp.status_code)
    # print('test_structure_list_success, _resp ->', _resp.json.get('message'))
    assert _resp.status_code == 500
    assert isinstance(_resp.json, Dict)
    assert 'payload' not in _resp.json.keys()
    assert _resp.json.get('message').find(test_word) != -1
    # assert isinstance(_resp.json['payload'], List)


@pytest.mark.active
@pytest.mark.parametrize(
    'lng, test_word', [
        ('en', 'database'),
        ('ru', 'нашей базе'),
        ('sljsdjaglsj', 'database'),
    ]
)
def test_structure_list_success(
        client,
        user_instance, access_token,
        lng, test_word):
    '''
    Right
    '''
    '''Fill structure table'''
    fill_structure()
    '''Admin in db'''
    # _admin = user_instance(values={'role_id': 'admin'})
    # _admin.save_to_db()
    # _access_token = access_token(_admin)

    _uuid = uuid4()
    sessions.setter(str(_uuid))
    _tech_token = create_access_token(_uuid, expires_delta=False)
    _headers = {'Authorization': f"Bearer {_tech_token}",
                'Content-Type': 'application/json',
                'Accept-Language': lng}
    _resp = client.get(url_for('structure_bp.structurelist'), headers=_headers)

    assert _resp.status_code == 200
    assert isinstance(_resp.json, Dict)
    assert isinstance(_resp.json.get('payload'), List)
    assert len(_resp.json.get('payload')) == 10
    assert _resp.json.get('message').find(test_word) != -1

    # print('\ntest_structure_list_success, _resp ->', _resp.status_code)
    # print('test_structure_list_success, _resp ->', _resp.json.get('message'))
    # print('test_structure_list_success, _resp ->')
    # [print(structure) for structure in _resp.json.get('payload')]

    '''clean up users tables'''
    # if _admin is not None:
    #     _admin.delete_fm_db()
    '''clean up structure tables'''
    [_structure.delete_fm_db() for _structure in StructureModel.find()]
