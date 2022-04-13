import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import SiteHeader from './CatHeader';
import CatsList from './CatsList'



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><SiteHeader />  <CatsList /></>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;