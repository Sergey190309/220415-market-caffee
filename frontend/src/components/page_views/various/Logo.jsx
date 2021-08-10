import React from 'react'
// import PropTypes from 'prop-types'

// import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react'
// import logo from '../../../assets/images/logo.png'
import logo from '../../../assets/images/logo.png'

const Logo = () => {
  // const Logo = ({ color, inverted }) => {
  // console.log(color)
  return (
    <div>
      <Image src={logo} alt='logo' size='mini' verticalAlign='middle' centered />
    </div>
  )
}

// Logo.propTypes = {
//   color: PropTypes.string.isRequired,
//   inverted: PropTypes.bool.isRequired
// }

export default Logo
