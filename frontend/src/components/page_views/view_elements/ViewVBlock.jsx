import React, {
  // createContext,
  useState, useEffect, Fragment
} from 'react'
import PropTypes from 'prop-types'
import { Container, Divider } from 'semantic-ui-react'

import { makeRecordIdList } from '../../../utils/utils'
import ViewParagraph from './ViewParagraph'
import ViewPicture from './ViewPicture'
import ViewNothing from './ViewNothing'

// export const UpperLeverElementId = createContext()

const ViewVBlock = ({
  recordsId,
  viewName // to be removed when update ViewPicture to use context
}) => {
  /**
   * recordsId structure - 01_vblock_txt_3
   * 01 - serial number
   * vblock - kind of structure
   * txt - kind of structure elements
   * 3 - element qnt
   */
  const [recordIdList, setRecordIdList] = useState([])
  /**
   * recordIdList - list of identities in content table.
   */

  useEffect(() => {
    // console.log('ViewVBlock:\n useEffect[recordsId]',
    //   '\n  recordsId ->', recordsId)
    const newRecordIdList = makeRecordIdList(recordsId)
    setRecordIdList(newRecordIdList)
  }, [])
  // }, [recordsId])

  const props = {
    viewName
  }

  // console.log('ViewVBlock:',
  //   '\n  recordsId ->', recordsId)
  const Output = () => {
    if (recordsId.includes('txt')) {
      return recordIdList.map(txtRecordId => {
        return (
          <Fragment key={txtRecordId}>
            <ViewParagraph recordId={txtRecordId} />
          </Fragment>
        )
      })
    }
    if (recordsId.includes('pix')) {
      return recordIdList.map((pixRecordId, index) => {
        return (
          <Container textAlign='center' key={pixRecordId} >
            <ViewPicture
              {...props}
              recordId={pixRecordId}
              dimension={{ direction: 'horizontal', size: 250 }}
            />
            {index < recordIdList.length - 1 ? <Divider /> : null}
          </Container>
        )
      })
    }
    return <ViewNothing />
  }

  return (
    <Container data-testid='Output' >
      <Output />
    </Container>
  )
}

ViewVBlock.defaultProps = {
  recordsId: '',
  viewName: ''
}

ViewVBlock.propTypes = {
  recordsId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired
}

export default ViewVBlock
