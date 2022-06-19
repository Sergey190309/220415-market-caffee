import React from 'react'

import LanguageSwitcher from '../../general_items/language/LanguageSwitcher'
import UseRef from '../../study/UseRef'
import ClickOutside from '../../study/ClickOutside'

import { PageViewDiv, PageViewH1} from '../styles/PageView.styles'

const LandingView = () => {
  return (
    <PageViewDiv>
      <PageViewH1
        className="animate__animated animate__fadeInDown"
      >
        LandingView
      </PageViewH1>
      <LanguageSwitcher />
      {/* <UseRef />
      <ClickOutside /> */}
    </PageViewDiv>
  )
}

export default LandingView