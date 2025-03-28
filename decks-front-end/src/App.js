import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';

function App() {
  return (
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </Router>
  );
}

export default App;
