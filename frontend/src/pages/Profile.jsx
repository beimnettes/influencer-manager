import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const userName = user?.name || 'User';
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
    const profilePicture = user?.profilePicture;

    // User profile data - empty for new users
    const userBio = user?.bio || null;
    const userStats = user?.stats || null;
    const userAchievements = user?.achievements || [];
    const connectedAccounts = user?.connectedAccounts || [];
    const socialLinks = user?.socialLinks || {};

    // Check if user has any connected accounts
    const hasConnectedAccounts = connectedAccounts.length > 0;

    // Available platforms for connection
    const availablePlatforms = [
        { id: 'instagram', name: 'Instagram', icon: '📷' },
        { id: 'tiktok', name: 'TikTok', icon: '🎵' },
        { id: 'youtube', name: 'YouTube', icon: '▶️' },
        { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
        { id: 'twitter', name: 'Twitter', icon: '🐦' },
        { id: 'snapchat', name: 'Snapchat', icon: '👻' },
    ];

    // Filter platforms to show which are connected vs available
    const getConnectionStatus = (platformId) => {
        return connectedAccounts.some(acc => acc.platform === platformId);
    };

    return (
        <div className="profile-page">
            <div className="container">
                {/* Profile Header */}
                <div className="profile-header bento-card">
                    <div className="profile-cover"></div>
                    <div className="profile-info-container">
                        <div className="profile-avatar">
                            {profilePicture ? (
                                <img src={profilePicture} alt="Profile" className="profile-avatar-img" />
                            ) : (
                                userInitial
                            )}
                        </div>
                        <div className="profile-details">
                            <h1 className="profile-name">{userName}</h1>

                            {/* Bio - show placeholder for new users */}
                            {userBio ? (
                                <p className="profile-bio">{userBio}</p>
                            ) : (
                                <p className="profile-bio empty-state">
                                    <span className="empty-hint">✨ Add a bio to tell others about yourself</span>
                                </p>
                            )}

                            {/* Social Links - only show if user has set them up */}
                            {Object.keys(socialLinks).length > 0 && (
                                <div className="profile-social-icons">
                                    {socialLinks.instagram && (
                                        <a href={socialLinks.instagram} className="social-icon-link instagram-icon" title="Instagram" target="_blank" rel="noopener noreferrer">
                                            <span className="platform-symbol">📷</span>
                                        </a>
                                    )}
                                    {socialLinks.tiktok && (
                                        <a href={socialLinks.tiktok} className="social-icon-link tiktok-icon" title="TikTok" target="_blank" rel="noopener noreferrer">
                                            <span className="platform-symbol">🎵</span>
                                        </a>
                                    )}
                                    {socialLinks.youtube && (
                                        <a href={socialLinks.youtube} className="social-icon-link youtube-icon" title="YouTube" target="_blank" rel="noopener noreferrer">
                                            <span className="platform-symbol">▶️</span>
                                        </a>
                                    )}
                                    {socialLinks.twitter && (
                                        <a href={socialLinks.twitter} className="social-icon-link twitter-icon" title="Twitter" target="_blank" rel="noopener noreferrer">
                                            <span className="platform-symbol">🐦</span>
                                        </a>
                                    )}
                                    {socialLinks.linkedin && (
                                        <a href={socialLinks.linkedin} className="social-icon-link linkedin-icon" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                                            <span className="platform-symbol">💼</span>
                                        </a>
                                    )}
                                </div>
                            )}

                            {/* Stats - show zeros or actual stats */}
                            <div className="profile-stats-row">
                                <div className="profile-stat">
                                    <span className="stat-num">{userStats?.followers || '0'}</span>
                                    <span className="stat-label">Followers</span>
                                </div>
                                <div className="profile-stat">
                                    <span className="stat-num">{userStats?.engagement || '0%'}</span>
                                    <span className="stat-label">Engagement</span>
                                </div>
                                <div className="profile-stat">
                                    <span className="stat-num">{userStats?.posts || '0'}</span>
                                    <span className="stat-label">Posts</span>
                                </div>
                            </div>
                        </div>
                        <div className="profile-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/profile/edit')}
                            >
                                Edit Profile
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Profile link copied to clipboard! 📋');
                                }}
                            >
                                Share
                            </button>
                        </div>
                    </div>
                </div>

                <div className="profile-grid">
                    {/* Achievements */}
                    <div className="bento-card">
                        <h2>🏆 Achievements</h2>
                        {userAchievements.length > 0 ? (
                            <div className="achievements-list">
                                {userAchievements.map((achievement, index) => (
                                    <div key={index} className="achievement-item">
                                        <span className="achievement-icon">{achievement.icon}</span>
                                        <div className="achievement-text">
                                            <h4>{achievement.title}</h4>
                                            <p>{achievement.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state-box">
                                <span className="empty-icon">🎯</span>
                                <p className="empty-title">No achievements yet</p>
                                <p className="empty-desc">Start posting and engaging to unlock achievements!</p>
                            </div>
                        )}
                    </div>

                    {/* Connected Accounts */}
                    <div className="bento-card">
                        <h2>🔗 Connected Accounts</h2>
                        <div className="accounts-list">
                            {availablePlatforms.map((platform) => {
                                const isConnected = getConnectionStatus(platform.id);
                                return (
                                    <div key={platform.id} className={`account-item ${isConnected ? 'connected' : ''}`}>
                                        <div className="account-info">
                                            <span className={`platform-icon ${platform.id}-icon`}>{platform.icon}</span>
                                            <span>{platform.name}</span>
                                        </div>
                                        {isConnected ? (
                                            <span className="status-badge">Connected</span>
                                        ) : (
                                            <button
                                                className="btn-sm btn-secondary"
                                                onClick={() => alert(`Connect ${platform.name} functionality coming soon! ${platform.icon}`)}
                                            >
                                                Connect
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
