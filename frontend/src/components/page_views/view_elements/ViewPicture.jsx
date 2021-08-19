import React, { Fragment, useEffect } from 'react'
import { Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { PICTURE_REQUESTED, CONTENT_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/saga/content/createIO'
import { getContentSaga, getPicSaga } from '../../../redux/saga/content/content'

const ViewPicture = ({ recordId, viewName, lng, dimension }) => {
  /**
   * dimention {
   *  direction: [vertical | horizontal]
   *  suze: in pixels
   * }
   */
  const [textState, getContentSagaDispatch] = useSaga(getContentSaga, {
    title: '',
    content: ''
  })
  const [picState, getPicSagaDispatch] = useSaga(getPicSaga, { pic: '' })

  useEffect(() => {
    const payload = {
      identity: recordId,
      view_id: viewName
      // locale_id: lng,
    }
    getPicSagaDispatch({
      type: PICTURE_REQUESTED,
      payload
    })
    payload.locale_id = lng
    getContentSagaDispatch({
      type: CONTENT_REQUESTED,
      payload
    })
  }, [recordId, viewName, lng, getContentSagaDispatch, getPicSagaDispatch])
  // console.log('ViewPictures, picState ->', picState)
  return (
    <Fragment>
      <h4>{textState.title}</h4>
      <Image
        src={`data:image;charset=utf-8;base64,${picState.pic}`}
        spaced
        height={dimension.direction === 'vertical' ? dimension.size : null}
        width={dimension.direction === 'horizontal' ? dimension.size : null}
        // centered
        // size='small'
        // wrapped
        // bordered
        // fluid
        />
        <p>{textState.content}</p>
    </Fragment>
  )
}

ViewPicture.defaultProps = {
  recordId: '',
  viewName: '',
  lng: '',
  dimension: {}
}

ViewPicture.propTypes = {
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  dimension: PropTypes.object.isRequired
}

export default ViewPicture
