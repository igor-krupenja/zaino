import React from 'react';
import GoogleButton from 'react-google-button';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import GithubIcon from '../../../images/icons/github.svg';
import { login } from '../../../state/slices/user';
import './style.scss';

export const LoginPage = () => {
  const dispatch = useDispatch();
  document.title = 'Zaino';

  return (
    <main className="login-page">
      <h2 className="login-page__title">Zaino</h2>
      <p className="login-page__slogan">
        Hiking and mountaineering equipment app for the meticulous adventurer.
      </p>
      <GoogleButton
        // fix width, cannot set in SCSS as component overwrites class styles with inline styles
        style={{ width: '20rem', textAlign: 'start' }}
        type="light"
        onClick={() => dispatch(login())}
      />
      {/* render policy link if enabled in .env */}
      {process.env.PRIVACY_POLICY_ENABLED === 'true' && (
        <Link className="login-page__policies" to="/privacy">
          Privacy and cookie policy
        </Link>
      )}
      <a className="login-page__github-link" href="https://www.github.com/igor-krupenja/zaino">
        <span className="login-page__github-link__text">Source on Github</span>
        <GithubIcon className="login-page__github-link__icon" />
      </a>
    </main>
  );
};
