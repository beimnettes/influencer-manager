import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';
import BentoCard from '../components/BentoCard';
import './Ideas.css';

const Ideas = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('board'); // 'board' or 'inspiration'
    const [searchQuery, setSearchQuery] = useState('');
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    // Mock AI idea generator
    const generateIdeas = () => {
        if (!aiPrompt.trim()) return;

        setIsGenerating(true);
        // Simulate AI processing
        setTimeout(() => {
            const mockSuggestions = [
                { id: 1, title: `"${aiPrompt}" - Behind the Scenes`, platform: 'Instagram', format: 'Reel' },
                { id: 2, title: `Top 5 ${aiPrompt} Tips`, platform: 'YouTube', format: 'Short' },
                { id: 3, title: `${aiPrompt} - Day in the Life`, platform: 'TikTok', format: 'Video' },
                { id: 4, title: `My ${aiPrompt} Journey`, platform: 'Instagram', format: 'Carousel' },
            ];
            setAiSuggestions(mockSuggestions);
            setIsGenerating(false);
        }, 1500);
    };

    // Inspiration images data
    const inspirationImages = [
        { id: 1, title: 'Sunrise Photography', url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400' },
        { id: 2, title: 'Minimalist Workspace', url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400' },
        { id: 3, title: 'Coffee Aesthetic', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400' },
        { id: 4, title: 'Travel Vibes', url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400' },
        { id: 5, title: 'Urban Street', url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400' },
        { id: 6, title: 'Nature Landscape', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
        { id: 7, title: 'Fitness Motivation', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400' },
        { id: 8, title: 'Food Photography', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
        { id: 9, title: 'Tech Setup', url: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=400' },
        { id: 10, title: 'Fashion Inspo', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400' },
        { id: 11, title: 'Ocean Views', url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400' },
        { id: 12, title: 'Architecture', url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400' },
    ];

    // ... (rest of code)

    return (
        <div className="ideas-page fade-in">
            {/* Header */}
            <div className="ideas-header">
                <div>
                    <h1 className="page-title">Content <span className="gradient-text">Ideas</span></h1>
                    <p className="page-subtitle">Capture, organize, and develop your next big hit.</p>
                </div>

                <button
                    className="create-idea-btn"
                    onClick={() => navigate('/ideas/new')}
                >
                    <span className="btn-icon">✨</span> New Idea
                </button>
            </div>

            {/* Toolbar */}
            <BentoCard className="ideas-toolbar-card">
                <div className="ideas-toolbar">
                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === 'board' ? 'active' : ''}`}
                            onClick={() => setViewMode('board')}
                        >
                            📊 Board
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'inspiration' ? 'active' : ''}`}
                            onClick={() => setViewMode('inspiration')}
                        >
                            🎨 Inspiration
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'ai' ? 'active' : ''}`}
                            onClick={() => setViewMode('ai')}
                        >
                            🤖 AI Ideas
                        </button>
                    </div>

                    <div className="search-bar-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search ideas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="toolbar-search"
                        />
                    </div>
                </div>
            </BentoCard>

            {/* Main Content */}
            <div className="ideas-content">
                {viewMode === 'board' ? (
                    <KanbanBoard />
                ) : viewMode === 'inspiration' ? (
                    <div className="inspiration-grid fade-in-up">
                        <div className="masonry-grid">
                            {inspirationImages.map((img) => (
                                <div key={img.id} className="inspiration-item">
                                    <img src={img.url} alt={img.title} loading="lazy" />
                                    <div className="inspiration-overlay">
                                        <span>{img.title}</span>
                                        <button className="save-btn">📌</button>
                                    </div>
                                </div>
                            ))}
                            {/* Add more placeholder items for grid effect */}
                            <div className="inspiration-item add-new-inspiration">
                                <span className="add-icon">+</span>
                                <span>Add Image</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="ai-generator-view fade-in-up">
                        <BentoCard className="ai-generator-card">
                            <h2>🤖 AI Idea Generator</h2>
                            <p className="ai-subtitle">Describe your topic and let AI suggest creative content ideas</p>

                            <div className="ai-input-section">
                                <input
                                    type="text"
                                    placeholder="e.g., productivity tips, morning routine, travel vlog..."
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && generateIdeas()}
                                    className="ai-prompt-input"
                                />
                                <button
                                    className="generate-btn"
                                    onClick={generateIdeas}
                                    disabled={!aiPrompt.trim() || isGenerating}
                                >
                                    {isGenerating ? '✨ Generating...' : '✨ Generate Ideas'}
                                </button>
                            </div>

                            {aiSuggestions.length > 0 && (
                                <div className="ai-suggestions">
                                    <h3>💡 AI Suggestions</h3>
                                    <div className="suggestions-grid">
                                        {aiSuggestions.map((suggestion) => (
                                            <div key={suggestion.id} className="suggestion-card">
                                                <div className="suggestion-header">
                                                    <span className={`platform-badge ${suggestion.platform.toLowerCase()}`}>
                                                        {suggestion.platform}
                                                    </span>
                                                    <span className="format-tag">{suggestion.format}</span>
                                                </div>
                                                <h4 className="suggestion-title">{suggestion.title}</h4>
                                                <button className="add-to-board-btn">+ Add to Board</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </BentoCard>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ideas;
