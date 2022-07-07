import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { LinearProgress, Box, Dialog } from '@mui/material'

import { authSelector, signUpModalClose } from '../../../redux/slices'
import * as CL from '../../../constants/colors'
import { DialogButton } from '../../styles/buttons.styled'
import { AuthTextField } from '../../styles/text.styled'

export const initValues = {
  userName: 'sa',
  email: 'sa6702@gmail.com',
  password: 'qwerty',
  password2: 'qwerty'
}

export const signUpSchema = t =>
  Yup.object().shape({
    [Object.keys(initValues)[0]]: Yup.string().max(
      15,
      // eslint-disable-next-line no-template-curly-in-string
      t('signup.errors.userName.max', { max: '${max}' })
    ),
    [Object.keys(initValues)[1]]: Yup.string()
      .email(t('signup.errors.email.invalidEmail'))
      .required(t('signup.errors.required')),
    [Object.keys(initValues)[2]]: Yup.string()
      // eslint-disable-next-line no-template-curly-in-string
      .min(6, t('signup.errors.password.min', { min: '${min}' }))
      .required(t('signup.errors.required')),
    [Object.keys(initValues)[3]]: Yup.string().oneOf(
      [Yup.ref(Object.keys(initValues)[2]), null],
      t('signup.warnings.pwdMustMatch!')
      // t('signup.Passwords must match!')
    )
  })


const SignUp = ({ initValues, signUpSchema }) => {

  const dispatch = useDispatch()

  const { isSignUpOpened } = useSelector(authSelector)

  const onCloseHandle = () => {
    console.log('SignUp>onCloseHandle')
    dispatch(signUpModalClose())
  }

  return (
    <Dialog
      open={isSignUpOpened}
      onClose={onCloseHandle}
    >
      <Box
        justifyContent='center'
        sx={{
          p: '.5rem', border: 1, borderColor: `${CL.dialogBorders}`,
          borderRadius: 1, bgcolor: `${CL.navBarBackground}`,
          fontFamily: 'sans-serif'
        }}
      >
        <div>SignUp</div>
      </Box>
    </Dialog>
  )
}

SignUp.defaultProps = {
  initValues,
  signUpSchema,
  visibility: false,
  setVisibility: () => { }
}
SignUp.propTypes = {
  initValues: PropTypes.object.isRequired,
  signUpSchema: PropTypes.func.isRequired,
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired
}

export default SignUp