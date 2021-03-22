const newNotesEvent = document.querySelector(".add-note");
const notesList = document.querySelector(".notes-list");
const saveNotesEvent = document.querySelector(".save-note");

const notesHeading = document.querySelector(".text-title");
const notesBody = document.querySelector(".text-body");
const deleteNotesEvent = document.querySelector(".delete-note");


// Events
document.addEventListener("DOMContentLoaded", getNotes);
newNotesEvent.addEventListener("click", addNotes);
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

    if (notesHeading.value === "" || notesBody.value === "") {

        notesTitle.innerText = "Untitled note";
        newNotes.innerText = "Note";
        alert("new notes is already open!");
    } else {
        notesTitle.innerText = notesHeading.value;
        newNotes.innerText = notesBody.value;

        saveLocalNotes();
    }
    
    // APPEND TO LIST (div)
    notesList.appendChild(notesDiv);

    // notesHeading.value = "";
    // notesBody.value = "";
}

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