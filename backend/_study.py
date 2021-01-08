import pytest


def pytest_generate_tests(metafunc):
    if "fixture1" in metafunc.fixturenames:
        metafunc.parametrize("fixture1", ["one", "uno"])
    if "fixture2" in metafunc.fixturenames:
        metafunc.parametrize("fixture2", ["two", "duo"])


def test_foobar(fixture1, fixture2):
    assert type(fixture1) == type(fixture2)
