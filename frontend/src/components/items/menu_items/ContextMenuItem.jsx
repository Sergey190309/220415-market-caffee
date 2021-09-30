import React, {
// Fragment
} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Menu
  // Icon
  // Grid, Button
} from 'semantic-ui-react'

import {
  useMousePosition
} from '../../../utils/useMousePosition'

const StyledContextMenuItem = styled(Menu.Item)`
  /* margin: .1em 0em !important;
  text-align: left !important; */
`
// export const IconContent = ({ icon, content }) => (
// <Fragment>
//   <span style={{ marginLeft: '.5em' }}>{content}</span>
//   <span><Icon {...icon} /></span>
// </Fragment>
// <Grid>
//   <Grid.Column
//       width={2}
//       textAlign='right'
//       verticalAlign='middle'
//   >
//     <Icon {...icon} />
//   </Grid.Column>
//   <Grid.Column
//       width={14}
//       textAlign='left'
//       verticalAlign='middle'
//       // style={{ backgroundColor: 'green' }}
//     >
//       {content}
//     </Grid.Column>
// </Grid>
// )

// IconContent.defaultProps = {
//   icon: {},
//   content: ''
// }

// IconContent.propTypes = {
//   icon: PropTypes.object.isRequired,
//   content: PropTypes.string.isRequired
// }

export const ContextMenuItem = ({
  name, icon, content, disabled, onClick, onHover, setContext
}) => {
  // console.log('ContextMenuItem:\n name ->', name)
  const mousePosition = useMousePosition()

  const context = {
    getBoundingClientRect: () => ({
      left: mousePosition.x,
      top: mousePosition.y,
      right: mousePosition.x + 1,
      bottom: mousePosition.y + 1,

      height: 0,
      width: 0
    })
  }

  return (
    <StyledContextMenuItem
      // fitted='horizontally'
      name={name}
      icon={icon}
      disabled={disabled}
      onClick={onClick}
      content={content}
      onMouseEnter={() => {
        // console.log('ContextMenuItem:\n onMouseEnter',
        //   '\n  name ->', name,
        //   '\n  mousePosition ->', mousePosition
        // )
        onHover(context)
      }}
      onMouseLeave={() => {
        console.log('ContextMenuItem:\n onMouseLeave\n  name ->', name)
        onHover({})
      }}
    />
    // </StyledContextMenuItem>
  )
}

ContextMenuItem.defaultProps = {
  name: '',
  icon: {},
  content: '',
  disabled: false,
  onClick: () => { },
  onHover: () => { },
  setContext: () => { }
}

ContextMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  setContext: PropTypes.func.isRequired
}

// export default ContextMenuItem
