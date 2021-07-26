import { resolveData, resolveDataSignIn } from '../../../testAxiosConstants';

export const logInCall = logInData => Promise.resolve({ data: resolveData });
export const signUpCall = signUpData => Promise.resolve({ data: resolveDataSignIn });
