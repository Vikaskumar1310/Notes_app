const fs = require('fs');
const chalk = require('chalk');

//addNote to notes file
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added"));
    } else {
        console.log(chalk.red.inverse("Note title is already taken!"));
    }
}

//remove notes from file
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Notes removed successfully'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse("Note not Found"));
    }
}

//list all notes title
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellow.inverse("your notes"));

    notes.forEach((note) => {
        console.log(note.title);
    });
};

//read note 
const readNote = (title) => {
    const notes = loadNotes();
    const searchNote = notes.find((note) => note.title == title);
    if (searchNote) {
        console.log(chalk.yellow.inverse("Title ") + searchNote.title);
        console.log(searchNote.body);
    } else {
        console.log(chalk.red.inverse("Note not found"));
    }

}

//save note to file
const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

//load all present notes in the file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }

}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};