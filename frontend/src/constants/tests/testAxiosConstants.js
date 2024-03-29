import {
  landing,
  pictures,
} from './testConstants'
/**
 * Structure contants.
 */
export const resolveGetViewStructure = {
  data: {
    message: 'message in view structure',
    // payload: structuresObj
    payload: [
      {
        view_id: 'pictures',
        attributes: pictures
      },
      {
        view_id: 'landing',
        attributes: landing
      }
    ]
  }
}
// ===========================================================
/**
 * tech in constants
 */
export const resolveTechInFetch = {
  data: {
    message: 'TechAuth reporing! Tech token is in payload.',
    payload: 'mock tech token'
  },
  status: 200
}
export const resolveLngsCall = {
  data: {
    payload: [
      { remarks: "General english.", id: "en" },
      { remarks: "Общий русский.", id: "ru" }
    ]
  }
}
export const rejectData404 = {
  response: {
    data: {
      message: 'Error message'
    },
    status: 404,
    headers: { header: 'Some header' },
    code: 'ERR_BAD_REQUEST'
  },
  config: { config: 'Some config' }
}
// ===========================================================
/**
 * Auth constants
 */
export const mockLogInData = {
  email: 'mock@email.test',
  password: 'mockPassword'
}
export const mockUserData = {
  message: 'Hi! You are welcome.',
  payload: {
    user_name: 'admin',
    email: 'a@agatha-ng.com',
    isAdmin: true,
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token'
  }
}
export const mockSignUpData = {
  user_name: 'mockUserName',
  email: 'mock@email.test',
  password: 'mockPassword'
}
export const mockSignUpResolveData = {
  message: 'Test message.',
  payload: {
    id: 11,
    user_name: 'sa',
    first_name: null,
    last_name: null,
    email: 'sa6702@gmail.com',
    role: null,
    remarks: null,
    locale: {
      id: 'en',
      remarks: 'General english.'
    },
    time_zone: 3,
    created: '2021-05-20T08:23:59',
    updated: null,
    accessed: null
  }
}


// export const rejectPutTextContentExpired = {
//   response: {
//     status: 401,
//     data: {
//       error: 'token_expired',
//       description: 'token expired'
//     }
//   }
// }
// export const resolveDataPutTextContent = {
//   message: 'mockMessage from resolveDataPutTextContent'
// }

// /**
//  * confirm password
//  */
// export const resolveDataConfirmPassword = {
//   payload: {
//     message: 'mock data confirm password message',
//     access_token: 'mockAccessToken'
//   }
// }

// /**
//  * Constant for getting content
//  */
// export const resolveDataContent = {
//   payload: {
//     title: 'mockTitle',
//     content: 'mock content first line<br>mock content second line<br>mock content third line'
//   }
// }

// /**
//  * Auth contants
//  */
// export const resolveDataSignIn = {
//   payload: {
//     email: 'mockEmail',
//     user_name: 'mockUserName'
//   },
//   message: 'mockMessage'
// }
// export const rejectDataSignIn = {
//   response: {
//     status: 400,
//     data: {
//       message: 'mock error message'
//     }

// export const rejectData = {
//   response: {
//     data: {
//       message: 'Error message'
//     },
//     status: 404,
//     headers: { header: 'Some header' }
//   },
//   config: { config: 'Some config' }

// }

// export const logInSuccessArgs = {
//   user_name: 'mockUserName',
//   email: 'mockEmail',
//   isAdmin: true,
//   access_token: 'mockAccessToken',
//   refresh_token: 'mockRefreshToken'
// }
// // ==================================================================================

// export const resolveDataRefreshPassword = {
//   data: {
//     message: 'mock refresh token message',
//     payload: {
//       access_token: 'mock access token'
//     }
//   }
// }

// export const resolveDataTechInGet = {
//   data: {
//     message: 'There are 2 locales in our database as follows:',
//     payload: [
//       {
//         remarks: 'General english.',
//         id: 'en'
//       },
//       {
//         remarks: 'Общий русский.',
//         id: 'ru'
//       }
//     ]
//   }
// }
