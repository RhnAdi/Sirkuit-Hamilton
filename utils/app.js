const paths = document.getElementById("paths");
const add_side_button = document.getElementById("add_side_button");
const side_wrapper = document.getElementById("side_wrapper");
const next_button = document.getElementById("next_button");
const side_container = document.getElementById("side_container");
const calculate = document.getElementById("calculate");
const error_alert = document.getElementById("error_alert");
const error_message = document.getElementById("error_message");
const summary = document.getElementById("summary");
const n = document.querySelectorAll("#n");
const reveals_cycles_template = document.getElementById("reveals_cycles");
const cycles_template = document.getElementById("cycles");
const circuit_wrapper = document.getElementById("circuits_wrapper");
const short_circuit_template = document.getElementById("short_circuit");
const short_length = document.getElementById("short_length");

class Hamiltonian {
  constructor () {
    this.cycle = [];
  }

  checkVertex (v, matriks, jalur, y) {
    if(matriks[jalur[y - 1]][v] === 0) return false;
    for(let i = 0; i < y; i++) {
      if (jalur[i] === v) return false;
    }
    return true;
  }
  
  cari_jalur (matriks, jalur, y, panjangSimpul) {
    if (y === panjangSimpul) {
      return true;
    }
    for (let x = 0; x < panjangSimpul; x++) {
      if(this.checkVertex(x, matriks, jalur, y)) {
        jalur[y] = x;
        if (this.cari_jalur(matriks, jalur, y + 1, panjangSimpul)) {
          if(matriks[jalur[y]][jalur[0]] == 1) {
            let jalur_baru = [];
            jalur.map((path) => {
              jalur_baru.push(path);
            });
            jalur_baru.push(jalur_baru[0]);
            this.cycle.push(jalur_baru);
          }
        }
      }
    }
    return false
  }

  hamilton (matriks, panjangSimpul) {
    let jalur = new Array(panjangSimpul).fill(-1);
    jalur[0] = 0;
    this.cari_jalur(matriks, jalur, 1, panjangSimpul);
    return this.cycle;
  }
}

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function delete_input_side (e) {
  e.parentNode.remove();
}

function add_side () {
  const add_options = () => { 
    let str = "";
    for (let i = 0; i < parseInt(paths.value); i++) {
      str += `<option value="${i + 1}">${i + 1}</option>`
    }
    return str;
  }
  const raw_side_html = `<div id="side" class="d-flex gap-2 my-2">
    <div class="input-group">
      <span class="input-group-text">Side</span>
      <select class="form-select">
        <option selected>Choose Path</option>
        ${add_options()}
      </select>
      <select class="form-select">
        <option selected>Choose Path</option>
        ${add_options()}
      </select>
    </div>
    <input class="form-control" placeholder="Value" type="number" />
    <button type="button" class="btn btn-danger" onclick="delete_input_side(this)"><i class="bi bi-trash"></i></button>
  </div>`;
  
  const side = createElementFromHTML(raw_side_html);
  side_wrapper.appendChild(side);
}

function check_array (arr1, arr2) {
  let v = 0;
  arr1.map((a) => {
    arr2.map((b) => {
      if (a == b) {
        v++;
      }
    })
  })
  if (v == arr1.length) {
    return true;
  }
  return false;
}

function faktorial(k){
	let angka=1;
	let faktor=1;
	 while(angka<=k){
		 faktor=faktor*angka;
		 angka=angka+1;
	 }
	 return faktor;
}

next_button.addEventListener("click", (e) => {
  if (parseInt(paths.value) < 3) {
    error_alert.setAttribute("class", "alert alert-warning alert-dismissible fade show");
    error_message.innerText = "Vertices cannot be < 3.";
    return false;
  }
  side_container.setAttribute("class", "");
  e.target.setAttribute("class", "d-none");
  add_side();
})


add_side_button.addEventListener("click", () => {
  add_side();
})


calculate.addEventListener("click", () => {
  let adjacencyMatrix = [];
  for (let a = 0; a < parseInt(paths.value); a++) {
    let initPath = new Array(parseInt(paths.value)).fill(0);
    adjacencyMatrix.push(initPath);
  }
  const sides = document.querySelectorAll("#side");

  const data = [];
  for (let i = 0; i < sides.length; i++) {
    const side = sides[i].children[0];
    const path1 = side.children[1].options.selectedIndex;
    const path2 = side.children[2].options.selectedIndex;
    const val = sides[i].children[1].value; 

    if (path1 != path2) {
      adjacencyMatrix[path1 - 1][path2 - 1] = 1;
      adjacencyMatrix[path2 - 1][path1 - 1] = 1;
      data.push({ sisi: [path1 - 1, path2 - 1], value:  parseInt(val)})
    } else {
      error_alert.setAttribute("class", "alert alert-warning alert-dismissible fade show");
      error_message.innerText = "Paths cannot be the same.";
      return false;
    }
  }
  const h = new Hamiltonian();
  const rute = h.hamilton(adjacencyMatrix, parseInt(paths.value));
  
  const result = rute.map((route, index) => {
    const myRute = { route, long: 0 }
    route.map((path, idx) => {
      const side = [path, route[idx + 1]];
      data.map((side_and_value, i) => {
        if(check_array(side, side_and_value.sisi)){
          myRute.long += side_and_value.value;
        }
      })
    })
    return myRute;
  })

  const reveals_cycles = faktorial(parseInt(paths.value));
  const cycles = faktorial(parseInt(paths.value) - 1)/2;

  const sort_my_data = result.sort((a, b) => a.long - b.long);
  const short_circuit = sort_my_data[0];

  for (let i = 0; i < n.length; i++) {
    n[i].innerText = paths.value;
  }

  reveals_cycles_template.innerText = reveals_cycles;
  cycles_template.innerText = cycles;

  result.map((myData) => {
    const li = document.createElement("li");
    let str = "";
    myData.route.map((myvertex, idx) => {
      if (idx === myData.route.length - 1) {
        str += `${myvertex}`;
      } else {
        str += `${myvertex} → `
      }
    })
    str += ` : ${myData.long}.`
    li.innerText = str;
    circuit_wrapper.appendChild(li);
  })
  let str_short_circuit = "";
  short_circuit.route.map((myPath, idx) => {
    if (idx == short_circuit.route.length - 1) {
      str_short_circuit += `${myPath}`;
    } else {
      str_short_circuit += `${myPath} → `;
    }
  })
  short_circuit_template.innerText = str_short_circuit;
  short_length.innerText = short_circuit.long;

  summary.setAttribute("class", "card bg-white my-3");
})