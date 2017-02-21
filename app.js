const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = argv._[0];

// Create data file if it doesnt exist
if (!fs.existsSync('notes-data.json')) {
    fs.openSync('notes-data.json', 'w');
    console.log('data file initialized');
}

if (command === 'add') {

    let note = notes.addNote(argv.title, argv.body)
    if (!note) {
        console.log(`Note title "${argv.title}" is already in use`);
    } else {
        console.log('Note saved \n');
        notes.logNote(note);
    }

} else if (command === 'list') {

    notes.getAll();

} else if (command === 'read') {

    let note = notes.readNote(argv.title);
    if (note) {
        notes.logNote(note);
    } else {
        console.log(`There is no note matching the title "${argv.title}"`);
    }

} else if (command === 'remove') {

    let removal = notes.removeNote(argv.title);
    let message = removal ? `"${argv.title}" was removed` : `"${argv.title}" not found`;
    console.log(message);

} else {

    console.log('Command not recognized.');

}