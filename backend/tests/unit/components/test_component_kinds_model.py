import pytest

from application.components.schemas.component_kinds import component_kind_test_schema


@pytest.mark.active
def test_component_kind_save_finds_delete(
        test_client, component_kind_instance, random_words):
    _ck_json = component_kind_test_schema.dump(
        component_kind_instance(random_words()))
    print(_ck_json)
