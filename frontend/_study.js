const source = '01_vblock_txt_13';

const splitted = source.split('_');

const qnt = parseInt(splitted.slice(-1));
// const splCutted = splitted.slice(0, -1);

const idBase = splitted.slice(0, -1).join('_');

// console.log(qnt);
const result = []
for (let i = 0; i < qnt; i++) {
  result.push(idBase.concat('_', i.toString().padStart(2, 0)))
}

console.log(result);