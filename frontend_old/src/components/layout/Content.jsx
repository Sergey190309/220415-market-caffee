import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Container, Sticky } from 'semantic-ui-react'

import Alert from './Alert'
import Landing from '../page_views/landing/Landing'
import Pictures from '../page_views/pictures/Pictures'
import PriceList from '../page_views/priceList/PriceList'
import Private from '../page_views/usersOnly/Private'
import Admin from '../page_views/admin/Admin'

// import ModalLogIn from '../auth/ModalLogIn'

const Content = ({ context }) => {
  return (
    <Fragment>
      <Container>
        <Sticky context={context}>
          <Alert />
        </Sticky>
      </Container>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='pricelist' exact element={<PriceList />} />
        <Route path='pictures' exact element={<Pictures />} />
        <Route path='private' exact element={<Private />} />
        <Route path='admin' exact element={<Admin />} />
      </Routes>
    </Fragment>
  )
}

Content.defaultProps = {
  context: {}
}

Content.propTypes = {
  context: PropTypes.object.isRequired
}

export default Content
