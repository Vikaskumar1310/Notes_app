//importing required modules
const fs = require('fs');
const chalk = require('chalk'); //for interective output on console

//addNote to notes file
const addNote = (title, body) => {
    const notes = loadNotes();//loading notes
    const duplicateNote = notes.find((note) => note.title === title);//finding and adding the title which is already present in notes

    //if title is not present we will add into app
    if (!duplicateNote) {
        notes.push({ // pushing title or body into notes  i.e array
            title: title,
            body: body
        })
        saveNotes(notes);//saving notes
        console.log(chalk.green.inverse("New note added"));//for interective output
    } else { //if notes already present with title will show error
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
    const dataJson = JSON.stringify(notes);//converitng the title and body into json format
    fs.writeFileSync('notes.json', dataJson);//data adding into file 
}

//load all present notes in the file
const loadNotes = () => {
    //if file is empty or no file available give error i.e emppty array 
    //if file is available ,will load all notes present in that file
    try {
        const dataBuffer = fs.readFileSync('notes.json');//reading the file 
        const dataJson = dataBuffer.toString();//converting data into string 
        return JSON.parse(dataJson);//now here we are parsing the data into json format.
    } catch (e) {
        return [];
    }

}

//exporting required modules
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};
