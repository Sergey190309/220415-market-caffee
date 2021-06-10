import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// export const Alert = ({alerts}) => {
export const Alert = ({ alerts }) => {
  let color;
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => {
      // console.log('Alert components, alertType ->', alert.alertType)
      switch (alert.alertType) {
        case 'error':
          color = 'orange';
          break;
        case 'info':
          color = 'teal';
          break;
        default:
          break;
      }
      return (
        <Segment color={color} key={alert.id}>
          <Header as='h5' color={color} content={alert.message} icon='hand point right outline' />

        </Segment>
      );
    })
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alert);
