import React from 'react'
import { screen, waitFor } from '@testing-library/react'

import { renderWithRouterAndProviders } from '../../utils/testUtils'

import PageContainer from './PageContainer'

describe('PageContainer', () => {
  test('snapshot', async () => {
    renderWithRouterAndProviders(<PageContainer />)
    let rootBox
    await waitFor(() => {
      rootBox = screen.getByTestId('page-container-root-box')
    })
    expect(rootBox).toMatchSnapshot();
  })
})
