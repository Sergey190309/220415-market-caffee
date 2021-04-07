import React, { useState } from 'react';
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

export const Language = ({ onChange, setLngAction }) => {
  const [active, setActive] = useState(i18next.language);
  const [available] = useState(
    i18next.options.supportedLngs.filter(value => value !== 'cimode')
  );

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
  onChange: onChange,
  setLngAction: setLngAction,
};

Language.propTypes = {
  onChange: PropTypes.func.isRequired,
  setLngAction: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   locales: state.availableLocales,
// });

export default connect(null, { setLngAction })(Language);
