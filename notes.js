const fs = require('fs');
const _ = require('lodash');

// =====
// Internal Functions
// =====

const setNotes = () => {

     // Check for existing note list
    let notes;
    let currentNotes = fs.readFileSync('notes-data.json');
    if (currentNotes.length > 0) {
        notes = JSON.parse(currentNotes);

    // create empty array if no data
    } else {
        notes = [];
    }

    return notes;

}

const saveNotes = (notes) => {

    fs.writeFileSync('notes-data.json',JSON.stringify(notes));

}

// =====
// Exported Functions
// =====

const logNote = (note) => {

    console.log(note.title);
    console.log('----------');
    console.log(note.body);
    
}

const addNote = (title, body) => {

    let notes = setNotes();
    let duplicateNotes = notes.filter((note) => note.title === title);

    // Only save unique notes
    if (duplicateNotes.length === 0) {

        // add note to list
         notes.push({title,body});

        // update data file
        saveNotes(notes);

        // for tracking
        return ({title, body});

    }

}

const getAll = () => {

    let notes = setNotes();
    return notes;

}

const readNote = (title) => {
    
    let notes = setNotes();

    // Find matching element, pull it from array
    let match = notes.filter((note) => note.title === title)[0];
    return match; 

}

const removeNote = (title) => {

    let notes = setNotes();
    let filtered = notes.filter((note) => note.title !== title);
    saveNotes(filtered);
    return notes.length !== filtered.length;
    
}

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote,
    logNote
}