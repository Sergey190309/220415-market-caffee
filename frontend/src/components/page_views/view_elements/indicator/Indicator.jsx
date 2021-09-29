import React from 'react'
import PropTypes from 'prop-types'
import { Popup } from 'semantic-ui-react'

const Indicator = ({
  isOpened, context, header, content, setIndicatorOpened
}) => {
  return (
    <Popup
      data-testid='Popup'
      hoverable
      context={context}
      open={isOpened}
      header={header}
      content={content}
      onClose={() => {
        // setOpened(false)
        setIndicatorOpened(false)
      }}
    />
  )
}

Indicator.defaultProps = {
  isOpened: false,
  context: {},
  header: '',
  content: '',
  setIndicatorOpened: () => { }
}

Indicator.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  setIndicatorOpened: PropTypes.func.isRequired
}
export default Indicator
