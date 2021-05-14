import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Dropdown } from 'semantic-ui-react';
import { axiosCommonLng } from '../../api/apiClient';

import { setLngAction } from '../../redux/actions/lng';

const onChange = (value, setActive) => {
  setActive(value);
  i18next.changeLanguage(value);
};

export const Language = ({ loading, onChange, setLngAction }) => {
  const [active, setActive] = useState(i18next.language);
  const [available, setAvailable] = useState([]);

  // console.log('Language, loading ->', loading)

  useEffect(() => {
    // console.log('Language, useEffect, loading ->', loading)
    if (!loading) {
        // setAvailable(i18next.options.supportedLngs);
        setAvailable(i18next.options.supportedLngs.filter(value => value !== 'cimode'));
      }
    }, [loading]);

  let localeOptions = [];
  available.forEach(lang => {
    localeOptions.push({
      key: lang,
      value: lang,
      flag: lang === 'en' ? 'uk' : lang,
    });
  });

  const _onChange = (evt, { value }) => {
    evt.preventDefault();
    // console.log(value);
    // lngSwitch(value);
    axiosCommonLng(value);
    setLngAction(value);
    // setAvailable(i18next.options.supportedLngs.filter(value => value !== 'cimode'));
    onChange(value, setActive);
  };

  return (
    <Dropdown
      name='langSwitcher'
      floating
      button
      placeholder='Select language'
      options={localeOptions}
      onChange={_onChange}
      value={active}
    />
  );
};

Language.defaultProps = {
  loading: true,
  onChange: onChange,
  setLngAction: setLngAction,
};

Language.propTypes = {
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  setLngAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.logIn.loading,
});

export default connect(mapStateToProps, { setLngAction })(Language);
