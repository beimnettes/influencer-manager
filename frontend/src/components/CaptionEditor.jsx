import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BentoCard from './BentoCard';
import ProgressRing from './ProgressRing';
import './CaptionEditor.css';

/**
 * CaptionEditor - A focused writing environment for creators
 * Features real-time preview, character counting, and platform optimization
 */
const CaptionEditor = ({ initialText = '', platform = 'Instagram' }) => {
    const [text, setText] = useState(initialText);
    const [activePlatform, setActivePlatform] = useState(platform);
    const [tone, setTone] = useState('Casual');

    // Platform limits
    const limits = {
        Instagram: 2200,
        TikTok: 2200, // Now longer
        Twitter: 280,
        LinkedIn: 3000,
        YouTube: 5000
    };

    const currentLimit = limits[activePlatform] || 2200;
    const progress = Math.min((text.length / currentLimit) * 100, 100);
    const charsLeft = currentLimit - text.length;

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const insertEmoji = (emoji) => {
        setText(prev => prev + emoji);
    };

    return (
        <div className="caption-editor-container">
            {/* Editor Column */}
            <BentoCard className="editor-card" colSpan={2}>
                <div className="editor-header">
                    <div className="editor-controls">
                        <select
                            value={activePlatform}
                            onChange={(e) => setActivePlatform(e.target.value)}
                            className="platform-select"
                        >
                            <option value="Instagram">Instagram</option>
                            <option value="TikTok">TikTok</option>
                            <option value="Twitter">Twitter / X</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="YouTube">YouTube</option>
                        </select>

                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="tone-select"
                        >
                            <option value="Casual">😊 Casual</option>
                            <option value="Professional">💼 Professional</option>
                            <option value="Witty">✨ Witty</option>
                            <option value="Educational">📚 Educational</option>
                        </select>
                    </div>

                    <div className="editor-actions">
                        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(text)}>
                            Copy Text
                        </button>
                    </div>
                </div>

                <div className="editor-area-wrapper">
                    <textarea
                        className="caption-textarea"
                        placeholder="Write your next viral caption..."
                        value={text}
                        onChange={handleTextChange}
                    />

                    <div className="emoji-bar">
                        {['😊', '🔥', '✨', '💪', '🎉', '❤️', '👀', '👇'].map(emoji => (
                            <button key={emoji} onClick={() => insertEmoji(emoji)} className="emoji-btn">
                                {emoji}
                            </button>
                        ))}
                        <button className="emoji-btn add-more">+</button>
                    </div>
                </div>

                <div className="editor-footer">
                    <div className="character-counter">
                        <ProgressRing size={40} progress={progress} strokeWidth={4} color="var(--primary)" />
                        <div className="counter-text">
                            <span className={charsLeft < 0 ? 'text-danger' : ''}>{text.length}</span>
                            <span className="counter-limit"> / {currentLimit}</span>
                        </div>
                    </div>

                    <div className="editor-save-actions">
                        <button className="btn-secondary">Save Draft</button>
                        <button className="btn-primary">Schedule →</button>
                    </div>
                </div>
            </BentoCard>

            {/* Preview Column */}
            <div className="preview-column">
                <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                        <div className={`app-header ${activePlatform.toLowerCase()}`}>
                            <span className="app-name">{activePlatform}</span>
                        </div>

                        <div className="post-preview">
                            <div className="preview-header">
                                <div className="preview-avatar"></div>
                                <div className="preview-username">@yourhandle</div>
                            </div>
                            <div className="preview-image-placeholder">
                                <span className="placeholder-icon">📷</span>
                                <span>Post Preview</span>
                            </div>
                            <div className="preview-actions">
                                <span>❤️</span> <span>💬</span> <span>🚀</span> <span>📌</span>
                            </div>
                            <div className="preview-caption">
                                <span className="preview-username-inline">@yourhandle</span>
                                {text || <span className="preview-placeholder">Your caption will appear here...</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CaptionEditor.propTypes = {
    initialText: PropTypes.string,
    platform: PropTypes.string
};

export default CaptionEditor;
