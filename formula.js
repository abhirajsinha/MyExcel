for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activeCell, cellProp] = getCellAndCellProp(address);
      let enteredData = activeCell.innerText;

      cellProp.value = enteredData;
      //   console.log(cellProp);
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
  let inputFormula = formulaBar.value;
  if (e.key === "Enter" && inputFormula) {
    let evaluatedValue = evaluateFormula(inputFormula);

    //If change in formula then remove old Parent Child relation -> evaluate new Parent Child relation and then add new Parent Child relation
    let adress = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(adress);
    if (inputFormula !== cellProp.formula) {
      removeChildFromParent(cellProp.formula);
    }

    // Update UI and CellProp in DB
    setCellUIAndCellProp(evaluatedValue, inputFormula, adress);

    //Establish Parent child relationship
    addChildToParent(inputFormula);
    updateChildrenCells(adress);
    console.log(sheetDB);
  }
});

function addChildToParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    //Get first value A1 = A;
    let asciiValue = encodedFormula[i].charCodeAt(0);
    //check if it is value of any adress
    if (asciiValue >= 65 && asciiValue <= 90) {
      //Decode and get its value
      let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
      parentCellProp.children.push(childAddress);
    }
  }
}

function removeChildFromParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    //Get first value A1 = A;
    let asciiValue = encodedFormula[i].charCodeAt(0);
    //check if it is value of any adress
    if (asciiValue >= 65 && asciiValue <= 90) {
      //Decode and get its value
      let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
      let index = parentCellProp.children.indexOf(childAddress);
      parentCellProp.children.splice(idx, 1);
    }
  }
}

function updateChildrenCells(parentAddress) {
  let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
  let childrens = parentCellProp.children;

  for (let i = 0; i < childrens.length; i++) {
    let childAddress = children[i];
    let [childCell, childCellProp] = getCellAndCellProp(childAddress);
    let childFormula = childCellProp.formula;

    let evaluatedValue = evaluateFormula(childFormula);
    setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
    //call recursion to update all cells
    updateChildrenCells(childAddress);
  }
}

function evaluateFormula(formula) {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    //Get first value A1 = A;
    let asciiValue = encodedFormula[i].charCodeAt(0);
    //check if it is value of any adress
    if (asciiValue >= 65 && asciiValue <= 90) {
      //Decode and get its value
      let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }

  let decodedFormula = encodedFormula.join(" ");
  return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula, address) {
  // let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);
  //UI Update
  cell.innerText = evaluatedValue;

  //DB Update
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
}
