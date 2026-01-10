import React from 'react';
import BentoCard from './BentoCard';
import './HashtagManager.css';

/**
 * HashtagManager - Tool to manage and organize hashtag groups
 * Allows quick copying and usage tracking
 */
const HashtagManager = () => {
    const groups = [
        { title: 'Lifestyle', tags: ['#lifestyle', '#creator', '#dailyvlog', '#aesthetic', '#goals'], color: 'var(--creator-pink)' },
        { title: 'Tech', tags: ['#tech', '#setup', '#desksetup', '#developer', '#coding'], color: 'var(--creator-blue)' },
        { title: 'Growth', tags: ['#growthmindset', '#hustle', '#entrepreneur', '#motivation'], color: 'var(--creator-gold)' }
    ];

    return (
        <BentoCard title="Hashtag Groups 🏷️" className="hashtag-manager">
            <div className="hashtag-groups">
                {groups.map((group, index) => (
                    <div key={index} className="hashtag-group">
                        <div className="group-header">
                            <span className="group-title" style={{ color: group.color }}>{group.title}</span>
                            <button className="copy-tags-btn" title="Copy Group">📋</button>
                        </div>
                        <div className="group-tags">
                            {group.tags.map(tag => (
                                <span key={tag} className="tag-chip">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}

                <button className="add-group-btn">
                    + Create New Group
                </button>
            </div>
        </BentoCard>
    );
};

export default HashtagManager;
