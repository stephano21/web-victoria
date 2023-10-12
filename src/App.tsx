import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './views/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PolygonCreator from './components/PoligonCreator';
import { Register } from './views/Register';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="*" element={<p>Not foud</p>} />
      </Routes>
    </Router>
  );
};

export default App;
