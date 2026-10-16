import React from 'react';
import { Link } from 'react-router-dom'; // assuming you're using react-router
import Ai102Syllabus from './Ai102Syllabus';
import DailyEnglishPractice from "./DailyEnglishPractice";
import SpokenEnglishConversation from "./SpokenEnglishConversation";
const Dashboard = () => {
    return (
        <div>
                <div>
      <DailyEnglishPractice />
    </div>
    <div>
        <SpokenEnglishConversation/>
    </div>

            <h2>Welcome to the AI-102 (Microsoft: Azure AI Engineer Associate) Exam Preparation.</h2>
            <h3>Wishing you a smooth learning journey and the very best of luck for your certification exam.</h3>
            <h3>We’re rooting for your success!</h3>
            <Ai102Syllabus/>
            <div style={{ marginTop: '20px' }}>
                <Link to="/#" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>
                    👉 Start Your Exam Q&A
                </Link>
            </div>

        </div>
    );
};

export default Dashboard;
