let graphComponentMatrix = [];
for (let i = 0; i < rows; i++) {
  let row = [];
  for (let i = 0; i < close; i++) {
    row.push([]);
  }

  graphComponentMatrix.push(row);
}

// Function return boolean where True -> cycle , false-> non-cyclic
function isGraphCyclic(graphComponentMatrix) {
  //Dependency to use the functions
  //Visited[]
  //DFS[][]
  let visited = []; //Node tracing
  let dfsVisited = []; //Stack tracking

  for (let i = 0; i < rows; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];
    for (let j = 0; j < cols; i++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
  }

  for (let i = 0; i < rows; i++) {
    let visitedRow = [];
    let dfsVisited = [];
    for (let j = 0; j < cols; i++) {
      let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
      if(response==true){
        //Cycle found
        return true;
      }
    }
  }

  return false;
}

//Start -> mark visited true and dfsVisited true
//end -> dfsVisited mark false
//If visited[i][j] == true then already explored path so, go back
//cycleDetection cond -> if visited[i][j] == true && dfsVisited[i][j] == true
//Function return boolean where True -> cycle , false-> non-cyclic
function dfsCycleDetection(
  graphComponentMatrix,
  srcRow,
  srcCol,
  visited,
  dfsVisited
) {
  visited[srcRow][srcCol] = true;
  dfsVisited[srcRow][srcCol] = true;

  for (
    let child = 0;
    child < graphComponentMatrix[srcRow][srcCol].length;
    child++
  ) {
    let [nbrRID, nbrCID] = graphComponentMatrix[srcRow][srcCol];
    if (visited[nbrRID][nbrCID] == false) {
      //Not explored path
      let response = dfsCycleDetection(graphComponentMatrix, nbrRID, nbrCID, visited, dfsVisited);
      if(response==true){
        //Cycle found
        return true;
      }
      else if(visited[nbrRID][nbrCID]==true && dfsVisited[nbrRID][nbrCID]==true){
        return true;
      }
    }
  }

  dfsVisited[srcRow][srcCol] = false;
  return false;
}
