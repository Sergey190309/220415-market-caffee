import pytest

from werkzeug.datastructures import FileStorage


from application.images.utils.image_helper import (
    # save_image,
    get_path,
    # find_image_any_format,
    _retrieve_filename,
    #  is_filename_safe, get_basename, get_extention
)


@pytest.fixture
def file_storage():
    def _method(filename):
        _file_storage = FileStorage(filename=filename)
        return _file_storage
    return _method


# @pytest.mark.active
def tes_get_path():  # does not work
    _file_name = 'testing_file_name'
    _folder = 'test_folder'
    _result = get_path(filename=_file_name, folder=_folder)
    print('\nunit images test_helpears, _result ->', _result)


# @pytest.mark.active
def test_retrieve_filename(file_storage):
    _file_name = 'testing_file_name'
    assert _retrieve_filename(file=_file_name) == _file_name
    assert _retrieve_filename(file_storage(filename=_file_name)) == _file_name
    # _result =
