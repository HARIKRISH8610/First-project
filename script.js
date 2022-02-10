var inNotes = document.getElementById("note");
var inCards = document.getElementById("cards");

onLoadNotes();
function onLoadNotes() {
  if (localStorage.key("Notes") == null) {
    nullInnerHtml();
  } else {
    innerHtml();
  }
}

function nullInnerHtml() {
  inCards.innerHTML = "";
  inCards.innerHTML = `
    <div class="container-fluid col-6">
    <h5>
        <span class="iconNotes">

            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" fill="currentColor" class="bi bi-sticky"
                viewBox="0 0 16 16">
                <path
                    d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V8H9.5A1.5 1.5 0 0 0 8 9.5V14H2.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V9.5a.5.5 0 0 1 .5-.5h4.293L9 13.793z" />
            </svg>
        </span>

        ....... Their is no Notes to show.Please add the Notes.</h5>

</div>`;
}

function innerHtml() {
  var newLocalNotes = localStorage.getItem("Notes").split(",");
  inCards.innerHTML = "";
  newLocalNotes.forEach(function (element, index) {
    inCards.innerHTML += `   <div class="mt-5 mb-2 animate__animated animate__fadeIn cardbody">
<div class=" stCard  border text-center">
   <div class="card-header fw-bold">
       Notes : ${index + 1}
   </div>
   <div class="card-body">
       <p class="card-text cardWidth">${element}</p>
       <button type="button" value="${
         index + 1
       }" onclick="onDelete(this.value)" class="btn btnDelete">Delete</button>
   </div>
</div>
</div>`;
  });
}

var arrNotes = [];
function fnSubmit() {
  if (inNotes.value == "") {
    var alert = document.getElementsByClassName("alert")[0];
    alert.setAttribute("style", "display:block !important");
    setTimeout(() => {
      alert.setAttribute("style", "display:none !important");
    }, 2000);
  } else {
    var strSreach = inNotes.value.includes(",");
    if (strSreach !== true) {
      var confirmSmt = confirm("Are you sure to submit.");
      if (confirmSmt) {
        if (localStorage.key("Notes") !== null) {
          arrNotes = [];
          var getLocalNotes = localStorage.getItem("Notes").split(",");
          arrNotes.push(getLocalNotes, inNotes.value);
          localStorage.setItem("Notes", arrNotes);
        } else {
          localStorage.setItem("Notes", inNotes.value);
        }
        innerHtml();
      }
    } else {
      var alertComma = document.getElementsByClassName("alert")[1];
      alertComma.setAttribute("style", "display:block !important");
      setTimeout(() => {
        alertComma.setAttribute("style", "display:none !important");
      }, 2000);
    }
  }
  inNotes.value="";
}

function fnReset() {
  inNotes.value = "";
}

function onDelete(clickDlt) {
  var confirmDlt = confirm("Are you sure to delete the note?");
  if (confirmDlt) {
    var getLocalNotes = localStorage.getItem("Notes").split(",");
    getLocalNotes.forEach(function (element, index) {
      var value = index + 1;
      if (value == clickDlt) {
        getLocalNotes.splice(index, 1);
        localStorage.setItem("Notes", getLocalNotes);
        innerHtml();
      }
    });
  }
  if (localStorage.getItem("Notes") == "") {
    localStorage.removeItem("Notes");
    nullInnerHtml();
  }
}
