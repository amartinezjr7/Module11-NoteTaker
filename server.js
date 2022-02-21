const app = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;

app.request(express.urlencoded({extended: true}));
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
