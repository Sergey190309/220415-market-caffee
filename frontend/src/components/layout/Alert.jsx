import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { alertsSelector } from '../../redux/slices/alerts'
import { positiveColor, warningColor } from '../../utils/colors'

export const Alert = () => {
  const { alerts } = useSelector(alertsSelector)
  let color
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => {
      // console.log('Alert components, alert ->', alert);
      switch (alert.alertType) {
        case 'error':
          color = warningColor
          break
        case 'info':
          color = positiveColor
          break
        default:
          break
      }
      return (
        <Segment color={color} key={alert.id}>
          <Header
            as='h5'
            color={color}
            content={alert.message}
            icon='hand point right outline'
          />
        </Segment>
      )
    })
  )
}

export default Alert
