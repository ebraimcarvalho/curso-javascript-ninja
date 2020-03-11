(function() {
  'use strict';

  var post = new XMLHttpRequest();
  post.open('POST', 'http://localhost:3000/user');
  post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  post.send('username=fernando&user=Fernando&age=35');

  console.log('cadastrando usuário...', post.responseText)
  post.onreadystatechange = function(e) {
    if(post.readyState === 4) {
      console.log('Usuário Cadastrado!', post.responseText);
    }
  };

  var ajax = new XMLHttpRequest();
  ajax.open('GET', 'http://localhost:3000/user/fernando');
  ajax.send();

  ajax.addEventListener('readystatechange', function(e) {
    if(ajax.readyState === 4 ) {
      console.log(JSON.parse(ajax.responseText));
    }
  }, false)
})();
