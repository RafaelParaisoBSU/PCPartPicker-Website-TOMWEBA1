// Load Google OAuth SDK script
export const initializeGoogleOAuth = () => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  document.head.appendChild(script);
};

// Handle successful Google OAuth response
export const handleGoogleSuccess = async (credentialResponse, onSuccess, onError) => {
  try {
    // Extract JWT token from Google response
    const token = credentialResponse.credential;
    
    // Decode JWT to get user info
    const decoded = JSON.parse(atob(token.split('.')[1]));

    // Send Google user data to backend
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
      // Store authentication data in localStorage
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

// Handle Google OAuth errors
export const handleGoogleError = () => {
  console.error('Google OAuth login failed');
};