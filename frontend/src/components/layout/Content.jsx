import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Alert from './Alert'
import Landing from '../page_views/landing/Landing'
import Pictures from '../page_views/pictures/Pictures'
import PriceList from '../page_views/priceList/PriceList'
import Private from '../page_views/usersOnly/Private'
import Admin from '../page_views/admin/Admin'

// import ModalLogIn from '../auth/ModalLogIn'

const Content = () => {
  return (
    <Fragment>
      <Container><Alert /></Container>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/pricelist' exact component={PriceList} />
        <Route path='/pictures' exact component={Pictures} />
        <Route path='/private' exact component={Private} />
        <Route path='/admin' exact component={Admin} />
      </Switch>
    </Fragment>
  )
}

export default Content
