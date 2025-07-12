import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './component/Landing';
import Login from './component/login';
import Signup from './component/signup';
import Home from './component/Home';
import User from './component/User'; // Updated to match the file name

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} /> {/* Use User component */}
      </Routes>
    </Router>
  );
};

export default App;