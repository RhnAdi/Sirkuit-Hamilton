const panjangSimpul = 5;
const graph1 = [
  [0, 1, 1, 1, 0, 0],
  [1, 0, 1, 0, 1, 0],
  [1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1],
  [0, 1, 0, 1, 0, 1],
  [0, 0, 1, 1, 1, 0]
];

const graph2 = [
  [0, 1, 0, 1, 0],
  [1, 0, 1, 1, 1],
  [0, 1, 0, 0, 1],
  [1, 1, 0, 0, 1],
  [0, 1, 1, 1, 0]
]
let jalur = new Array(panjangSimpul).fill(-1);
jalur[0] = 0;

let cycle = [];

function checkVertex (v, matriks, jalur, y) {
  if(matriks[jalur[y - 1]][v] === 0) return false;
  for(let i = 0; i < y; i++) {
    if (jalur[i] === v) return false;
  }
  return true;
}

function cari_jalur (matriks, jalur, y) {
  if (y === panjangSimpul) {
    return true;
  }
  for (let x = 0; x < panjangSimpul; x++) {
    if(checkVertex(x, matriks, jalur, y)) {
      jalur[y] = x;
      if (cari_jalur(matriks, jalur, y + 1)) {
        if(matriks[jalur[y]][jalur[0]] == 1) {
          let jalur_baru = [];
          jalur.map((path) => {
            jalur_baru.push(path);
          })
          cycle.push(jalur_baru);
        }
      }
    }
  }
  return false
}

function hamilton (matriks) {
  cari_jalur(matriks, jalur, 1);
  console.log(cycle)
}

hamilton(graph2);