import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Createblog from './components/Createblog';
import Blogdisplay from './components/Blogdisplay';

const routing = (
  <Router>
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/create-blog/:id" element={<Createblog />} />
      <Route exact path="/view-blog/:id" element={<Blogdisplay />} />
    </Routes>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
