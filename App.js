import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login'; 
import UniqueCollection from './Components/UniqueCollection';
import Home from './Components/Home';
import About from './Components/About';
import Community from './Components/Community';
import Marketplace from './Components/Marketplace';

import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/api/test')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error:', error));
  }, []);
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/UniqueCollection" component={UniqueCollection} />
            <Route exact path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/community" component={Community} />
            <Route path="/marketplace" component={Marketplace} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
