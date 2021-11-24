import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import useDimensions from "react-use-dimensions";
import Layout from "../components/Layout";
import * as styles from "./information.module.scss";
import Fade from "../components/Fade";

const InformationPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      wpPage(slug: { eq: "information" }) {
        acf {
          bio
          commercialClients
          editorialClients
          phone
          mail
          instagram
        }
      }
    }
  `);

  const [ref, { height }] = useDimensions();

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <Layout title="Information" {...{ location }}>
      <Fade>
        <div className={styles.flex}>
          <div
            className={styles.flexInner}
            style={{ minHeight: `calc(100vh - ${height + 12 + 90}px)` }}
          >
            <div className={styles.wrapper}>
              <h3 className={styles.title}>Bio</h3>
              <div
                className={[styles.content, styles.bio].join(" ")}
                dangerouslySetInnerHTML={{ __html: data.wpPage.acf.bio }}
              />
            </div>
            <div className={styles.wrapper}>
              <h3 className={styles.title}>Clients</h3>
              <div className={[styles.content, styles.clients].join(" ")}>
                <h4>Commercial</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${data.wpPage.acf.commercialClients}`,
                  }}
                />
                <h4 className={styles.secondh2}>Editorial</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${data.wpPage.acf.editorialClients}`,
                  }}
                />
              </div>
            </div>
            <div className={styles.wrapper}>
              <h3 className={styles.title}>Contact</h3>
              <div className={[styles.content, styles.contact].join(" ")}>
                <h4>Phone</h4>
                <ul>
                  <li>
                    <a href={`tel:${data.wpPage.acf.phone}`}>
                      {data.wpPage.acf.phone}
                    </a>
                  </li>
                </ul>

                <h4>Mail</h4>
                <ul style={{ marginBottom: 0 }}>
                  <li>
                    <a href={`mailto:${data.wpPage.acf.mail}`}>
                      {data.wpPage.acf.mail}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className={styles.wrapper}
              style={{ borderBottom: 0, marginBottom: 0 }}
            >
              <h3 className={styles.title}>Social</h3>
              <div className={[styles.content, styles.contact].join(" ")}>
                <h4>Instagram</h4>
                <ul style={{ marginBottom: 0 }}>
                  <li>
                    <a
                      href={`https://instagram.com/${data.wpPage.acf.instagram}`}
                    >
                      @{data.wpPage.acf.instagram}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.social} ref={ref}>
            <div
              className={styles.wrapper}
              style={{
                borderTop: "1px solid var(--color-light-gray)",
                paddingTop: 8,
                borderBottom: "none",
                marginBottom: 0,
                paddingBottom: 0,
              }}
            >
              <h3 className={styles.title}>Credits</h3>
              <div className={[styles.content, styles.clients].join(" ")}>
                <h4>Design</h4>
                <ul className={styles.space}>
                  <li>
                    <a href="https://www.instagram.com/perjornlov/">
                      Per Jörnlöv
                    </a>
                  </li>
                  <li>
                    <a href="https://niklasrosen.se/">Niklas Rosén</a>
                  </li>
                </ul>

                <h4>Code</h4>
                <ul>
                  <li>
                    <a href="https://davidpaulsson.se/">David Paulsson</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Layout>
  );
};

export default InformationPage;
