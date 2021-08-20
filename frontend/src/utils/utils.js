// import { reject } from 'lodash'
import { v4 } from 'uuid'
import store from '../redux/store'
import { startAlert, openModal, setMessage } from '../redux/slices'

export const startAlertHelper = payload => {
  /**
   * Used for fire redux action out of react scope.
   * From content saga.
   */
  // console.log('startAlertHelper, payload ->', payload)
  store.dispatch(
    startAlert(
      setAlertData({
        message: payload,
        alertType: 'info',
        timeout: 5000
      })
    )
  )
}

export const confirmPasswordHelper = payload => {
  /**
   * See notes on startAlertHelper.
   */
  // console.log('confirmPasswordHelper, payload ->', payload)
  store.dispatch(setMessage(payload))
  store.dispatch(openModal('confirmPassword'))
}

export const idsByIdNum = (id, qnt) => {
  /**
   * The function returns array build as ['id_00', 'id_01', ..., 'id_<qnt>'],
   * qnt should be less then 100 and not negative.
   */
  qnt = qnt < 0 ? 0 : qnt
  qnt = qnt > 100 ? 100 : qnt
  const ids = []
  for (let index = 0; index < qnt; index++) {
    ids.push(index < 10 ? `${id}_0${index}` : `${id}_${index}`)
  }
  return ids
}

export const makeRecordIdList = recordId => {
  /**
   * The function return recordId in the form '01_vblock_txt_133' return array as below
   * [
   *   '01_vblock_txt_000',
   *   '01_vblock_txt_001',
   *   ...
   *   '01_vblock_txt_132',
  // ]

   */
  const splitted = recordId.split('_')
  let qnt = parseInt(splitted.slice(-1))
  if (isNaN(qnt)) {
    return 0
  }
  qnt = qnt < 1001 ? qnt : 1000
  // console.log(qnt)
  const idBase = splitted.slice(0, -1).join('_')
  const result = []
  for (let i = 0; i < qnt; i++) {
    result.push(idBase.concat('_', i.toString().padStart(3, 0)))
  }
  return result
}

/**
 * The function pouse something for given time. To be used in sagas.
 */
export const delaySomthing = ms => new Promise((resolve, reject) => {
  // reject(new Error('something went wrong'))
  setTimeout(resolve, ms)
})

/**
 * Add uuid into Alert data
 */

export const setAlertData = incomeData => {
  const id = v4()
  return { ...incomeData, id: id }
}
