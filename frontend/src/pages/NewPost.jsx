import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BentoCard from '../components/BentoCard';
import { postsAPI } from '../services/api';
import './NewPost.css';

const NewPost = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        platform: 'INSTAGRAM',
        scheduledFor: '',
        scheduledTime: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const platforms = [
        { value: 'INSTAGRAM', label: 'Instagram', icon: '📷' },
        { value: 'TIKTOK', label: 'TikTok', icon: '🎵' },
        { value: 'YOUTUBE', label: 'YouTube', icon: '▶️' },
        { value: 'TWITTER', label: 'Twitter', icon: '🐦' },
        { value: 'LINKEDIN', label: 'LinkedIn', icon: '💼' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setError('Please enter a title for your post');
            return;
        }

        if (!formData.scheduledFor || !formData.scheduledTime) {
            setError('Please select a date and time to schedule');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // Combine date and time
            const scheduledDateTime = new Date(`${formData.scheduledFor}T${formData.scheduledTime}`);

            await postsAPI.create({
                title: formData.title,
                content: formData.content,
                platform: formData.platform,
                scheduledFor: scheduledDateTime.toISOString(),
                status: 'SCHEDULED'
            });

            navigate('/posts');
        } catch (err) {
            console.error('Error creating post:', err);
            setError('Failed to schedule post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="new-post-page fade-in">
            <div className="page-header">
                <button className="back-btn" onClick={() => navigate('/posts')}>
                    ← Back to Calendar
                </button>
                <h1 className="page-title">📅 Schedule <span className="gradient-text">Post</span></h1>
                <p className="page-subtitle">Plan and schedule your content</p>
            </div>

            <BentoCard className="form-card">
                <form onSubmit={handleSubmit} className="post-form">
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Summer Vlog Part 2"
                            className="form-input"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content / Caption</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write your caption or post content..."
                            className="form-textarea"
                            rows={4}
                        />
                    </div>

                    <div className="form-group">
                        <label>Platform</label>
                        <div className="platform-selector">
                            {platforms.map(p => (
                                <button
                                    key={p.value}
                                    type="button"
                                    className={`platform-option ${formData.platform === p.value ? 'selected' : ''}`}
                                    onClick={() => setFormData(prev => ({ ...prev, platform: p.value }))}
                                >
                                    <span className="platform-icon">{p.icon}</span>
                                    <span>{p.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="scheduledFor">Date *</label>
                            <input
                                type="date"
                                id="scheduledFor"
                                name="scheduledFor"
                                value={formData.scheduledFor}
                                onChange={handleChange}
                                min={today}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="scheduledTime">Time *</label>
                            <input
                                type="time"
                                id="scheduledTime"
                                name="scheduledTime"
                                value={formData.scheduledTime}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/posts')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '📅 Scheduling...' : '📅 Schedule Post'}
                        </button>
                    </div>
                </form>
            </BentoCard>
        </div>
    );
};

export default NewPost;
