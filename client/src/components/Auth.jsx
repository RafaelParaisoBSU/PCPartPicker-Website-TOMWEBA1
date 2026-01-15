import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import '../styles/Auth.scss';

const Auth = ({ onShowModal, setUser }) => {
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

  useEffect(() => {
    // Initialize Google Sign-In when component mounts
    const initializeGoogle = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '320204018887-t1vq4mj3e3guuide4s47313oeaqk0ctj.apps.googleusercontent.com', 
          callback: handleGoogleCallback,
        });
        
        // Clear and render the Google button
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

    // If script already loaded, initialize directly
    if (window.google) {
      initializeGoogle();
    } else {
      // Load Google Sign-In script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.head.appendChild(script);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
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

      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName
          };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Update parent component with user data
        if (setUser) {
          setUser(data.user);
        }
        
        // Dispatch custom event to update navbar
        window.dispatchEvent(new CustomEvent('userUpdated', { detail: data.user }));

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
        onShowModal({
          isOpen: true,
          type: 'error',
          title: 'Error',
          message: data.message || 'Authentication failed',
          actions: [{ label: 'OK', onClick: () => onShowModal({ isOpen: false }) }]
        });
      }
    } catch (error) {
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

  const handleGoogleCallback = async (response) => {
    try {
      setLoading(true);

      if (!response.credential) {
        throw new Error('No credential received from Google');
      }

      // Decode the JWT token from Google
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

      // Send to backend
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
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Update parent component with user data
        if (setUser) {
          setUser(data.user);
        }
        
        // Dispatch custom event to update navbar
        window.dispatchEvent(new CustomEvent('userUpdated', { detail: data.user }));

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
    // Google button is rendered automatically
    // This function can be removed or used for testing
    console.log('Google button should be rendered automatically');
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          
          <form onSubmit={handleSubmit} className="auth-form">
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

            <button 
              type="submit" 
              className="auth-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div id="googleButtonContainer" style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}></div>

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
