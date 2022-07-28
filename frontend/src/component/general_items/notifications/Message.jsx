import React from 'react'
import { useAppSelector } from '../../../hooks/reactRedux'
// import PropTypes from 'prop-types'
import { Alert, AlertTitle } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { alertsSelector } from '../../../redux/slices'

const Message = () => {
  const { t } = useTranslation('messages')

  const { alerts } = useAppSelector(alertsSelector)

  // console.log('alerts ->', alerts)

  let alertTitle

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => {
      switch (alert.alertType) {
        case 'error':
          alertTitle = t('error')
          break
        case 'warning':
          alertTitle = t('warning')
          break
        case 'info':
          alertTitle = t('info')
          break
        case 'success':
          alertTitle = t('success')
          break
        default:
          break
      }
      return (
        <Alert
          severity={alert.alertType}
          variant='filled'
          key={alert.id}
        >
          <AlertTitle>
            {alertTitle}
          </AlertTitle>
          {alert.message}
        </Alert>
      )
    })
  )
}

Message.defaultProps = {}
Message.propTypes = {}

export default Message