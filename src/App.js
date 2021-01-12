import './App.css';
import Main from './components/MainComponent';
// import DishDetail from './components/DishDetailComponent';
import { Component } from 'react';

class App extends Component {

  render(){
    return (
      <div calssName="App">
        <Main />
      </div>
    )
  }
} 

export default App;
