import { Link } from 'gatsby';
import React from 'react';
import Navbar from '../Navbar';
import styles from './Header.module.scss';
import Wordmark from './Wordmark';

const Header = ({ location }) => (
  <header className={`${styles.sticky} sticky`}>
    <h1 className={styles.title}>
      <Link to="/" className={styles.link} title="Pamela Bellafesta">
        <Wordmark />
        <span className={styles.screenReaderText}>Pamela Bellafesta</span>
      </Link>
    </h1>
    <Navbar {...{ location }} />
  </header>
);

export default Header;
