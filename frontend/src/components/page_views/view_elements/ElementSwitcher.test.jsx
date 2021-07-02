import React from 'react';
import { render } from '../../../testUtils';
import ElementSwitcher from './ElementSwitcher';
import { structure } from '../../page_views/landing/Landing.test';
import ViewHeader from './ViewHeader';
import ViewFooter from './ViewFooter';
import ViewVBlock from './ViewVBlock';
import ViewHBlock from './ViewHBlock';
import ViewNothing from './ViewNothing';

const MockViewHeader = ({ recordId, viewName, lng }) => <div data-testid='ViewHeader' />;
const MockViewFooter = ({ recordId, viewName, lng }) => <div data-testid='ViewFooter' />;
const MockViewVBlock = ({ recordId, viewName, lng }) => <div data-testid='ViewVBlock' />;
const MockViewHBlock = ({ recordId, viewName, lng }) => <div data-testid='ViewHBlock' />;
const MockViewNothing = ({ recordId, viewName, lng }) => (
  <div data-testid='ViewNothing' />
);

jest.mock('./ViewHeader', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('./ViewFooter', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('./ViewVBlock', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('./ViewHBlock', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('./ViewNothing', () => ({ __esModule: true, default: jest.fn() }));
// jest.mock('./ViewFooter');
// jest.mock('./ViewVBlock');
// jest.mock('./ViewHBlock');
// jest.mock('./ViewNothing');

describe('ElementSwitcher testing', () => {
  beforeEach(() => {
    ViewHeader.mockImplementation(MockViewHeader);
    ViewFooter.mockImplementation(MockViewFooter);
    ViewVBlock.mockImplementation(MockViewVBlock);
    ViewHBlock.mockImplementation(MockViewHBlock);
    ViewNothing.mockImplementation(MockViewNothing);
  });
  const testProps = {
    structure: { ...structure, '05': { type: 'wrongType' } },
    viewName: 'landing',
    lng: 'en',
  };
  test('it should exist and rendered (snapshot)', () => {
    const result = render(<ElementSwitcher {...testProps} />);
    expect(result).toMatchSnapshot();
    // screen.debug();
  });
  test('call children with appropriate props', () => {
    render(<ElementSwitcher {...testProps} />);
    expect(ViewHeader).toHaveBeenCalledTimes(1);
    expect(ViewFooter).toHaveBeenCalledTimes(1);
    expect(ViewVBlock).toHaveBeenCalledTimes(2);
    expect(ViewHBlock).toHaveBeenCalledTimes(1);
    expect(ViewNothing).toHaveBeenCalledTimes(1);

    // console.log('ElementSwitcher testing, ViewHeader ->', ViewHeader.mock.calls[0][0]);
    // ----------------------------------------------------------------------------------
    // recordId serialNumber_type_subType_subComponentQnt
    // ----------------------------------------------------------------------------------
    expect(ViewHeader.mock.calls[0][0]).toEqual({
      recordId: '00_header',
      viewName: testProps['viewName'],
      lng: testProps.lng,
    });
    expect(ViewVBlock.mock.calls[0][0]).toEqual({
      recordId: '01_vblock_txt_3',
      viewName: testProps['viewName'],
      lng: testProps.lng,
    });
    expect(ViewHBlock.mock.calls[0][0]).toEqual({
      recordId: '02_hblock_pix_2',
      viewName: testProps['viewName'],
      lng: testProps.lng,
    });
    expect(ViewVBlock.mock.calls[1][0]).toEqual({
      recordId: '03_vblock_pix_2',
      viewName: testProps['viewName'],
      lng: testProps.lng,
    });
    expect(ViewFooter.mock.calls[0][0]).toEqual({
      recordId: '04_footer',
      viewName: testProps['viewName'],
      lng: testProps.lng,
    });
    expect(ViewNothing.mock.calls[0][0]).toEqual({
      recordId: '05_wrongType',
      viewName: testProps['viewName'],
      lng: testProps.lng,
    });
  });
});
