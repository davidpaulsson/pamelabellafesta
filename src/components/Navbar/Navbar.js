import { Link } from 'gatsby';
import React from 'react';
import styles from './Navbar.module.scss';

const Navbar = () => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      <li className={styles.navItem}>
        <Link to="/editorial" className={styles.navItemLink}>
          Editorial
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link to="/commercial" className={styles.navItemLink}>
          Commercial
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link to="/film" className={styles.navItemLink}>
          Film
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link to="/information" className={styles.navItemLink}>
          Information
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
