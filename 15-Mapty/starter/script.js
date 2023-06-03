'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10); //relying on time to create an id

  constructor(coords, distance, duration){
    this.coords = coords; //[lat, lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
  }
}

class Running extends Workout {
  constructor (coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {  
  constructor (coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}


/////////////////////////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;

  constructor(){
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this)); //Need to .bind(this) otherwise it wil point to the form 
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        //Need to .bind(this) here bc this will be called as a regular function call (not a method call)
        //It's the .getCurrentPosition() that will call the this._loadMap and will do so as a regular function call 
        //A regular function call will set "this" to undefined
        this._loadMap.bind(this),   
        function(){
          alert('Could not get your position');
      });
    }
  }

  _loadMap(position) {    
    const {latitude} = position.coords;
    const {longitude} = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this)); //Need to .bind(this) othwerise it will point to #map
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();    
    
    //Get data from form

    //Check if data is valid

    //If activity running, create running object

    //If activity cycling, create cycling object

    //Render workout on map as marker
    const {lat, lng} = this.#mapEvent.latlng;     
    L.marker([lat, lng]).addTo(this.#map)
      .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup'
      }))
      .setPopupContent('Workout')
      .openPopup();

    //Render workout on list

    //Hide form + clear input fields

    //Clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''; 
  }
}

const app = new App();

