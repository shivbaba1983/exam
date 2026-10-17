
import React, { useState } from 'react';
import DailyEnglishPractice from './DailyEnglishPractice';
import SpokenEnglishConversation from './SpokenEnglishConversation';
import GrandpaGrandmaConversation from './GrandpaGrandmaConversation/GrandpaGrandmaConversation';
import './EnglishDashboard.scss';

const EnglishDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'tips' | 'conversation'>('tips');

    const [expandedSection, setExpandedSection] = useState<
        'dayBeginning' | 'grandparents' | null
    >(null);

    const toggleSection = (
        section: 'dayBeginning' | 'grandparents'
    ) => {
        setExpandedSection((currentSection) =>
            currentSection === section ? null : section
        );
    };

    return (
        <div className="english-dashboard">
            <div className="english-dashboard__buttons">
                <button
                    type="button"
                    className={`english-dashboard__button ${
                        activeTab === 'tips' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('tips')}
                >
                    Tips
                </button>

                <button
                    type="button"
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
                    <div className="english-dashboard__sections">
                        {/* Day Beginning Conversation */}
                        <section className="english-section">
                            <button
                                type="button"
                                className="english-section__header"
                                onClick={() => toggleSection('dayBeginning')}
                                aria-expanded={expandedSection === 'dayBeginning'}
                            >
                                <span className="english-section__title">
                                    <span className="english-section__icon">
                                        🌅
                                    </span>
                                    Day Beginning Conversation
                                </span>

                                <span className="english-section__arrow">
                                    {expandedSection === 'dayBeginning'
                                        ? '−'
                                        : '+'}
                                </span>
                            </button>

                            {expandedSection === 'dayBeginning' && (
                                <div className="english-section__body">
                                    <SpokenEnglishConversation />
                                </div>
                            )}
                        </section>

                        {/* Grandpa & Grandma Conversation */}
                        <section className="english-section">
                            <button
                                type="button"
                                className="english-section__header grandparents-header"
                                onClick={() => toggleSection('grandparents')}
                                aria-expanded={expandedSection === 'grandparents'}
                            >
                                <span className="english-section__title">
                                    <span className="english-section__icon">
                                        👴👵
                                    </span>
                                    Grandpa &amp; Grandma (Bus)
                                </span>

                                <span className="english-section__arrow">
                                    {expandedSection === 'grandparents'
                                        ? '−'
                                        : '+'}
                                </span>
                            </button>

                            {expandedSection === 'grandparents' && (
                                <div className="english-section__body">
                                    <GrandpaGrandmaConversation />
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnglishDashboard;
