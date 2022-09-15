let rows = 100;
let cols = 26;

let addressColContainer = document.querySelector(".address-column-container");
let addressRowContainer = document.querySelector(".address-row-container");
let cellsContainer = document.querySelector(".cells-container")
for (let i = 0; i < rows; i++) {
  let addressColCell = document.createElement("div");
  addressColCell.setAttribute("class", "address-column");
  addressColCell.innerText = i + 1;
  addressColContainer.appendChild(addressColCell);
}

for (let i = 0; i < cols; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  addressRow.innerText = String.fromCharCode(65 + i);
  addressRowContainer.appendChild(addressRow);
}

for (let i = 0; i < rows; i++) {
    let rowContainer = document.createElement("div");
    rowContainer.setAttribute("class","rowContainer");
    for (let j = 0; j < cols; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class","cell");
        rowContainer.appendChild(cell);
    }
    cellsContainer.appendChild(rowContainer);
}
