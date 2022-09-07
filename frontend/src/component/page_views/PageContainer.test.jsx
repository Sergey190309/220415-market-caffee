import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouterAndProviders } from '../../utils/testUtils'

import PageContainer from './PageContainer'

describe('PageContainer', () => {
  test('appearance', async () => {
    renderWithRouterAndProviders(<PageContainer />)
    let rootBox
    await waitFor(() => {
      rootBox = screen.getByTestId('page-container-root-box')
    })
    screen.debug(rootBox)
  })
})
