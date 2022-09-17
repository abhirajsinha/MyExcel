let sheetDB = [];

for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < cols; j++) {
    let cellProps = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontFamily: "monospace",
      fontSize: 14,
      fontColor: "#000000",
      BGColor: "#000000", // Just for indication Purpose, default color
    };
    sheetRow.push(cellProps);
  }

  sheetDB.push(sheetRow);
}

//selctors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-grp");
let fontFamily = document.querySelector(".font-family-grp");
let fontColor = document.querySelector(".font-color-prop");
let BGColor = document.querySelector(".BG-color-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlignment = alignment[0];
let centerAlignment = alignment[1];
let rightAlignment = alignment[2];


let activeCell = "#d1d8e0";
let inactiveCell = "#ecf0f1"; 
//Attach Property Listeners -> Application of 2way Binding
bold.addEventListener("click", (e) => {
  //Access active cells
  //Adress
  //Find row and columns values
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);

  //Modification
  cellProp.bold = !cellProp.bold; //action performed
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProp.bold ? activeCell : inactiveCell;
});

italic.addEventListener("click", (e) => {
    //Access active cells
    //Adress
    //Find row and columns values
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCell(address);
  
    //Modification
    cellProp.italic = !cellProp.italic; //action performed
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeCell : inactiveCell;
  });

  underline.addEventListener("click", (e) => {
    //Access active cells
    //Adress
    //Find row and columns values
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCell(address);
  
    //Modification
    cellProp.underline = !cellProp.underline; //action performed
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeCell : inactiveCell;
  });

function getActiveCell(address) {
  let [rid, cid] = decodeRowIDandColID(address);
  //Adress cell & storage object
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    //console.log(cell);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}

function decodeRowIDandColID(address) {
  // address it is in the format of string
  //A1
  let rid = Number(address.slice(1)) - 1; //-1 to get the index
  let cid = Number(address.charCodeAt(0)) - 65;
//   console.log(rowId, colId);
  return [rid, cid];
}
