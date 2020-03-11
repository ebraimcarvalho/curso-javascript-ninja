'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

var users = [
  {
    username: 'ebraim',
    user: 'Ebraim',
    age: 28
  },
  {
    username: 'brenda',
    user: 'Brenda',
    age: 26
  }
];

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/', function(req, res) {
  res.json({response: 'Home'});
});

app.get('/user', function(req, res) {
  res.json(users)
});

app.get('/user/:username', function(req, res) {
  var username = req.params.username;
  var hasUser = users.some(function(user) {
    return user.username === username;
  });

  if(hasUser) {
    return res.json(users.filter(function(user) {
      return user.username === username;
    }));
  }
  res.status(404).json({ error: 'Usuario não encontrado!'})
});

app.post('/user', function(req, res) {
  var username = req.body.username;
  var user = req.body.user;
  var age = req.body.age;

  var hasUser = users.some(function(user) {
    return user.username === username;
  });

  if(!hasUser) {
    users.push({
      username: username,
      user: user,
      age: age
    });
  }

  res.json(users);
})

app.listen(3000);
