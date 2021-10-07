import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Popup } from 'semantic-ui-react'

import { LandingContext } from '../../../../context'

const Indicator = ({
  isOpened, context,
  content, setIndicatorOpened
}) => {
  const { componentName: viewName } = useContext(LandingContext)
  return (
    <Popup
      data-testid='Popup'
      hoverable
      context={context}
      open={isOpened}
      header={viewName}
      content={content}
      onClose={() => {
        setIndicatorOpened(false)
      }}
    />
  )
}

Indicator.defaultProps = {
  isOpened: false,
  context: {},
  content: '',
  setIndicatorOpened: () => { }
}

Indicator.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  setIndicatorOpened: PropTypes.func.isRequired
}
export default Indicator
