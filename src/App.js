import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Component } from 'react';
// allow to configure application
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {

  render(){
    return (
      // store will become availible to all the main application
      <Provider store={store}>
        <BrowserRouter>
          <div calssName="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
} 

export default App;
