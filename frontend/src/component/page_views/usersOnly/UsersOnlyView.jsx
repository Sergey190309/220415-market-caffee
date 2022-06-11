import React from 'react'
import { PageViewDiv, PageViewH1} from '../styles/PageView.styles'


const UsersOnlyView = () => {
  return (
    <PageViewDiv>
      <PageViewH1
        className="animate__animated animate__fadeInDown"
      >
        UsersOnlyView
      </PageViewH1>
    </PageViewDiv>
  )
}

export default UsersOnlyView