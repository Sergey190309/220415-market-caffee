export const landingPageStructure = {
  '00': { type: 'header' },
  '01': { qnt: 3, type: 'vblock', subtype: 'txt' },
  '02': { qnt: 2, type: 'hblock', subtype: 'pix' },
  '03': { qnt: 2, type: 'vblock', subtype: 'pix' },
  '04': { type: 'footer' },
}

// ==================================================================================
const landing = {
  '00': {
    type: 'header',
  },
  '01': {
    qnt: 3,
    type: 'vblock',
    subtype: 'txt',
  },
  '02': {
    qnt: 2,
    type: 'hblock',
    subtype: 'pix',
  },
  '03': {
    qnt: 2,
    type: 'vblock',
    subtype: 'pix',
  },
  '04': {
    type: 'footer',
  },
};

const pictures = {
  '00': {
    type: 'header',
  },
  '01': {
    qnt: 2,
    type: 'hblock',
    subtype: 'pix',
  },
  '02': {
    type: 'footer',
  },
};

const admin ={}

export const structures = [
  landing,
  pictures,
  admin
];

