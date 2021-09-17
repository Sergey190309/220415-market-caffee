import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Popup, Button } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import {
  ELEMENT_EDIT, ELEMENT_SAVE,
  ELEMENT_ADD_ABOVE, ELEMENT_ADD_BELOW,
  ELEMENT_DELETE, ELEMENT_UPPER_LVL
} from '../../../../redux/constants/menuKeys'
import { positiveColor, neutralColor, warningColor } from '../../../../utils/colors'
import { deviceSelector } from '../../../../redux/slices'
import { createContextFromEvent } from './createContextFromEvent'
import { ContextMenuButton } from '../styledComponents'
import UpperLvlContextMenu from './UpperLvlContextMenu'

const ParagraphContextMenu = ({
  isOpened,
  saveDisabled,
  context,
  setContextMenuOpened,
  setParagraphEditted,
  saveToBackend,
  deleteElement,
  addAbove,
  addBelow,
  upperLvlAddElementProp,
  upperLvlDeleteElementProp
}) => {
  const [opened, setOpened] = useState(false)
  const [upperLvlCntxtOpened, setUpperLvlCntxtOpened] = useState(false)
  const { editable } = useSelector(deviceSelector)
  const upperLvlmenuContext = useRef(null)
  const { t } = useTranslation('context')

  useEffect(() => {
    // console.log('ParagraphContentMenu, useEffect isOpened->', isOpened)
    setOpened(isOpened)
  }, [isOpened])

  const onClickHandling = (event, { name }) => {
    // console.log('ParagraphContentMenu, onClickHandling, name ->', name)
    event.preventDefault()
    switch (name) {
      case ELEMENT_EDIT:
        setParagraphEditted(true)
        break
      case ELEMENT_SAVE:
        saveToBackend()
        break
      case ELEMENT_DELETE:
        deleteElement()
        break
      case ELEMENT_ADD_ABOVE:
        addAbove()
        break
      case ELEMENT_ADD_BELOW:
        addBelow()
        break
      case ELEMENT_UPPER_LVL:
        if (editable) {
          upperLvlmenuContext.current = createContextFromEvent(event)
          setUpperLvlCntxtOpened(editable && !upperLvlCntxtOpened)
          console.log('component, ParagraphContextMenu:',
            '\n case ELEMENT_UPPER_LVL')
        }
        break
      default:
        break
    }
    setOpened(false)
    setContextMenuOpened(false)
  }

  // console.log('ParagraphContextMenu, context ->', context)
  /**
   * 2LE - 2nd level element
   */
  return (
    <Fragment>
      {
        upperLvlCntxtOpened
          ? <UpperLvlContextMenu
            isOpened={upperLvlCntxtOpened}
            context={upperLvlmenuContext}
            setOpened={setUpperLvlCntxtOpened}
            upperLvlAddElementProp={upperLvlAddElementProp}
            upperLvlDeleteElementProp={upperLvlDeleteElementProp}

            />
          : null
      }
      <Popup
        hoverable
        data-testid='Popup'
        wide
        context={context}
        open={opened}
        // open={true}
        onClose={() => {
          setOpened(false)
          setContextMenuOpened(false)
        }}
      >
        <Button.Group
          vertical
          // style={{ width: '300px' }}
        >
          <ContextMenuButton
            name={ELEMENT_EDIT}
            icon={{ float: 'left', name: 'edit', color: positiveColor }}
            content={t('2LE.editElement')}
            fitted='vertically'
            onClick={onClickHandling}
          />
          <ContextMenuButton
            name={ELEMENT_SAVE}
            icon={{ float: 'left', name: 'save', color: warningColor }}
            content={t('2LE.saveElement')}
            disabled={saveDisabled}
            fitted='vertically'
            onClick={onClickHandling}
          />
          <ContextMenuButton
            name={ELEMENT_ADD_ABOVE}
            icon={{ float: 'left', name: 'angle up', color: neutralColor }}
            content={t('2LE.addAbove')}
            fitted='vertically'
            onClick={onClickHandling}
          />
          <ContextMenuButton
            name={ELEMENT_ADD_BELOW}
            icon={{ float: 'left', name: 'angle down', color: neutralColor }}
            content={t('2LE.addBelow')}
            fitted='vertically'
            onClick={onClickHandling}
          />
          <ContextMenuButton
            name={ELEMENT_DELETE}
            icon={{ float: 'left', name: 'delete', color: warningColor }}
            content={t('2LE.deleteElement')}
            fitted='vertically'
            onClick={onClickHandling}
          />
          <ContextMenuButton
            name={ELEMENT_UPPER_LVL}
            icon={{ float: 'left', name: 'angle double up', color: neutralColor }}
            content={t('1LE.handle')}
            fitted='vertically'
            onClick={onClickHandling}
          />
        </Button.Group>
      </Popup>
    </Fragment>
  )
}

ParagraphContextMenu.defaultProps = {
  isOpened: false,
  saveDisabled: false,
  context: {},
  setContextMenuOpened: () => { },
  setParagraphEditted: () => { },
  saveToBackend: () => { },
  deleteElement: () => { },
  addAbove: () => { },
  addBelow: () => { },
  upperLvlAddElementProp: () => { },
  upperLvlDeleteElementProp: () => { }
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
  addBelow: PropTypes.func.isRequired,
  upperLvlAddElementProp: PropTypes.func.isRequired,
  upperLvlDeleteElementProp: PropTypes.func.isRequired
}

export default ParagraphContextMenu
