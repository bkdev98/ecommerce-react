import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';
import AboutPage from './pages/About';
import HomePage from './pages/Home';
import ProductPage from './pages/Product';

// Stateful component
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route path='/' exact component={HomePage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/product' component={ProductPage} />
        </div>
      </Router>
    );
  }
}

export default App;
