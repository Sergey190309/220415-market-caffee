import React, { lazy } from 'react'
// import PropTypes from 'prop-types'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'

// import AdminView from './admin/AdminView'
// import LandingView from './landing/LandingView'
// import PicturesView from './pictures/PicturesView'
// import PriceListView from './priceList/PriceListView'
// import UsersOnlyView from './usersOnly/UsersOnlyView'

const AdminView = lazy(() => import('./admin/AdminView'))
const LandingView = lazy(() => import('./landing/LandingView'))
const PicturesView = lazy(() => import('./pictures/PicturesView'))
const PriceListView = lazy(() => import('./priceList/PriceListView'))
const UsersOnlyView = lazy(() => import('./usersOnly/UsersOnlyView'))


const PageContainer = () => {
  return (
    <Box data-testid='page-container'>
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

PageContainer.defaultProps = {}
PageContainer.propTypes = {}

export default PageContainer