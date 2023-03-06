import pytest
from sqlalchemy import create_engine

from application import create_app
from application.modules.dbs_global import dbs_global
from application.modules.dbs_init_global import dbs_init_global
from application.testing_config import SQLALCHEMY_DATABASE_URI


@pytest.fixture
def _engine():
    '''
    Generation of SQLite file path.
    '''
    print('\n\n_engine, 9SQLALCHEMY_DATABASE_URI ->',
          SQLALCHEMY_DATABASE_URI, '\n')
    app = create_app('testing_config.py')
    # dbs_global.create_all(app=app)
    with app.app_context():
        dbs_global.create_all()
        dbs_init_global()

    return create_engine(SQLALCHEMY_DATABASE_URI)
