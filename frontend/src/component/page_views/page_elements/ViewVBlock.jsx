import React from 'react'
import { useAppState, useAppEffect } from '../../../hooks/react'
// import { useAppSelector } from '../../../hooks/reactRedux'
import { Box } from '@mui/system'
import PropTypes from 'prop-types'

import { makeRecordIdList } from '../../../utils/utils'
// import { deviceSelector } from '../../../redux/slices'
import ViewParagraph from './ViewParagraph'
import ViewPicture from './ViewPicture'
import ViewNothing from './ViewNothing'
import * as CL from '../../../constants/colors'
import * as SZ from '../../../constants/sizes'

const ViewVBlock = ({ recordsId }) => {
  /**
  * recordsId structure - 01_vblock_txt_3
  * 01 - serial number
  * vblock - kind of structure
  * txt - kind of structure elements
  * 3 - element qnt
  */
  const [recordIdList, setRecordIdList] = useAppState([])
    /**
  * recordIdList - list of identities in content table.
  */

  // const { editable } = useAppSelector(deviceSelector)

  useAppEffect(() => {
    const newRecordIdList = makeRecordIdList(recordsId)
    setRecordIdList(newRecordIdList)
  }, [])

  const Output = () => {
    if (recordsId.includes('txt')) {
      return recordIdList.map(txtRecordId => {
        return (
          <Box
            key={txtRecordId}
            sx={{
            }}
          >
            <ViewParagraph recordId={txtRecordId} />
          </Box>
        )
      })
    }
    if (recordsId.includes('pix')) {
      return recordIdList.map((pixRecordId, index) => {
        return (
          <Box textAlign='center' key={pixRecordId} >
            <ViewPicture
              // {...props}
              recordId={pixRecordId}
              dimension={{ direction: 'horizontal', size: 250 }}
            />
            {/* {index < recordIdList.length - 1 ? <Divider /> : null} */}
          </Box>
        )
      })
    }
    return <ViewNothing />
  }


  return (
    <Box
      data-testid='output'
      sx={{
        border: SZ.blockBorder,
        borderColor: CL.MUI_text_disabled,
        borderRadius: SZ.blockBorderRadius,
        m: '.5rem',
        // '&:hover': editable && {
        //   borderColor: CL.attention
        // }
      }}
    >
      <Output />
    </Box>
  )
}
ViewVBlock.defaultProps = {
  recordsId: ''
}
ViewVBlock.propTypes = {
  recordsId: PropTypes.string.isRequired
}

export default ViewVBlock