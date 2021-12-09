import { resolveData, resolveDataSignIn, resolveDataConfirmPassword } from '../../../testAxiosConstants'

export const confirmPasswordCall = passwordData => Promise.resolve({ data: resolveDataConfirmPassword })

export const logInCall = logInData => Promise.resolve({ data: resolveData })

export const signUpCall = signUpData => Promise.resolve({ data: resolveDataSignIn })
