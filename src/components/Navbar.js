import React from 'react';
import { Link } from 'gatsby';
const Navbar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/editorial">Editorial</Link>
      </li>
      <li>
        <Link to="/commercial">Commercial</Link>
      </li>
      <li>
        <Link to="/film">Film</Link>
      </li>
      <li>
        <Link to="/information">Information</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
