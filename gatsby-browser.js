import './src/styles/global.scss';

import React, { useState } from 'react';

const superSecurePassword = 'kryddhylla';

const LogInCheck = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pw, setPw] = useState('');

  const handleSubmit = () => {
    if (pw === superSecurePassword) {
      setLoggedIn(true);
    }
  };

  if (!loggedIn) {
    return (
      <div style={{ marginTop: 16 }}>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </label>
          <input type="submit" value="Log in" />
        </form>
      </div>
    );
  }

  return children;
};

export const wrapRootElement = ({ element }) => {
  return <LogInCheck>{element}</LogInCheck>;
};
