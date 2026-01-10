import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineView from '../components/TimelineView';
import BentoCard from '../components/BentoCard';
import { postsAPI } from '../services/api';
import './Posts.css';

const Posts = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('timeline'); // 'timeline', 'calendar', 'queue'
    const [queuePosts, setQueuePosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch scheduled posts for queue view
    useEffect(() => {
        const fetchQueuePosts = async () => {
            try {
                setLoading(true);
                const posts = await postsAPI.getAll({ status: 'SCHEDULED' });

                if (posts && posts.length > 0) {
                    // Format posts for queue display
                    const formatted = posts.slice(0, 5).map(post => ({
                        id: post.id,
                        title: post.title,
                        platform: post.platform,
                        scheduledFor: post.scheduledFor,
                        status: 'Scheduled'
                    }));
                    setQueuePosts(formatted);
                }
            } catch (error) {
                console.error('Error fetching queue posts:', error);
            } finally {
                setLoading(false);
            }
        };

        if (viewMode === 'queue') {
            fetchQueuePosts();
        }
    }, [viewMode]);

    const formatQueueDate = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        if (date.toDateString() === now.toDateString()) {
            return `Today, ${timeStr}`;
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow, ${timeStr}`;
        }
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) + `, ${timeStr}`;
    };

    return (
        <div className="posts-page fade-in">
            <div className="posts-header">
                <div>
                    <h1 className="page-title">Publishing <span className="gradient-text">Calendar</span></h1>
                    <p className="page-subtitle">Schedule, plan, and automate your content.</p>
                </div>

                <button className="schedule-btn" onClick={() => navigate('/posts/new')}>
                    <span className="btn-icon">📅</span> Schedule Post
                </button>
            </div>

            {/* Toolbar */}
            <BentoCard className="posts-toolbar-card">
                <div className="posts-toolbar">
                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === 'timeline' ? 'active' : ''}`}
                            onClick={() => setViewMode('timeline')}
                        >
                            ⏳ Timeline
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                            onClick={() => setViewMode('calendar')}
                        >
                            📅 Month
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'queue' ? 'active' : ''}`}
                            onClick={() => setViewMode('queue')}
                        >
                            📋 Queue
                        </button>
                    </div>

                    <div className="toolbar-legend">
                        <span className="legend-item"><span className="dot instagram"></span> IG</span>
                        <span className="legend-item"><span className="dot tiktok"></span> TikTok</span>
                        <span className="legend-item"><span className="dot youtube"></span> YT</span>
                    </div>
                </div>
            </BentoCard>

            {/* Main Content */}
            <div className="posts-content">
                {viewMode === 'timeline' && (
                    <div className="timeline-wrapper fade-in-up">
                        <TimelineView />
                    </div>
                )}

                {viewMode === 'calendar' && (
                    <div className="calendar-placeholder fade-in">
                        <BentoCard variant="glass" className="placeholder-card">
                            <h3>Monthly Calendar View</h3>
                            <p>Coming in next update...</p>
                        </BentoCard>
                    </div>
                )}

                {viewMode === 'queue' && (
                    <div className="queue-list fade-in-up">
                        <BentoCard title="Up Next (Auto-Publish)" className="queue-card">
                            {queuePosts.length > 0 ? (
                                queuePosts.map(post => (
                                    <div key={post.id} className="queue-item">
                                        <div className="queue-time">{formatQueueDate(post.scheduledFor)}</div>
                                        <div className="queue-details">
                                            <span className={`platform-tag ${post.platform.toLowerCase()}`}>{post.platform}</span>
                                            <span className="queue-title">{post.title}</span>
                                        </div>
                                        <span className="status-badge scheduled">{post.status}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state-box">
                                    <span className="empty-icon">📋</span>
                                    <p className="empty-title">No posts in queue</p>
                                    <p className="empty-desc">Schedule your first post to see it here!</p>
                                </div>
                            )}
                        </BentoCard>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Posts;
