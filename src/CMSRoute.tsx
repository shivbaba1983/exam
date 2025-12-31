import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MainResponsiveLayout from './main-responsive-layout/MainResponsiveLayout';
import Utility from './utility/Utility';
import Dashboard from './../src/dashboard/Dashboard';
import AWS from './aws/AWS';
import Learn from './../src/learn/Learn';
import './CMSRoute.scss'; // Import styles

const CMSRoute = () => (
  <div className="cms-container">
    <nav className="nav-bar">
      <Link to="/dashboard" className="nav-button">Dashboard</Link>
      <Link to="/" className="nav-button">Exam</Link>
      {/* <Link to="/aws" className="nav-button">AWS</Link> */}
      <Link to="/utility" className="nav-button">Utility</Link>
      <Link to="/learn" className="nav-button">Learn</Link>

    </nav>

    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<MainResponsiveLayout />} />
      {/* <Route path="/aws" element={<AWS />} /> */}
      <Route path="/utility" element={<Utility />} />
      <Route path="/learn" element={<Learn />} />

    </Routes>
  </div>
);

export default CMSRoute;
