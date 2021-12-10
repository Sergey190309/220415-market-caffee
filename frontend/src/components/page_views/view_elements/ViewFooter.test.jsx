import React from 'react'
import { render, screen } from '../../../testUtils'

import ViewFooter from './ViewFooter'

import { useSaga, mockSagaDispatch }
  from '../../../redux/saga/content/createIO'
import { CONTENT_REQUESTED } from '../../../redux/constants/types'

jest.mock('../../../redux/saga/content/createIO')

describe('ViewFooter testing', () => {
  const testProps = {
    recordsId: 'mockRecordId',
    viewName: 'mockViewName',
    lng: 'mockLng',
    initState: {
      title: 'mockTitle',
      content: 'mockContent'
    }
  }

  test('it should render (snapshot) and call saga', () => {
    const result = render(<ViewFooter {...testProps} />)
    expect(result).toMatchSnapshot()
    expect(mockSagaDispatch).toHaveBeenCalledTimes(1)
    expect(mockSagaDispatch).toHaveBeenCalledWith({
      type: CONTENT_REQUESTED,
      payload: {
        identity: testProps.recordsId,
        view_id: testProps.viewName
      }
    })
  })

  test('it should render with correct text)', () => {
    render(<ViewFooter {...testProps} />)
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
