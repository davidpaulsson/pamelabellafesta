import { Link } from 'gatsby';
import React from 'react';
import Navbar from '../Navbar';
import styles from './Header.module.scss';

const Header = ({ location }) => (
  <header>
    <h1 className={styles.title}>
      <Link to="/" className={styles.link} title="Pamela Bellafesta">
        Pamela Bellafesta
      </Link>
    </h1>
    <Navbar {...{ location }} />
  </header>
);

export default Header;
