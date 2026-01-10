import React from 'react';
import PropTypes from 'prop-types';
import './ProgressRing.css';

/**
 * ProgressRing - Circular progress indicator
 * Perfect for streaks, goals, and completion tracking
 */
const ProgressRing = ({
    size = 80,
    progress = 0,
    strokeWidth = 8,
    label,
    showPercentage = false,
    color = 'var(--gradient-momentum)'
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="progress-ring-container" style={{ width: size, height: size }}>
            <svg
                className="progress-ring-svg"
                width={size}
                height={size}
            >
                {/* Background circle */}
                <circle
                    className="progress-ring-bg"
                    stroke="var(--border)"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Progress circle */}
                <circle
                    className="progress-ring-circle"
                    stroke={color}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{
                        transition: 'stroke-dashoffset 0.5s ease',
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%'
                    }}
                />
            </svg>
            {/* Center content */}
            <div className="progress-ring-label">
                {showPercentage ? (
                    <span className="progress-ring-percentage">{Math.round(progress)}%</span>
                ) : label ? (
                    <span className="progress-ring-text">{label}</span>
                ) : null}
            </div>
        </div>
    );
};

ProgressRing.propTypes = {
    size: PropTypes.number,
    progress: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number,
    label: PropTypes.string,
    showPercentage: PropTypes.bool,
    color: PropTypes.string
};

export default ProgressRing;
