(function($) {
  'use strict';

  var app = (function appController() {
    return {
      init: function init() {
        this.companyInfo();
        this.initEvents();
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', './company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo() {
        if(!app.isReady.call(this))
          return;

        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();
        $companyName.innerHTML = `<i>${data.name}</i>`;
        $companyPhone.textContent = data.phone;
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },

      initEvents: function initEvents() {
        $('[data-js="form-register"]').on('submit', this.handleSubmit, false);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://localhost:3000/car');
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send(`image=${$('[data-js="image"]').get().value}&brandModel=${$('[data-js="brand-model"]').get().value}&year=${$('[data-js="year"]').get().value}&plate=${$('[data-js="plate"]').get().value}&color=${$('[data-js="color"]').get().value}`);
        ajax.addEventListener('readystatechange', app.handlePost, false);
      },

      handlePost: function handlePost() {
        if(!app.isReady.call(this))
          return;
        var $tableCar = $('[data-js="table-car"]').get();
        var count = $tableCar.children.length;
        for (let i = 0; i < count; i++) {
          $tableCar.children[0].remove();
        }
        app.loadListCar();
        app.clearData();
      },

      loadListCar: function loadListCar() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/car');
        ajax.send();
        ajax.onreadystatechange = app.getDataCar;
      },

      getDataCar: function getDataCar() {
        if(!app.isReady.call(this))
          return;
        var response = JSON.parse(this.responseText);
        var $tableCar = $('[data-js="table-car"]').get();
        response.map(car => {
          $tableCar.appendChild(app.createNewCar(car));
        });
      },

      createNewCar: function createNewCar(car) {
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement('tr');
        var $tdImage = document.createElement('td');
        var $image = document.createElement('img');
        var $tdBrand = document.createElement('td');
        var $tdYear = document.createElement('td');
        var $tdPlate = document.createElement('td');
        var $tdColor = document.createElement('td');
        var $remove = document.createElement('td');
        var $buttonRemove = document.createElement('button');

        $image.setAttribute('src', car.image);
        $buttonRemove.textContent = 'Remove Car';
        $buttonRemove.addEventListener('click', handleRemove, false);
        $remove.appendChild($buttonRemove);

        $tdImage.appendChild($image);
        $tdBrand.textContent = car.brandModel;
        $tdYear.textContent = car.year;
        $tdPlate.textContent = car.plate;
        $tdColor.textContent = car.color;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($remove);

        function handleRemove() {
          var removeDiv = $buttonRemove.parentNode.parentNode;
          // removeDiv.outerHTML = '';
          removeDiv.remove();
          // removeDiv.parentNode.removeChild(removeDiv);
        }

        return $fragment.appendChild($tr);
      },

      clearData: function clearData() {
        $('[data-js="image"]').get().value = '';
        $('[data-js="brand-model"]').get().value = '';
        $('[data-js="year"]').get().value = '';
        $('[data-js="plate"]').get().value = '';
        $('[data-js="color"]').get().value = ''
      }
    }
  })();

  app.init();

})(window.DOM);
