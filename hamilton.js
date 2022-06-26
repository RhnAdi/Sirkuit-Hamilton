const template = document.getElementById("template");

class HamiltonianCycle {
  constructor () {
    this.v = 6;
    this.path = [];
  }

  isSafe (v, graph, path, pos) {
    // if (graph[path[pos - 1]][v] == 0) {
    //   return false;
    // }
    if (graph[path[pos - 1]][v] == 0) {
      console.log("isSafe = " + false);
    } else {
      console.log("isSafe = " + true)
    }
    console.log("graph = ", graph)
    console.log("path = " + path)
    console.log("v = " + v);
    console.log("pos = " + pos)
    console.log("path[pos - 1] = " + path[pos - 1]);
    console.log("graph[path[pos - 1]][v] = " + graph[path[pos - 1]][v]);
    console.log("+++++++++++++")
    for (let i = 0; i < pos; i++) {
      console.log("============")
      console.log("i = " + i);
      console.log("(path[i] == v) = " + false);
      console.log("============")
      if (path[i] == v) return false;
    }
    console.log("============")
    console.log("(path[i] == v) = " + true);
    console.log("============")
    return true
  }

  hamCycle (graph) {
    this.path = new Array(this.v).fill(0);

    for (let i = 0; i < this.v; i++) this.path[i] = -1;

    this.path[0] = 0;
    if (this.hamCycleUtil(graph, this.path, 1) == false) {
      document.write("Solution Does not Exist <br>")
    }
  }

  hamCycleUtil (graph, path, pos) {
    for (let v = 0; v < this.v; v++) {
      if (this.isSafe(v, graph, path, pos)) {
        // path[pos] = v; 
        // atau
        this.path[pos] = v;
        this.hamCycleUtil(graph, path, pos + 1);
        // this.path[v] = -1
      }
    }
    return false;
  }
}

var graph1 = [
  [0, 1, 1, 1, 0, 0],
  [1, 0, 1, 0, 1, 0],
  [1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1],
  [0, 1, 0, 1, 0, 1],
  [0, 0, 1, 1, 1, 0]
];

var hamiltonian = new HamiltonianCycle();
 
// Print the solution
// hamiltonian.hamCycle(graph1);