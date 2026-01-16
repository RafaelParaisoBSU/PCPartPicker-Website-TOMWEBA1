import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import '../styles/Auth.scss';

// Authentication page component - handles login and signup
const Auth = ({ onShowModal, setUser }) => {
  // State management
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Initialize Google Sign-In button
  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google) {
        const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        
        // Check if Google Client ID is configured
        if (!googleClientId) {
          console.warn('Google Client ID not configured. Please set VITE_GOOGLE_CLIENT_ID environment variable.');
          return;
        }

        // Initialize Google OAuth
        window.google.accounts.id.initialize({
          client_id: '567044713006-v759hmi7jnhlnu148uvmlsatkau5oh3u.apps.googleusercontent.com', 
          callback: handleGoogleCallback,
        });
        
        // Render Google Sign-In button
        const buttonContainer = document.getElementById('googleButtonContainer');
        if (buttonContainer) {
          buttonContainer.innerHTML = '';
          window.google.accounts.id.renderButton(buttonContainer, {
            theme: 'outline',
            size: 'large'
          });
        }
      }
    };

    // Load Google SDK if not already loaded
    if (window.google) {
      initializeGoogle();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.head.appendChild(script);
    }
  }, []);

  // Update form field values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission (login/signup)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate email format
      if (!validateEmail(formData.email)) {
        onShowModal({
          isOpen: true,
          type: 'error',
          title: 'Invalid Email',
          message: 'Please enter a valid email address',
          actions: [{ label: 'OK', onClick: () => {} }]
        });
        setLoading(false);
        return;
      }

      // Validate password length
      if (formData.password.length < 6) {
        onShowModal({
          isOpen: true,
          type: 'error',
          title: 'Password Too Short',
          message: 'Password must be at least 6 characters',
          actions: [{ label: 'OK', onClick: () => {} }]
        });
        setLoading(false);
        return;
      }

      // Validate password confirmation (signup only)
      if (!isLogin && formData.password !== formData.confirmPassword) {
        onShowModal({
          isOpen: true,
          type: 'error',
          title: 'Passwords Don\'t Match',
          message: 'Please make sure your passwords match',
          actions: [{ label: 'OK', onClick: () => {} }]
        });
        setLoading(false);
        return;
      }

      // Prepare API request
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName
          };

      // Send authentication request
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        // Save auth data to localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Update user state
        if (setUser) {
          setUser(data.user);
        }
        
        // Dispatch user update event
        window.dispatchEvent(new CustomEvent('userUpdated', { detail: data.user }));

        // Show success message and redirect
        onShowModal({
          isOpen: true,
          type: 'success',
          title: isLogin ? 'Login Successful' : 'Signup Successful',
          message: `Welcome ${data.user.firstName || 'back'}!`,
          actions: [{ 
            label: 'OK', 
            onClick: () => {
              onShowModal({ isOpen: false });
              navigate('/');
            }
          }]
        });
      } else {
        // Show error message
        onShowModal({
          isOpen: true,
          type: 'error',
          title: 'Error',
          message: data.message || 'Authentication failed',
          actions: [{ label: 'OK', onClick: () => onShowModal({ isOpen: false }) }]
        });
      }
    } catch (error) {
      // Handle network errors
      onShowModal({
        isOpen: true,
        type: 'error',
        title: 'Connection Error',
        message: 'Failed to reach the server. Please try again.',
        actions: [{ label: 'OK', onClick: () => onShowModal({ isOpen: false }) }]
      });
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google OAuth callback
  const handleGoogleCallback = async (response) => {
    try {
      setLoading(true);

      if (!response.credential) {
        throw new Error('No credential received from Google');
      }

      // Decode Google JWT token
      const token = response.credential;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);

      // Send Google user data to backend
      const backendResponse = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          googleId: decoded.sub,
          email: decoded.email,
          firstName: decoded.given_name || 'User',
          lastName: decoded.family_name || '',
          profileImage: decoded.picture,
        }),
      });

      const data = await backendResponse.json();

      if (backendResponse.ok) {
        // Save auth data to localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Update user state
        if (setUser) {
          setUser(data.user);
        }
        
        // Dispatch user update event
        window.dispatchEvent(new CustomEvent('userUpdated', { detail: data.user }));

        // Show success message and redirect
        onShowModal({
          isOpen: true,
          type: 'success',
          title: 'Login Successful',
          message: `Welcome ${data.user.firstName}!`,
          actions: [{ 
            label: 'OK', 
            onClick: () => {
              onShowModal({ isOpen: false });
              navigate('/');
            }
          }]
        });
      } else {
        // Show error message
        onShowModal({
          isOpen: true,
          type: 'error',
          title: 'Error',
          message: data.message || 'Google authentication failed',
          actions: [{ label: 'OK', onClick: () => onShowModal({ isOpen: false }) }]
        });
      }
    } catch (error) {
      console.error('Google auth error:', error);
      console.error('Error details:', error.message, error.stack);
      onShowModal({
        isOpen: true,
        type: 'error',
        title: 'Google Auth Error',
        message: `${error.message}. Check browser console for details.`,
        actions: [{ label: 'OK', onClick: () => {} }]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google button should be rendered automatically');
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          {/* Page title */}
          <h1 className="auth-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          
          {/* Email/password authentication form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Name fields (signup only) */}
            {!isLogin && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
              {!isLogin && <small>Must be at least 6 characters</small>}
            </div>

            {/* Confirm password field (signup only) */}
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            {/* Submit button */}
            <button 
              type="submit" 
              className="auth-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Google Sign-In button container */}
          <div id="googleButtonContainer" style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}></div>

          {/* Toggle between login/signup */}
          <p className="auth-toggle">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
              }}
              className="toggle-link"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
