import React, { useEffect } from 'react'
// import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/saga/content/createIO'
import { getContentSaga } from '../../../redux/saga/content/content'

const ViewFooter = ({ recordsId, viewName, initState }) => {
  const [state, sagaDispatch] = useSaga(getContentSaga, initState)

  useEffect(() => {
    // console.log('ViewFooter, useEffect ->', recordsId, viewName, lng)
    sagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordsId,
        view_id: viewName
      }
    })
  }, [recordsId, viewName, sagaDispatch])

  return (
    <Message
      data-testid='Message'
      header={state.title}
      content={state.content}
    />
  )
}

ViewFooter.defaultProps = {
  recordsId: '',
  viewName: '',
  initState: {
    title: '',
    content: ''
  }
}

ViewFooter.propTypes = {
  recordsId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  initState: PropTypes.object.isRequired
}

// const mapStateToProps = state => ({
//   lng: state.lng,
// });

// const mapDispatchToProps = dispatch => ({
// structureStart: viewName => dispatch(structureStart(viewName)),
// });

export default ViewFooter
// export default connect(mapStateToProps)(ViewFooter);
