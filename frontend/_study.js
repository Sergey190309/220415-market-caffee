const loadedStructure = {
  '00': { type: 'header' },
  '01': { qnt: 3, type: 'vblock', subtype: 'txt' },
  '02': { qnt: 2, type: 'hblock', subtype: 'pix' },
  '03': { qnt: 2, type: 'vblock', subtype: 'pix' },
  '04': { type: 'footer' },
}

const result = Object.entries(loadedStructure['00'])

console.log(result[0].join(''))