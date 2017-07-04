import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      lat: null,
      lng: null,
      value: 'restaurant'
    };

    this.getLocation = this.getLocation.bind(this);
    this.findPlaces = this.findPlaces.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    axios({
    url: '',
    baseURL: 'https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR API KEY',
    method: 'POST'
   }).then((res) => {
      this.setState({
        lat: res.data.location.lat,
        lng: res.data.location.lng
      })
      console.log(this.state.lat, this.state.lng);
   })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  findPlaces(e) {
    e.preventDefault();
    console.log(this.state.value);
    axios({
    url: '',
    baseURL: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.lat},${this.state.lng}&rankby=distance&type=${this.state.value}&key=YOUR API KEY`,
    method: 'GET'
   }).then((res) => {
      console.log(res);

   }).catch((err) => {
      console.error(err);
   })
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>What can I help you find today?</h2>
        </div>
          <form onSubmit={this.findPlaces}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="restaurant">Restaurants</option>
            <option value="bar">Bars</option>
            <option value="grocery_or_supermarket">Grocery Stores</option>
            <option value="gas_station">Gas Stations</option>
          </select>
        </label>
        <input type="submit" value="GO" />
      </form>

      </div>
    );
  }
}

export default App;
