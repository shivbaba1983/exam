
import React, { useState } from 'react';
import DailyEnglishPractice from './DailyEnglishPractice';
import SpokenEnglishConversation from './SpokenEnglishConversation';
import GrandpaGrandmaConversation from './GrandpaGrandmaConversation/GrandpaGrandmaConversation';
import ThinkWalkTalkEnglish from './ThinkWalkTalkEnglish/ThinkWalkTalkEnglish';
import './EnglishDashboard.scss';

type NavigationItem = {
    id: string;
    label: string;
    icon: string;
};

const navigationItems: NavigationItem[] = [
    { id: 'tips', label: 'Tips', icon: '💡' },
    { id: 'conversation', label: 'Conversation', icon: '💬' },
    { id: 'thinkEnglish', label: 'Think English', icon: '🧠' },

    // Add future navigation items here.
    // { id: 'vocabulary', label: 'Vocabulary', icon: '📚' },
    // { id: 'listening', label: 'Listening', icon: '🎧' },
];

const EnglishDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('tips');

    const [expandedSection, setExpandedSection] = useState<
        'dayBeginning' | 'grandparents' | null
    >(null);

    const toggleSection = (
        section: 'dayBeginning' | 'grandparents'
    ) => {
        setExpandedSection((current) =>
            current === section ? null : section
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'tips':
                return <DailyEnglishPractice />;

            case 'conversation':
                return (
                    <div className="english-dashboard__sections">
                        <section className="english-section">
                            <button
                                type="button"
                                className="english-section__header"
                                onClick={() => toggleSection('dayBeginning')}
                                aria-expanded={
                                    expandedSection === 'dayBeginning'
                                }
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

                        <section className="english-section">
                            <button
                                type="button"
                                className="english-section__header grandparents-header"
                                onClick={() => toggleSection('grandparents')}
                                aria-expanded={
                                    expandedSection === 'grandparents'
                                }
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
                );

            case 'thinkEnglish':
                return <ThinkWalkTalkEnglish />;

            default:
                return (
                    <div className="english-dashboard__placeholder">
                        <h3>Coming Soon</h3>
                        <p>This learning section will be available soon.</p>
                    </div>
                );
        }
    };

    return (
        <div className="english-dashboard">
            <nav
                className="english-dashboard__nav"
                aria-label="English learning navigation"
            >
                <div
                    className="english-dashboard__buttons"
                    role="tablist"
                    aria-label="Learning sections"
                >
                    {navigationItems.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            role="tab"
                            id={`english-tab-${item.id}`}
                            aria-selected={activeTab === item.id}
                            aria-controls="english-tab-panel"
                            className={`english-dashboard__button ${
                                activeTab === item.id ? 'active' : ''
                            }`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <span className="english-dashboard__button-icon">
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            <main
                className="english-dashboard__content"
                id="english-tab-panel"
                role="tabpanel"
                aria-labelledby={`english-tab-${activeTab}`}
            >
                {renderContent()}
            </main>
        </div>
    );
};

export default EnglishDashboard;
