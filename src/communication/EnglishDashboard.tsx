import React, { useState } from 'react';
import DailyEnglishPractice from './DailyEnglishPractice';
import SpokenEnglishConversation from './SpokenEnglishConversation';
import './EnglishDashboard.scss';

const EnglishDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'tips' | 'conversation'>('tips');

    return (
        <div className="english-dashboard">
            <div className="english-dashboard__buttons">
                <button
                    className={`english-dashboard__button ${
                        activeTab === 'tips' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('tips')}
                >
                    Tips
                </button>

                <button
                    className={`english-dashboard__button ${
                        activeTab === 'conversation' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('conversation')}
                >
                    Conversation
                </button>
            </div>

            <div className="english-dashboard__content">
                {activeTab === 'tips' && <DailyEnglishPractice />}

                {activeTab === 'conversation' && (
                    <SpokenEnglishConversation />
                )}
            </div>
        </div>
    );
};

export default EnglishDashboard;
