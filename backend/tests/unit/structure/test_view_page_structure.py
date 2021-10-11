import pytest

from application.structure.models.view_page_structure import (
    UpperLevelElement, ViewPageStructure)


@pytest.mark.active
def test_UpperLevelElement_init():
    '''It tests correct keys are workable only.'''
    raw_data = {
        "qnt": 7,
        "name": "hblock00",
        "type": "hblock",
        "subtype": "pix"
    }
    '''success'''
    upper_level_element = UpperLevelElement(raw_data)
    common_items = upper_level_element.__dict__.items() & \
        raw_data.items()
    assert len(
        upper_level_element.__dict__) == len(
            raw_data) == len(common_items)
    '''wrong keys'''
    # for k in raw_data.keys():
    #     wrong_raw_data = {**raw_data}
    #     wrong_raw_data.pop(k)
    #     wrong_raw_data[f'_{k}'] = raw_data.get(k)
    #     upper_level_element = UpperLevelElement(wrong_raw_data)

    #     print('\ntest_view_page_structure:',
    #           '\n test_UpperLevelElement_init',
    #           '\n  upper_level_element ->', upper_level_element.__dict__,
    #           '\n  wrong_raw_data ->', wrong_raw_data,
    #           '\n  common_items ->', common_items
    #           )
    '''wrong type'''
    '''wrong subtype'''


# @pytest.mark.active
def test_UpperLevelElement():
    upper_level_element_00 = UpperLevelElement({
        "qnt": 7,
        "name": "hblock00",
        "type": "hblock",
        "subtype": "pix"
    })
    upper_level_element_01 = UpperLevelElement({
        "qnt": 5,
        "name": "vblock00",
        "type": "vblock",
        "subtype": "txt"
    })

    print('\ntest_view_page_structure:\n test_UpperLevelElement',
          '\n  upper_level_element ->', upper_level_element_00.__dict__)
    print('\ntest_view_page_structure:\n test_UpperLevelElement',
          '\n  upper_level_element ->', upper_level_element_01.__dict__)

    view_page_structure = ViewPageStructure({
        '00': upper_level_element_00,
        '01': upper_level_element_01,
    })

    print(view_page_structure.__dict__)
