import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            logout();
            navigate('/login');
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="navbar-brand">
                    Influencer Manager
                </Link>

                <div className="navbar-links">
                    <Link to="/" className="navbar-link">
                        Dashboard
                    </Link>
                    <Link to="/ideas" className="navbar-link">
                        Ideas
                    </Link>
                    <Link to="/captions" className="navbar-link">
                        Captions
                    </Link>
                    <Link to="/posts" className="navbar-link">
                        Posts
                    </Link>
                    <Link to="/analytics" className="navbar-link">
                        Analytics
                    </Link>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginLeft: '1rem' }}>
                        {user?.name}
                    </span>
                    <button onClick={handleLogout} className="btn btn-secondary">
                        Logout
                    </button>
                </div>
            </div>

            {/* Theme toggle in far right corner */}
            <div className="theme-toggle-corner">
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
