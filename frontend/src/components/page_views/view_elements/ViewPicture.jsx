import React, { Fragment, useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { PICTURE_REQUESTED, CONTENT_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/saga/contentLoading/createIO'
import { contentSaga, picSaga } from '../../../redux/saga/contentLoading/contentLoading'

const ViewPicture = ({ recordId, viewName, lng, dimension }) => {
  /**
   * dimention {
   *  direction: [vertical | horizontal]
   *  suze: in pixels
   * }
   */
  const [textState, textSagaDispatch] = useSaga(contentSaga, {
    title: '',
    content: ''
  })
  const [picState, picSagaDispatch] = useSaga(picSaga, {pic: ''})

  useEffect(() => {
    const payload = {
      identity: recordId,
      view_id: viewName,
      // locale_id: lng,
    }
    picSagaDispatch({
      type: PICTURE_REQUESTED,
      payload
    })
    payload['locale_id'] = lng
    textSagaDispatch({
      type: CONTENT_REQUESTED,
      payload
    })
  }, [recordId, viewName, lng, textSagaDispatch, picSagaDispatch])
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
  );
};

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
  dimension: PropTypes.object.isRequired,
}

export default ViewPicture;
