// const i18next = jest.createMockFromModule('i18next')

const i18next = {}

i18next['options'] = {
    supportedLngs: ['en', 'ru']
}

console.log(i18next)
console.log(i18next.options.supportedLngs)
console.log(i18next.options.supportedLngs.filter(value => value !== 'ru'))
