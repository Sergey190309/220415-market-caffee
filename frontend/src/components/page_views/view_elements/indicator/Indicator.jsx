import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Popup } from 'semantic-ui-react'

const Indicator = ({ isOpened, context, header, content }) => {
  const [opened, setOpened] = useState(isOpened)
  // useEffect(() => {
  //   let mounted = true
  //   if (mounted === true) {
  //     setOpened(isOpened)
  //   }
  //   return () => {
  //     mounted = false
  //   }
  // }, [isOpened])

  // useEffect(() => {
  //   setOpened(isOpened)
  // }, [isOpened])
  // console.log('components, page_view, view_elements, indicator, header ->', header)
  // console.log('components, page_view, view_elements, indicator, content ->', content)
  return (
    <Popup
      // disabled={false}
      position='right center'
      context={context}
      open={opened}
      header={header}
      content={content}
      onClose={() => {
        setOpened(false)
        // setIndicatorOpened(false)
      }}
    />
  )
}

Indicator.defaultProps = {
  isOpened: false,
  context: {},
  header: '',
  content: ''
}

Indicator.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}
export default Indicator
