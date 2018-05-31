const express = require('express');
const app = express();
let bodyParser = require('body-parser')
const mongoose = require('mongoose');
let port = 3000;

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/userRoute')(app);
//connects to riby_app
//riby_app is a db
mongoose.connect('mongodb://localhost/riby_app')
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
     console.log("DB Connection OPEN");
});

app.listen(port, ()=>{
    console.log('Server Running!!!')
});