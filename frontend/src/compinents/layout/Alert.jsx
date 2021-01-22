import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
      <Segment color={alert.alertType === "error"? 'red': null} inverted key={alert.id}>
        <Icon name='hand point right outline' />
        {alert.message}
      </Segment>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
