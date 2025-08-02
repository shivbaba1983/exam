import React from 'react';
import { Link } from 'react-router-dom'; // assuming you're using react-router
import exam from '../components/QuestionUI/QuestionMaster';

const Dashboard = () => {
    return (
        <div>
            <h2>Welcome to the AI-102 (Microsoft: Azure AI Engineer Associate) Exam Preparation.</h2>
            <h3>Wishing you a smooth learning journey and the very best of luck for your certification exam.</h3>
            <h3>We’re rooting for your success!</h3>

            <div style={{ marginTop: '20px' }}>
                <Link to="/#" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>
                    👉 Start Your Exam Q&A
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
