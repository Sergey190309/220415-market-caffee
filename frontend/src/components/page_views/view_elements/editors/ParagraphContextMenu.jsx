import React, { useState, useEffect, useRef, Fragment, useContext } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Popup,
  Menu
  // Dropdown
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import {
  ELEMENT_EDIT, ELEMENT_SAVE,
  ELEMENT_ADD_ABOVE, ELEMENT_ADD_BELOW, ELEMENT_DELETE,
  // UPPER_ELEMENT_ADD_ABOVE, UPPER_ELEMENT_ADD_BELOW, UPPER_ELEMENT_DELETE,
  UPPER_ELEMENT_HANDLE
} from '../../../../redux/constants/menuKeys'
import { positiveColor, neutralColor, warningColor } from '../../../../utils/colors'
import { deviceSelector } from '../../../../redux/slices'
import { createContextFromEvent } from '../../../../utils/createContextFromEvent'
// import { ContextMenuButton } from '../styledComponents'
import {
  ContextMenuItem
  // IconContent
} from '../../../items/menu_items/ContextMenuItem'
import ElementTypesMenu from './ElementTypesMenu'
import UpperLevelMenu from './UpperLevelMenu'

import { UpperLevel } from '../ElementSwitcher'
import { UpperLeverElementId } from '../ViewVBlock'

const ParagraphContextMenu = ({
  isOpened,
  saveDisabled,
  context,
  setContextMenuOpened,
  setParagraphEditted,
  saveToBackend,
  deleteElement,
  addAbove,
  addBelow
  // upperLvlAddElementProp,
  // upperLvlDeleteElementProp
}) => {
  const [opened, setOpened] = useState(false)
  const [upperLvlElementID, setUpperLvlElementID] = useState(-1)
  const [menuStructure, setMenuStructure] = useState([])
  const [upperLevelMenuContext, setUpperLevelMenuContext] = useState({})
  // const [subMenuStructure, setSubMenuStructure] = useState([])
  // const [elementTypesMenuOpened, setElementTypesMenuOpened] = useState(false)

  const { editable } = useSelector(deviceSelector)

  const upperLevelMenuContextRef = useRef(null)

  // const { upperLvlDeleteElement } = useContext(UpperLevel)
  const upperLevelElementId = parseInt(useContext(UpperLeverElementId).split('_')[0])

  const { t } = useTranslation('context')

  useEffect(() => {
    // console.log('ParagraphContentMenu:\n useEffect onMount->')
    setMenuStructure([
      {
        name: ELEMENT_EDIT,
        icon: { name: 'edit', color: positiveColor },
        content: t('2LE.editElement'),
        disabled: false,
        onClick: onClickHandler
      },
      {
        name: ELEMENT_SAVE,
        icon: { name: 'save', color: warningColor },
        content: t('2LE.saveElement'),
        disabled: saveDisabled,
        onClick: onClickHandler
      },
      {
        name: ELEMENT_ADD_ABOVE,
        icon: { name: 'angle up', color: neutralColor },
        content: t('2LE.addAbove'),
        disabled: false,
        onClick: onClickHandler
      },
      {
        name: ELEMENT_ADD_BELOW,
        icon: { name: 'angle down', color: neutralColor },
        content: t('2LE.addBelow'),
        disabled: false,
        onClick: onClickHandler
      },
      {
        name: ELEMENT_DELETE,
        icon: { name: 'delete', color: warningColor },
        content: t('2LE.deleteElement'),
        disabled: false,
        onClick: onClickHandler
      },
      {
        name: UPPER_ELEMENT_HANDLE,
        icon: { name: 'angle right', color: neutralColor },
        content: t('1LE.handle'),
        disabled: false,
        // onClick: () => { },
        onHover: setUpperLevelMenu
      }
    ])
    // setSubMenuStructure([
    //   {
    //     name: UPPER_ELEMENT_ADD_ABOVE,
    //     icon: { name: 'angle up', color: neutralColor },
    //     text: t('1LE.addAbove'),
    //     onClick: onClickHandler
    //   },
    //   {
    //     name: UPPER_ELEMENT_ADD_BELOW,
    //     icon: { name: 'angle down', color: neutralColor },
    //     text: t('1LE.addBelow'),
    //     onClick: onClickHandler
    //   },
    //   {
    //     name: UPPER_ELEMENT_DELETE,
    //     icon: { name: 'delete', color: warningColor },
    //     text: t('1LE.DeleteElement'),
    //     onClick: onClickHandler
    //   }
    // ])
  }, [saveDisabled])

  useEffect(() => {
    console.log('ParagraphContextMenu:\n useEffect[isOpened]')
    setOpened(true)
    return () => {
      console.log('ParagraphContextMenu:\n useEffect[isOpened], return')
      setContextMenuOpened(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      return () => {
        console.log('ParagraphContextMenu:\n useEffect[isOpened], return')
        setContextMenuOpened(false)
      }
    }
  }, [])

  useEffect(() => {
    setUpperLvlElementID(upperLevelElementId)
  }, [upperLevelElementId])

  const onClickHandler = (event, { name }) => {
    // console.log('ParagraphContentMenu:\n onClickHandler\n  name ->', name)
    event.preventDefault()
    switch (name) {
      case ELEMENT_EDIT:
        setParagraphEditted(true)
        setOpened(false)
        // setContextMenuOpened(false)
        break
      case ELEMENT_SAVE:
        saveToBackend()
        setOpened(false)
        // setContextMenuOpened(false)
        break
      case ELEMENT_ADD_ABOVE:
        addAbove()
        setOpened(false)
        // setContextMenuOpened(false)
        break
      case ELEMENT_ADD_BELOW:
        addBelow()
        setOpened(false)
        // setContextMenuOpened(false)
        break
      case ELEMENT_DELETE:
        deleteElement()
        setOpened(false)
        // setContextMenuOpened(false)
        break
      case UPPER_ELEMENT_HANDLE:
        console.log('ParagraphContextMenu:\n UPPER_ELEMENT_HANDLE')
        break
      // case UPPER_ELEMENT_ADD_ABOVE:
      //   if (editable) {
      //     elementTypeMenuContextRef.current = createContextFromEvent(event)
      //     console.log('ParagraphContextMenu:\n onClickHandler',
      //       '\n  upperLevelElementId ->', upperLevelElementId)
      //     setElementTypesMenuOpened(true)
      //     // setOpened(false)
      //     // setContextMenuOpened(false)
      //   }
      //   break
      // case UPPER_ELEMENT_ADD_BELOW:
      //   elementTypeMenuContextRef.current = createContextFromEvent(event)
      //   setUpperLvlElementID(upperLevelElementId + 1)
      //   setElementTypesMenuOpened(true)
      //   break
      // case UPPER_ELEMENT_DELETE:
      //   upperLvlDeleteElement(upperLevelElementId)
      //   setOpened(false)
      //   setContextMenuOpened(false)
      //   break
      default:
        break
    }
  }

  /**
   * 2LE - 2nd level element
   */

  const upperLevelMenu = () => (
    <UpperLevelMenu
      context={upperLevelMenuContextRef}
      upperLevelElementId={upperLvlElementID}
      setMenuOpened={setUpperLevelMenuOpened}
    />
  )

  return (
    <Fragment>
      {upperLevelMenu
        ? upperLevelMenu()
        : null
      }
      <Popup
        data-testid='Popup'
        hoverable
        // hoverable={!elementTypesMenuOpened}
        wide='very'
        context={context}
        open={opened && editable}
        onClose={() => {
          setContextMenuOpened(false)
          setOpened(false)
          // console.log('ParagraphContextMenu:\n onClose')
        }}
      // onUnmount={() => {
      //   // setContextMenuOpened(false)
      // }}
      >
        <Menu
          vertical
          compact
        >
          {menuStructure.map((item, index) => (
            <ContextMenuItem key={index} {...item} />
          ))}
          {/* <Menu.Item>
            <Dropdown
              fluid
              icon={{ name: 'dropdown', color: neutralColor }}
              text={t('1LE.handle')}
              className='icon'
            >
              <Dropdown.Menu>
                {subMenuStructure.map((item, index) =>
                  <Dropdown.Item key={index} {...item} />)}
              </Dropdown.Menu>
            </Dropdown >
          </Menu.Item> */}
        </Menu>
      </Popup>
    </Fragment>
  )
}

ParagraphContextMenu.defaultProps = {
  isOpened: true,
  saveDisabled: false,
  context: {},
  setContextMenuOpened: () => { },
  setParagraphEditted: () => { },
  saveToBackend: () => { },
  deleteElement: () => { },
  addAbove: () => { },
  addBelow: () => { }
}

ParagraphContextMenu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  saveDisabled: PropTypes.bool.isRequired,
  context: PropTypes.object.isRequired,
  setContextMenuOpened: PropTypes.func.isRequired,
  setParagraphEditted: PropTypes.func.isRequired,
  saveToBackend: PropTypes.func.isRequired,
  deleteElement: PropTypes.func.isRequired,
  addAbove: PropTypes.func.isRequired,
  addBelow: PropTypes.func.isRequired
}

export default ParagraphContextMenu
