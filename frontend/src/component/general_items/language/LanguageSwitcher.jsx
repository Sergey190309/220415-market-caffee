import React from 'react'
import PropTypes from 'prop-types'
// import {Icon_Flag_RU, Icon_Flag_US} from 'material-ui-country-flags'
import Flag from 'react-world-flags'
import { FixedButton } from '../../navigation/styles/navigations.styled'

const LanguageSwitcher = () => {

  const onClickHandler = () => {
    console.log('LanguageSwitcher, onClickHandler ->')
  }

  return (
    <FixedButton
      id='LanguageSwitcher'
      onClick={onClickHandler}
      vertical={{ side: 'top', value: '15%' }}
      horizontal={{ side: 'right', value: '3%' }}
      // size='small'
      // children={<ReactCountryFlag countryCode='RU'  />}
      // sx={{fontSize: '10px'}}
    >
      <Flag code='gb' height={10} />
    </FixedButton>

  )
}

LanguageSwitcher.defaultProps = {
}


LanguageSwitcher.propTypes = {}

export default LanguageSwitcher