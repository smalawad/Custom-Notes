const notesList = document.querySelector(".notes-list");
const modeEvent = document.querySelector("#switch-button");
const notesHeading = document.querySelector(".text-title");
const notesBody = document.querySelector(".text-body");
const selectNotesEvent = document.querySelector(".notes-container");
const newNotesEvent = document.querySelector(".add-note");
const saveNotesEvent = document.querySelector(".save-note");
const deleteNotesEvent = document.querySelector(".delete-note");

// Events
document.addEventListener("DOMContentLoaded", getNotes);
newNotesEvent.addEventListener("click", addNotes);
saveNotesEvent.addEventListener("click", saveNotes);
selectNotesEvent.addEventListener("click", selectedNotes);
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

function selectedNotes (event){
   // Display the selected notes back to main notes from sidebar
    const item = event.target;

    let notes;
    if (localStorage.getItem("notes") === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }
    
    if (item.classList[0] === 'notes-title') {
        var title = item.parentElement;
        var note = item.children[0].innerText;
        
        var selindex = notes.findIndex(item => item.note === note);
        var selnotes = [];
        selnotes = Object.assign({}, notes[selindex]);

        notesHeading.value = selnotes.title;
        notesBody.value = selnotes.note;

        title.style.backgroundColor = "#7fb9e9";
        // console.log(title);
        // console.log(title.classList[0]);
        // title.classList[0] = 'main-container-selected';
        // console.log(title.classList[0]);
        // title.classList.add("main-container-selected")
        // console.log(title.classList);
    }
}

function defaultNotes() {
    var note = [];
    var notes = [];

    // alert("defaultnote!");
    note.title = "Welcome to NoteShelf!";
    note.note = "The custom notes, you can add, edit and delete notes here";
    createNote (note);

    notes.push(note);

    loadEmptyNotes();
}
// load notes from localstorage
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
// save notes to localstorage
function saveNotes() {
    var notes;
    var title;
    var note;
    var newNotes = {};
    newNotes = {title: notesHeading.value, note: notesBody.value};

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
// Remove notes from localstorage
function  removeNotes(notesIndex) {
    var notes;

    if (localStorage.getItem("notes") === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }
   
    notes.splice(notesIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));

    location.reload();
}

// delete notes
function deleteNotes(event) {
    const item = event.target;
    var notes;

    if (localStorage.getItem("notes") === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }

    var delnote = notesBody.value;
    if(delnote === "") {
        alert("Please select a notes you want to delete");
    } else {
        var index = notes.findIndex(item => item.note === delnote);
        removeNotes(index);
    }    
}
