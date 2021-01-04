import pytest

from sqlalchemy import MetaData, Table, select

# from application import create_app


# from application.testing_config import SQLALCHEMY_DATABASE_URI


# @pytest.fixture(scope='module')
# def test_client():
#     # print('\nclient')
#     app = create_app('testing_config.py')

#     with app.test_client() as test_client:
#         with app.app_context():
#             yield test_client


# @pytest.mark.active
def test_db_creation(_engine):
    '''
    Test checks all tables availability
    '''
    tables = _engine.table_names()

    table_names = [
        'locales_global',
        'confirmations',
        'roles',
        'users',
        'components',
        'component_kinds'
    ]
    tables.sort()
    table_names.sort()
    assert tables == table_names
    # print()
    # print('Tables from db -\t', tables)
    # print('Tables to check -\t', table_names)


# @pytest.mark.active
@pytest.mark.parametrize(
    'id, remark',
    [
        ('ru', 'Общий русский.'),
        ('en', 'General english.')])
def test_locales(id, remark, _engine, table_name='locales_global'):
    '''
    Test checks role table contents.
    '''
    meta = MetaData()
    table = Table(table_name, meta, autoload=True, autoload_with=_engine)

    stmt = select([table]).where(table.columns.id == id)

    with _engine.connect() as conn:
        result = conn.execute(stmt).fetchone()

    assert result[1] == remark
