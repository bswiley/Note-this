const fs = require('fs')
const { uuid } = require('uuidv4');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
//api GET route
app.get('/api/notes', (req,res) => {
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
  res.json(notes)
})

app.post('/api/notes', (req, res)=>{
 let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
 let newNote = req.body;
 newNote.id=uuid();
 notes.push(newNote);
 fs.writeFileSync("./db/db.json",JSON.stringify(notes));
 res.json(notes)
})
app.delete('/api/notes/:id',(req, res)=>{
  let notes =JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
  let noteid = req.params.id;
  let updatedNotes = notes.filter((note)=> note.id != noteid );
    fs.writeFileSync("./db/db.json",JSON.stringify(updatedNotes));
    res.json(updatedNotes);
   })

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


