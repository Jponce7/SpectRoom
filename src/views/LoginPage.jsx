import React, { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice';
import { auth } from '../firebase/config';
import FullPageLoader from '../components/FullPageLoader';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import logo from '../assets/logo.png';
import './LoginPage.css';

function LoginPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ id: user.uid, email: user.email }));
      } else {
        dispatch(setUser(null));
      }
      if (isLoading) {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch, isLoading]);

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="container login-page">
        <section>
          <h1>
            <img src={logo} alt="SpectRoom Logo" className="logo" style={{ width: '600px', height: 'auto' }} />
          </h1>
          <p style={{ color: 'white' }}>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType === 'login' ? 'selected' : ''}`}
              onClick={() => setLoginType('login')}
            >
              Login
            </button>
            <button
              className={`btn ${loginType === 'signup' ? 'selected' : ''}`}
              onClick={() => setLoginType('signup')}
            >
              Signup
            </button>
          </div>
          {loginType === 'login' ? <LoginForm /> : <SignupForm />}
        </section>
      </div>
    </>
  );
}

export default LoginPage;
