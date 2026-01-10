import React from 'react';
import CaptionEditor from '../components/CaptionEditor';
import HashtagManager from '../components/HashtagManager';
import BentoCard from '../components/BentoCard';
import './Captions.css';

const Captions = () => {
    const [showAiModal, setShowAiModal] = React.useState(false);
    const [aiPrompt, setAiPrompt] = React.useState('');
    const [aiCaptions, setAiCaptions] = React.useState([]);
    const [isGenerating, setIsGenerating] = React.useState(false);

    const generateAiCaptions = () => {
        if (!aiPrompt.trim()) return;

        setIsGenerating(true);
        // Simulate AI generation
        setTimeout(() => {
            const mockCaptions = [
                `${aiPrompt} ✨\n\nHere's what I learned today about making it happen. Drop a 💫 if you're ready for this journey!\n\n#${aiPrompt.replace(/\s+/g, '')} #ContentCreator #DailyInspiration`,
                `POV: You're finally mastering ${aiPrompt} 🎯\n\nSwipe to see my top 3 tips that changed everything. Which one resonates with you?\n\n#${aiPrompt.replace(/\s+/g, '')} #CreatorTips #GrowthMindset`,
                `Let's talk about ${aiPrompt}... 🔥\n\nThis is the game-changer nobody talks about. Save this for later!\n\n#${aiPrompt.replace(/\s+/g, '')} #BehindTheScenes #RealTalk`,
                `Can we normalize ${aiPrompt}? 💭\n\nComment YES if you agree. Let's start a conversation!\n\n#${aiPrompt.replace(/\s+/g, '')} #CommunityFirst #LetsDiscuss`
            ];
            setAiCaptions(mockCaptions);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="captions-page fade-in">
            <div className="captions-header">
                <div>
                    <h1 className="page-title">Writing <span className="gradient-text">Studio</span></h1>
                    <p className="page-subtitle">Craft viral captions with AI-powered tools.</p>
                </div>

                <div className="header-actions">
                    <button
                        className="btn-secondary small"
                        onClick={() => alert('Templates gallery coming soon!')}
                    >
                        Templates
                    </button>
                    <button
                        className="btn-secondary small"
                        onClick={() => alert('Caption history coming soon!')}
                    >
                        History
                    </button>
                </div>
            </div>

            <div className="captions-layout">
                {/* Main Writing Area (2/3 width) */}
                <div className="main-area">
                    <CaptionEditor />
                </div>

                {/* Sidebar Tools (1/3 width) */}
                <div className="tools-sidebar">
                    <HashtagManager />

                    <BentoCard title="Pro Tips 💡" className="tips-card">
                        <ul className="tips-list">
                            <li>🎯 Start with a strong hook in the first line</li>
                            <li>❓ Ask a question to drive engagement</li>
                            <li>📢 Include a clear Call to Action (CTA)</li>
                        </ul>
                    </BentoCard>

                    <BentoCard className="ai-assist-card" interactive onClick={() => setShowAiModal(true)}>
                        <div className="ai-assist-content">
                            <span className="ai-icon">✨</span>
                            <div>
                                <h4>AI Writer</h4>
                                <p>Generate caption ideas</p>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </div>

            {/* AI Writer Modal */}
            {showAiModal && (
                <div className="modal-overlay" onClick={() => setShowAiModal(false)}>
                    <div className="modal-content ai-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>✨ AI Caption Generator</h2>
                            <button className="close-btn" onClick={() => setShowAiModal(false)}>×</button>
                        </div>

                        <div className="modal-body">
                            <p className="modal-description">Describe your content topic and get AI-powered caption suggestions</p>

                            <div className="ai-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="e.g., morning routine, travel tips, fitness motivation..."
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && generateAiCaptions()}
                                    className="ai-modal-input"
                                />
                                <button
                                    className="btn-primary"
                                    onClick={generateAiCaptions}
                                    disabled={!aiPrompt.trim() || isGenerating}
                                >
                                    {isGenerating ? 'Generating...' : 'Generate'}
                                </button>
                            </div>

                            {aiCaptions.length > 0 && (
                                <div className="ai-results">
                                    <h3>💡 Generated Captions</h3>
                                    <div className="captions-grid">
                                        {aiCaptions.map((caption, index) => (
                                            <div key={index} className="caption-result-card">
                                                <p className="caption-text">{caption}</p>
                                                <button
                                                    className="use-caption-btn"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(caption);
                                                        alert('Caption copied to clipboard! 📋');
                                                    }}
                                                >
                                                    📋 Copy Caption
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Captions;
