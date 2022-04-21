const i18next = jest.createMockFromModule('i18next')

// console.log('mock. i18next ->', i18next.use)
i18next.options = {
  supportedLngs: ['en', 'ru']
}

module.exports = i18next
