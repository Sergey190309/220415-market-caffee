import React from 'react'

import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

// import store from './redux/store'

export const testRender = (jsx, { store, ...otherOpts }) => {
  return render(
    <Provider store={store}>
      {jsx}
    </Provider>,
    otherOpts
  )
}
// export function testRender (jsx, { store, ...otherOpts }) {
//   return render(<Provider store={store}>{jsx}</Provider>, otherOpts)
// }
