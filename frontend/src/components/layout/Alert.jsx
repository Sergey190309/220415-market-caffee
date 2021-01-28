import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";


// export const Alert = ({alerts}) => {
export const Alert = (props) => {
  console.log('Alert component', props)
  return (
    props.alerts !== null &&
    props.alerts.length > 0 &&
    props.alerts.map((alert) => (
        <Segment color={alert.alertType === "error"? 'red': null} inverted key={alert.id}>
          <Icon name='hand point right outline' />
          {alert.message}
        </Segment>
    ))
  )
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  console.log('mapStateToProps', state)
  return ({
  alerts: state.alert
  // alerts: state.info.alert
})};

export default connect(mapStateToProps)(Alert);
