import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Dropdown } from 'semantic-ui-react';
import { axiosCommonPostLng } from '../../api/apiClient';


// import { lngSwitch } from '../../api/calls/lngSwitch';

const onChange = (value, setActive) => {
  setActive(value);
  i18next.changeLanguage(value);
};

export const Language = ({ onChange }) => {
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
    axiosCommonPostLng(value)
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
  locale: '',
  locales: [],
  onChange: onChange,
};

Language.propTypes = {
  locale: PropTypes.string.isRequired,
  locales: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  locales: state.availableLocales,
});

export default connect(mapStateToProps)(Language);
