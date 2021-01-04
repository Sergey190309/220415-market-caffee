import pytest

from sqlalchemy import MetaData, Table, select


# @pytest.mark.active
@pytest.mark.parametrize(
    'id, remark',
    [
        ('user', 'Registered user after confirmation.'),
        ('power_user', 'By admin decision.'),
        ('admin', 'By owners decision.')])
def test_roles(
    id, remark,
    _engine, table_name='roles'
):
    '''
    Test checks role table contents.
    '''
    meta = MetaData()
    table = Table(table_name, meta, autoload=True, autoload_with=_engine)

    stmt = select([table]).where(table.columns.id == id)

    with _engine.connect() as conn:
        result = conn.execute(stmt).fetchone()

    assert result[0] == id
    assert result[1] == remark
