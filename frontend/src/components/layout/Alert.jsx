import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// export const Alert = ({alerts}) => {
export const Alert = ({ alerts }) => {
  console.log('alerts')
  console.log(alerts)
  return (
    <h1>alert</h1>
  //   alerts !== null &&
  //   alerts.length > 0 &&
  //   alerts.map(alert => (
  //     <Segment color={alert.alertType === 'error' ? 'red' : null} inverted key={alert.id}>
  //       <Icon name='hand point right outline' />
  //       {alert.message}
  //     </Segment>
  //   ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alert);
