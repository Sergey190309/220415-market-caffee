import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';

import { Button } from 'semantic-ui-react';

// const title =(t)=> { t('logIn') }

const LogInOut = ({ title }) => {
  // const { t } = useTranslation;
  return <Button>{title}</Button>;
};

LogInOut.defaultProps = {
  title: 'button',
};

LogInOut.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LogInOut;
