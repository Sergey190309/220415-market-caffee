import React, { useState, useEffect } from 'react'
// import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Container, List } from 'semantic-ui-react'

import { makeRecordIdList } from '../../../utils/utils'

import ViewParagraph from './ViewParagraph'
import ViewPicture from './ViewPicture'
import ViewNothing from './ViewNothing'

const ViewHBlock = ({ recordsId, viewName, lng }) => {
  const [recordIdList, setRecordIdList] = useState([])

  useEffect(() => {
    setRecordIdList(makeRecordIdList(recordsId))
    // console.log('ViewVBlock, lng ->', lng)
  }, [recordsId])

  const output = () => {
    const props = {
      viewName: viewName,
      lng: lng
    }
    if (recordsId.includes('txt')) {
      return recordIdList.map(txtRecordId => {
        return (
          <List.Item key={txtRecordId}>
            <ViewParagraph {...props} recordId={txtRecordId} />
          </List.Item>
        )
      })
    }
    if (recordsId.includes('pix')) {
      // console.log('ViewHBlock, props ->', props)
      return recordIdList.map(pixRecordId => {
        return (
          <List.Item key={pixRecordId} >
            <Container
              textAlign='center'
              fluid
            >
              <ViewPicture
                {...props}
                recordId={pixRecordId}
                dimension={{ direction: 'vertical', size: 250 }}
              />
            </Container>
          </List.Item>
        )
      })
    }
    return <ViewNothing />
  }

  return (
    <Container fluid textAlign='center'>
      <List celled horizontal>
        {output()}
      </List>
    </Container>
  )
}

ViewHBlock.defaultProps = {
  recordsId: '',
  viewName: '',
  lng: ''
}

ViewHBlock.propTypes = {
  recordsId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired
}

export default ViewHBlock
