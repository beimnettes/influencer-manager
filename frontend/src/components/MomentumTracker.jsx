import React from 'react';
import PropTypes from 'prop-types';
import ProgressRing from './ProgressRing';
import './MomentumTracker.css';

/**
 * MomentumTracker - Displays streak and weekly goal progress
 * Motivates creators to stay consistent
 */
const MomentumTracker = ({ streak = 0, weeklyGoal = 10, weeklyProgress = 0 }) => {
    const progressPercentage = (weeklyProgress / weeklyGoal) * 100;

    return (
        <div className="momentum-tracker bento-card">
            <h3 className="momentum-title">Your Momentum 🔥</h3>

            <div className="momentum-grid">
                {/* Streak Counter */}
                <div className="momentum-item">
                    <ProgressRing
                        size={100}
                        progress={Math.min((streak / 30) * 100, 100)}
                        strokeWidth={10}
                        color="url(#gradient-fire)"
                        label={`${streak}`}
                    />
                    <svg width="0" height="0">
                        <defs>
                            <linearGradient id="gradient-fire" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff6b6b" />
                                <stop offset="50%" stopColor="#ff8e53" />
                                <stop offset="100%" stopColor="#ffd93d" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="momentum-label">
                        <div className="momentum-value">{streak}-Day Streak</div>
                        <div className="momentum-subtitle">Keep it up!</div>
                    </div>
                </div>

                {/* Weekly Goal */}
                <div className="momentum-item">
                    <ProgressRing
                        size={100}
                        progress={progressPercentage}
                        strokeWidth={10}
                        color="url(#gradient-progress)"
                        showPercentage
                    />
                    <svg width="0" height="0">
                        <defs>
                            <linearGradient id="gradient-progress" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff6b9d" />
                                <stop offset="100%" stopColor="#ffa649" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="momentum-label">
                        <div className="momentum-value">{weeklyProgress} / {weeklyGoal} Posts</div>
                        <div className="momentum-subtitle">This week</div>
                    </div>
                </div>
            </div>

            {/* Motivational Message */}
            {streak >= 7 && (
                <div className="momentum-achievement">
                    <span className="achievement-emoji">🎉</span>
                    <span className="achievement-text">
                        {streak >= 30 ? "Legendary streak!" : streak >= 14 ? "On fire!" : "Great momentum!"}
                    </span>
                </div>
            )}
        </div>
    );
};

MomentumTracker.propTypes = {
    streak: PropTypes.number,
    weeklyGoal: PropTypes.number,
    weeklyProgress: PropTypes.number
};

export default MomentumTracker;
