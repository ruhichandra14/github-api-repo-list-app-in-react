import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from "./components/routes";
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter><MainContainer/></BrowserRouter>
      
    </div>
  );
}

export default App;
