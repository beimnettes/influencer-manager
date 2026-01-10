import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './Settings.css';

const Settings = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { user } = useAuth();
    const userName = user?.name || 'User';

    const [notifications, setNotifications] = useState({
        posts: true,
        weekly: true,
        marketing: false
    });

    const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const languages = [
        'English (US)',
        'English (UK)',
        'Español (Spanish)',
        'Français (French)',
        'Deutsch (German)',
        'Italiano (Italian)',
        'Português (Portuguese)',
        '日本語 (Japanese)',
        '한국어 (Korean)',
        '中文 (Chinese)',
        'العربية (Arabic)',
        'हिन्दी (Hindi)',
        'Русский (Russian)',
        'Nederlands (Dutch)',
        'Svenska (Swedish)',
    ];

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="settings-page fade-in">
            <div className="container">
                <header className="page-header">
                    <h1>⚙️ Settings</h1>
                    <p>Customize your Creator Studio experience</p>
                </header>

                <div className="settings-section">
                    <h2 className="section-title">Account & Preferences</h2>

                    <div className="settings-card bento-card">
                        {/* Appearance Toggle */}
                        <div className="setting-item clickable" onClick={toggleTheme}>
                            <div className="setting-icon-wrapper">🎨</div>
                            <div className="setting-main">
                                <span className="setting-label">Appearance</span>
                                <span className="setting-desc">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                            </div>
                            <div className={`theme-switch ${isDarkMode ? 'active' : ''}`}>
                                <div className="switch-knob">{isDarkMode ? '🌙' : '☀️'}</div>
                            </div>
                        </div>

                        {/* Language */}
                        <div className="setting-item clickable language-selector" onClick={() => setShowLanguageMenu(!showLanguageMenu)}>
                            <div className="setting-icon-wrapper">🌐</div>
                            <div className="setting-main">
                                <span className="setting-label">Language</span>
                                <span className="setting-desc">{selectedLanguage}</span>
                            </div>
                            <span className="chevron-icon">›</span>

                            {showLanguageMenu && (
                                <div className="language-dropdown" onClick={(e) => e.stopPropagation()}>
                                    {languages.map((lang) => (
                                        <div
                                            key={lang}
                                            className={`language-option ${lang === selectedLanguage ? 'selected' : ''}`}
                                            onClick={() => {
                                                setSelectedLanguage(lang);
                                                setShowLanguageMenu(false);
                                            }}
                                        >
                                            {lang}
                                            {lang === selectedLanguage && <span className="check-icon">✓</span>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                <div className="settings-section">
                    <h2 className="section-title">Notifications</h2>

                    <div className="settings-card bento-card">
                        <div className="setting-item">
                            <div className="setting-icon-wrapper">🔔</div>
                            <div className="setting-main">
                                <span className="setting-label">Post Reminders</span>
                                <span className="setting-desc">Get notified before scheduled posts</span>
                            </div>
                            <div
                                className={`toggle-switch ${notifications.posts ? 'active' : ''}`}
                                onClick={() => toggleNotification('posts')}
                            ></div>
                        </div>

                        <div className="setting-item">
                            <div className="setting-icon-wrapper">📊</div>
                            <div className="setting-main">
                                <span className="setting-label">Weekly Report</span>
                                <span className="setting-desc">Analytics summary every Monday</span>
                            </div>
                            <div
                                className={`toggle-switch ${notifications.weekly ? 'active' : ''}`}
                                onClick={() => toggleNotification('weekly')}
                            ></div>
                        </div>

                        <div className="setting-item">
                            <div className="setting-icon-wrapper">📧</div>
                            <div className="setting-main">
                                <span className="setting-label">Product News</span>
                                <span className="setting-desc">Updates and new features</span>
                            </div>
                            <div
                                className={`toggle-switch ${notifications.marketing ? 'active' : ''}`}
                                onClick={() => toggleNotification('marketing')}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="settings-footer">
                    <div className="footer-links">
                        <span className="link">Help Center</span>
                        <span className="dot">•</span>
                        <span className="link">Privacy Policy</span>
                        <span className="dot">•</span>
                        <span className="link">Terms</span>
                    </div>
                    <p className="app-version">Creator Studio v1.2.0 (Build 2026.1)</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
