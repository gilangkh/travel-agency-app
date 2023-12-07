import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TouristList from './components/Tourist/TouristList';
import TouristDetail from './components/Tourist/TouristDetail';
import TouristCreate from './components/Tourist/TouristCreate';
import UserProfile from './components/UserProfile';

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      const url = window.location.pathname.split('/').slice(1).join('/');

      if (url !== 'login' && url !== 'register' && url !== 'logout') {
        sessionStorage.setItem('url', url);
      }

      setAuthenticated(false);
    }

  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/login?" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {authenticated ? (
          <>  
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/tourists" element={<TouristList />} />
            <Route path="/tourists/:id" element={<TouristDetail />} />
            <Route path="/tourists/create" element={<TouristCreate />} />
          </>
        ) : (
          <Route
            path="*"
            element={<Navigate to="/login?" />}
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
