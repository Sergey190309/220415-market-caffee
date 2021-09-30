import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import i18next from 'i18next'

import { Dropdown } from 'semantic-ui-react'
import { setAxiosCommonLng } from '../../api/apiClient'

import {
  techSelector, lngSelector, lngSwitch,
  structureStart
} from '../../redux/slices'
// import SaveToBackendContextMenu from '../items/SaveToBackendContextMenu'
// import { createContextFromEvent } from '../../utils/createContextFromEvent'
// import { setLngAction } from '../../redux/actions/lng';

export const onChange = (value, setActiveLng, dispatch, _i18next = i18next) => {
  // console.log('Lanaguage component, onChange, value ->', value);
  _i18next.changeLanguage(value) // Set language in i18next.
  setAxiosCommonLng(value) // Set language for API calls in request header.
  setActiveLng(value) // Set this component's state.
  dispatch(lngSwitch(value)) // Change language in application state state.
  dispatch(structureStart()) // load application structure for different language.
}

export const Language = ({ disabled, onChange, i18next }) => {
  const [activeLng, setActiveLng] = useState(i18next.language) // Active language
  const [availableLngs, setAvailableLngs] = useState([]) // availableLngs languages
  // const [saveContextMenuOpened, setSaveContextMenuOpened] = useState(false)

  // const refContext = useRef(null)

  const dispatch = useDispatch()

  const { loaded } = useSelector(techSelector)
  const { lng } = useSelector(lngSelector)
  // const { kind } = useSelector(backendUpdateSelector)

  // console.log('component, Language, i18next.language ->', i18next.language)

  useEffect(() => {
    if (loaded) {
      // console.log('component, Languages, eseEffect(loaded), i18next.languages ->', i18next.languages)
      setAvailableLngs(
        i18next.languages.map(lng => ({
          key: lng,
          value: lng,
          // text: lng,
          flag: lng === 'en' ? 'uk' : lng
        }))
      )
      setActiveLng(i18next.language)
    }
  }, [loaded])
  // }, [loaded, i18next])

  useEffect(() => {
    if (lng !== activeLng) {
      setActiveLng(lng) // caried out once when initiated with lng 'ru'
    }
  }, [activeLng, lng])

  const _onChange = (event, { value }) => {
    event.preventDefault()
    // if (kind !== '') {
    //   refContext.current = createContextFromEvent(event)
    //   setSaveContextMenuOpened(true)
    // }
    // console.log('Language:\n _onChange\n  activeLng ->', activeLng)

    onChange(value, setActiveLng, dispatch)
  }
  // console.log('component, Language, activeLng ->', activeLng)
  const dropdown = () => (
    <Dropdown
      data-testid='dropdown'
      disabled={disabled}
      name='langSwitcher'
      floating
      button
      defaultOpen={false}
      placeholder='langSwitcher'
      options={availableLngs}
      onChange={_onChange}
      value={activeLng}
    />
  )

  return (
    <Fragment>
      {dropdown()}
    </Fragment>
  )
}

Language.defaultProps = {
  disabled: false,
  onChange: onChange,
  i18next: i18next
}

Language.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  i18next: PropTypes.object.isRequired
}

export default Language
