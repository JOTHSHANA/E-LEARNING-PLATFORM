import React from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:3000/api/auth/google`;
  };

  return (
    <button onClick={handleGoogleLogin} style={styles.button}>
      Login with Google
    </button>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#4285F4',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default GoogleLoginButton;
