import pytest
from sqlalchemy import create_engine

from application.testing_config import SQLALCHEMY_DATABASE_URI


@pytest.fixture
def _engine():
    '''
    Generation of SQLite file path.
    '''
    # print('\n_engine, SQLALCHEMY_DATABASE_URI ->', SQLALCHEMY_DATABASE_URI)
    return create_engine(SQLALCHEMY_DATABASE_URI)
