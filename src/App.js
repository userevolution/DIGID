import React from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/login">
          <Main />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
