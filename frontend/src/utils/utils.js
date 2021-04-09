export const idsByIdNum = (id, qnt) => {
  const ids = [];
  let index = 0;
  while (index < qnt) {
    let result ;
    if (index < 10) {
      result = `_0${index}`
    } else {
      result = `_${index}`
    }
    console.log(result, 'type -', typeof (result))
    index++
  }
  return ids
}