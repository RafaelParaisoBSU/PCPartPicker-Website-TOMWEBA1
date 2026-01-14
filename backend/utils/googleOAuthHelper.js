/**
 * Google OAuth Setup Guide
 * 
 * FRONTEND SETUP:
 * 1. Install Google OAuth library:
 *    npm install @react-oauth/google
 * 
 * 2. Get your Google Client ID from Google Cloud Console:
 *    - Go to https://console.cloud.google.com/
 *    - Create a new project or select existing
 *    - Enable Google+ API
 *    - Create OAuth 2.0 credentials (Web application)
 *    - Add authorized redirect URIs:
 *      - http://localhost:3000
 *      - http://localhost:5173
 *      - Your production domain
 *    - Copy your Client ID
 * 
 * 3. Wrap your app with GoogleOAuthProvider in main.jsx:
 *    import { GoogleOAuthProvider } from '@react-oauth/google';
 *    
 *    ReactDOM.createRoot(document.getElementById('root')).render(
 *      <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
 *        <App />
 *      </GoogleOAuthProvider>
 *    );
 * 
 * 4. Update Auth.jsx to use Google button component (see GoogleButton.jsx example)
 * 
 * BACKEND SETUP:
 * 1. The /api/auth/google endpoint is ready in routes/auth.js
 * 2. Frontend sends Google OAuth token to backend
 * 3. Backend validates and stores user data
 * 
 * Note: For production, you should verify the Google ID token on the backend
 * using google-auth-library. This example uses frontend validation for simplicity.
 */

export const initializeGoogleOAuth = () => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  document.head.appendChild(script);
};

export const handleGoogleSuccess = async (credentialResponse, onSuccess, onError) => {
  try {
    // Decode JWT token to get user info
    const token = credentialResponse.credential;
    const decoded = JSON.parse(atob(token.split('.')[1]));

    // Send to backend for verification and user creation
    const response = await fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        googleId: decoded.sub,
        email: decoded.email,
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        profileImage: decoded.picture,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onSuccess(data.user);
    } else {
      onError(data.message || 'Authentication failed');
    }
  } catch (error) {
    console.error('Google OAuth error:', error);
    onError('Failed to process Google login');
  }
};

export const handleGoogleError = () => {
  console.error('Google OAuth login failed');
};
