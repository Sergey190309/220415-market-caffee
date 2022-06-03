export const landingPageStructure = {
  '00': { type: 'header' },
  '01': { qnt: 3, type: 'vblock', subtype: 'txt' },
  '02': { qnt: 2, type: 'hblock', subtype: 'pix' },
  '03': { qnt: 2, type: 'vblock', subtype: 'pix' },
  '04': { type: 'footer' },
  '05': { type: 'unknown' }
}

// ==================================================================================
export const landing = {
  '00': {
    type: 'header'
  },
  '01': {
    qnt: 3,
    type: 'vblock',
    subtype: 'txt'
  },
  '02': {
    qnt: 2,
    type: 'hblock',
    subtype: 'pix'
  },
  '03': {
    qnt: 2,
    type: 'vblock',
    subtype: 'pix'
  },
  '04': {
    type: 'footer'
  }
}

export const pictures = {
  '00': {
    type: 'header'
  },
  '01': {
    qnt: 2,
    type: 'hblock',
    subtype: 'pix'
  },
  '02': {
    type: 'footer'
  }
}

const admin = {}

export const structuresArr = [{ landing }, { pictures }, { admin }]
export const structuresObj = { landing, pictures, admin }

// ==================================================================================
export const regularUserPayload = {
  user_name: 'mockUserName',
  email: 'mockEmail',
  isAdmin: false,
  access_token: 'mockAccessToken',
  refresh_token: 'mockRefreshToken'
}
// ==================================================================================
export const adminUserPayload = {
  ...regularUserPayload,
  isAdmin: true
}
