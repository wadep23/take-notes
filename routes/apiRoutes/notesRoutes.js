const router = require('express').Router();
const { notes } = require('../../data/notes.json');
const { filterByQuery, createNewNote, validateNotes } = require('../../lib/notes');

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// create new note and unique id
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNotes (req.body)){
        res.status(400).send(`Note is missing fields.`);
    }else{
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;