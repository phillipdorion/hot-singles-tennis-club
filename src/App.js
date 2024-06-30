import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Matchmaking from './components/Matchmaking';
import MatchLogging from './components/MatchLogging';
import Members from './components/Members';
import Profile from './components/Profile';
import Resources from './components/Resources';
import Register from './components/Register';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Box minHeight="100vh">
            <Navbar />
            <Box p={4}>
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
            </Box>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;