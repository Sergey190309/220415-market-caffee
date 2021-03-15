import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Dropdown } from 'semantic-ui-react';
import { setLocaleWithFallback } from '../../redux/actions/i18n';

const onChange = (value, setActive, setLocaleWithFallback) => {
  setActive(value);
  setLocaleWithFallback(value);
};

export const Language = ({ locale, locales, onChange, setLocaleWithFallback }) => {
  const [active, setActive] = useState('');
  const [available, setAvailable] = useState([]);

  useEffect(() => {
    setActive(locale);
    setAvailable(locales);
    // console.log(locale)
  }, [locale, locales]);

  let localeOptions = [];
  available.forEach(lang => {
    localeOptions.push({
      key: lang,
      text: lang,
      value: lang,
      flag: lang === 'en' ? 'uk' : lang,
    });
  });

  const _onChange = (evt, { value }) => {
    evt.preventDefault();
    // console.log(value);
    onChange(value, setActive, setLocaleWithFallback);
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
  setLocaleWithFallback: () => {},
};

Language.propTypes = {
  locale: PropTypes.string.isRequired,
  locales: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  setLocaleWithFallback: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  locale: state.i18n.locale,
  locales: state.availableLocales,
});

export default connect(mapStateToProps, { setLocaleWithFallback })(Language);
