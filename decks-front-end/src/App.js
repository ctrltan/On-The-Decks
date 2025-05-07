import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Verify from './components/auth/Verify';
import Callback from './components/auth/Callback';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="/callback" element={<Callback />} />
          <Route element={<Verify />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
