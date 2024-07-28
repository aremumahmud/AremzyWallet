import React from 'react';
import axios from 'axios';
import Dashboard from './components/dashboard';
import './App.css'
import {FaGoogle} from 'react-icons/fa6'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/home';

const App = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('http://localhost:5000/api/current_user', { withCredentials: true });
      setUser(response.data);
    };

    fetchUser();
  }, []);

  const handleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  const handleLogout = async () => {
    await axios.get('http://localhost:5000/api/logout', { withCredentials: true });
    setUser(null);
  };

  // Assuming you can determine the current path somehow (e.g., using window.location.pathname)
  const currentPath = window.location.pathname;

  return (
    <Router>
    <Routes>
      <Route path='/' element={<Home handleLogin={handleLogin} />} />
      <Route path='/dashboard' element={<Dashboard />} />
     </Routes>
     </Router> 
   
  );
};

export default App;
