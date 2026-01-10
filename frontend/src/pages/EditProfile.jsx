import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BentoCard from '../components/BentoCard';
import './EditProfile.css';

const EditProfile = () => {
    const navigate = useNavigate();
    const { user, updateProfile } = useAuth();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || 'Lifestyle & Travel Creator • capturing moments 📸 • coffee enthusiast ☕️',
        website: user?.website || 'www.sarahcreator.com',
        location: user?.location || 'New York, USA'
    });

    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        setTimeout(async () => {
            await updateProfile({ ...formData, profilePicture });
            setIsLoading(false);
            navigate('/profile');
        }, 1000);
    };

    return (
        <div className="edit-profile-page fade-in">
            <div className="container">
                <div className="edit-header">
                    <button className="back-btn" onClick={() => navigate('/profile')}>
                        ← Back
                    </button>
                    <h1>Edit Profile</h1>
                </div>

                <div className="edit-content-grid">
                    {/* Left Column: Avatar & Basic Info */}
                    <div className="edit-column-main">
                        <BentoCard className="edit-card">
                            <form onSubmit={handleSubmit} className="edit-form">
                                <div className="form-section">
                                    <h3>Basic Information</h3>

                                    <div className="form-group">
                                        <label>Display Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="Your Name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Bio</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            className="form-input"
                                            rows="3"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="City, Country"
                                        />
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3>Online Presence</h3>

                                    <div className="form-group">
                                        <label>Website</label>
                                        <input
                                            type="text"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="yourwebsite.com"
                                        />
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={() => navigate('/profile')}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </BentoCard>
                    </div>

                    {/* Right Column: Avatar Preview */}
                    <div className="edit-column-side">
                        <BentoCard title="Profile Picture" className="avatar-edit-card">
                            <div className="avatar-preview-container">
                                <div className="avatar-large">
                                    {profilePicture ? (
                                        <img src={profilePicture} alt="Profile" className="avatar-image" />
                                    ) : (
                                        formData.name ? formData.name.charAt(0).toUpperCase() : 'U'
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handlePhotoChange}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    className="btn-secondary small change-photo-btn"
                                    onClick={handlePhotoClick}
                                >
                                    📷 Change Photo
                                </button>
                            </div>
                        </BentoCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
