import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Dropdown } from 'semantic-ui-react';
import { axiosCommonLng } from '../../api/apiClient';

import { lngSelector, techSelector, lngSwitch } from '../../redux/slices';
// import { setLngAction } from '../../redux/actions/lng';

const onChange = (value, setActiveLng, dispatch) => {
  // console.log('Lanaguage component, onChange, value ->', value);
  i18next.changeLanguage(value); // Set language in i18next.
  axiosCommonLng(value); // Set language for API calls in request header.
  setActiveLng(value); // Set this component's state.
  dispatch(lngSwitch(value)); // Change language in state.
};

export const Language = ({ onChange }) => {
  const [activeLng, setActiveLng] = useState(i18next.language); // Active language
  const [availableLngs, setAvailableLngs] = useState([]); // availableLngs languages
  const dispatch = useDispatch();
  // const {lng} = useSelector(lngSelector)
  const { loaded } = useSelector(techSelector);

  useEffect(() => {
    if (loaded) {
      setAvailableLngs(i18next.options.supportedLngs.filter(value => value !== 'cimode'));
      setActiveLng(i18next.language);
    }
  }, [loaded]);

  let localeOptions = [];

  availableLngs.forEach(lang => {
    localeOptions.push({
      key: lang,
      value: lang,
      flag: lang === 'en' ? 'uk' : lang,
    });
  });

  const _onChange = (evt, { value }) => {
    evt.preventDefault();
    onChange(value, setActiveLng, dispatch);
  };

  return (
    <Dropdown
      name='langSwitcher'
      floating
      button
      placeholder='Select language'
      options={localeOptions}
      onChange={_onChange}
      value={activeLng}
    />
  );
};

Language.defaultProps = {
  onChange: onChange,
};

Language.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Language;
