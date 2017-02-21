const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = argv._[0];

if (command === 'add') {

    let note = notes.addNote(argv.title, argv.body)
    if (!note) {
        console.log(`Note title "${argv.title}" is already in use`);
    } else {
        console.log('Note saved \n');
        console.log(note.title)
        console.log('----------')
        console.log(note.body);
    }

}
else if (command === 'list') {

    notes.getAll();

}
else if (command === 'read') {

    notes.readNote(argv.title);

}
else if (command === 'remove') {

    notes.removeNote(argv.title);

}
else {

    console.log('Command not recognized.');

}