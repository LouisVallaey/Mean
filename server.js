const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();
const server = require('http').Server(app);


const user = require('./controllers/user.controller');
/* const bedrijf = require('./controllers/bedrijf.controller');
const conversation = require('./controllers/conversation.controller');
const producten = require('./controllers/product.controller');  */

// Port Number: 1ste is voor development 2de voor prod en deployment
const port =4000;
//const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/user', user);
/* 
app.use('/bedrijf', bedrijf);
app.use('/conversation',conversation);
app.use('/product', producten); */

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
server.listen(port, () => {
  console.log(__dirname);
  console.log('Server started on port '+port);
});