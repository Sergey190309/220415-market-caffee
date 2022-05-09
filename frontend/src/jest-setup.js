import '@testing-library/jest-dom'
import 'jest-styled-components'
import 'regenerator-runtime/runtime'
import 'jest-localstorage-mock'

const nodeCrypto = require('crypto');
window.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer);
  }
}
