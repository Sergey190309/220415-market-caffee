import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Message, Divider } from 'semantic-ui-react';

import { CONTENT_REQUESTED } from '../../../redux/constants/types';
import { useSaga } from '../../../redux/saga/contentLoading/createIO';
import { contentSaga } from '../../../redux/saga/contentLoading/contentLoading';

const ViewParagraph = ({ recordId, viewName, lng }) => {
  const [state, sagaDispatch] = useSaga(contentSaga, {
    title: '',
    content: [''],
  });
  useEffect(() => {
    sagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordId,
        view_id: viewName,
        locale_id: lng,
      },
    });
  }, [recordId, viewName, lng, sagaDispatch]);

  return (
    <Message>
      <Message.Header content={state.title} />
      <Divider />
      {state.content.map((item, index) => (
        <Message.Item as='p' key={index}>
          {item}
        </Message.Item>
      ))}
    </Message>
      // content={state.content}
  );
};
ViewParagraph.defaultProps = {
  recordId: '',
  viewName: '',
  lng: '',
};

ViewParagraph.propTypes = {
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
};

export default ViewParagraph;
