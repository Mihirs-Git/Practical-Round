import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/LoginComponent';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainComponent></MainComponent>
      </BrowserRouter>    
    </div>
  );
}

export default App;
