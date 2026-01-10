import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BentoCard from '../components/BentoCard';
import { contentIdeasAPI } from '../services/api';
import './NewIdea.css';

const NewIdea = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        platform: 'INSTAGRAM',
        tags: ''
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
            setError('Please enter a title for your idea');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            await contentIdeasAPI.create({
                title: formData.title,
                description: formData.description,
                platform: formData.platform,
                tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
            });

            navigate('/ideas');
        } catch (err) {
            console.error('Error creating idea:', err);
            setError('Failed to create idea. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="new-idea-page fade-in">
            <div className="page-header">
                <button className="back-btn" onClick={() => navigate('/ideas')}>
                    ← Back to Ideas
                </button>
                <h1 className="page-title">💡 New <span className="gradient-text">Idea</span></h1>
                <p className="page-subtitle">Capture your next content idea</p>
            </div>

            <BentoCard className="form-card">
                <form onSubmit={handleSubmit} className="idea-form">
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
                            placeholder="e.g., Morning Routine Vlog"
                            className="form-input"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your content idea..."
                            className="form-textarea"
                            rows={4}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="platform">Platform</label>
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

                    <div className="form-group">
                        <label htmlFor="tags">Tags (comma separated)</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="e.g., lifestyle, morning, routine"
                            className="form-input"
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/ideas')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '✨ Creating...' : '✨ Create Idea'}
                        </button>
                    </div>
                </form>
            </BentoCard>
        </div>
    );
};

export default NewIdea;
