const newNotesEvent = document.querySelector(".add-note");
const notesList = document.querySelector(".notes-list");
const saveNotesEvent = document.querySelector(".save-note");
const modeEvent = document.querySelector("#switch-button");
const selectNotesEvent = document.querySelector(".main-container");

const notesHeading = document.querySelector(".text-title");
const notesBody = document.querySelector(".text-body");
const deleteNotesEvent = document.querySelector(".delete-note");


// Events
document.addEventListener("DOMContentLoaded", getNotes);
newNotesEvent.addEventListener("click", addNotes);
saveNotesEvent.addEventListener("click", saveNotes);

// selectNotesEvent.addEventListener("click", selectedNotes);
deleteNotesEvent.addEventListener("click", deleteNotes);


// functions
function createNote (newNote) {
    // Notes DIV
    const notesDiv = document.createElement("div");
    notesDiv.classList.add("main-container");

    // Create heading
    const notesTitle = document.createElement("div");
    notesTitle.classList.add("notes-title");
    notesTitle.innerText = newNote.title ;
    notesDiv.appendChild(notesTitle);

    // Create para
    const newNotes = document.createElement("p");
    newNotes.classList.add("notes-item");
    newNotes.innerText = newNote.note ;
    notesTitle.appendChild(newNotes);

    // APPEND TO LIST (div)
    notesList.appendChild(notesDiv);
}

function loadEmptyNotes () {
    notesHeading.value = "";
    notesBody.value = "";
}
// function selectedNotes (){
//     // Display the selected notes back to main notes from sidebar
//     // const selectedTitle = document.
//     alert("you are in selected notes!") ;
// }
function defaultNotes() {
    var note = [];
    var notes = [];

    // alert("defaultnote!");
    note.title = "Welcome to NoteShelf!";
    note.note = "The custom notes, you can add, edit and delete notes here";
    createNote (note);

    // console.log(note.note);
    notes.push(note);

    loadEmptyNotes();
}

function getNotes() {
    // If local storage is empty than load new notes with untitled - title and notes body with notes.

    var notes;

    defaultNotes();
    
    if (localStorage.getItem("notes") == null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }
    
    notes.forEach((note) => {        
        createNote(note);
    
    });
}

function saveNotes() {

    // CHECK already have things in there?
    var notes;
    var title;
    var note;
    var newNotes = {};
    newNotes = {title: notesHeading.value, note: notesBody.value};

    // alert("inside savenotes!");
    title = notesHeading.value;
    note = notesBody.value;
    if (localStorage.getItem("notes") === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }

    if(title === "" || notes === "") {
        alert("Notes is empty!");
    }
    else {
        createNote(newNotes);
        
        // add new notes ready to store
        notes.push(newNotes);

        // Store new notes to localstorge 
        localStorage.setItem("notes", JSON.stringify(notes));

        // Clear the notes area for new notes
        loadEmptyNotes();
    }

}

function addNotes() {
    // alert("clicked add notes!");

    var newNote = {};

    if(notesHeading.value === "" || notesBody.value === "") {
        alert("Empty notes is already open!");

    } else {
        newNote = {title: notesHeading.value, note: notesBody.value};
        createNote(newNote);

        // Clear the notes area for new notes
        loadEmptyNotes();
    }

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

