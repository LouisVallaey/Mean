const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


// Connection To Database
mongoose.connect(config.database);

// when Connected
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// when error 
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();
const server = require('http').Server(app);
const user = require('./controllers/user.controller');
const package = require('./controllers/package.controller');


// Port Number: 1st for development 2nd for prod 
//const port =4000;
const port = process.env.PORT || 8080;

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


app.use(expressJwt({
  secret: config.secret,
  getToken: function (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
          return req.query.token;
      }
      return null;
  }
}).unless({ path: ['/users/authenticate', '/users/register'] })); 

//api
app.use('/user', user);
app.use('/package', package);

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