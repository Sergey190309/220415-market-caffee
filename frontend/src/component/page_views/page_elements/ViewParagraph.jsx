import React from 'react'
import { useAppState, useAppEffect, useAppContext } from '../../../hooks/react'
import PropTypes from 'prop-types'

import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/contentSaga/createIO'
import { getContentSaga } from '../../../redux/contentSaga/content'
import { LandingContext } from '../../../context'
import ShowText from '../sub_elements/ShowText'
// import ShowText from '../sub_elements/ShowText'

const ViewParagraph = ({ recordId, initialState }) => {
  /**
  * States:
  * state: object - Paragraph content loaded from back-end
  *    using getContentSaga.
  * content: object - Content itself shown on the component.
  *    Updated with useEffect.
  */
  const [state, getSagaDispatch] = useSaga(getContentSaga, initialState)
  const [content, setContent] = useAppState(initialState)

  const { componentName } = useAppContext(LandingContext)

  useAppEffect(() => {
    getSagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordId,
        view_id: componentName
      }
    })
  }, [])

  useAppEffect(() => {
    setContent(state)
  }, [state])


  return (
    <ShowText
      contentToShow={content}
      recordId={recordId}
    />
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