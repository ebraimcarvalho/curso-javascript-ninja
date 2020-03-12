(function($) {
  'use strict';

  var app = (function appController() {
    var $tableCar = $('[data-js="table-car"]').get();
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
        app.loadListCar();
        app.clearInputs();
      },

      loadListCar: function loadListCar() {
        $tableCar.innerHTML = '';
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/car');
        ajax.send();
        ajax.onreadystatechange = app.getDataCar;
      },

      getDataCar: function getDataCar() {
        if(!app.isReady.call(this))
          return;
        var response = JSON.parse(this.responseText);
        console.log(response);
        response.map(car => {
          $tableCar.appendChild(app.createNewCar(car))
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
        $buttonRemove.setAttribute('data-plate', car.plate)
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
          var $plate = $buttonRemove.getAttribute('data-plate');
          app.removeCarFromApi($plate);

          var removeDiv = $buttonRemove.parentNode.parentNode;
          removeDiv.remove();
        }

        return $fragment.appendChild($tr);
      },

      removeCarFromApi: function removeCarFromApi(plate) {
        var ajax = new XMLHttpRequest();
        ajax.open('DELETE', 'http://localhost:3000/car');
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send(`plate=${plate}`);
        ajax.addEventListener('readystatechange', function() {
          if(!app.isReady.call(this))
            return;
          return alert(`Register with plate ${plate} has been excluded!`);
        })
      },

      clearInputs: function clearInputs() {
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
