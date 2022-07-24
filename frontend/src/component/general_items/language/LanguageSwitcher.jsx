import React from 'react'
// import { useAppSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useAppState, useAppEffect} from '../../../hooks/react'
import { useAppSelector, useAppDispatch} from '../../../hooks/reactRedux'

import { Menu, MenuList } from '@mui/material'
// import {Icon_Flag_RU, Icon_Flag_US} from 'material-ui-country-flags'
import i18next from 'i18next'
import Flag from 'react-world-flags'

import { techSelector, lngSelector, lngSwitch, structureStart } from '../../../redux/slices'
import { FixedButton } from '../../navigation/styles/navigations.styled'

import * as SZ from '../../../constants/sizes'
import * as CL from '../../../constants/colors'
import LanguageSwitcherItem from './LanguageSwitcherItem'
import { setAxiosCommonLng } from '../../../api/apiClient'

export const onChangeLng = (
  lng, setActiveLng, dispatch, _i18next = i18next) => {
  setActiveLng(lng) // Set this component's state.
  _i18next.changeLanguage(lng) // Set language in i18next.
  setAxiosCommonLng(lng) // Set language for API calls in request header.
  dispatch(lngSwitch(lng)) // Change language in application state state.
  dispatch(structureStart())
}

const LanguageSwitcher = ({ onChangeLng }) => {
  const [anchorEl, setAnchorEl] = useAppState(null)
  const [activeLng, setActiveLng] = useAppState(i18next.language)
  const [availableLngs, setAvailableLngs] = useAppState([])

  const opened = Boolean(anchorEl)

  const { i18nLoaded } = useAppSelector(techSelector)
  const { lng } = useAppSelector(lngSelector)

  const dispatch = useAppDispatch()

  useAppEffect(() => {
    // console.log('LanguageSwitcher>useEffect[loaded], i18nLoaded ->', i18nLoaded)
    if (i18nLoaded) {
      console.log('LanguageSwitcher>useEffect[loaded], i18next.language ->', i18next.language,
        '\n  i18next.languages ->', i18next.languages)
      setAvailableLngs(i18next.languages.map((language => {
        // console.log('while setting languages, language ->', language)
        return({
        key: language,
        value: language,
        flag: language === 'en' ? 'gb' : language
      })})))
      setActiveLng(i18next.language)
    }
  }, [i18nLoaded])


  useAppEffect(() => {
    console.log('LanguageSwitcher>useEffect[lng] lng ->', lng,
      '\n  activeLng ->', activeLng)
    if (lng !== activeLng) {
      setActiveLng(lng) // caried out once when initiated with lng 'ru'
    }
  }, [lng])


  const onClickHandler = event => {
    // console.log('LanguageSwittcher>onClickHandler')
    setAnchorEl(event.currentTarget)
  }

  const onCloseHandler = () => {
    setAnchorEl(null)
  }

  const onItemClickHandler = key => {
    // console.log('LanguageSwitcher>onItemClickHandler, key ->', key)
    if (key !== activeLng) {
      onChangeLng(key, setActiveLng, dispatch)
    }
    onCloseHandler()
  }

  // console.log('LanguageSwitcher, rendering, availableLngs ->', availableLngs,
  //   '\n  lng ->', lng)

  return (
    <>
      <FixedButton
        id='LanguageSwitcher'
        onClick={onClickHandler}
        vertical={{ side: 'top', value: '18%' }}
        horizontal={{ side: 'right', value: '3%' }}
      // size='small'
      // children={<ReactCountryFlag countryCode='RU'  />}
      // sx={{fontSize: '10px'}}
      >
        <Flag
          code={activeLng === 'en' ? 'gb' : activeLng}
          height={SZ.languageSwitcher}
        />
      </FixedButton>
      <Menu
        id='LanguageSwitcherMenu'
        anchorEl={anchorEl}
        open={opened}
        onClose={onCloseHandler}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuList
          sx={{
            color: 'primary.main',
            bgcolor: `${CL.mainContainerBackground}`,
            p: '.5rem',
            my: '-.5rem',
          }}
        >
          {availableLngs.map(lng => (
            <LanguageSwitcherItem
              {...lng}
              key={lng.key}
              onItemClickHandler={onItemClickHandler}
            />
          ))}
        </MenuList>
      </Menu>
    </>

  )
}

LanguageSwitcher.defaultProps = {
  onChangeLng
}

LanguageSwitcher.propTypes = {
  onChangeLng: PropTypes.func.isRequired
}

export default LanguageSwitcher