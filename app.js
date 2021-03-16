const newNotesEvent = document.querySelector(".add-note");
const notesList = document.querySelector(".notes-list");
const saveNotesEvent = document.querySelector(".save-note");

const notesHeading = document.querySelector(".text-title");
const notesBody = document.querySelector(".text-body");
const deleteNotesEvent = document.querySelector(".delete-note");
// var untitledNote = document.getElementsByClassName("untitled-note");
// var notesContent = document.getElementsByClassName("notes-body");


// Events
document.addEventListener("DOMContentLoaded", getNotes);
newNotesEvent.addEventListener("click", addNotes);
// saveNotesEvent.addEventListener("click", saveNotes);
deleteNotesEvent.addEventListener("click", deleteNotes);


// functions
function getNotes() {
    // If local storage is empty than load new notes with untitled - title and notes body with notes.

    let notes;

    if (localStorage.getItem("notes") == null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }

    
    notes.forEach(function (note) {
        console.log(note.note);
        // Notes DIV
        const notesDiv = document.createElement("div");
        notesDiv.classList.add("main-container");

        // Create heading
        const notesTitle = document.createElement("div");
        notesTitle.classList.add("notes-title");
        
        // Create para
        const newNotes = document.createElement('p');
        newNotes.classList.add("notes-item");
        notesTitle.appendChild(newNotes);

        notesDiv.appendChild(notesTitle);

        if (note.title === "" || note.note === "") {
            notesTitle.innerText = "Untitled note";
            newNotes.innerText = "Note";
        } else {
            notesTitle.innerText = note.title;
            newNotes.innerText = note.note;
        }

        // APPEND TO LIST (div)
        notesList.appendChild(notesDiv);
    });

}

function saveLocalNotes() {

    // CHECK already have things in there?
    let notes;
    let title;
    let note;

    title = notesHeading.value;
    note = notesBody.value;
    if (localStorage.getItem("notes") === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }

    // notes.push({heading, content});
    notes.push({
        title,
        note
    });
    localStorage.setItem("notes", JSON.stringify(notes));

}

function addNotes() {
    // alert("clicked add notes!");

    // // Todo DIV
    // const notesDiv = document.createElement("div");
    // notesDiv.classList.add("notes");

    // // Create LI
    // const newNotes = document.createElement('p');
    // newNotes.classList.add("notes-item");
    // notesDiv.appendChild(newNotes);

    const notesDiv = document.createElement("div");
    notesDiv.classList.add("main-container");

    // Create heading
    const notesTitle = document.createElement("div");
    notesTitle.classList.add("notes-title");
   
    // Create para
    const newNotes = document.createElement('p');
    newNotes.classList.add("notes-item");
    notesTitle.appendChild(newNotes);

    notesDiv.appendChild(notesTitle);

    // Todo DIV
    // const notesDiv = document.createElement("div");

    // notesDiv.classList.add("notes");
    // // Create LI
    // const newNotes = document.createElement('p');

    // newNotes.classList.add("notes-item");
    // notesDiv.appendChild(newNotes);

    if (notesHeading.value === "" || notesBody.value === "") {

        notesTitle.innerText = "Untitled note";
        newNotes.innerText = "Note";
        alert("new notes is already open!");
    } else {
        notesTitle.innerText = notesHeading.value;
        newNotes.innerText = notesBody.value;

        saveLocalNotes();
    }
    // console.log(notesHeading.value);
    // console.log(notesBody.value);
    // SAVE to local storage
    // saveLocalTodos(todoInput.value);

    // // CHECK MARK BUTTON
    // const completedButton = document.createElement("button");
    // completedButton.innerHTML = '<i class="fas fa-check"></i>';
    // completedButton.classList.add("complete-btn");
    // todoDiv.appendChild(completedButton);
    // // CHECK TRASH BUTTON
    // const trashButton = document.createElement("button");
    // trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    // trashButton.classList.add("delete-btn");
    // todoDiv.appendChild(trashButton);

    // APPEND TO LIST (div)
    notesList.appendChild(notesDiv);

    notesHeading.value = "";
    notesBody.value = "";
}

// deleteNotesEvent.addEventListener("click", () => {
//     alert("clicked delete note!");


// });


// var notesTypeEvent = document.querySelector(".notestype");

// notesTypeEvent.addEventListener("click", () => {
//     alert("notes type");
// });

// save notes 
// function saveNotes() {

//     console.log(notesHeading.value);
//     console.log(notesBody.value);

//     if(notesHeading.value === "" || notesBody.value === "") {
//         alert("notes heading or body can't be empty!");
//     }

//     // Todo DIV
//     const notesDiv = document.createElement("div");
//     notesDiv.innerText = notesHeading.value;
//     notesDiv.classList.add("notes");
//     // Create LI
//     const newNotes = document.createElement('p');
//     newNotes.innerText = notesBody.value;
//     newNotes.classList.add("notes-item");
//     notesDiv.appendChild(newNotes);


// }


// select the notes color
// function pickNoteColor (numberOfColors) {
//     return Math.floor(Math.random() * numberOfColors);
// }

// var notesBodyColor = ["#ff8585", "#ffb396", "#fff5c0", "#86aba1","#c9cbff", "#cfdac8", "#cae4db", "#ffd56b", "#96bb7c"];
// var colorIndex = pickNoteColor(notesBodyColor.length);

// notesTypeEvent.style.backgroundColor = String(notesBodyColor[colorIndex]);

// // new notes 
// function newNotes() {

// }

function  removeLocalNotes(note) {

    // CHECK -- DO I already have thing in there?
    let notes;
    if (localStorage.getItem("notes") === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }

    const noteIndex = note.children[0].innerText;
    notes.splice(notes.indexOf(noteIndex), 1);
    localStorage.setItem("notes", JSON.stringify(notes));

}
// delete notes
function deleteNotes(e) {
    // var key = document.getElementById('key').value();
    // localStorage.removeItem(key);
    // console.log("deleted notes sucessfully!");

    const item = e.target;

    // Delete note
    if (item.classList[0] === 'delete-btn') {
        const note = item.parentElement;

        // Animation
        note.classList.add("fall");
        // remove from localstorage
        removeLocalNotes(note);
        note.addEventListener("transitionend", function () {
            note.remove();
        });

    }
}