import React, {
  useState, useEffect
  // useRef, useContext
} from 'react'
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
import {
  ContextMenuItem
} from '../../../items/menu_items/ContextMenuItem'

const ParagraphContextMenu = ({
  isOpened,
  saveDisabled,
  context,
  setMenuOpened,
  upperLevelElementMenu,
  setParagraphEditted,
  saveToBackend,
  deleteElement,
  addAbove,
  addBelow
  // upperLvlAddElementProp,
  // upperLvlDeleteElementProp
}) => {
  const { t } = useTranslation('context')
  const [opened, setOpened] = useState(false)
  const [menuStructure, setMenuStructure] = useState([])

  const { editable } = useSelector(deviceSelector)
  // const upperLevelElementId = parseInt(useContext(UpperLeverElementId)
  //   .split('_')[0])

  // const upperLevelMenuContextRef = useRef(null)

  useEffect(() => {
    // console.log('ParagraphContextMenu:\n useEffect[]')
    setOpened(isOpened)
    return () => {
      // console.log('ParagraphContextMenu:\n useEffect[isOpened]',
      //   '\n  clean up')
      setOpened(false)
    }
  }, [])

  useEffect(() => {
    // console.log('ParagraphContentMenu:\n useEffect onMount->')
    setMenuStructure([
      {
        name: ELEMENT_EDIT,
        icon: { name: 'edit', color: positiveColor },
        content: t('2LE.editElement')
      },
      {
        name: ELEMENT_SAVE,
        icon: { name: 'save', color: warningColor },
        content: t('2LE.saveElement'),
        disabled: saveDisabled
      },
      {
        name: ELEMENT_ADD_ABOVE,
        icon: { name: 'angle up', color: neutralColor },
        content: t('2LE.addAbove')
      },
      {
        name: ELEMENT_ADD_BELOW,
        icon: { name: 'angle down', color: neutralColor },
        content: t('2LE.addBelow')
      },
      {
        name: ELEMENT_DELETE,
        icon: { name: 'delete', color: warningColor },
        content: t('2LE.deleteElement')
      },
      {
        name: UPPER_ELEMENT_HANDLE,
        icon: { name: 'angle right', color: neutralColor },
        content: t('1LE.handle')
      }
    ])
  }, [saveDisabled])

  const onClickHandler = (event, { name }) => {
    event.preventDefault()
    switch (name) {
      case UPPER_ELEMENT_HANDLE:
        // console.log('ParagraphContextMenu:',
        //   '\n onClickHandler(UPPER_ELEMENT_HANDLE)',
        //   '\n  x ->', event.clientX,
        //   '\n  y ->', event.clientY
        // )
        // upperLevelMenuContextRef.current = createContextFromEvent(event)
        upperLevelElementMenu()
        setMenuOpened(false)
        break
      case ELEMENT_EDIT:
        setParagraphEditted(true)
        setMenuOpened(false)
        break
      case ELEMENT_SAVE:
        saveToBackend()
        setMenuOpened(false)
        break
      case ELEMENT_ADD_ABOVE:
        addAbove()
        setMenuOpened(false)
        break
      case ELEMENT_ADD_BELOW:
        addBelow()
        setMenuOpened(false)
        break
      case ELEMENT_DELETE:
        deleteElement()
        setMenuOpened(false)
        break
      default:
        break
    }
  }

  /**
   * 2LE - 2nd level element
   */

  return (
      <Popup
        data-testid='Popup'
        hoverable
        // hoverable={!upperLavelMenuOpened}
        wide='very'
        context={context}
        open={opened && editable}
        onClose={() => {
          setMenuOpened(false)
          // console.log('ParagraphContextMenu:\n onClose')
        }}
      >
        <Menu
          vertical
          compact
        >
          {menuStructure.map((item, index) => (
            <ContextMenuItem
              key={index} {...item} onClick={onClickHandler}
            />
          ))}
        </Menu>
      </Popup>
  )
}

ParagraphContextMenu.defaultProps = {
  isOpened: true,
  saveDisabled: false,
  context: {},
  setMenuOpened: () => { },
  upperLevelElementMenu: () => { },
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
  setMenuOpened: PropTypes.func.isRequired,
  upperLevelElementMenu: PropTypes.func.isRequired,
  setParagraphEditted: PropTypes.func.isRequired,
  saveToBackend: PropTypes.func.isRequired,
  deleteElement: PropTypes.func.isRequired,
  addAbove: PropTypes.func.isRequired,
  addBelow: PropTypes.func.isRequired
}

export default ParagraphContextMenu
