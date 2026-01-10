import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import './MainLayout.css';

/**
 * MainLayout - Wrapper for authenticated pages
 * Includes Sidebar, top bar for mobile, and main content area
 */
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// ...

const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
        setShowUserMenu(false);
    };

    const confirmLogout = () => {
        logout();
        navigate('/login');
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
    const profilePicture = user?.profilePicture;

    return (
        <div className="main-layout">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <main className="main-content">
                {/* Mobile Header */}
                <div className="mobile-header">
                    <button className="menu-btn" onClick={toggleSidebar}>
                        ☰
                    </button>
                    <span className="mobile-brand">Creator<span className="brand-accent">OS</span></span>
                    <div className="mobile-actions">
                        <ThemeToggle />
                        <div className="mobile-user-avatar" onClick={() => navigate('/profile')}>
                            {profilePicture ? (
                                <img src={profilePicture} alt="Profile" className="avatar-img" />
                            ) : (
                                userInitial
                            )}
                        </div>
                    </div>
                </div>

                {/* Desktop Header Actions */}
                <div className="desktop-header-actions">
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input type="text" placeholder="Search ideas, posts..." className="search-input" />
                    </div>

                    <div className="header-right-actions">
                        <ThemeToggle />

                        <div className="header-user-menu" onClick={() => setShowUserMenu(!showUserMenu)}>
                            <div className="header-avatar">
                                {profilePicture ? (
                                    <img src={profilePicture} alt="Profile" className="avatar-img" />
                                ) : (
                                    userInitial
                                )}
                            </div>

                            {showUserMenu && (
                                <div className="user-dropdown-menu">
                                    <div className="dropdown-item" onClick={() => navigate('/profile')}>
                                        👤 Profile
                                    </div>
                                    <div className="dropdown-item" onClick={() => navigate('/settings')}>
                                        ⚙️ Settings
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <div className="dropdown-item text-danger" onClick={handleLogoutClick}>
                                        🚪 Logout
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Logout Confirmation Popup */}
                        {showLogoutConfirm && (
                            <div className="header-logout-popup">
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

                <div className="page-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;
