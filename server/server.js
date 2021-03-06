require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const messagesCtrl = require('./messagesCtrl');
const session = require('express-session');
const cors = require('cors');

let { SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();

app.use(cors());

/**
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});
**/

app.use(bodyParser.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.get('/api/messages', messagesCtrl.getAllMessages);
app.get('/api/messages/history', messagesCtrl.history);
app.post('/api/messages', messagesCtrl.createMessage);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}.`);
});