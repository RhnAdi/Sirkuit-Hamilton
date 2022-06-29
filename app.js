// JavaScript program for solution of Hamiltonian
// Cycle problem using backtracking
 
class HamiltonianCycle {
  constructor() {
    this.V = 6;
    this.path = [];
    this.cycle = [];
    this.route = [];
  }

  isSafe(v, graph, path, pos) {
    if (graph[path[pos - 1]][v] == 0) return false;
    for (var i = 0; i < pos; i++) {
      if (path[i] == v) return false;
    }
    return true;
  }

  hamCycleUtil(graph, path, pos) {
    if (pos == this.V) {
      if (graph[path[pos - 1]][path[0]] == 1) {
        return true; 
      }
      else return false;
    }

    // ======================================================== //
    for (var v = 1; v < this.V; v++) {
      if (this.isSafe(v, graph, path, pos)) {
        path[pos] = v;
        if (this.hamCycleUtil(graph, path, pos + 1) === true) {
            this.cycle[v - 1] = path
            console.log(this.cycle)
          // return true;
        }
        // this.hamCycleUtil(graph, path, pos + 1)
        // path[pos] = -1;
      }
    }
    // ======================================================== //

    return false;
  }
 
  hamCycle(graph) {
    this.path = new Array(this.V).fill(0);

    for (var i = 0; i < this.V; i++) this.path[i] = -1;

    this.path[0] = 0;
    this.hamCycleUtil(graph, this.path, 1)
    // if (this.hamCycleUtil(graph, this.path, 1) == false) {
    //   document.write("<br>Solution does not exist");
    //   return false;
    // }
    this.printSolution(this.path);
    return this.path;
  }

  allHamCycle(graph) {
    for (let i = 0; i < this.V; i++) {
      if (graph[0][i] == 1) {

      }
    }
  }
 
  printSolution(path) {
    document.write("Solution Exists: Following" + " is one Hamiltonian Cycle <br>");
    for (var i = 0; i < this.V; i++) document.write(" " + path[i] + " ");
      document.write(" " + path[0] + " <br>");
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


var hamiltonian = new HamiltonianCycle(graph1);
 
// Print the solution
hamiltonian.hamCycle(graph1);
 