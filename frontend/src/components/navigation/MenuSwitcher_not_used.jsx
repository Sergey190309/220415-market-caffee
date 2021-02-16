import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const MenuSwitcher = ({layout}) => {
  return <div>{layout.deviceSize === 'small' ? <SideBar /> : <NavBar />}</div>;
};

MenuSwitcher.propTypes = {
  layout: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  layout: state.layout,
});

export default connect(mapStateToProps)(MenuSwitcher);
