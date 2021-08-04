import React, { useEffect } from 'react'
// import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/saga/contentLoading/createIO'
import { contentSaga } from '../../../redux/saga/contentLoading/contentLoading'

const ViewFooter = ({ recordsId, viewName, lng, initState }) => {
  const [state, sagaDispatch] = useSaga(contentSaga, initState)

  useEffect(() => {
    // console.log('ViewFooter, useEffect ->', recordsId, viewName, lng)
    sagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordsId,
        view_id: viewName,
        locale_id: lng
      }
    })
  }, [recordsId, viewName, lng, sagaDispatch])

  return (
    <Message
      header={state.title}
      content={state.content}
    />
  )
}

ViewFooter.defaultProps = {
  recordsId: '',
  viewName: '',
  lng: '',
  initState: {
    title: '',
    content: ''
  }
}

ViewFooter.propTypes = {
  recordsId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
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
