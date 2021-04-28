import pytest
from sqlalchemy import create_engine

from application import create_app
from application.modules.dbs_global import dbs_global
from application.testing_config import SQLALCHEMY_DATABASE_URI


@pytest.fixture
def _engine():
    '''
    Generation of SQLite file path.
    '''
    # print('\n_engine, SQLALCHEMY_DATABASE_URI ->', SQLALCHEMY_DATABASE_URI)
    dbs_global.create_all(app=create_app('testing_config.py'))
    return create_engine(SQLALCHEMY_DATABASE_URI)
