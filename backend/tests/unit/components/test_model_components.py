import pytest

from application.modules.dbs_global import dbs_global

# from application.components.schemas.components import component_schema
# from application.components.models import ComponentModel
from application.components.models.component_kinds import (
    ComponentKindsModel)
from application.components.schemas.component_kinds import (
    component_kind_test_schema, component_kind_schema)
from application.components.models.components import ComponentModel
from application.components.schemas.components import (
    # component_schema,
    component_test_schema)


@pytest.fixture
def ck_json(component_kind_instance, random_words):
    return component_kind_test_schema.dump(component_kind_instance(random_words()))


# @pytest.mark.active
def test_component_kind_save_find_delete_good(test_client, ck_json):
    '''
    Save and find successfull.
    '''
    # print(ck_json)
    # Sparere id for finding:
    _id_kind = ck_json['id_kind']
    # Create class instance:
    _ck_instance = component_kind_schema.load(ck_json, session=dbs_global.session)
    # Save instance to db:
    _ck_instance.save_to_db()
    # Find appropriate instance from db:
    _ck_instance_fm_db = ComponentKindsModel.find_by_id(id_kind=_id_kind)
    assert _ck_instance_fm_db.description == ck_json['description']
    # Delete instance from db:
    _ck_instance.delete_fm_db()
    # Try to find it by id:
    _ck_instance_fm_db = ComponentKindsModel.find_by_id(id_kind=_id_kind)
    assert _ck_instance_fm_db is None


# @pytest.mark.active
def test_component_save_finds_delete_good(test_client, component_instance):
    # Two random instances ru and en respectively:
    # First instance:
    _component_en = component_instance('en')
    # print(component_schema.dump(_component_en))
    # Get object primary keys for further tests:
    _component_en_identity = _component_en.identity
    _component_en_kind_id = _component_en.kind_id
    _component_en_locale_id = _component_en.locale_id
    # Second instans:
    _component_ru = component_instance('ru')
    # Get object primary keys for further tests:
    _component_ru_identity = _component_ru.identity
    _component_ru_kind_id = _component_ru.kind_id
    _component_ru_locale_id = _component_ru.locale_id

    # Save both instances to db:
    _component_en.save_to_db()
    _component_ru.save_to_db()

    # Get components by identity and locale from db:
    _component_en_fm_db = ComponentModel.find_by_identity_kind_locale(
        identity=_component_en_identity,
        kind_id=_component_en_kind_id,
        locale_id=_component_en_locale_id)
    _component_ru_fm_db = ComponentModel.find_by_identity_kind_locale(
        identity=_component_ru_identity,
        kind_id=_component_ru_kind_id,
        locale_id=_component_ru_locale_id)

    # Check they are identical:
    for key in component_test_schema.dump(_component_en).keys():
        assert component_test_schema.dump(_component_en_fm_db)[key] ==\
            component_test_schema.dump(_component_en)[key]
    for key in component_test_schema.dump(_component_ru).keys():
        assert component_test_schema.dump(_component_ru_fm_db)[key] ==\
            component_test_schema.dump(_component_ru)[key]

    # Change identity in one component and locale in other one:
    _component_en_fm_db.identity += '!'
    _component_ru_fm_db.locale_id = 'en'

    # Save both instances to db:
    _component_en.save_to_db()
    _component_ru.save_to_db()

    # Get components by identity and locale from db using old searching creterias:
    _component_en_fm_db = ComponentModel.find_by_identity_kind_locale(
        identity=_component_en_identity,
        kind_id=_component_en_kind_id,
        locale_id=_component_en_locale_id)
    _component_ru_fm_db = ComponentModel.find_by_identity_kind_locale(
        identity=_component_ru_identity,
        kind_id=_component_ru_kind_id,
        locale_id=_component_ru_locale_id)
    # Check whether it's noting found:
    assert _component_en_fm_db is None
    assert _component_ru_fm_db is None

    # Get components by identity and locale from db using
    # corrected searching creterias:
    _component_en_identity += '!'
    _component_ru_locale_id = 'en'
    _component_en_fm_db = ComponentModel.find_by_identity_kind_locale(
        identity=_component_en_identity,
        kind_id=_component_en_kind_id,
        locale_id=_component_en_locale_id)
    _component_ru_fm_db = ComponentModel.find_by_identity_kind_locale(
        identity=_component_ru_identity,
        kind_id=_component_ru_kind_id,
        locale_id=_component_ru_locale_id)

    for key in component_test_schema.dump(_component_en).keys():
        assert component_test_schema.dump(_component_en_fm_db)[key] ==\
            component_test_schema.dump(_component_en)[key]
    for key in component_test_schema.dump(_component_ru).keys():
        assert component_test_schema.dump(_component_ru_fm_db)[key] ==\
            component_test_schema.dump(_component_ru)[key]

    # Delete compoents from db
    _component_en.delete_fm_db()
    _component_ru.delete_fm_db()

    # Try to find them using corrected keys:
    _component_en_fm_db = ComponentModel.find_by_identity_kind_locale(
        identity=_component_en_identity,
        kind_id=_component_en_kind_id,
        locale_id=_component_en_locale_id)
    _component_ru_fm_db = ComponentModel.find_by_identity_kind_locale(
        identity=_component_ru_identity,
        kind_id=_component_ru_kind_id,
        locale_id=_component_ru_locale_id)

    # Insure nothing is found:
    assert _component_en_fm_db is None
    assert _component_ru_fm_db is None

    # print(component_test_schema.dump(_component_en))
    # print(component_test_schema.dump(_component_en_fm_db))
    # print()
    # print(component_test_schema.dump(_component_ru))
    # print(component_test_schema.dump(_component_ru_fm_db))
    # print('test_component_save_finds_delete')
