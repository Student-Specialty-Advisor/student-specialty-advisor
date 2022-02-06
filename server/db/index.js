const fs = require("fs");
const mongoose = require('mongoose');

mongoose.connect('mongodb url',()=>
{
   console.log("Connected to database");
});

//Export 
module.exports = mongoose