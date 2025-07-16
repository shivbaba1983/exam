import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MainResponsiveLayout from './main-responsive-layout/MainResponsiveLayout';
import Facility from './../src/facility/Facility';
import Dashboard from './../src/dashboard/Dashboard';
import Learn from './../src/learn/Learn';
import './CMSRoute.scss'; // Import styles

const CMSRoute = () => (
  <div className="cms-container">
    <nav className="nav-bar">
      <Link to="/dashboard" className="nav-button">Dashboard</Link>
       <Link to="/learn" className="nav-button">Learn</Link>
      <Link to="/facility" className="nav-button">Facility</Link>
      <Link to="/" className="nav-button">Exam</Link>
    </nav>

    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/learn" element={<Learn />} />
      <Route path="/facility" element={<Facility />} />
      <Route path="/" element={<MainResponsiveLayout />} />
    </Routes>
  </div>
);

export default CMSRoute;
