import React from 'react';
import { shallow } from 'enzyme';
import PriceList from '../../../../components/content/price_list/PriceList';

describe('Price list testing', () => {
  test('Snapshot', () => {
    expect(shallow(<PriceList />)).toMatchSnapshot();
  });
})
