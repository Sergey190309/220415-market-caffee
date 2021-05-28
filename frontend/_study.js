const supportedLngs = ['cimode', 'en']
const fmBackEnd = ['en', 'ru', 'cn']

const cleanned = []

fmBackEnd.forEach(value => {
  if (!supportedLngs.includes(value)) {
    cleanned.push(value)
  }
})

console.log(cleanned)
