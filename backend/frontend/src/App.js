import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CatsList from './CatsList'

import './App.css';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CatsList />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;