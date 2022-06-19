import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react'
import PropTypes from 'prop-types'

import { FaTimes } from 'react-icons/fa'

import { useOutsideClick } from '../hooks/useOutsideClick'
import LanguageSwitcher from '../general_items/language/LanguageSwitcher'
import { NavBarDiv, NavBarLink, NavBarCloseIcon } from './styles/navigations.styled'


const NavBar = ({ visibility, setVisibility }) => {
  const [, setIsVisible] = useState(visibility)
  const componentRef = useRef(null)
  const navBarResultRef = useRef(null)


  const closeNavBar = useCallback(
    () => {
      setIsVisible(false)
      setVisibility(false)
      navBarResultRef.current = null
    }, [setVisibility]
  )

  useOutsideClick(componentRef, closeNavBar)


  const NavBarMemorized = useCallback(
    () => {
      let resultNavBar = null
      const onClickNavItemHandler = () => {
        closeNavBar()
        // console.log('NavBar>NavBarMemorized>onClickNavItemNakdler')
      }
      // console.log('NavBar>NavBarMemorized')
      resultNavBar =
        <NavBarDiv ref={componentRef}>

          <NavBarLink
            className="animate__animated animate__fadeInRight animate__faster"
            onClick={onClickNavItemHandler} to='/'
          >
            LandingView
          </NavBarLink>
          <NavBarLink
            className="animate__animated animate__fadeInRight animate__faster"
            onClick={onClickNavItemHandler} to='/pricelist'
          >
            PriceListView
          </NavBarLink>
          <NavBarLink
            className="animate__animated animate__fadeInRight animate__faster"
            onClick={onClickNavItemHandler} to='/pictures'
          >
            PicturesView
          </NavBarLink>
          <NavBarLink
            className="animate__animated animate__fadeInRight animate__faster"
            onClick={onClickNavItemHandler} to='/private'
          >
            UsersOnlyView
          </NavBarLink>
          <NavBarLink
            className="animate__animated animate__fadeInRight animate__faster"
            onClick={onClickNavItemHandler} to='/admin'
          >
            AdminView
          </NavBarLink>
          <NavBarCloseIcon
            // className='animate__animated animate__fadeInRight'
            onClick={onClickNavItemHandler}
          >
            <FaTimes />
          </NavBarCloseIcon>
          <LanguageSwitcher />
        </NavBarDiv>
      return resultNavBar
    },
    [closeNavBar],
  )
  // const navBar = () => {
  //   }

  useEffect(() => {
    setIsVisible(visibility)
    if (visibility) {
      navBarResultRef.current = <NavBarMemorized />
    } else {
      navBarResultRef.current = null
      // console.log('NavBar is NOT visible')
    }
  }, [visibility])

  return navBarResultRef.current
}

// NavBar.defaultProps = {
//   inClickHandler: inClickHandler
// }

NavBar.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  visibility: PropTypes.bool.isRequired
}

export default NavBar