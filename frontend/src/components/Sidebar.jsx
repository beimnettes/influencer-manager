import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

/**
 * Sidebar - Vertical navigation for desktop/tablet
 * Replaces top navbar to provide more vertical space and better organization
 */
const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Get user initial or default to 'U'
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
    const userName = user?.name || 'User';

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        logout();
        navigate('/login');
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const handleNewPost = () => {
        navigate('/posts/new');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: '📊' },
        { path: '/ideas', label: 'Ideas', icon: '💡' },
        { path: '/captions', label: 'Captions', icon: '✍️' },
        { path: '/posts', label: 'Calendar', icon: '📅' },
        { path: '/analytics', label: 'Analysis', icon: '📈' },
    ];

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <span className="brand-icon">✨</span>
                        <span className="brand-text">Creator<span className="brand-accent">OS</span></span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <h4 className="nav-section-title">Menu</h4>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-label">{item.label}</span>
                                {/* Active Indicator Line */}
                                <div className="active-indicator"></div>
                            </NavLink>
                        ))}
                    </div>


                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile logout-container">
                        <button
                            className="logout-btn full-width-logout"
                            onClick={handleLogoutClick}
                            title="Log Out"
                        >
                            <span className="logout-icon">🚪</span>
                            <span className="logout-label">Log Out</span>
                        </button>

                        {showLogoutConfirm && (
                            <div className="logout-popup">
                                <p>Are you sure you want to log out?</p>
                                <div className="logout-popup-actions">
                                    <button className="popup-btn cancel" onClick={cancelLogout}>
                                        Cancel
                                    </button>
                                    <button className="popup-btn confirm" onClick={confirmLogout}>
                                        Yes, Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
