const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();
const path = require('path');


app.use(express.static('public'));
 
app.use(bodyParser.urlencoded({ extended:true }));


mongoose.connect("mongodb://127.0.0.1/contactdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});





app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});
app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});



const userSchema2 = new mongoose.Schema({
    name: String,
    email: String,
    message:String,
  });
  
  
  
const UserN = mongoose.model('UserN', userSchema2);


app.post('/contact', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const newUser = new UserN({
      name,
      email,
      message
    });

    try {
      await newUser.save();
      res.sendFile(path.join(__dirname, 'views', 'index.html'));
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving data to the database');
    }
});




app.listen(800,function(req,res){
    console.log("Server has started successfully")
})