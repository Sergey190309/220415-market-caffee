import pytest


@pytest.fixture
def url_components(root_url):
    # def _method(user_id=None):
    return root_url + '/components'
    # return _method


@pytest.fixture
def component_create_json():
    return {
        'identity': 'button_general_ok',
        'locale_id': 'ru',
        'title': 'Хорошо!',
        'content': 'Вообще-то это аналог кнопки Ok'
    }


# @pytest.mark.active
def test_users_post(test_client, url_components, component_create_json):
    _component_create_json_01 = component_create_json.copy()
    # print(_component_create_json_01)
    resp = test_client.post(url_components, json=_component_create_json_01)
    # assert resp.status_code == 200
    print(resp.status_code)
    # for key in component_create_json:
    #     assert key in resp.json['payload'].keys()
    #     assert resp.json['payload'][key] == component_create_json[key]
    # print(key, '\t', component_create_json[key])


# @pytest.mark.active
def test_users_get(test_client, url_components):
    resp = test_client.get(url_components)
    print()
    print(resp.status_code)
    print(resp.json)
