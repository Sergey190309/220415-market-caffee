export const idsByIdNum = (id, qnt) => {
  // The function returns array build as ['id_00', 'id_01', ..., 'id_<qnt>'], qnt should be less then 100 and not negative.

  qnt = qnt < 0 ? 0 : qnt;
  qnt = qnt > 100 ? 100 : qnt;

  const ids = [];

  // let index = 0;
  for (let index = 0; index < qnt; index++) {
    ids.push(index < 10 ? `${id}_0${index}` : `${id}_${index}`);
  }
  // while (index < qnt) {
  //   index++;
  // }
  return ids;
};
