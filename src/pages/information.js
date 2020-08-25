import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import useDimensions from 'react-use-dimensions';
import styles from './information.module.scss';

const InformationPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      wordpressPage(id: { eq: "4b79dc3c-9f5e-50d0-a1a6-4f228951cb23" }) {
        acf {
          bio
          commercial_clients
          editorial_clients
          phone
          mail
          instagram
        }
      }
    }
  `);

  const [ref, { height }] = useDimensions();

  return (
    <Layout title="Information" {...{ location }}>
      <div className={styles.flex}>
        <div
          className={styles.flexInner}
          style={{ minHeight: `calc(100vh - ${height + 24 + 90}px)` }}
        >
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Bio</h3>
            <div
              className={[styles.content, styles.bio].join(' ')}
              dangerouslySetInnerHTML={{ __html: data.wordpressPage.acf.bio }}
            />
          </div>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Clients</h3>
            <div className={[styles.content, styles.clients].join(' ')}>
              <h4>Commercial</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${data.wordpressPage.acf.commercial_clients}`,
                }}
              />
              <h4 className={styles.secondh2}>Editorial</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${data.wordpressPage.acf.editorial_clients}`,
                }}
              />
            </div>
          </div>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Contact</h3>
            <div className={[styles.content, styles.contact].join(' ')}>
              <h4>Phone</h4>
              <ul>
                <li>
                  <a href={`tel:${data.wordpressPage.acf.phone}`}>
                    {data.wordpressPage.acf.phone}
                  </a>
                </li>
              </ul>

              <h4>Mail</h4>
              <ul>
                <li>
                  <a href={`mailto:${data.wordpressPage.acf.mail}`}>
                    {data.wordpressPage.acf.mail}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.wrapper} style={{ borderBottom: 0 }}>
            <h3 className={styles.title}>Social</h3>
            <div className={[styles.content, styles.contact].join(' ')}>
              <h4>Instagram</h4>
              <ul>
                <li>
                  <a
                    href={`https://instagram.com/${data.wordpressPage.acf.instagram}`}
                  >
                    @{data.wordpressPage.acf.instagram}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.social} ref={ref}>
          <div
            className={styles.wrapper}
            style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}
          >
            <h3 className={styles.title}>Credits</h3>
            <div className={[styles.content, styles.clients].join(' ')}>
              <h4>Design</h4>
              <ul>
                <li>
                  <a href="http://www.jornlov.se/">Per Jörnlöv</a>,
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
    </Layout>
  );
};

export default InformationPage;

// // query MyQuery {
// //   wordpressPage(id: {eq: "4b79dc3c-9f5e-50d0-a1a6-4f228951cb23"}) {
// //     id
// //     acf {
// //       bio
// //       commercial_clients
// //       editorial_clients
// //       phone
// //       mail
// //       instagram
// //     }
// //   }
// // }

// import { graphql } from 'gatsby';
// import React from 'react';
// import useDimensions from 'react-use-dimensions';
// import remark from 'remark';
// import remarkHtml from 'remark-html';
// import recommended from 'remark-preset-lint-recommended';
// import Layout from '../components/Layout';
// import styles from './information-page.module.scss';

// const mdToHtml = (md) =>
//   remark().use(recommended).use(remarkHtml).processSync(md).toString();

// export const InformationPageTemplate = ({
//   bio,
//   clients,
//   contact,
//   social,
//   // representation,
// }) => {
//   const [ref, { height }] = useDimensions();

//   return (
//     <div className={styles.flex}>
//       <div
//         className={styles.flexInner}
//         style={{ minHeight: `calc(100vh - ${height + 24 + 90}px)` }}
//       >
//         <div className={styles.wrapper}>
//           <h3 className={styles.title}>Bio</h3>
//           <div
//             className={[styles.content, styles.bio].join(' ')}
//             dangerouslySetInnerHTML={{ __html: mdToHtml(bio) }}
//           />
//         </div>
//         <div className={styles.wrapper}>
//           <h3 className={styles.title}>Clients</h3>
//           <div
//             className={[styles.content, styles.clients].join(' ')}
//             dangerouslySetInnerHTML={{ __html: mdToHtml(clients) }}
//           />
//         </div>
//         <div className={styles.wrapper}>
//           <h3 className={styles.title}>Contact</h3>
//           <div className={[styles.content, styles.contact].join(' ')}>
//             {contact.map(({ title, text, link }) => (
//               <React.Fragment key={link}>
//                 <h4>{title}</h4>
//                 <ul>
//                   <li>
//                     <a href={link}>{text}</a>
//                   </li>
//                 </ul>
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//         <div className={styles.wrapper} style={{ borderBottom: 'none' }}>
//           <h3 className={styles.title}>Social</h3>
//           <div className={[styles.content, styles.contact].join(' ')}>
//             {social.map(({ title, text, link }) => (
//               <React.Fragment key={link}>
//                 <h4>{title}</h4>
//                 <ul>
//                   <li>
//                     <a href={link}>{text}</a>
//                   </li>
//                 </ul>
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className={styles.social} ref={ref}>
//         <div
//           className={styles.wrapper}
//           style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}
//         >
//           <h3 className={styles.title}>Credits</h3>
//           <div className={[styles.content, styles.clients].join(' ')}>
//             <h4>Design</h4>
//             <ul>
//               <li>
//                 <a href="http://www.jornlov.se/">Per Jörnlöv</a>,
//               </li>
//               <li>
//                 <a href="https://niklasrosen.se/">Niklas Rosén</a>
//               </li>
//             </ul>

//             <h4>Code</h4>
//             <ul>
//               <li>
//                 <a href="https://davidpaulsson.se/">David Paulsson</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const InformationPage = ({ data, location }) => {
//   const {
//     frontmatter: { bio, clients, contact, social, representation },
//   } = data.markdownRemark;

//   return (
//     <Layout title="Information" {...{ location }}>
//       <InformationPageTemplate
//         {...{
//           bio,
//           clients,
//           contact,
//           social,
//           representation,
//         }}
//       />
//     </Layout>
//   );
// };

// export default InformationPage;