import pytest


@pytest.fixture(params=['en', 'ru'])
def fixture1(request):
    return request.param


def test_foobar(fixture1):
    print()
    print(fixture1)
    # assert type(fixture1) == type(fixture2)
