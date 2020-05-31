import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './components/Navigation/Navigation';
import Logo from './Logo/Logo';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'd5ca12045d0d44a78dc1661e2cbc81ac'
});


const particlesOptions = {
        particles: {
        	number: {
        		value: 60,
        		density: {
        			enable: true,
        			value_area: 800
      }
    }
  }
 }
class App extends React.Component {
  constructor() {
  		super();
  		this.state = {
  			input: '',
        imageUrl: '',
        box: {},
  		}
  }

faceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}
 
faceBox = (box) => {
  this.setState({box: box});
}

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

 onButtonSubmit = () => {

this.setState({imageUrl: this.state.input});
 	app.models
  .predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input)
  .then(
    function(response) {
      this.faceBox(this.faceLocation(response));
},
    function(err) {
      // there was an error
    }
  );
 }

  render() {
        return (
       <div className="App">
 
            <Particles className="particles"
              params={particlesOptions}
            />
      
     <Navigation />
     <Logo />
     <Rank /> 
     <ImageLinkForm 
     onInputChange={this.onInputChange} 
     onButtonSubmit={this.onButtonSubmit} 
     />
     <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />

    </div>
		);
	}
}

export default App;
