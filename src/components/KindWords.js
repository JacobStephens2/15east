import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { graphql, useStaticQuery } from "gatsby";

const KindWords = (props) => {
  const data = useStaticQuery(graphql`
    query {
      testimonials: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/testimonials/*/" } }
      ) {
        nodes {
          frontmatter {
            role
            name
          }
          html
          id
        }
      }
    }
  `);

  const testimonials = data.testimonials;

  return (
    <Carousel>
      {testimonials.nodes.map((node) => (
        <Carousel.Item key={node.id}>
          <div className="quote-box">
            <div className="carousel-quote">
              <span dangerouslySetInnerHTML={{ __html: node.html }}></span>”
            </div>
            <p className="carousel-quote-source">
              {node.frontmatter.name}&ensp;&ensp;|&ensp;&ensp;
              {node.frontmatter.role}
            </p>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default KindWords;
