import pytest

from sqlalchemy import MetaData, Table, select

from application.global_init_data import global_constants

'''
I've disable the test couse I refused from idea to initiate
structures automaticallyself.
Use backup restore instead.
'''

# @pytest.mark.parametrize(
#     'id, remark',
#     [
#         ('user', 'Registered user after confirmation.'),
#         ('power_user', 'By admin decision.'),
#         ('admin', 'By owners decision.')])
@pytest.mark.active
def test_structures(
    # id, remark,
    _engine, table_name='structure'
):
    '''
    Test checks structure table contents.
    '''
    meta = MetaData()
    table = Table(table_name, meta, autoload=True, autoload_with=_engine)

    stmt = select([table])
    # stmt = select([table]).where(table.columns.id == id)

    with _engine.connect() as conn:
        result = conn.execute(stmt).fetchall()
    assert len(result) == 10
    # print('\ntest_structures, view keys ->', global_constants.get_VIEWS_PKS)

    for item in result:
        assert item.view_id in global_constants.get_VIEWS_PKS
        assert item.locale_id in global_constants.get_PKS
        # print('\ntest_structures, item ->', item.view_id)

    # assert result[0] == id
    # assert result[1] == remark
