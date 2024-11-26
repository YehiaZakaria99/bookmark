var bookmarkName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var editBtn = document.getElementById("editBtn");
var tBody = document.getElementById("tBody");
var alertBox = document.getElementById("alertBox");

var indexBox;

// Render Data To Page
var siteList = [];
if (localStorage.getItem("sites")) {
  siteList = JSON.parse(localStorage.getItem("sites"));
  showData();
}

function siteObj() {
  var site = {
    siteName: bookmarkName.value,
    siteUrl: /^(https?:\/\/)/.test(siteUrl.value)
      ? siteUrl.value
      : `https://${siteUrl.value}`,
  };
  return site;
}
function siteLocalStorage() {
  return localStorage.setItem("sites", JSON.stringify(siteList));
}
// Create Data and Push it To Array
function addSite() {
  if (Validation(bookmarkName) && Validation(siteUrl)) {
    siteObj();
    siteList.push(siteObj());
    siteLocalStorage();
    showData();
    clearInputs();
  } else {
    console.log("err");
    alertBox.classList.replace("d-none", "d-block");
  }
}
// close alert box
document.addEventListener("click", function (e) {
  if (e.target.id == "closeBtn" || e.target.id == "alertBox") {
    alertBox.classList.replace("d-block", "d-none");
  }
});

// clear input
function clearInputs() {
  bookmarkName.value = null;
  siteUrl.value = null;
  clearValid();
}
// clear validation classes
function clearValid() {
  bookmarkName.classList.remove("is-invalid");
  bookmarkName.classList.remove("is-valid");
  siteUrl.classList.remove("is-invalid");
  siteUrl.classList.remove("is-valid");
}
// Display Date to Page
function showData() {
  var tmp = "";
  for (var i = 0; i < siteList.length; i++) {
    tmp += `
                <tr class="py-5">
                  <td>${i + 1}</td>
                  <td>${siteList[i].siteName}</td>
                  <td>
                    <a class="visit-btn d-block btn btn-outline-info py-1 px-1 mx-auto" href="${
                      siteList[i].siteUrl
                    }" target="_blank">
                    <i class="fa-solid fa-eye pe-1"></i>
                    Visit
                    </a>
                  </td>
                  <td><button class="del-btn btn btn-danger py-1 px-1" onclick="delSite(${i})">
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                  </button></td>
                  <td><button class="edit-btn btn btn-outline-warning py-1 px-1" onclick="setDataToEdit(${i})">
                  <i class="fa-solid fa-pen-to-square"></i>
                  Edit
                  </button></td>
                </tr>
    
            `;
  }
  tBody.innerHTML = tmp;
}

// Create new element by clicking submit button
submitBtn.addEventListener("click", function (e) {
  addSite();
});

// Delete Element
function delSite(delIndex) {
  siteList.splice(delIndex, 1);
  siteLocalStorage();
  showData();
}

// Edit
function setDataToEdit(editIndex) {
  bookmarkName.value = siteList[editIndex].siteName;
  siteUrl.value = siteList[editIndex].siteUrl;
  indexBox = editIndex;
  submitBtn.classList.add("d-none");
  editBtn.classList.remove("d-none");
  scroll({
    top: 0,
  });
  bookmarkName.focus();
}

function editSite(e) {
  siteObj();
  siteList.splice(indexBox, 1, siteObj());
  siteLocalStorage();
  showData();
  submitBtn.classList.remove("d-none");
  editBtn.classList.add("d-none");
  clearInputs();
}

editBtn.addEventListener("click", function (e) {
  editSite(e);
});

// Validation
function Validation(el) {
  var regex = {
    bookmarkName: /^\w{1,8}$/,
    siteUrl:
      /^((https?\:\/\/)?(www\.)?)?.{1,}(\.[a-zA-Z0-9]{2,})(\/?.{2,})?$/gm,
  };
  if (regex[el.id].test(el.value)) {
    el.classList.add("is-valid");
    el.classList.remove("is-invalid");
    return true;
  } else {
    el.classList.remove("is-valid");
    el.classList.add("is-invalid");
    return false;
  }
}

document.addEventListener("input", function (e) {
  Validation(e.target);
});
