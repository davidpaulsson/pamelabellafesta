/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { motion } from "framer-motion";
import { navigate } from "gatsby";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { Ctx } from "../Layout";
import Collapse from "./Collapse";
import Expand from "./Expand";
import * as styles from "./Navbar.module.scss";

const pages = ["editorial", "commercial", "film", "information"];

const capitalize = (word) =>
  word ? word.charAt(0).toUpperCase() + word.slice(1) : "Browse";

const Navbar = ({ location }) => {
  const { width } = useWindowSize();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const currentPath = location?.pathname && location?.pathname.split("/")[1];

  useEffect(() => {
    if (location?.pathname === "/") {
      if (width && isFirstLoad) {
        setNavIsOpen(width > 768);
        setIsFirstLoad(false);
      }
    }
  }, [width, isFirstLoad, setIsFirstLoad, location]);

  const { state } = useContext(Ctx);

  const getCurrentImg = () => {
    const nr = _.padStart(_.last(state.caseImages), 2, "0");
    if (nr === "00") {
      return _.padStart(state.images, 2, "0");
    }
    return nr;
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {/** CURRENT PAGE */}
        <li className={[styles.navItem, styles.navItemCurrent].join(" ")}>
          <h2
            className={
              navIsOpen || state.showProjectMeta
                ? styles.navItemLinkGray
                : styles.navItemLinkBlack
            }
            onClick={() => setNavIsOpen(!navIsOpen)}
          >
            {capitalize(currentPath)}
          </h2>
          <button
            className={styles.btn}
            onClick={() => setNavIsOpen(!navIsOpen)}
            type="button"
          >
            {navIsOpen ? <Collapse /> : <Expand />}
          </button>
        </li>

        <motion.div
          initial={false}
          style={{ overflow: "hidden" }}
          animate={{ height: state.showProjectMeta ? "auto" : 0 }}
          transition={{ ease: "easeOut", delay: 0.6 }}
        >
          <li
            className={[styles.navItem, styles.navItemCurrectProject].join(" ")}
          >
            <h2
              className={navIsOpen ? styles.gray : undefined}
              dangerouslySetInnerHTML={{ __html: state.title }}
            />
            <span>
              <em>{getCurrentImg()}</em> / {_.padStart(state.images, 2, "0")}
            </span>
          </li>
        </motion.div>
      </ul>
      {/** MENU */}

      <motion.div
        initial={false}
        style={{ overflow: "hidden" }}
        animate={{ height: navIsOpen ? "auto" : 0 }}
        transition={{ ease: "easeOut", duration: 0.1 }}
      >
        <ul>
          {pages
            .filter((page) => page !== currentPath)
            .map((page) => (
              <li className={styles.navItem} key={page}>
                <a
                  href={`/${page}/`}
                  className={styles.navItemLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setNavIsOpen(false);
                    setTimeout(() => {
                      navigate(`/${page}/`);
                    }, 300);
                  }}
                >
                  {capitalize(page)}
                </a>
              </li>
            ))}
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
