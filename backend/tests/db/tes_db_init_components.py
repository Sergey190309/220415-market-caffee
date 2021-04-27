import pytest

from sqlalchemy import MetaData, Table, select


# @pytest.mark.active
@pytest.mark.parametrize(
    'id_kind, description',
    [('button', 'That is common button that can be detailed in component class.')])
def test_component_kinds(client,
                         id_kind, description,
                         _engine, table_name='component_kinds'):
    '''
    Test checks role table contents.
    '''
    meta = MetaData()
    table = Table(table_name, meta, autoload=True, autoload_with=_engine)

    stmt = select([table]).where(table.columns.id_kind == id_kind)

    with _engine.connect() as conn:
        result = conn.execute(stmt).fetchone()

    assert result[0] == id_kind
    assert result[1] == description

    # print('\n\nfucking results', result)
