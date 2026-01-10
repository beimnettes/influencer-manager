import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState('email'); // 'email', 'code', 'reset', 'success'
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Mock verification code (in real app, this would be sent via email)
    const mockCode = '123456';

    const handleSendCode = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep('code');
        }, 1500);
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (verificationCode === mockCode) {
                setLoading(false);
                setStep('reset');
            } else {
                setLoading(false);
                setError('Invalid verification code. Try: 123456');
            }
        }, 1000);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep('success');
        }, 1500);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                {step === 'email' && (
                    <>
                        <div className="auth-header">
                            <h1>Forgot Password</h1>
                            <p>Enter your email to receive a reset code</p>
                        </div>

                        {error && <div className="alert alert-error">{error}</div>}

                        <form onSubmit={handleSendCode} className="auth-form">
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                                {loading ? 'Sending Code...' : 'Send Reset Code'}
                            </button>
                        </form>
                    </>
                )}

                {step === 'code' && (
                    <>
                        <div className="auth-header">
                            <h1>Enter Code</h1>
                            <p>We've sent a 6-digit code to <strong>{email}</strong></p>
                        </div>

                        {error && <div className="alert alert-error">{error}</div>}

                        <div className="info-box">
                            <span className="info-icon">💡</span>
                            <p>Demo: Use code <strong>123456</strong></p>
                        </div>

                        <form onSubmit={handleVerifyCode} className="auth-form">
                            <div className="form-group">
                                <label className="form-label">Verification Code</label>
                                <input
                                    type="text"
                                    className="form-input code-input"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="000000"
                                    maxLength={6}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify Code'}
                            </button>
                        </form>

                        <button className="resend-btn" onClick={() => setStep('email')}>
                            ← Change Email
                        </button>
                    </>
                )}

                {step === 'reset' && (
                    <>
                        <div className="auth-header">
                            <h1>Reset Password</h1>
                            <p>Create a new password for your account</p>
                        </div>

                        {error && <div className="alert alert-error">{error}</div>}

                        <form onSubmit={handleResetPassword} className="auth-form">
                            <div className="form-group">
                                <label className="form-label">New Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                    </>
                )}

                {step === 'success' && (
                    <>
                        <div className="auth-header success-header">
                            <div className="success-icon">✅</div>
                            <h1>Password Reset!</h1>
                            <p>Your password has been successfully updated</p>
                        </div>

                        <Link to="/login" className="btn btn-primary btn-full">
                            Sign In with New Password
                        </Link>
                    </>
                )}

                <div className="auth-footer">
                    <p>
                        Remember your password?{' '}
                        <Link to="/login" className="auth-link">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
