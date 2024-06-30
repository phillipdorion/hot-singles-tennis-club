import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Matchmaking from './components/Matchmaking';
import MatchLogging from './components/MatchLogging';
import Members from './components/Members';
import Profile from './components/Profile';
import Resources from './components/Resources';
import Register from './components/Register';
import Login from './components/Login';
import './App.css'; // Ensure you have a CSS file for basic styling

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/matchmaking">Matchmaking</a></li>
            <li><a href="/matchlogging">Log Match</a></li>
            <li><a href="/members">Members</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/resources">Resources</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matchmaking" element={<Matchmaking />} />
          <Route path="/matchlogging" element={<MatchLogging />} />
          <Route path="/members" element={<Members />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;