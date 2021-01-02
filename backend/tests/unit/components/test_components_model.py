import pytest

from application.components.schemas.components import component_schema
# from application.components.models import ComponentModel


# @pytest.mark.active
def test_component_save_finds_delete(test_client, component_instance):
    Two random instances ru and en respectively:
    _component_en = component_instance('en')
    # _component_en_identity = _component_en.identity
    # _component_en_locale_id = _component_en.locale_id
    _component_ru = component_instance('ru')
    # _component_ru_identity = _component_ru.identity
    # _component_ru_locale_id = _component_ru.locale_id

    # Save both instances to db:
    _component_en.save_to_db()
    _component_ru.save_to_db()

    # Get components by identity and locale from db:
    # _component_en_fm_db = ComponentModel.find_by_identity_locale(
    #     _component_en_identity, _component_en_locale_id)
    # _component_ru_fm_db = ComponentModel.find_by_identity_locale(
    #     _component_ru_identity, _component_ru_locale_id)

    # Check they are identical:
    # for key in component_schema.dump(_component_en).keys():
    #     assert component_schema.dump(_component_en)[key] == \
    #         component_schema.dump(_component_en_fm_db)[key]
    # for key in component_schema.dump(_component_ru).keys():
    #     assert component_schema.dump(_component_ru)[key] == \
    #         component_schema.dump(_component_ru_fm_db)[key]

    # Change identity in one component and locale in other one:
    # _component_en_fm_db.identity += '!'
    # _component_ru_fm_db.locale_id = 'en'

    # Save both instances to db:
    # _component_en.save_to_db()
    # _component_ru.save_to_db()

    # Get components by identity and locale from db using old searching creterias:
    # _component_en_fm_db = ComponentModel.find_by_identity_locale(
    #     _component_en_identity, _component_en_locale_id)
    # _component_ru_fm_db = ComponentModel.find_by_identity_locale(
    #     _component_ru_identity, _component_ru_locale_id)
    # Check whether it's noting found:
    # assert _component_en_fm_db is None
    # assert _component_ru_fm_db is None

    # Get components by identity and locale from db using
    # corrected searching creterias:
    # _component_en_identity += '!'
    # _component_ru_locale_id = 'en'
    # _component_en_fm_db = ComponentModel.find_by_identity_locale(
    #     _component_en_identity, _component_en_locale_id)
    # _component_ru_fm_db = ComponentModel.find_by_identity_locale(
    #     _component_ru_identity, _component_ru_locale_id)

    # Check they are identical:
    # for key in component_schema.dump(_component_en).keys():
    #     assert component_schema.dump(_component_en)[key] == \
    #         component_schema.dump(_component_en_fm_db)[key]
    # for key in component_schema.dump(_component_ru).keys():
    #     assert component_schema.dump(_component_ru)[key] == \
    #         component_schema.dump(_component_ru_fm_db)[key]

    # Delete compoents from db
    # _component_en.delete_fm_db()
    # _component_ru.delete_fm_db()

    # Try to find them using corrected keys:
    # _component_en_fm_db = ComponentModel.find_by_identity_locale(
    #     _component_en_identity, _component_en_locale_id)
    # _component_ru_fm_db = ComponentModel.find_by_identity_locale(
    #     _component_ru_identity, _component_ru_locale_id)

    # Insure nothing is found:
    # assert _component_en_fm_db is None
    # assert _component_ru_fm_db is None

    # print(component_schema.dump(_component_en))
    # print(component_schema.dump(_component_en_fm_db))
    # print(_component)
