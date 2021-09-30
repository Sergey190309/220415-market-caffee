export const createContextFromEvent = event => {
  const left = event.clientX
  const top = event.clientY
  const right = left + 1
  const bottom = top + 1
  // console.log('createContextFromEvent:\n',
  //   '\n right ->', right,
  //   '\n bottom ->', bottom
  // )
  return {
    getBoundingClientRect: () => ({
      left,
      top,
      right,
      bottom,

      height: 0,
      width: 0
    })
  }
}
