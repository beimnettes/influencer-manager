import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BentoCard from '../components/BentoCard';
import MomentumTracker from '../components/MomentumTracker';
import ContentPipeline from '../components/ContentPipeline';
import { dashboardAPI, postsAPI, contentIdeasAPI, captionsAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const userName = user?.name || 'User';

    // State for API data - all start at 0/empty for new users
    const [loading, setLoading] = useState(true);
    const [streak, setStreak] = useState(0);
    const [stats, setStats] = useState({
        scheduledPosts: 0,
        totalPosts: 0,
        totalIdeas: 0,
        totalCaptions: 0,
        growth: '0%',
        engagement: '0%'
    });
    const [upcomingPosts, setUpcomingPosts] = useState([]);
    const [recentWins, setRecentWins] = useState([]);

    // Fetch dashboard data from API
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await dashboardAPI.getOverview();
                const data = response;

                setStats({
                    scheduledPosts: data.stats?.scheduledPosts || 0,
                    totalPosts: data.stats?.totalPosts || 0,
                    totalIdeas: data.stats?.totalIdeas || 0,
                    totalCaptions: data.stats?.totalCaptions || 0,
                    growth: '+0%',
                    engagement: '0%'
                });

                // Format upcoming posts
                if (data.upcomingPosts && data.upcomingPosts.length > 0) {
                    const formatted = data.upcomingPosts.slice(0, 3).map(post => ({
                        id: post.id,
                        title: post.title,
                        platform: post.platform,
                        date: formatDate(post.scheduledFor),
                        type: getPostType(post.platform)
                    }));
                    setUpcomingPosts(formatted);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                // Keep default empty state on error
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === now.toDateString()) {
            return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        }
        return date.toLocaleDateString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' });
    };

    const getPostType = (platform) => {
        const types = { YOUTUBE: 'Video', INSTAGRAM: 'Post', TIKTOK: 'Video' };
        return types[platform] || 'Post';
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const isNewUser = stats.totalPosts === 0 && stats.totalIdeas === 0;

    return (
        <div className="dashboard-container">
            {/* Hero Section */}
            <div className="dashboard-hero fade-in">
                <BentoCard colSpan={3} className="hero-card" interactive>
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                {getGreeting()}, <span className="gradient-text">{userName}!</span>
                            </h1>
                            <p className="hero-subtitle">
                                {isNewUser
                                    ? "Welcome! Let's start creating amazing content. ✨"
                                    : "You're on a roll! Keep the momentum flowing. ✨"
                                }
                            </p>
                        </div>
                        <div className="hero-stats">
                            <div className="hero-stat-item">
                                <span className="stat-label">Next Up</span>
                                <span className="stat-value-sm">
                                    {upcomingPosts.length > 0
                                        ? upcomingPosts[0].title
                                        : 'No scheduled posts'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </BentoCard>
            </div>

            {/* Main Bento Grid */}
            <div className="dashboard-grid fade-in-up">
                {/* Left Column - Momentum & Activity */}
                <div className="grid-column-main">
                    <MomentumTracker
                        streak={streak}
                        weeklyGoal={5}
                        weeklyProgress={stats.totalPosts > 5 ? 5 : stats.totalPosts}
                    />

                    <ContentPipeline stats={stats} />

                    <BentoCard title="Recent Wins 🏆" colSpan={3} className="wins-card">
                        {recentWins.length > 0 ? (
                            <div className="wins-list">
                                {recentWins.map((win, index) => (
                                    <div key={index} className="win-item">
                                        <span className="win-icon">{win.icon}</span>
                                        <div>
                                            <span className="win-title">{win.title}</span>
                                            <span className="win-date">{win.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state-box">
                                <span className="empty-icon">🎯</span>
                                <p className="empty-title">No wins yet</p>
                                <p className="empty-desc">Start creating content to unlock achievements!</p>
                            </div>
                        )}
                    </BentoCard>
                </div>

                {/* Right Column - Quick Actions & Calendar */}
                <div className="grid-column-side">
                    <BentoCard title="Quick Create" className="quick-create-card">
                        <div className="quick-actions-grid">
                            <button
                                className="action-btn-large gradient-sunset"
                                onClick={() => navigate('/ideas')}
                            >
                                <span className="btn-icon">💡</span>
                                <span className="btn-label">New Idea</span>
                            </button>
                            <button
                                className="action-btn-large gradient-creative"
                                onClick={() => navigate('/captions')}
                            >
                                <span className="btn-icon">✍️</span>
                                <span className="btn-label">Draft</span>
                            </button>
                        </div>
                    </BentoCard>

                    <BentoCard title="Upcoming" className="upcoming-card">
                        {upcomingPosts.length > 0 ? (
                            <div className="upcoming-list">
                                {upcomingPosts.map(post => (
                                    <div key={post.id} className="upcoming-item">
                                        <div className={`platform-dot ${post.platform.toLowerCase()}`}></div>
                                        <div className="upcoming-info">
                                            <span className="upcoming-title">{post.title}</span>
                                            <span className="upcoming-date">{post.date}</span>
                                        </div>
                                        <span className="post-type-badge">{post.type}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state-box-small">
                                <span className="empty-icon">📅</span>
                                <p className="empty-title">No posts scheduled</p>
                            </div>
                        )}
                        <button
                            className="view-all-btn"
                            onClick={() => navigate('/posts')}
                        >
                            View Calendar →
                        </button>
                    </BentoCard>

                    {/* Mini Analytics Preview */}
                    <BentoCard title="Growth" className="mini-analytics">
                        <div className="mini-stat-row">
                            <div className="mini-stat">
                                <span className="mini-label">Followers</span>
                                <span className="mini-value text-success">+0</span>
                            </div>
                            <div className="mini-stat">
                                <span className="mini-label">Engagement</span>
                                <span className="mini-value text-accent">0%</span>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
