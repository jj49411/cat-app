import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
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
    const { breedsData, showBreeds, breedsName, breedsDescription } = this.state;
    
    return (
      <div>
        <div className="App">
        <h1 className='display-4 font-weight-light'>Let's learn about cats!</h1>
        </div>
        <div className="Dropdown">
          <Button id='breedsButton' size='lg' onClick={this.showBreeds} variant="outline-info">
            Breeds
          </Button>
          
          {showBreeds
              ? (
                <div className="Breeds">
                    {breedsData.map((breed, key) => (
                      <Button key={key} id='option' size='sm' variant="outline-secondary" onClick={() => this.breedsDatail(breed.name, breed.description)}>
                        {breed.name}
                    </Button>
                    ))}
                </div>
              )
              : (
                null
              )
          }
        </div>
       <div>
       {(breedsName !== null) && (breedsDescription !== null)
              ? (
                <div className="Breeds">
                  <p id='name' className='display-6 font-weight-light'>{breedsName}</p>
                  <p id='description' className='display-5 font-weight-light'>{breedsDescription}</p>
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

