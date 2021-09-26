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

export const ContextMenuItem = ({ name, icon, content, disabled, onClick }) => {
  // console.log('ContextMenuItem:\n name ->', name)
  return (
    <StyledContextMenuItem
      // fitted='horizontally'
      name={name}
      icon={icon}
      disabled={disabled}
      onClick={onClick}
      content={content}
    >
    </StyledContextMenuItem>
  )
}

ContextMenuItem.defaultProps = {
  name: '',
  icon: {},
  content: '',
  disabled: false,
  onClick: () => {}
}

ContextMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

// export default ContextMenuItem
