import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [biometricAvailable, setBiometricAvailable] = useState(false);
    const [biometricLoading, setBiometricLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    // Check if biometric (WebAuthn) is available
    useEffect(() => {
        const checkBiometric = async () => {
            if (window.PublicKeyCredential) {
                try {
                    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
                    setBiometricAvailable(available);
                } catch (e) {
                    setBiometricAvailable(false);
                }
            }
        };
        checkBiometric();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            setEmail('');
            setPassword('');
            navigate('/');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    const handleSocialLogin = (provider) => {
        alert(`${provider} login coming soon! For now, use email/password.`);
    };

    const handleBiometricLogin = async () => {
        setBiometricLoading(true);
        setError('');

        try {
            const challenge = new Uint8Array(32);
            window.crypto.getRandomValues(challenge);

            const credential = await navigator.credentials.get({
                publicKey: {
                    challenge: challenge,
                    timeout: 60000,
                    userVerification: 'required',
                    rpId: window.location.hostname,
                    allowCredentials: []
                }
            });

            if (credential) {
                localStorage.setItem('token', 'biometric-demo-token');
                localStorage.setItem('user', JSON.stringify({
                    name: 'Face ID User',
                    email: 'faceid@demo.com'
                }));
                window.location.href = '/';
            }
        } catch (err) {
            if (err.name === 'NotAllowedError') {
                setError('Face recognition was cancelled');
            } else {
                setError('Face recognition failed. Try email/password.');
            }
        }

        setBiometricLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>Sign in</h1>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                {/* Social Login Section */}
                <div className="social-login-section">
                    <p className="section-label">With other accounts</p>

                    <button className="social-btn google" onClick={() => handleSocialLogin('Google')}>
                        <span className="social-icon">G</span>
                        <span>Sign in with Google</span>
                    </button>

                    <button className="social-btn okta" onClick={() => handleSocialLogin('Okta')}>
                        <span className="social-icon">◉</span>
                        <span>Continue with Okta</span>
                    </button>
                </div>

                <div className="divider">
                    <span>OR</span>
                </div>

                {/* Email Login Section */}
                <div className="email-login-section">
                    <p className="section-label">With existing account</p>

                    <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
                        <div className="form-group">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                autoComplete="off"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="show-password-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '🙈' : '👁️'} {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <div className="forgot-password-link">
                            <Link to="/forgot-password" className="auth-link">
                                Forgot your password?
                            </Link>
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    {/* Face ID at bottom of email section */}
                    {biometricAvailable && (
                        <div className="face-id-section">
                            <button
                                className="face-id-btn"
                                onClick={handleBiometricLogin}
                                disabled={biometricLoading}
                            >
                                <span className="face-icon">👤</span>
                                <span>{biometricLoading ? 'Scanning...' : 'Sign in with Face ID'}</span>
                            </button>
                        </div>
                    )}
                </div>

                <div className="auth-footer">
                    <p>
                        New user?{' '}
                        <Link to="/signup" className="auth-link">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
