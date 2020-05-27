import { Link } from 'gatsby';
import React, { useState, useEffect, useContext } from 'react';
import styles from './Navbar.module.scss';
import Collapse from './Collapse';
import Expand from './Expand';
import { Ctx } from '../Layout';
import _ from 'lodash';

const pages = ['editorial', 'commercial', 'film', 'information'];

const capitalize = (word) => word?.charAt(0).toUpperCase() + word.slice(1);

const Navbar = ({ location }) => {
  const [navIsOpen, toggleNavIsOpen] = useState(false);
  const currentPath = location?.pathname.split('/')[1];
  const isNotHomePage =
    pages.filter((s) => (currentPath === '' ? false : s.includes(currentPath)))
      .length > 0;

  const { state } = useContext(Ctx);

  const getCurrentImg = () => {
    const nr = _.padStart(_.last(state.caseImages), 2, '0');
    if (nr === '00') {
      return _.padStart(state.images, 2, '0');
    }
    return nr;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 768 && currentPath === '') {
        toggleNavIsOpen(true);
      }
    }
  }, []);

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {/** CURRENT PAGE */}
        <li className={[styles.navItem, styles.navItemCurrent].join(' ')}>
          <h2
            className={styles.navItemLink}
            onClick={() => toggleNavIsOpen(!navIsOpen)}
          >
            {capitalize(currentPath === '' ? 'navigation' : currentPath)}
          </h2>
          <button
            className={styles.btn}
            onClick={() => toggleNavIsOpen(!navIsOpen)}
          >
            {navIsOpen ? <Collapse /> : <Expand />}
          </button>
        </li>

        {state.showProjectMeta && (
          <li
            className={[styles.navItem, styles.navItemCurrectProject].join(' ')}
          >
            <h2 className={navIsOpen && styles.gray}>{state.title}</h2>
            <span>
              <em>{getCurrentImg()}</em> / {_.padStart(state.images, 2, '0')}
            </span>
          </li>
        )}

        {/** MENU */}
        {navIsOpen &&
          pages.map(
            (page) =>
              currentPath !== page && (
                <li key={page} className={styles.navItem}>
                  <Link to={'/' + page + '/'} className={styles.navItemLink}>
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
