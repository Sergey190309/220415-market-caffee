import React from 'react'

import { render, screen } from '../../../testUtils'

import ViewHeader from './ViewHeader'
// import { render } from '@testing-library/react';
import { useSaga, mockSagaDispatch }
  from '../../../redux/saga/content/createIO'
import { CONTENT_REQUESTED } from '../../../redux/constants/types'

jest.mock('../../../redux/saga/content/createIO')
// jest.mock('../../../redux/saga/content/createIO', () => ({
//   mockSagaDispatch: jest.fn()
// }))

describe('View header testing', () => {
  const testProps = {
    recordsId: 'mockRecordsId',
    viewName: 'mockViewName',
    lng: 'mockLng',
    initState: {
      title: 'mockTitle',
      content: 'mockContent'
    }
  }
  test('it should render (snapshot) and call saga', async () => {
    // const mockSagaDispatch = useSaga()[1]
    const result = render(<ViewHeader {...testProps} />)
    expect(result).toMatchSnapshot()
    // mockSagaDispatch('fuck')
    expect(mockSagaDispatch).toHaveBeenCalledTimes(1)
    expect(mockSagaDispatch).toHaveBeenCalledWith({
      type: CONTENT_REQUESTED,
      payload: {
        identity: testProps.recordsId,
        view_id: testProps.viewName
      }
    })
    // console.log('ViewHeader.test\n it should render',
    //   '\n  mockSagaDispatch calls ->', mockSagaDispatch.mock.calls[0][0])
    // screen.debug()
  })

  test('it should render with correct text)', () => {
    render(<ViewHeader {...testProps} />)
    const mockState = useSaga()[0]
    const message = screen.getByTestId('Message')
    // console.log('ViewHeader.test\n it should render',
    //   '\n  mockState ->', mockState,
    //   '\n  message.children ->', message.children[0].children.length)
    const elements = message.children[0].children
    expect(elements[0]).toHaveTextContent(mockState.title)
    expect(elements[1]).toHaveTextContent(mockState.content)
    // screen.debug(elements[0])
    // screen.debug(elements[1])
  })
})
