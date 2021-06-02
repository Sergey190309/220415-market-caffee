import pytest
from typing import Dict, List
from uuid import uuid4
from flask import url_for
from flask_jwt_extended import create_access_token


from application.home.local_init_data_home import sessions
from application.structure.models.structure import StructureModel
from application.structure.modules.dbs_init_structure import dbs_init_structure


@pytest.mark.active
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


@pytest.mark.parametrize(
    'lng, test_word', [
        ('en', 'Something went wrong'),
        ('ru', 'Что-то пошло не так'),
        ('sljsdjaglsj', 'Something went wrong'),
    ]
)
# @pytest.mark.active
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


@pytest.mark.parametrize(
    'lng, test_word', [
        ('en', 'database'),
        ('ru', 'нашей базе'),
        ('sljsdjaglsj', 'database'),
    ]
)
# @pytest.mark.active
def test_structure_list_success(
        client,
        # access_token,
        lng, test_word):
    '''
    Right
    '''
    # Insure there are appropriate structure in the db
    # Clean up the table
    StructureModel.query.delete()
    # Create structure set
    dbs_init_structure()

    _uuid = uuid4()
    sessions.setter(str(_uuid))
    _tech_token = create_access_token(_uuid, expires_delta=False)
    headers = {'Authorization': f"Bearer {_tech_token}",
               'Content-Type': 'application/json',
               'Accept-Language': lng}
    _resp = client.get(url_for('structure_bp.structurelist'), headers=headers)

    # print('\ntest_structure_list_success, _resp ->', _resp.status_code)
    # print('test_structure_list_success, _resp ->', _resp.json.get('message'))
    # print('test_structure_list_success, _resp ->')
    # [print(structure) for structure in _resp.json.get('payload')]
    assert _resp.status_code == 200
    assert isinstance(_resp.json, Dict)
    assert isinstance(_resp.json.get('payload'), List)
    assert len(_resp.json.get('payload')) == 5
    assert _resp.json.get('message').find(test_word) != -1

    # Clean up the table
    StructureModel.query.delete()
