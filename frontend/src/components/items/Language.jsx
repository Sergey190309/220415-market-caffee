import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Dropdown } from 'semantic-ui-react';
import { axiosCommonLng } from '../../api/apiClient';

import { techSelector, lngSelector, lngSwitch } from '../../redux/slices';
// import { setLngAction } from '../../redux/actions/lng';

export const onChange = (value, setActiveLng, dispatch) => {
  // console.log('Lanaguage component, onChange, value ->', value);
  i18next.changeLanguage(value); // Set language in i18next.
  axiosCommonLng(value); // Set language for API calls in request header.
  setActiveLng(value); // Set this component's state.
  dispatch(lngSwitch(value)); // Change language in application state state.
};

export const Language = ({ onChange }) => {
  const [activeLng, setActiveLng] = useState(i18next.language); // Active language
  const [availableLngs, setAvailableLngs] = useState([]); // availableLngs languages
  const dispatch = useDispatch();
  const { loaded } = useSelector(techSelector);
  const { lng } = useSelector(lngSelector);

  useEffect(() => {
    if (loaded) {
      // console.log('component, Languages, eseEffect(loaded), i18next.languages ->', i18next.languages)
      setAvailableLngs(
        i18next.languages.map(lng => ({
          key: lng,
          value: lng,
          flag: lng === 'en' ? 'uk' : lng,
        }))
      );
      setActiveLng(i18next.language);
    }
  }, [loaded]);

  useEffect(() => {
    if (lng !== activeLng) {
      setActiveLng(lng);
    }
  }, [activeLng, lng]);

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
      options={availableLngs}
      // options={localeOptions}
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
