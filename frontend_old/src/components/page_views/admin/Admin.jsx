import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Segment, Header, Radio } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import { setEditable, deviceSelector } from '../../../redux/slices'
import { viewSegmentColor } from '../../../utils/colors'

const Admin = () => {
  const [radioEditable, setRadioEditable] = useState(false)
  const dispatch = useDispatch()
  const { editable } = useSelector(deviceSelector)
  const { t } = useTranslation('general')
  useEffect(() => {
    setRadioEditable(editable)
  }, [editable])

  return (
    <Container data-testid='AdminContainer'>
      <Segment
        color={viewSegmentColor}
        data-testid='AdminSegment'
      >
        <Header content='Admin' />
        <Radio
          slider
          label={t('admin.editable')}
          checked={radioEditable}
          onChange={() => { dispatch(setEditable(!radioEditable)) }}
        />
      </Segment>
    </Container>
  )
}

export default Admin
