import React, { Component } from 'react';
import './App.css';

class CatApp extends Component {
  
  constructor() {
    super();
    this.state = {
      showBreeds: false,
      breedsData:[],
      isLoading: false,
      breedsName: '',
      breedsDescription: '',
    };
    
    this.showBreeds = this.showBreeds.bind(this);
    this.closeBreeds = this.closeBreeds.bind(this);
  }
  
  showBreeds() {

    this.setState({ 
      showBreeds: true, 
      breedsName: '',
      breedsDescription: '',
     }, () => {
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
        console.log(responseJson)
        this.setState({
          isLoading: true,
          breedsData: responseJson
        })
      })
  }

  breedsDatail(name, description) {
    this.setState({
      breedsName: name,
      breedsDescription: description,
    })
  }



  render() {
    
    return (
      <div>
        <div className="App">
        <h1>Let's learn about cats!</h1>
        </div>
        <div className="Dropdown">
          <button id='breedsButton' onClick={this.showBreeds}>
            Breeds
          </button>
          
          {this.state.showBreeds
              ? (
                <div className="Breeds">
                    {this.state.breedsData.map((breed, key) => (
                      <button key={key} onClick={() => this.breedsDatail(breed.name, breed.description)}>
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
       <div>
       {(this.state.breedsName !== null) && (this.state.breedsDescription !== null)
              ? (
                <div className="Breeds">
                  <p id='name'>{this.state.breedsName}</p>
                  <p id='description'>{this.state.breedsDescription}</p>
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

