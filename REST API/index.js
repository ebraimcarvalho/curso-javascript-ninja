'use strict';

var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

var users = {
  ebraim: {
    nome: 'Ebraim',
    idade: 28
  },
  brenda: {
    nome: 'Brenda',
    idade: 26
  }
}

app.get('/', function(req, res) {
  res.send('<h1>Home, Hi</h1>');
});

app.get('/user', function(req, res) {
  res.send('eu');
});

app.get('/user/:username', function(req, res) {
  var username = req.params.username;
  if(users[username]) {
    return res.json(users[username]);
  }
  res.status(404).json({ error: 'Usuario não encontrado!'})
});

app.listen(3000);
