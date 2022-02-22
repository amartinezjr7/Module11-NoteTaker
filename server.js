const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

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

app.post("/api/notes", (req, res)=>{
    let filePath = path.join(__dirname,"/db/db.json");
    let userNote = req.body;

   fs.watchFile(filePath, JSON.stringify('./db/db'), function (err) {
       if (err) throw err;

       console.log('file is updated');
       
   }) 

    res.json(userNote);
});



app.listen(PORT,() => {
    console.log(`API Server listening on port ${PORT}`);
});
