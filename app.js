var newNotesEvent = document.querySelector(".add-note");
// var newTitle = document.querySelector("")
var notesHeading = document.getElementById("text-title").value;
var notesBody = document.getElementById("text-body").value;
var untitledNote = document.getElementsByClassName("untitled-note");
var notesContent = document.getElementsByClassName("notes-body");
var notes = {
    // key: 'test',
    // note: 'content'
};

function isNotesEmpty() {
    var numberOfNotes = notes.length;
    if(notes[numberOfNotes - 1].title === "" && notes[numberOfNotes - 1].note === "") {
        return true;
    }
    else {
        return false;
    }
}

newNotesEvent.addEventListener("click", ()=>{
    alert("clicked add notes!");


});

var deleteNotesEvent = document.querySelector(".delete-note");
deleteNotesEvent.addEventListener("click", () => {
    alert("clicked delete note!");

    var noOfNotes = notes.length;
    console.log("in delete: " , noOfNotes);
    alert(noOfNotes);
    for (var i =0; i < noOfNotes; i++) {
        alert("in d loop ", i);
    }

});


var notesTypeEvent = document.querySelector(".notestype");

notesTypeEvent.addEventListener("click", () => {
    alert("notes type");
});

var saveNotes = document.querySelector(".save-note");
saveNotes.addEventListener("click", () => {
    // alert("Hey! you are save note");
    var notesHeading = document.getElementById("text-title").value;
    var notesBody = document.getElementById("text-body").value;
    var untitledNote = document.getElementsByClassName("untitled-note");
    var notesContent = document.getElementsByClassName("notes-body");
    

    console.log("Heading: " + notesHeading);
    console.log("Notes: " + notesBody);
    // console.log(untitledNote);
    // console.log(notesContent);
    localStorage.setItem(notesHeading, notesBody);
    // localStorage.clear();
    console.log(localStorage);

    var divElement = document.getElementsByClassName(".notestype");
    console.log(divElement.value);
    var title = document.createElement('h1');
    // title.class = 'untitled-note';
    title.innerText = notesHeading;
    console.log(title);

    var noteContent = document.createElement('p');
    // noteContent.class = 'note-content';
    noteContent.innerText = notesBody;
    console.log(noteContent);

    // notes.setItem(notesHeading, notesBody);
    // notes.push(notesHeading, notesBody);
    Object.assign(notes, {notesBody, notesHeading});
    Object.assign(notes, localStorage);
    let noOfElements = notes.length;
    alert("for loop notes elements");
    alert(noOfElements);
    for(var elements = 0; elements < noOfElements; elements++){
        // console.log(notes[elements].key, " : ", notes[elements].value);
        console.log(elements);
    }

    // console.log("notes ==> + ", notes);
    
    // divElement.appendChild(title);
    // var title = document.getElementsByClassName("container").appendChild(document.createElement('h1'));
    // title.class = "untitled-note";
    // title.body = notesHeading;
    // console.log(title);
    // .insertAdjacentHTML('<hr class"underline" color="#20639B" size="0.5px"> <p class="note-content">Notes</p>');
    // untitledNote.innerText = localStorage.key();
    // notesContent.innerText = localStorage.value();
});


// select the notes color
function pickNoteColor (numberOfColors) {
    return Math.floor(Math.random() * numberOfColors);
}

var notesBodyColor = ["#ff8585", "#ffb396", "#fff5c0", "#86aba1","#c9cbff", "#cfdac8", "#cae4db", "#ffd56b", "#96bb7c"];
var colorIndex = pickNoteColor(notesBodyColor.length);

notesTypeEvent.style.backgroundColor = String(notesBodyColor[colorIndex]);

// new notes 
function newNotes() {
    
}
// save notes 
function saveNotes() {

}

// delete notes
function deleteNotes () {
    var key = document.getElementById('key').value();
    localStorage.removeItem(key);
    console.log("deleted notes sucessfully!");
}
