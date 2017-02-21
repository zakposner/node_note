const fs = require('fs');
const _ = require('lodash');

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

    // read the list of notes
    console.log(notes);
    if (notes.length = 0) console.log('There are no notes to display');
}

const readNote = (title) => {
    
    let match;
    let notes = setNotes();
    notes.forEach((note) => {
        if (note.title === title) {

            match = note.body;

            // read the note
            console.log(match);
        }
    });
    if (!match) console.log('There is no note matching that title');
}

const removeNote = (title) => {

    let match;
    let notes = setNotes();
    notes.forEach((note) => {
        if (note.title === title) {

            match = note.title;

            // Remove note from the list
            notes = _.remove(notes, (note) => {
                return note.title !== match;
            })

            // Update the data file
            saveNotes(notes);
            console.log(`${match} was deleted`);
        }
    });
    if (!match) console.log('There is no note matching that title');
}

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote
}