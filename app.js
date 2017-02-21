const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'The title of note.',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'The contents of the note.',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Creates a new note.', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'Lists all notes currently being stored.')
    .command('read', 'Finds note by title and returns the full note', {
        title: titleOptions
    })
    .command('remove', 'Finds a note by title and deletes it.', {
        title: titleOptions
    })
    .help()
    .argv;

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

    let noteList = notes.getAll();
    noteList.forEach((note) => {
        notes.logNote(note);
        console.log('\n');
    })

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