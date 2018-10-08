import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loading from './components/Loading'
import Router from "./components/BrowserRouter";

class App extends Component {
  render() {
    return (
    	<Router>
	    	<div className="App">
	        	<Loading />
	    	</div>
	    </Router>
    );
  }
}

export default App;
