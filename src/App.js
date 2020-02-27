import React, { Component } from 'react';
import './App.css';

class CatApp extends Component {
  
  constructor() {
    super();
    this.state = {
      showBreeds: false,
      breedsData:[],
      isLoading: false,
    };
    
    this.showBreeds = this.showBreeds.bind(this);
    this.closeBreeds = this.closeBreeds.bind(this);
  }
  
  showBreeds() {

    this.setState({ showBreeds: true }, () => {
      document.addEventListener('click', this.closeBreeds);
    });
  }
  
  closeBreeds() {
    this.setState({ showBreeds: false }, () => {
      document.removeEventListener('click', this.closeBreeds);
    });
  }

  componentDidMount() {
    
    fetch('https://api.thecatapi.com/v1/breeds?', {
      headers: {'x-api-key': 'd3156788-df1b-4304-b4bf-6125607d2140'}}
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: true,
          breedsData: responseJson
        })
      })
  }



  render() {
    return (
      <div>
        <div className="App">
        <p>Let's learn about cats!</p>
        </div>
        <div className="Dropdown">
          <button id='breedsButton' onClick={this.showBreeds}>
            Breeds
          </button>
          
          {this.state.showBreeds
              ? (
                <div className="Breeds">
                    {this.state.breedsData.map((breed, key) => (
                      <button key={key}>
                        {breed.name}
                    </button>
                    ))}
                </div>
              )
              : (
                null
              )
          }
        </div>
      </div>
    );
  }
  
}

export default CatApp;

