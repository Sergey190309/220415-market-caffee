import React from 'react'
import { useAppState, useAppEffect, useAppContext } from '../../../hooks/react'
import { useAppSelector } from '../../../hooks/reactRedux'
import PropTypes from 'prop-types'

import { deviceSelector } from '../../../redux/slices'
import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/contentSaga/createIO'
import { getContentSaga } from '../../../redux/contentSaga/content'
import { LandingContext } from '../../../context'
import { Box, Divider, Tooltip, Typography } from '@mui/material'
import * as SZ from '../../../constants/sizes'
import * as CL from '../../../constants/colors'

const ViewParagraph = ({ recordId, initialState }) => {
  /**
  * States:
  * state: object - Paragraph content loaded from back-end
  *    using getContentSaga.
  * content: object - Content itself shown on the component.
  *    Updated with useEffect.
  * changed: boolean - Indication content was changed from last
  *    download or upload. Updated with useEffect.
  * contextMenuOpened: boolean - Self explain. Open with right
  *    button.
  * upperLevelContextMenuOpened: boolean. Open when appropriate button
  *    pressed on context menu.
  * paragraphEditted: boolean - Set close showing, open
  *    textboxes for edition.
  * indicatorOpened: boolean - Set component indicator on and
  *    off respectevily.
  */
  const [content, setContent] = useAppState(initialState)
  const [changed, setChanged] = useAppState(false)
  const [tooltipVisible, setTooltipVisible] = useAppState(false)

  const [state, getSagaDispatch] = useSaga(getContentSaga, initialState)

  const { editable } = useAppSelector(deviceSelector)

  const { componentName } = useAppContext(LandingContext)
  const { componentName: viewName } = useAppContext(LandingContext)

  useAppEffect(() => { // Saga
    // console.log('ViewParagraph:',
    //   '\n useEffect[recordId, kind]',
    //   '\n  recordId ->', recordId)
    // indexRef.current = +recordId.split('_').pop()
    // if (kind === '') {
      setChanged(false)
      getSagaDispatch({
        type: CONTENT_REQUESTED,
        payload: {
          identity: recordId,
          view_id: viewName
        }
      })
    // setContent(state)
    // console.log('ViewParagraph, state ->', state)
    // }
    // }, [recordId, kind])
  }, [])

  useAppEffect(() => {
    setContent(state)
  }, [state])


  const NormalOutput = () => (
    <Tooltip
      title={recordId} placement='top' followCursor arrow
      open={tooltipVisible}
      onOpen={() => { setTooltipVisible(editable && true) }}
      onClose={() => { setTooltipVisible(false) }}
    >
      <Box
        sx={{
          border: SZ.blockBorder, borderColor: 'text.disabled', borderRadius: 3,
          m: '.25rem',
          p: '.5rem',
          '&:hover': editable && {
            borderColor: CL.attention
          }
        }}
      >
        {/* Fuck! */}
        <Typography variant='h6'>
          {content.title}
        </Typography>
        {content.title && content.content.length > 0
          ? <Divider />
          : null}
        {content.content.map((item, index) => (
          <Typography key={index} variant='body2'>
            {item}
          </Typography>
        ))}
      </Box>
    </Tooltip>
  )

  return (
    <NormalOutput />
  )
}
ViewParagraph.defaultProps = {
  recordId: '',
  initialState: {
    title: '', // info from back-end
    content: ['']
  }
}
ViewParagraph.propTypes = {
  recordId: PropTypes.string.isRequired,
  initialState: PropTypes.object.isRequired
}

export default ViewParagraph