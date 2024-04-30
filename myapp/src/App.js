import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home'
import Register from './pages/registration'
import BloodDonation from './pages/blood_donation'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/blood_donation" element={<BloodDonation />}/>
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
