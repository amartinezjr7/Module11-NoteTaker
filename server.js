const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

const notesDb = require('./db/db.json');

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(express.static('public'));

//GET to index.html, first route
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"/public/index.html"));
});

//GET to the notes.html
app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});

//GET to the db.json
app.get("/api/notes", (req,res) =>{
    res.sendFile(path.join(__dirname,"/db/db.json"));
});

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));
})


app.post("/api/notes", (req, res)=>{
    let filePath = path.join(__dirname,"/db/db.json");
    let userNote = req.body;

    let topNote = 100;
    let currentNote = 99;

    for (var i =0; i < notesDb.length; i++){
        var newUserNote = notesDb[i];
        
        if(newUserNote.id > topNote){
            topNote = newUserNote.id;

        }
    }

    newUserNote.id = topNote +1;

    
    notesDb.push(userNote);


   fs.writeFile(filePath, JSON.stringify(notesDb), function (err) {
       if (err) throw err;

       console.log('file is updated');
       
   }); 

    res.json(userNote);
});



app.listen(PORT,() => {
    console.log(`API Server listening on port ${PORT}`);
});
