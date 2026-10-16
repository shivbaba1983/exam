import React, { useState } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import MainResponsiveLayout from './main-responsive-layout/MainResponsiveLayout';
import Utility from './utility/Utility';
import English from './communication/English';
import Dashboard from './../src/dashboard/Dashboard';
//import Learn from './../src/learn/Learn';
import './CMSRoute.scss';

/* 🔹 Wrapper to extract examName param */
const ExamLayoutWrapper = () => {
  const { examName } = useParams<{ examName: string }>();

  return <MainResponsiveLayout examName={examName || 'AI-102'} />;
};

const CMSRoute = () => {

  const [showExamMenu, setShowExamMenu] = useState(false);

  return (
    <div className="cms-container">
      <nav className="nav-bar">
        <Link to="/dashboard" className="nav-button">Dashboard</Link>

        {/* 🔥 Exam menu */}
        <div
          className="nav-dropdown"
          onClick={() => setShowExamMenu(prev => !prev)}
        >
          <span className="nav-button">Exam ▾</span>

          <div className={`dropdown-menu ${showExamMenu ? 'show' : ''}`}>
            <Link to="/exam/AI-102" className="dropdown-item">AI-102 Exam</Link>
            <Link to="/exam/Generative-AI-Leader" className="dropdown-item">Generative AI Leader</Link>
            <Link to="/exam/AWS" className="dropdown-item">AWS Exam</Link>
            <Link to="/exam/Databrick" className="dropdown-item">Databrick</Link>
          </div>
        </div>

        <Link to="/utility" className="nav-button">Utility</Link>
        <Link to="/english" className="nav-button">English</Link>
        {/* <Link to="/learn" className="nav-button">Learn</Link> */}
      </nav>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 🔥 Exam Routes */}
        <Route path="/exam/:examName" element={<ExamLayoutWrapper />} />

        {/* Existing */}

        <Route path="/utility" element={<Utility />} />
        <Route path="/english" element={<English />} />
        {/* <Route path="/learn" element={<Learn />} /> */}

        {/* Default */}
        <Route path="/" element={<ExamLayoutWrapper />} />
      </Routes>
    </div>
  )

}
export default CMSRoute;
