import pytest

from typing import Dict

from random import choice, randint

from application import create_app

from sqlalchemy import create_engine

from application.modules.dbs_global import dbs_global

from application.users.models.users import UserModel
from application.users.schemas.users import UserSchema, UserGetSchema
from application.users.models.confirmations import ConfirmationModel

# from application.components.models import ComponentModel
from application.components.models.component_kinds import ComponentKindsModel
from application.components.schemas.components import (
    ComponentGetSchema, ComponentSchema)
from application.components.schemas.component_kinds import (
    ComponentKindGetSchema, ComponentKindSchema)

from application.contents.models.views import ViewModel
from application.contents.schemas.views import ViewGetSchema, ViewSchema

from application.contents.models.contents import ContentModel
from application.contents.schemas.contents import ContentGetSchema, ContentSchema

from application.testing_config import SQLALCHEMY_DATABASE_URI
from application.contents.local_init_data_contents import contents_constants
from application.components.local_init_data_components import components_constants
from application.users.local_init_data_users import users_constants
from application.global_init_data import global_constants


@pytest.fixture
def _engine():
    '''
    Generation of SQLite file path.
    '''
    # print('\n_engine, SQLALCHEMY_DATABASE_URI ->', SQLALCHEMY_DATABASE_URI)
    return create_engine(SQLALCHEMY_DATABASE_URI)
