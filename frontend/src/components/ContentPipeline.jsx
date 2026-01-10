import React from 'react';
import { Link } from 'react-router-dom';
import BentoCard from './BentoCard';
import './ContentPipeline.css';

/**
 * ContentPipeline - Visualizes the content creation workflow
 * Shows interactive stats and progress through the funnel
 */
const ContentPipeline = ({ stats }) => {
    const steps = [
        {
            id: 'ideas',
            label: 'Ideas',
            icon: '💡',
            count: stats?.totalIdeas || 0,
            color: 'var(--creator-gold)',
            link: '/ideas'
        },
        {
            id: 'captions',
            label: 'Captions',
            icon: '✍️',
            count: stats?.totalCaptions || 0,
            color: 'var(--creator-pink)',
            link: '/captions'
        },
        {
            id: 'scheduled',
            label: 'Scheduled',
            icon: '📅',
            count: stats?.scheduledPosts || 0,
            color: 'var(--creator-purple)',
            link: '/posts'
        },
        {
            id: 'posted',
            label: 'Posted',
            icon: '🚀',
            count: stats?.totalPosts || 0,
            color: 'var(--creator-blue)',
            link: '/analytics'
        },
        {
            id: 'tracked',
            label: 'Tracked',
            icon: '📊',
            count: stats?.totalPosts || 0,
            color: 'var(--success)',
            link: '/analytics'
        }
    ];

    return (
        <BentoCard colSpan={3} className="content-pipeline-container">
            <div className="pipeline-header">
                <h3 className="pipeline-title">Content Pipeline</h3>
                <span className="pipeline-badge">Live View</span>
            </div>

            <div className="pipeline-flow">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <Link to={step.link} className="pipeline-step">
                            <div
                                className="step-icon-wrapper"
                                style={{ '--step-color': step.color }}
                            >
                                <span className="step-icon">{step.icon}</span>
                                <span className="step-count">{step.count}</span>
                            </div>
                            <span className="step-label">{step.label}</span>

                            {/* Hover Preview Tooltip (future enhancement) */}
                            <div className="step-preview">
                                View {step.label}
                            </div>
                        </Link>

                        {index < steps.length - 1 && (
                            <div className="pipeline-connector">
                                <div className="connector-line"></div>
                                <div className="connector-dot"></div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </BentoCard>
    );
};

export default ContentPipeline;
