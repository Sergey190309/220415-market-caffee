import React from 'react'
import PropTypes from 'prop-types'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'

import AdminView from './admin/AdminView'
import LandingView from './landing/LandingView'
import PicturesView from './pictures/PicturesView'
import PriceListView from './priceList/PriceListView'
import UsersOnlyView from './usersOnly/UsersOnlyView'


const PageContainer = () => {
  return (
    <Box>
      <Routes>
        <Route path='/' element={<LandingView />} />
        <Route path='/pricelist' exact element={<PriceListView />} />
        <Route path='/pictures' exact element={<PicturesView />} />
        <Route path='/private' exact element={<UsersOnlyView />} />
        <Route path='/admin' exact element={<AdminView />} />
      </Routes>
    </Box>
  )
}

PageContainer.defaultProps={}
PageContainer.propTypes = {}

export default PageContainer