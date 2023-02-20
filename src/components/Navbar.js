import React, { useState } from 'react';
import './css/Navbar.css';
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const navigate = useNavigate();

  const onLoginSuccess = async (res) => {
    console.log('Login Success:', res.profileObj);
    await axios
      .post('https://blogger-app-gomr.onrender.com/users/add-user', {
        userDetails: res.profileObj,
      })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem('logged_in', 'yes');
        sessionStorage.setItem('user_id', res.data._id);
      })
      .catch((err) => console.log(err));
    window.location.reload();
    setShowLoginButton(false);
    setShowLogoutButton(true);
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    alert('You have been signed out successfully');
    sessionStorage.removeItem('logged_in');
    sessionStorage.removeItem('user_id');
    setShowLoginButton(true);
    setShowLogoutButton(false);
    console.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <nav className="nav-blog">
        <div>
          <div
            className="nav-logo"
            onClick={() => {
              navigate('/');
            }}
          >
            <i class="fa-solid fa-book"></i>BLOGGER
          </div>
        </div>
        <div>
          <form className="nav-button-form">
            {sessionStorage.getItem('logged_in') === 'yes' ? (
              <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="LOGOUT"
                onLogoutSuccess={onSignoutSuccess}
              />
            ) : (
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="LOGIN"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
              />
            )}
          </form>
        </div>
      </nav>
    </div>
  );
}
