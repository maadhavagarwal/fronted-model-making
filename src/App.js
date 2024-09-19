import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes,Router } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Application from './components/Application';
import Login from './components/login';
import Signup from './components/Signup';
import Service from './components/Sevice';
import Admin from './components/Admin';
import Update from './components/update';
import Staff from './components/Staff';
function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/application" element={<Application />} /> */}
        <Route path="/application/:id" element={<Application />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/service/:id" element={<Service/>}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/staff" element={<Staff/>}/>



        </Routes>
      {/* </Router> */}
      {/* </BrowserRouter>      */}
    </div>
  );
}

export default App;
