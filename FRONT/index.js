(function() {
  'use strict';

  var ajax = new XMLHttpRequest();
  ajax.open('GET', 'http://localhost:3000/user');
  ajax.send();

  ajax.addEventListener('readystatechange', function(e) {
    if(ajax.readyState === 4 ) {
      console.log('User: ' + ajax.responseText, ajax.status);
    }
  }, false)
})();
