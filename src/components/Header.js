import { Link } from 'gatsby';
import React from 'react';
import Navbar from './Navbar';

const Header = () => (
  <header>
    <h1>
      <Link to="/">Pamela Bellafesta</Link>
    </h1>
    <Navbar />
  </header>
);

export default Header;
