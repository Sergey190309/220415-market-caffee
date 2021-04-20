import pytest

from application.contents.local_init_data_contents import contents_constants


# @pytest.fixture(params=['main'])
@pytest.fixture(params=[item['id_view'] for item in contents_constants.get_VIEWS])
def allowed_view(request):
    return request.param
