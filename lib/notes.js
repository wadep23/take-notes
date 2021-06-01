const fs = require('fs');
const path = require('path');

function validateNotes(notes) {
    if (!notes.title || typeof notes.title !== 'string'){
        return false;
    }
    if (!notes.text || typeof notes.text !== 'string'){
        return false;
    }
    
    return true;
}

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;

    if(query.title) {
        filteredResults = filteredResults.filter(notes => notes.title === query.title);        
    }
    if (query.test) {
        filteredResults = filteredResults.filter(notes => notes.text === query.text);
    }
    return filteredResults;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
}

module.exports = {
    filterByQuery,    
    createNewNote,
    validateNotes
};