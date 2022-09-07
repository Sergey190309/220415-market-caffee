import React from 'react'

import { useAppState, useAppEffect, useAppRef } from '../hooks/react'
import { useAppSelector } from '../hooks/reactRedux'
import { useAppNavigate } from '../hooks/reactRouterDom'

// import PropTypes from 'prop-types'

import { useTheme } from '@mui/material/styles'
import {
  Box, CssBaseline, Typography, IconButton, Toolbar, Drawer, Divider
} from '@mui/material'
import { FoodBankOutlined, MenuOutlined, ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'


import { Main, AppBar, DrawerHeader } from './navigation/styles/navigations.mui.styled'

import { GlobalStyle } from './styles/global.styled'
import * as SZ from '../constants/sizes'
import * as CL from '../constants/colors'

import LanguageSwitcher from './general_items/language/LanguageSwitcher'
import PageContainer from './page_views/PageContainer'
// import DrawerNavBar from './navigation/DrawerNavBar'
// import Message from './general_items/notifications/Message'
import { useOutsideClick } from '../hooks/useOutsideClick'
import Greeting from './navigation/Greeting'
import { lngSelector } from '../redux/slices'


const DrawerNavBar = React.lazy(() => import('./navigation/DrawerNavBar'))
const Message = React.lazy(() => import('./general_items/notifications/Message'))


const OutPut = () => {
  const [openedDrawer, setOpenedDrawer] = useAppState(false)
  const theme = useTheme()
  // console.log(useTranslation('general'))
  const { t, i18n } = useTranslation('general')

  const { lng } = useAppSelector(lngSelector)

  const navigate = useAppNavigate()
  const toLanding = () => { navigate('/') }

  useAppEffect(() => {
    if (lng !== i18n.language) {
      // console.log('lng ->', lng, '\ni18n.language ->', i18n.language,
      //   '\ni18next.changeLanguage ->', i18next.changeLanguage)
      i18next.changeLanguage(lng)
    }
  }, [])


  const setDrawerOpened = () => {
    setOpenedDrawer(true)
  }

  const setDrawerClosed = () => {
    setOpenedDrawer(false)
  }

  const drawerRef = useAppRef(null)

  const outsideClickHandle = () => {
    if (openedDrawer) {
      // console.log('clicing outside')
      setDrawerClosed()
    }
  }

  useOutsideClick(drawerRef, outsideClickHandle)

  // console.log('OutPut, render, lng ->', lng, '\n  i18n.lng ->', i18n.language)

  return (
    // <React.Suspense fallback={null}>
    <Box
      data-testid='root-box'
      sx={{
        display: 'flex'
      }}
    >
      <CssBaseline />
      <GlobalStyle />
      <AppBar
        position='fixed'
        open={openedDrawer}
        sx={{
          bgcolor: CL.navBarBackground
        }}
      // bgcolor='red'
      >
        <Toolbar>
          <IconButton
            id='to-landing-icon'
            data-testid='to-landing-icon'
            color='inherit'
            onClick={toLanding}
            sx={{
              color: 'text.primary',
              "&:hover": {
                transition: '.3s all ease-in-out',
                backgroundColor: CL.navBarBackgroundHovered
              }
            }}
            children={<FoodBankOutlined />}
          />
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: 'text.primary' }} component="div">
            {t('output.welcome')}
          </Typography>
          <Greeting />
          <IconButton
            id='open-drawer-icon'
            data-testid='open-drawer-icon'
            color='inherit'
            edge='end'
            onClick={setDrawerOpened}
            // onClick={ () => {
            //   console.log('open icon')
            //   setDrawerOpened()}
            // }
            sx={{
              ...(openedDrawer && { display: 'none' }),
              color: 'text.primary',
              "&:hover": {
                transition: '.3s all ease-in-out',
                backgroundColor: CL.navBarBackgroundHovered
              }
            }}
            children={<MenuOutlined />}
          />
        </Toolbar>
      </AppBar>
      <Main open={openedDrawer}>
        <DrawerHeader />
        <Message />
        <PageContainer />
      </Main>
      <div
        data-testid='outside-drawer'
        ref={drawerRef}>
        <Drawer
          data-testid='drawer'
          PaperProps={{
            sx: {
              bgcolor: CL.bodyBackground
            }
          }}
          sx={{
            // bgcolor: 'red',
            // color: 'red',
            width: SZ.drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: SZ.drawerWidth,
            },
          }}
          variant='persistent'
          anchor='right'
          open={openedDrawer}
        >
          <DrawerHeader sx={{ bgcolor: CL.navBarBackground }}>
            <IconButton
              data-testid='drawer-close-button'
              onClick={setDrawerClosed}
              // onClick={() => {
              //   console.log('close icon')
              //   setDrawerClosed()
              // }}
              sx={{
                color: 'text.primary',
                "&:hover": {
                  transition: '.3s all ease-in-out',
                  backgroundColor: CL.navBarBackgroundHovered
                }
              }}
            >
              {theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </DrawerHeader>
          <DrawerNavBar closeDrawer={setDrawerClosed} />
          <Divider />
          <LanguageSwitcher />
        </Drawer>
      </div>
    </Box >
    // </React.Suspense>
  )
}

OutPut.defaultProps = {}
OutPut.propTypes = {}

export default OutPut