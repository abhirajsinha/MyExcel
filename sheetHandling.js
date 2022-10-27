let addSheetBtn = document.querySelector(".sheet-add-icon");
let sheetFolderCotn = document.querySelector(".sheets-folder-container");

addSheetBtn.addEventListener("click",e=>{
    let sheet =  document.createElement("div");
    sheet.setAttribute("class","sheet-folder");

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolders.length); 
    sheet.innerHTML = 
    ` <div class="sheet-container">Sheet ${allSheetFolders.length+1}</div>
    `;

    sheetFolderCotn.appendChild(sheet);
});