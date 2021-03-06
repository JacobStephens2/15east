import React from "react";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Button from "../components/Button";
import KindWords from "../components/KindWords";

const Home = (props) => {
  const intro = props.data.intro;
  const site = props.data.site.siteMetadata;
  const expertResults = props.data.expertResults;
  const greatPartnerships = props.data.greatPartnerships;
  const features = props.data.features.edges;
  const highlights = props.data.highlights.edges;
  const introImageClasses = `intro-image ${
    intro.frontmatter.intro_image_absolute && "intro-image-absolute"
  } 
  ${intro.frontmatter.intro_image_hide_on_mobile && "intro-image-hide-mobile"}`;

  return (
    <Layout bodyClass="page-home">
      <SEO title={site.title} />
      <Helmet>
        <meta
          name="description"
          content="15 East Creative's Website. We create graphics, layouts, and websites."
        />
      </Helmet>

      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-10 col-lg-12 order-1 order-md-1">
              <h1>{intro.frontmatter.header}</h1>
            </div>
            <div className="col-12 col-md-9 col-lg-7 order-1 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
            </div>
            <img
              alt={intro.frontmatter.title}
              className={introImageClasses}
              src={intro.frontmatter.intro_image}
            />
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-9 col-lg-8 order-2 order-md-1">
              <h1>{expertResults.frontmatter.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: expertResults.html }} />
              <Button
                target={expertResults.frontmatter.target}
                buttonText={expertResults.frontmatter.buttonText}
              />
            </div>
          </div>
        </div>
      </div>

      {highlights.length > 0 && (
        <div className="strip samples-section">
          <div className="container pt-6 pb-6 pt-md-10 pb-md-10">
            <h1>but pretty isn't everything.</h1>
            <p>We get results, too.</p>
            <div className="five-col-wide-row mb-2">
              {highlights.map(({ node }) => (
                <div key={node.id}>
                  <Link to={node.link}>
                    <img
                      className="homepage-sample"
                      src={node.src}
                      alt={node.alt}
                    ></img>
                  </Link>
                </div>
              ))}
            </div>
            <Button target="/portfolio" buttonText="SEE MORE OF OUR WORK" />
          </div>
        </div>
      )}

      {features.length > 0 && (
        <div className="strip feature-section">
          <div className="container pt-6 pb-6 pt-md-10 pb-md-10">
            <div className="five-col-wide-row">
              {features.map(({ node }) => (
                <div className="feature" key={node.id}>
                  <h3>{node.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: node.description }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="section great-partnerships-background">
        <div className="container height">
          <div className="row justify-content-start">
            <div className="col-12 order-2 order-md-1">
              <h1>{greatPartnerships.frontmatter.title}</h1>
              <div
                className="col-lg-9"
                dangerouslySetInnerHTML={{ __html: greatPartnerships.html }}
              />
              <Button
                target={greatPartnerships.frontmatter.target}
                buttonText={greatPartnerships.frontmatter.buttonText}
              />
            </div>
          </div>
        </div>
      </div>

      <KindWords />
    </Layout>
  );
};

export const query = graphql`
  query {
    expertResults: markdownRemark(
      fileAbsolutePath: { regex: "/content/sections/expert-results.md/" }
    ) {
      html
      frontmatter {
        title
        buttonText
        target
      }
    }
    greatPartnerships: markdownRemark(
      fileAbsolutePath: { regex: "/content/sections/great-partnerships.md/" }
    ) {
      html
      frontmatter {
        title
        buttonText
        target
      }
    }
    intro: markdownRemark(fileAbsolutePath: { regex: "/content/index.md/" }) {
      html
      frontmatter {
        image
        header
        intro_image
        intro_image_absolute
        intro_image_hide_on_mobile
        title
      }
    }
    features: allFeaturesJson {
      edges {
        node {
          id
          title
          description
        }
      }
    }
    highlights: allHighlightsJson {
      edges {
        node {
          id
          alt
          src
          link
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Home;
