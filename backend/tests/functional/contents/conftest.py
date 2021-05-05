import pytest

# from application.contents.local_init_data_contents import contents_constants
from application.global_init_data import global_constants


# @pytest.fixture(params=['main'])
@pytest.fixture(params=[item['view_id'] for item in global_constants.get_VIEWS])
def allowed_view(request):
    return request.param
