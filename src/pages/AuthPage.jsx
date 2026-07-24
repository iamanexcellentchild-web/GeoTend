import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AuthPage({ type }) {
  const isRegister = type === 'register';
  const navigate = useNavigate();
  const [role, setRole] = useState(() => localStorage.getItem('geoRole') || '');
  const [verified, setVerified] = useState(() => localStorage.getItem('geoVerified') === 'true');

  const handleSubmit = () => {
    if (isRegister) {
      if (role) {
        localStorage.setItem('geoRole', role);
      }
      localStorage.setItem('geoVerified', 'false');
      setVerified(false);
      navigate('/login');
      return;
    }

    if (!verified) {
      return;
    }

    const selectedRole = role || localStorage.getItem('geoRole') || 'teacher';
    localStorage.setItem('geoRole', selectedRole);
    navigate(selectedRole === 'student' ? '/student/dashboard' : '/teacher/dashboard');
  };

  const handleVerify = () => {
    localStorage.setItem('geoVerified', 'true');
    setVerified(true);
  };

  return (
    <div className="page">
      <div style={{ maxWidth: '500px', margin: '60px auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#0d2f4f',
            margin: '0 0 12px',
            letterSpacing: '-0.5px',
          }}>
            {isRegister ? 'Get Started' : 'Welcome Back'}
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6e8090',
            margin: '0',
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {isRegister 
              ? 'Create your account to access intelligent attendance tracking'
              : 'Sign in to your account to continue'}
          </p>
        </div>

        <div className="card" style={{ boxShadow: '0 4px 16px rgba(0, 85, 179, 0.08)' }}>
          <form className="form" style={{ gap: '18px' }}>
            {isRegister && (
              <label>
                <span style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#0d2f4f' }}>
                  Full Name
                </span>
                <input 
                  placeholder="John Doe" 
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #d7e1eb',
                    backgroundColor: '#f9fbfd',
                  }}
                />
              </label>
            )}
            
            <label>
              <span style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#0d2f4f' }}>
                University Email
              </span>
              <input 
                placeholder="your.email@unilag.edu.ng" 
                type="email"
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #d7e1eb',
                  backgroundColor: '#f9fbfd',
                }}
              />
            </label>

            <label>
              <span style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#0d2f4f' }}>
                Account Type
              </span>
              <select 
                value={role} 
                onChange={(event) => setRole(event.target.value)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #d7e1eb',
                  backgroundColor: '#f9fbfd',
                  cursor: 'pointer',
                }}
              >
                <option value="" disabled>Select account type</option>
                <option value="student">Student</option>
                <option value="teacher">Instructor</option>
              </select>
            </label>

            <label>
              <span style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#0d2f4f' }}>
                Password
              </span>
              <input 
                type="password" 
                placeholder={isRegister ? 'Create a strong password' : 'Enter your password'}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #d7e1eb',
                  backgroundColor: '#f9fbfd',
                }}
              />
            </label>

            <div style={{ marginTop: '8px' }}>
              {!isRegister && !verified && (
                <button 
                  className="btn secondary" 
                  type="button" 
                  onClick={handleVerify}
                  style={{ width: '100%', marginBottom: '12px' }}
                >
                  Verify Email
                </button>
              )}
              <button 
                className="btn primary" 
                type="button" 
                onClick={handleSubmit}
                style={{ width: '100%' }}
              >
                {isRegister ? 'Create Account' : verified ? 'Sign In' : 'Awaiting Verification'}
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Link 
                to={isRegister ? '/login' : '/register'}
                style={{
                  fontSize: '14px',
                  color: '#0055b3',
                  textDecoration: 'none',
                  fontWeight: '500',
                  hover: { textDecoration: 'underline' },
                }}
              >
                {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
              </Link>
            </div>
          </form>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#9ca3af',
          marginTop: '30px',
        }}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
