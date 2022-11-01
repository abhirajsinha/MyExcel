let addSheetBtn = document.querySelector(".sheet-add-icon");
let sheetFolderCotn = document.querySelector(".sheets-folder-container");
let graphComponentMatrix = [];
let activeSheetColor = "#ced6e0";

addSheetBtn.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("id", allSheetFolders.length);
  sheet.innerHTML = ` <div class="sheet-container">Sheet ${
    allSheetFolders.length + 1
  }</div>
    `;

  sheetFolderCotn.appendChild(sheet);
  //Storage for sheets
  createSheetDB();
  createGraphComponentMatrix();
  handleSheetActiveness(sheet);
  handleSheetRemoval(sheet);
  handleSheetUI(sheet);
  sheet.click();
});

function createSheetDB() {
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
        value: "",
        formula: "",
        children: [],
      };
      sheetRow.push(cellProps);
    }

    sheetDB.push(sheetRow);
  }
  collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      // Why array -> More than 1 child relation(dependency)
      row.push([]);
    }
    graphComponentMatrix.push(row);
  }

  collectedGraphComponent.push(graphComponentMatrix);
}

function handleSheetActiveness(sheet) {
  sheet.addEventListener("click", (e) => {
    let sheetIndex = Number(sheet.getAttribute("id"));
    handleSheetDB(sheetIndex);
    handleSheetProperties(sheet);
  });
}

function handleSheetDB(sheetIndex) {
  sheetDB = collectedGraphComponent[sheetIndex];
  graphComponentMatrix = collectedGraphComponent[sheetIndex];
}

function handleSheetProperties() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      cell.click();
    }
  }
  //By Default click on 0th row, 0th col -> 1st cell [whenever the application open]
  //here .cell will give us the access of first cell
  let firstCell = document.querySelector(".cell");
  firstCell.click();
}

function handleSheetUI(sheet) {
  let allSheetFolders = document.querySelectorAll(".sheet-folder");

  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].style.backgroundColor = "transparent";
  }
  sheet.style.backgroundColor = activeSheetColor;
}

function handleSheetRemoval(sheet) {
  sheet.addEventListener("mousedown", (e) => {
    // 0 - leftClick, 1 - scrollBar, 2 - rightClick
    if (e.button !== 2) {
      return;
    }

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    if (allSheetFolders.length === 1) {
      alert("You need to have atleast 1 sheet");
      return;
    }

    let response = confirm(
      "Your sheet will be removed permanently, Are you sure?"
    );
    if (!response) return;

    let sheetIndex = Number(sheet.getAttribute("id"));
    //DB
    collectedSheetDB.splice(sheetIndex, 1);
    collectedGraphComponent.splice(sheetIndex, 1);
    //UI
    handleSheetUIRemoval(sheet);

    //Afte removing bring sheet1 to active sheet
    sheetDB = collectedGraphComponent[0];
    graphComponentMatrix = collectedGraphComponent[0];
    handleSheetProperties();
  });
}

function handleSheetUIRemoval(sheet){
  sheet.remove();
  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  for(let i=0;i<allSheetFolders.length;i++){
    allSheetFolders[i].setAttribute("id",i);
    let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
    sheetContent.innerText = `Sheet ${i+1}`;
    allSheetFolders[i].style.backgroundColor = "transparent";
  }
  allSheetFolders[0].style.backgroundColor =  activeSheetColor; 
}