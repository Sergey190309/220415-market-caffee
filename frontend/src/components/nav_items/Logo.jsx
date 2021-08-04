import React from 'react'

import { Image } from 'semantic-ui-react'
// import logo from '../../../assets/images/logo.png'

const Logo = () => {
  // const Logo = ({ color, inverted }) => {
  const src = '../../../assets/images/logo.png'

  // console.log(color)
  return (
      <Image
        src={src}
        // inverted
        size='tiny'
        // color={color}
      />
  )
}

export default Logo
