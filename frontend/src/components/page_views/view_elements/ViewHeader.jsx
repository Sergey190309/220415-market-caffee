import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

import { CONTENT_REQUESTED } from '../../../redux/constants/types';
import { useSaga } from '../../../redux/saga/contentLoading/createIO';
import { contentSaga } from '../../../redux/saga/contentLoading/contentLoading';

export const ViewHeader = ({ recordsId, viewName, lng, initState }) => {
  /**
   * recordsId 00_header
   * 00 - serial number
   * header - kind of element
   */
  const [state, sagaDispatch] = useSaga(contentSaga, initState);
  useEffect(() => {
    // console.log('ViewHeader, useEffect, recordsId ->', recordsId)
    sagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordsId,
        view_id: viewName,
        locale_id: lng,
      },
    });
  }, [recordsId, viewName, lng, sagaDispatch]);

  return (
    <Message
      header={state.title}
      content={state.content}
      size='big'
    />
    // <div>
    //   <h1>{state.title}</h1>
    //   <p>{state.content}</p>
    // </div>
  );
};

ViewHeader.defaultProps = {
  recordsId: '',
  viewName: '',
  lng: '',
  initState: {
    title: '',
    content: '',
  }
};

ViewHeader.propTypes = {
  recordsId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  initState: PropTypes.object.isRequired,
};

export default ViewHeader;
