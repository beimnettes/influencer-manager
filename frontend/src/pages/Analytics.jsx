import React, { useState, useEffect } from 'react';
import BentoCard from '../components/BentoCard';
import ProgressRing from '../components/ProgressRing';
import { analyticsAPI } from '../services/api';
import './Analytics.css';

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('30d');
    const [loading, setLoading] = useState(true);
    const [analyticsData, setAnalyticsData] = useState({
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0,
        totalPosts: 0,
        averageLikes: 0,
        platformBreakdown: {}
    });
    const [topPosts, setTopPosts] = useState([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const response = await analyticsAPI.getSummary();
                setAnalyticsData(response);
            } catch (error) {
                console.error('Error fetching analytics:', error);
                // Keep default empty state on error
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [timeRange]);

    const hasData = analyticsData.totalPosts > 0;
    const platformColors = {
        INSTAGRAM: '#e1306c',
        YOUTUBE: '#ff0000',
        TIKTOK: '#00f2ea'
    };

    // Calculate platform percentages
    const totalPlatformPosts = Object.values(analyticsData.platformBreakdown).reduce((a, b) => a + b, 0);
    const getPlatformPercentage = (platform) => {
        if (totalPlatformPosts === 0) return 0;
        return Math.round((analyticsData.platformBreakdown[platform] || 0) / totalPlatformPosts * 100);
    };

    return (
        <div className="analytics-page fade-in">
            <div className="analytics-header">
                <div>
                    <h1 className="page-title">Growth <span className="gradient-text">Insights</span></h1>
                    <p className="page-subtitle">Track your impact and celebrate your wins.</p>
                </div>

                <select
                    className="time-range-select"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 3 Months</option>
                </select>
            </div>

            <div className="analytics-grid">
                {/* Hero Growth Story */}
                <BentoCard colSpan={3} className="growth-hero-card" interactive>
                    <div className="growth-content">
                        <div className="growth-text">
                            {hasData ? (
                                <>
                                    <h3>You're making progress! 🔥</h3>
                                    <p className="growth-summary">
                                        You have <span className="highlight-text">{analyticsData.totalViews.toLocaleString()} views</span> and <span className="highlight-text">{analyticsData.totalLikes.toLocaleString()} likes</span> across your posts.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3>Ready to grow! 🚀</h3>
                                    <p className="growth-summary">
                                        Start posting content to track your growth and engagement metrics here.
                                    </p>
                                </>
                            )}
                            <div className="growth-chart-placeholder">
                                {/* Simple CSS Chart Visualization */}
                                <div className="chart-bar" style={{ height: hasData ? '40%' : '10%' }}></div>
                                <div className="chart-bar" style={{ height: hasData ? '55%' : '15%' }}></div>
                                <div className="chart-bar" style={{ height: hasData ? '45%' : '10%' }}></div>
                                <div className="chart-bar" style={{ height: hasData ? '70%' : '20%' }}></div>
                                <div className="chart-bar" style={{ height: hasData ? '60%' : '15%' }}></div>
                                <div className="chart-bar" style={{ height: hasData ? '85%' : '25%' }}></div>
                                <div className="chart-bar active" style={{ height: hasData ? '100%' : '30%' }}></div>
                            </div>
                        </div>
                        <div className="growth-stats-row">
                            <div className="stat-pill">
                                <span className="pill-label">Total Views</span>
                                <span className="pill-value">{analyticsData.totalViews.toLocaleString()}</span>
                            </div>
                            <div className="stat-pill">
                                <span className="pill-label">Avg. Likes</span>
                                <span className="pill-value">{analyticsData.averageLikes.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* Top Performers Podium */}
                <BentoCard colSpan={2} title="Top Performers 🏆" className="podium-card">
                    {topPosts.length > 0 ? (
                        <div className="podium-container">
                            {/* Podium would render here with actual data */}
                        </div>
                    ) : (
                        <div className="empty-state-box">
                            <span className="empty-icon">🏆</span>
                            <p className="empty-title">No top performers yet</p>
                            <p className="empty-desc">Your best performing posts will appear here!</p>
                        </div>
                    )}
                </BentoCard>

                {/* Platform Breakdown & Goals */}
                <div className="side-analytics-col">
                    <BentoCard title="Platform Mix">
                        {hasData ? (
                            <div className="platform-mix-list">
                                {Object.entries(analyticsData.platformBreakdown).map(([platform, count]) => (
                                    <div key={platform} className="mix-item">
                                        <span className="mix-label">{platform}</span>
                                        <div className="mix-bar-bg">
                                            <div
                                                className="mix-bar"
                                                style={{
                                                    width: `${getPlatformPercentage(platform)}%`,
                                                    background: platformColors[platform] || '#a855f7'
                                                }}
                                            ></div>
                                        </div>
                                        <span className="mix-val">{getPlatformPercentage(platform)}%</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state-box-small">
                                <span className="empty-icon">📊</span>
                                <p className="empty-title">No platform data yet</p>
                            </div>
                        )}
                    </BentoCard>

                    <BentoCard title="Monthly Goal 🎯">
                        <div className="goal-card-content">
                            <ProgressRing size={80} progress={0} strokeWidth={8} color="var(--success)" />
                            <div className="goal-text">
                                <span className="goal-value">0%</span>
                                <span className="goal-label">Set your first goal!</span>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
