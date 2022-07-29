import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reactRedux'
import PropTypes from 'prop-types'
import { Box, FormControlLabel, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next'


import { authSelector, deviceSelector, setEditable } from '../../redux/slices'
import * as CL from '../../constants/colors'

const Greeting = () => {
  const { t } = useTranslation('general')

  const { isLoggedIn, isAdmin, user_name } = useAppSelector(authSelector)
  const { editable } = useAppSelector(deviceSelector)
  // console.log('editable ->', editable)

  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    // console.log('onClickHandler')
    dispatch(setEditable(!editable))
  }

  return (
    <Box
      sx={{
        // bgcolor: 'blue',
        display: (isLoggedIn ? 'flex' : 'none'),
        alignItems: 'center',
        mr: '1rem',
        color: 'text.primary',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          // bgcolor: 'red'
        }}
      >
        {`${t('greeting')} ${user_name}`}
      </Box>
      {isAdmin ?
        <FormControlLabel
          sx={{
            borderRadius: '50%',
            ml: '1rem',
            pr: '.5rem',
            "&:hover": {
              transition: '.3s all ease-in-out',
              bgcolor: CL.navBarBackgroundHovered
            }
          }}
          control={<Switch onClick={onClickHandler} checked={editable} />} label={t('editable')}
        /> : null}
    </Box>
  )
}

Greeting.defaultProps = {}
Greeting.propTypes = {}

export default Greeting