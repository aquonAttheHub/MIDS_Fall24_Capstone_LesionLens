import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import Team from './pages/Team';
import LesionLens from './pages/LesionLens';
import Product from './pages/Product';
import ModelDetails from './pages/ModelDetails';

function App() {
  return (
    <Router>
      <header className="header">
        <nav className="navbar">
          <Link to="/lesion-lens" className="nav-link">Lesion Lens</Link>
          <Link to="/model-details" className="nav-link">Model Details</Link>
          <Link to="/product" className="nav-link">The App</Link>
          <Link to="/team" className="nav-link">The Team</Link>
        </nav>
      </header>
      <Routes>
        {/* Define other routes here */}
        <Route path="/" element={<Navigate to="/lesion-lens" replace />} />
        <Route path="/lesion-lens" element={<LesionLens />} />
        <Route path="/model-details" element={<ModelDetails />} />
        <Route path="/product" element={<Product />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App;