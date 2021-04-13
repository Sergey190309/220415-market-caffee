import pytest

from typing import Dict

# from application.components.models.component_kinds import ComponentKindsModel
# from application.components.schemas.component_kinds import (
#     ComponentKindGetSchema, ComponentKindSchema)


# @pytest.fixture(scope='session')
# def component_kinds_schema():
#     return ComponentKindSchema()


# @pytest.fixture(scope='session')
# def component_kinds_get_schema():
#     return ComponentKindGetSchema()


# @pytest.fixture(scope='module')
# def component_kind_instance(random_text):
#     '''
#     It generates instance without saving.
#     id_kind - argument, description - random set of 10 words.
#     '''
#     def _method(id_kind: str = None):
#         if id_kind is None:
#             id_kind = random_text(qnt=2)
#         _description = random_text(qnt=10)
#         return ComponentKindsModel(
#             id_kind=id_kind, description=_description)
#     return _method
