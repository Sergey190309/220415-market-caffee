import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { Dialog } from '@mui/material'
import {Button, TextField} from '@mui/material'
import { useTranslation } from 'react-i18next'

import * as CL from '../../../constants/colors'
import { DialogButton } from '../../styles/buttons.styled'

import { deviceSelector, closeModal } from '../../../redux/slices'


const LogIn = () => {
  const [opened, setOpened] = useState(false)
  // const [opened, setOpened] = useState(true)
  const { t } = useTranslation('auth')
  const { kindOfModal } = useSelector(deviceSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    if (kindOfModal === 'LogIn') {
      setOpened(true)
    }
  }, [kindOfModal])

  const onCloseHandle = () => {
    setOpened(false)
    dispatch(closeModal())
  }


  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      console.log('LogIn>formik>onSubmit, values ->', values)
    }
  })

  console.log('LogIn, render')

  return (
    <Dialog
      // open={true}
      open={opened}
      onClose={onCloseHandle}
      sx={{
        // bgcolor: 'red'
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>


    </Dialog>
  )
}

LogIn.defaultProps = {}
LogIn.propTypes = {}

export default LogIn