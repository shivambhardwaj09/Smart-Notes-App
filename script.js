window.addEventListener("load", () => {
  showNotes();
});
// window.addEventListener("scroll", () => {
//   let bgColor = document.getElementsByTagName("header");
//   bgColor.style.backgroundColor = "red";
// });

const addBtn = document.getElementById('add-btn');
const clearAll = document.getElementById('clear-all');

// EVENT CREATED ON ADD BUTTON TO ADD THE NOTES TO THE LOCALSTORAGE
addBtn.addEventListener("click", () => {

  let title = document.getElementById("note-title");
  let text = document.getElementById("note-text");
  let date = document.getElementById("note-date");
  
  if (title.value !== "" && text.value !== "" && date.value !== "") {
    if (localStorage.getItem("notes") === null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(localStorage.getItem("notes"));
    }
    let noteObj = {
      date: date.value,
      title: title.value,
      text: text.value
    }
    notesObj.push(noteObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    date.value = "";
    title.value = "";
    text.value = "";

    showNotes();
  } else {
    return alert("Please provide valid input for DATE or TITLE or TEXT");
  }

});

// FUNCTION CREATED TO DISPLAY ALL THE NOTES FORM THE LOCALSTORAGE
function showNotes() {

  if (localStorage.getItem("notes") === null)
    notesObj = [];
  else
    notesObj = JSON.parse(localStorage.getItem("notes"));

  let notesElement = document.getElementById("notes");
  if (notesObj.length != 0) {
    let html = "";
    notesObj.forEach((element, index) => {
      console.log(typeof(element.date));
      if (element.date !== undefined || element.date !== null) {
        let tempString = element.date;
        let lstDate = tempString.split("-");
        let tempLstDate = lstDate.reverse();
        var stringDate = tempLstDate.join("-");
      }
      html += 
      `
        <section>
          <div class="note">
            <p class="notes-count">Note ${index+1} <span>Date: ${stringDate}</span> </p>
            <h3 class="note-title">${element.title}</h3>
            <p class="note-text">${element.text}</p>
          </div>
          <footer class="button">
              <button id="${index}" onclick="deleteNote(this.id)" class="delete-note-btn">Delete Note</button>
              <button id="${index}" onclick="editNote(this.id)" class="edit-note-btn">Edit Note</button>
          </footer>
        </section>
      `;
    });

    notesElement.innerHTML = html;
    notesElement.style.color = "#000";
  } else {
    notesElement.innerHTML = `No Notes Yet! Add a note using the form above.`;
    notesElement.style.color = "#fff";
  }

}

// FUNCTION CREATED TO DELETE NOTE FROM THE LOCALSTORAGE
function deleteNote(index) {

  let delConfirm = confirm("Do you want to delete this Note");
  if (delConfirm === true) {
    if (localStorage.getItem === null)
      notesObj = [];
    else
      notesObj = JSON.parse(localStorage.getItem("notes"));
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }

}

// FUNCTION CREATED TO EDIT NOTE FROM THE LOCALSTORAGE
function editNote(providedIndex) {

  let editConfirm = confirm("Do you want make changes in the initial data");
  if (editConfirm === true) {
    let editTitle = document.getElementById("note-title");
    let editText = document.getElementById("note-text");
    let editDate = document.getElementById("note-date");
    if (editTitle.value !== "" || editText.value !== "" || editTitle.value === "" || editText.value === "") {
      let x = confirm("Initial data might be present. Do you wanna continue anyway ?");
      if (x === true) {
        if (localStorage.getItem("notes") === null)
          notesObj = [];
        else
          notesObj = JSON.parse(localStorage.getItem("notes"));
        
        // THIS CODE ALSO WORKS FOR ADDING VALUES TO THE INPUTS
        // notesObj.findIndex((element) => {
        //   editTitle.value = element.title;
        //   editText.value = element.text;
        //   editDate.value = element.date;
        // });

        editTitle.value = notesObj[providedIndex].title;
        editText.value = notesObj[providedIndex].text;
        editDate.value = notesObj[providedIndex].date;
        notesObj.splice(providedIndex, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
      }
    }
  }
}

// EVENT CREATED TO CALL A FUNCTION TO CLEAR ALL THE NOTES FROM THE LOCALSTORAGE
clearAll.addEventListener('click', () => {
  
  var x = document.getElementById("notes");
  let enquire = confirm("Do you want to Delete all the notes");
  if (enquire === true) {
    localStorage.clear();
    x.innerHTMl = "";
    showNotes();
  }

})