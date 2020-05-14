import { Link } from 'gatsby';
import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import Collapse from './Collapse';
import Expand from './Expand';

const pages = ['editorial', 'commercial', 'film', 'information'];

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const Navbar = ({ location }) => {
  const [navIsOpen, toggleNavIsOpen] = useState(false);
  const currentPath = location?.pathname.split('/')[1];
  const isNotHomePage =
    pages.filter((s) => (currentPath === '' ? false : s.includes(currentPath)))
      .length > 0;

  useEffect(() => {
    toggleNavIsOpen(!isNotHomePage);
  }, [isNotHomePage]);

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {/** CURRENT PAGE */}
        {isNotHomePage && (
          <li className={[styles.navItem, styles.navItemCurrent].join(' ')}>
            <h2
              className={styles.navItemLink}
              onClick={() => toggleNavIsOpen(!navIsOpen)}
            >
              {capitalize(currentPath)}
            </h2>
            <button
              className={styles.btn}
              onClick={() => toggleNavIsOpen(!navIsOpen)}
            >
              {navIsOpen ? <Collapse /> : <Expand />}
            </button>
          </li>
        )}

        {/** MENU */}
        {(navIsOpen || !isNotHomePage) &&
          pages.map(
            (page) =>
              currentPath !== page && (
                <li className={styles.navItem}>
                  <Link to={'/' + page} className={styles.navItemLink}>
                    {capitalize(page)}
                  </Link>
                </li>
              ),
          )}
      </ul>
    </nav>
  );
};

export default Navbar;
