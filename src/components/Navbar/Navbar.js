import { Link } from 'gatsby';
import React, { useState, useEffect, useContext } from 'react';
import styles from './Navbar.module.scss';
import Collapse from './Collapse';
import Expand from './Expand';
import { Ctx } from '../Layout';
import _ from 'lodash';
import useWindowSize from '../../hooks/useWindowSize';
import { AnimatePresence, motion } from 'framer-motion';

const pages = ['editorial', 'commercial', 'film', 'information'];

const capitalize = (word) =>
  word ? word.charAt(0).toUpperCase() + word.slice(1) : 'Browse';

const Navbar = ({ location }) => {
  const { width } = useWindowSize();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [navIsOpen, toggleNavIsOpen] = useState(false);
  const currentPath = location?.pathname.split('/')[1];

  useEffect(() => {
    if (location?.pathname === '/') {
      if (width && isFirstLoad) {
        toggleNavIsOpen(width > 768);
        setIsFirstLoad(false);
      }
    }
  }, [width, isFirstLoad, setIsFirstLoad, location]);

  const { state } = useContext(Ctx);

  const getCurrentImg = () => {
    const nr = _.padStart(_.last(state.caseImages), 2, '0');
    if (nr === '00') {
      return _.padStart(state.images, 2, '0');
    }
    return nr;
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {/** CURRENT PAGE */}
        <li className={[styles.navItem, styles.navItemCurrent].join(' ')}>
          <h2
            className={
              navIsOpen || state.showProjectMeta
                ? styles.navItemLinkGray
                : styles.navItemLinkBlack
            }
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

        {state.showProjectMeta && (
          <li
            className={[styles.navItem, styles.navItemCurrectProject].join(' ')}
          >
            <h2
              className={navIsOpen ? styles.gray : undefined}
              dangerouslySetInnerHTML={{ __html: state.title }}
            />
            <span>
              <em>{getCurrentImg()}</em> / {_.padStart(state.images, 2, '0')}
            </span>
          </li>
        )}
      </ul>
      <AnimatePresence>
        {/** MENU */}
        {navIsOpen &&
          pages.map(
            (page) =>
              currentPath !== page && (
                <motion.ul
                  style={{ overflow: 'hidden' }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.2 }}
                  key={page}
                >
                  <li className={styles.navItem}>
                    <Link to={'/' + page + '/'} className={styles.navItemLink}>
                      {capitalize(page)}
                    </Link>
                  </li>
                </motion.ul>
              ),
          )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
